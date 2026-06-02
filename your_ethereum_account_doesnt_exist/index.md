---
title: "Reflections of a CKBuilder: Your Ethereum Account Doesn't Exist"
coverImage: 'images/cover.png'
category: Interoperability
subtitle: 'Part 1 of Reflections of a CKBuilder: rethinking accounts, ownership, and state through the CKB cell model.'
date: '2026-06-02T00:00:00.000Z'
author:
- github:WuodOdhis
---

*Reflections of a CKBuilder is a field-note series from my CKBuilders learning journey, translating CKB concepts through the eyes of someone building with them for the first time.*

Open MetaMask right now. Look at your balance. Let's say it says 1.4 ETH.

Here's a question most people never ask: where is that number?

Not philosophically. Literally. Where does that `1.4` live? Which computer holds it? Who wrote it down?

The answer is that no single machine has a variable called `your_balance = 1.4`. What actually exists is a global, planet-sized data structure called the World State, a massive key-value store where your address maps to a number. Every Ethereum node in the world holds a copy of this structure. When you send ETH, the Ethereum Virtual Machine subtracts from your entry and adds to someone else's. Two edits to a shared database.

It works. Ethereum is a $300B network, so clearly it works.

But it's also a design that carries a very specific set of tradeoffs, ones that get more painful the more sophisticated you try to be as a builder. And once you see those tradeoffs clearly, you start to understand why Nervos CKB was built the way it was.

---

## The Ledger in the Sky

Before Ethereum, there was Bitcoin. Bitcoin doesn't have accounts. It never did.

When you "receive" bitcoin, what actually happens is that a transaction is written to the blockchain with an output locked to your public key. That output (called a UTXO, an Unspent Transaction Output) just sits there, on-chain, waiting. It has a value: 0.5 BTC, say. It has a lock: a condition that has to be satisfied before anyone can spend it, typically a signature check against your key.

Your "balance" in Bitcoin is not a number stored anywhere. It's the sum of all UTXOs your key can unlock. Your wallet scans the blockchain, finds every unspent output you can sign for, and adds them up. That total is what it shows you.

This is a fundamentally different model. Your money isn't a ledger entry. It's a *collection of locked boxes scattered across the chain*. To spend, you don't edit a number. You consume a box and create new ones.

This is why Bitcoin transactions are stateless and parallelizable. Two transactions that don't touch the same UTXOs can be verified completely independently, simultaneously, by different processors. There's no shared mutable global state to serialize around.

Ethereum gave up this property deliberately, in exchange for a much more expressive programming model. You can write loops, store arbitrary data, build complex contracts. But everything runs in sequence through a single global EVM, and every state change goes into the one shared World State.

It's the classic tradeoff: expressiveness vs. parallelism.

CKB looked at that tradeoff and said: *what if you didn't have to make it?*

---

## Cells Are UTXO, But Grown Up

The core data structure in CKB is called a Cell. And if you understand Bitcoin UTXOs, you already understand 80% of what a cell is.

A cell is a discrete unit of state on the blockchain. It has:

- **Capacity:** How much CKB it holds (and by extension, how many bytes it's allowed to occupy on-chain)
- **Lock Script:** The condition that must be satisfied to spend it, just like Bitcoin's locking script
- **Type Script:** An optional second layer of logic that governs the cell's data
- **Data:** Arbitrary bytes, whatever you want to store

Like a Bitcoin UTXO, a cell is either unspent or it isn't. You don't edit it. When you "update" a cell, you consume it as a transaction input and produce new cells as outputs. The old cell is destroyed. The new cells exist. No mutation in place.

Your "balance" in CKB is exactly like your balance in Bitcoin: it's the sum of all cells whose Lock Script you can satisfy.

But here's where CKB diverges from Bitcoin in a way that changes everything for developers.

---

## The Lock Script Is a Program

In Bitcoin, the locking script is Bitcoin Script, a deliberately limited, stack-based language. It can check signatures. It can handle some multisig. It cannot loop. It was designed to be restrictive because the Bitcoin developers wanted to prevent complex logic from creating unpredictable state or blocking block production.

In CKB, the Lock Script is a full RISC-V binary.

RISC-V is a hardware instruction set, the same kind of architecture that runs in embedded systems and, increasingly, in server chips. It's not a blockchain-specific design. It's a real CPU architecture. And the CKB-VM is a complete RISC-V processor running inside the node.

What this means: the Lock Script on a CKB cell can be *any program you can write in Rust or C that compiles to RISC-V*. You want a multisig that requires three of five keys? Write it. A time-locked vault that opens after block 1,000,000? Write it. A passkey-based auth flow using WebAuthn? That's what the JoyID wallet is. It's just a Lock Script that verifies a WebAuthn signature instead of secp256k1.

On Ethereum, if you want a new signature scheme, you need a precompile, a hard-coded shortcut baked into the EVM at the protocol level, requiring a hard fork to add. On CKB, you deploy the RISC-V binary as a cell on-chain and reference it. No hard fork. No permission.

This is what "bring your own cryptography" means in practice. CKB did not hardcode secp256k1 as its signature scheme. The standard `Secp256k1Blake160` lock that most CKB addresses use is itself just a RISC-V program stored in a system cell. You could write a competing implementation, deploy it, and people could use it today.

---

## What Is Ownership, Really?

When I started building on CKB, the concept that hit hardest was this one:

**Ownership on CKB is not a database record. It's a program.**

On Ethereum, the fact that you own 1.4 ETH is a row in a database that Ethereum nodes agree to maintain. The security model is: as long as a majority of the network is honest, no one changes your row without your permission.

On CKB, the fact that you own a cell means that there is a RISC-V program attached to that cell (your Lock Script), and no transaction consuming that cell will ever be valid unless it satisfies that program. The security model is enforced not just by the network's honesty, but by *every node independently running the script and rejecting transactions that fail it*.

The practical difference is flexibility. If you want to change the rules of how your assets can be accessed, say you want to add social recovery or rotate your key, on Ethereum you need a smart contract with upgrade mechanisms that someone has to maintain. On CKB, you just create a new cell with a new Lock Script. The rules are baked into the structure of the asset itself.

---

## Storage as a First-Class Concept

There's one more piece of CKB's design that I find genuinely elegant, and it comes from the capacity model.

Every cell's `capacity` field must be large enough to cover the byte-size of the cell itself. The exact formula: the cell's serialized size in bytes determines the minimum CKB you must deposit to create it.

**1 CKB = 1 Byte.** This is not a metaphor. It's the state rent model.

On Ethereum, storage is free to write. You pay a gas fee once to execute the transaction, but the data persists on-chain forever, maintained by every node in the network at no ongoing cost to you. This is why Ethereum's state has been growing for years with no mechanism to stop it. It raises the hardware requirements to run a full node, which erodes decentralization quietly and steadily.

CKB solves this structurally. You want to store 100 bytes on-chain? You lock 100 CKB as a deposit. That CKB is not burned. It's locked inside the cell. When you destroy the cell because you no longer need the data, you get those 100 CKB back. The space you occupied is freed.

The consequences for applications are striking. The Spore Protocol (CKB's NFT standard) stores content directly in the cell data. An image, a text document, a piece of generative art. It all lives on-chain, in the cell, not on IPFS or a server somewhere. Because the cell holds CKB proportional to its size, the NFT *carries its own storage cost inside itself*. When you transfer a Spore NFT, a tiny fraction of the cell's own capacity can pay the miner fee. The asset funds its own movement.

You can send a Spore NFT to someone with zero CKB in their wallet. Try doing that on Ethereum.

---

## What I've Actually Built

Over the last three weeks I've been building through the CKBuilders program, going from reading docs to running transactions on a local devnet to writing my first Rust lock script targeting RISC-V.

The local devnet experience alone is worth noting. On Ethereum, local development usually means a simulated environment. Hardhat mines blocks instantly and fakes much of the network's behavior. OffCKB runs a real Proof-of-Work node on your machine. Blocks are actually mined. Transactions actually have to pass script validation. The environment is genuine, which means bugs you find locally are real bugs, not local artifacts.

When I minted an xUDT fungible token on my devnet, I had to manually construct the Type Script, encode the token amount as a 128-bit little-endian integer in the cell data, and include the xUDT system script in the transaction's `cellDeps` so the CKB-VM knew where to load the validation logic from. It's more verbose than calling `mint()` on an ERC-20. But I understood exactly what was happening at every step. There was no abstraction hiding the mechanics from me.

When I scaffolded my first Rust lock script, the classic "always-success" binary that every CKB script developer starts with, I realized I was not writing a smart contract in the Ethereum sense. I was writing a *validator*. A program that receives a proposed state transition (a transaction), inspects it, and returns either `0` (valid) or an error code. That's the entire job. No storage. No internal state. Just: does this transaction follow the rules or not?

That distinction, between a contract that *is* state and a script that *validates* state, is the mental shift that changes how you think about building on CKB.

---

## Who Should Care

If you're a Bitcoin developer who's watched Ethereum with envy at its expressiveness but skepticism at the global state model, CKB is worth your serious attention. The UTXO model you know is intact. The programmability you've been wanting is here, without the shared global state you've been avoiding.

If you're an Ethereum developer who's hit the limits of the EVM: the gas costs of complex storage operations, the difficulty of adding new cryptographic primitives, the awkwardness of upgradeability patterns, CKB offers an alternative architecture worth understanding. The shift is real. Your entire framework for what a "contract" does has to change. But what you get on the other side is a system where programs don't share state with other programs, where parallelism is natural, and where storage is honest about what it costs.

The blockchain space keeps asking why this industry keeps rebuilding the same things with different tokens. CKB's answer is architectural: if the base model of how state is stored and how ownership is defined is fundamentally different, you cannot build the same things. You build different ones. And sometimes they're genuinely better.

---

*This is part of an ongoing series documenting my progress through the CKBuilders program.*
