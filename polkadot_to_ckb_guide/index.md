---
title: 'On CKB, You Drive: A Guide for Polkadot Developers'
coverImage: 'images/cover.png'
category: Developer
subtitle: 'What breaks, what transfers, and what you have to unlearn when crossing from Polkadot into the cell model.'
date: '2026-07-16T00:00:00.000Z'
author: 
- github:CECILIA-MULANDI
---

The first thing CKB asks you to do is construct a transaction by hand.

Not submit an extrinsic. Not call a contract method. Build the inputs yourself — find the cells you want to consume, decide which outputs to create, figure out the capacity, encode the data, attach the right scripts, then sign and broadcast. The chain doesn't do any of that for you. It receives your proposed state transition and either accepts or rejects it.

If you're coming from Polkadot, this feels backwards. On Substrate, constructing state transitions is the runtime's job. You write a pallet that defines valid transitions; FRAME wires it into the block execution pipeline; PAPI gives your frontend a fully typed API to call into it. The division of labor is clear: developers define rules, the chain enforces and executes them. You never manually assemble a storage write. You call a transfer function and the runtime handles everything underneath.

So why does CKB hand you the keys and make you drive?

The answer isn't that CKB has worse tooling or a steeper learning curve for its own sake. The answer is architectural: CKB and Polkadot have fundamentally different opinions about where logic should live and who should be responsible for state. On Polkadot, logic and state are fused — a pallet owns its storage maps, the runtime owns all state transitions, the relay chain owns consensus. On CKB, they're separated entirely. Logic (scripts) and state (cells) are distinct objects that meet briefly at validation time and then go their separate ways. No script owns a cell. No runtime owns the chain's state. The developer constructs the transition because there is no runtime to delegate to.

That separation is the article. Everything else — the cell model, the script architecture, the querying model, the upgrade story — follows from it.

---

## What Polkadot Gave You (That You Didn't Know You Were Depending On)

Before getting into cells and scripts, it helps to make the Polkadot model explicit, because most developers who've learned Substrate have never had to articulate it from the outside.

Polkadot's development model rests on three fused layers:

**The runtime is a single WASM binary.** Every pallet in your chain compiles into one WASM blob. That blob is the law: it defines every valid state transition, every callable function, every storage layout. Nodes execute that blob to agree on state. When you deploy a parachain, you're deploying a runtime. When you upgrade, you replace the runtime with a new WASM binary through an on-chain governance vote. The upgrade is **forkless** — no coordinated hard fork, no nodes going offline — because the upgrade itself is just another state transition that the old runtime approves.

**Pallets own their storage.** A storage map in a pallet isn't a raw database table that anyone can write to. It's namespaced to that pallet, and only that pallet's extrinsics and hooks can legitimately mutate it. There's no way for an external caller to reach into another pallet's storage and change a value without going through that pallet's defined API. Ownership is enforced at compile time.

**The relay chain absorbs your consensus.** As a parachain developer, you don't implement consensus. You write a runtime, and Polkadot's collator/validator machinery handles block production and finality. Your job ends at "define valid state transitions." Everything else is infrastructure.

These three things together — single runtime, owned storage, pooled consensus — define the Polkadot developer experience. They're so fundamental that most Substrate developers wouldn't list them as assumptions. They're just "how blockchains work."

CKB breaks all three. Not by accident, and not as a limitation. By design, and for reasons.

---

## Part I: For Onchain Developers

*You write pallets or runtime logic. You think in terms of storage maps, dispatchable calls, and extrinsics.*

### There Is No Runtime

CKB has no runtime in the Substrate sense. There is no WASM binary that every node executes to determine valid state transitions. There is no single authority that owns storage. There is no place to put your pallet calls and storage macros.

What CKB has instead is the **cell model**.

A cell is the atomic unit of state on CKB. It has four fields:

- **`capacity`**: how much CKB the cell holds, and by implication, how many bytes it's allowed to occupy on-chain (1 CKB = 1 byte of on-chain state)
- **`lock_script`**: a program that controls who can spend this cell — the ownership rule
- **`type_script`**: an optional program that governs what the cell's data means — the logic rule
- **`data`**: arbitrary bytes — whatever you want to store

A cell is either unspent or spent. You don't mutate it in place. When you "update" state, you consume one or more cells as transaction inputs and produce new cells as outputs. The consumed cells are destroyed. The new cells exist. This is Bitcoin's UTXO model, but extended with programmable scripts instead of Bitcoin Script's limited stack operations.

Here's what this means for onchain developers specifically: **there is no place where your logic and your state are fused together.**

In Substrate, your pallet is a Rust module that directly references its own storage. The pallet reaches into storage and mutates it. It owns that storage. The mutation is the point.

On CKB, a script doesn't mutate anything. It's a **validator**. It receives a complete picture of the proposed transaction — all inputs, all outputs, all cell data — and returns either success (valid, let this through) or an error code (reject). It has no ability to reach out and change something. The state change is proposed by the transaction constructor (your wallet, your dapp, your SDK), and the scripts on the consumed and created cells decide whether to allow it.

This is the fundamental shift: from **mutating programs** to **validating programs**.

A token transfer script on CKB, for example, doesn't move tokens. It asks one question: "in this proposed transaction, do the token amounts add up correctly?" If yes, the transaction is valid. If no, it's rejected. The token amounts themselves live in the `data` field of cells, as raw bytes. No program "owns" them. The type script can validate transitions involving them; it cannot reach out and change them.

### What Replaces the Pallet

When a Substrate developer asks "how do I build a token on CKB?" the instinct is to look for the equivalent of a pallet. There isn't one. What you build instead is a **Type Script**.

The [xUDT (extensible User Defined Token)](https://docs.nervos.org/docs/assets-token-standards/xudt) standard is CKB's closest equivalent to ERC-20. It's not a contract with a state. It's a RISC-V binary that enforces one rule: the total token amount in inputs must be greater than or equal to the total token amount in outputs. Every cell carrying xUDT tokens references that binary as its Type Script. When you transfer tokens, the CKB-VM executes the xUDT binary as part of validating your transaction.

The binary is deployed on-chain as a cell — just data in a cell, no different in structure from any other cell. Other transactions reference it via `cellDeps`, which is how the CKB-VM knows where to load the script from at validation time.

This is "bring your own cryptography and consensus primitives" taken to its logical conclusion. There are no hardcoded precompiles. There's no privileged pallet registry. Every system script — including the default secp256k1 lock that CKB addresses use — is just a cell on-chain that anyone can reference. You can write a competing implementation, deploy it, and it works today. No governance vote. No hard fork.

### What About Forkless Upgrades?

Substrate's forkless upgrade story is one of the things Polkadot developers are most proud of, rightly so. Because the runtime is a WASM binary stored on-chain, upgrading it is just a governance-approved extrinsic that replaces the WASM binary. No coordinated hard fork. No nodes going offline. The chain continues, with new logic.

CKB doesn't have this. There's no runtime to replace. There's no on-chain WASM binary governing all state transitions.

But the reason CKB doesn't need forkless upgrades is the same reason it doesn't need a runtime: **logic doesn't own state**. When you want to upgrade your token logic on CKB, you deploy a new Type Script binary and migrate existing cells to reference the new script. That migration is itself just a transaction — consume the old cells, produce new cells pointing at the new Type Script. You can make it incremental. You can run old and new logic in parallel during a migration window.

This is less ergonomic than Substrate's one-click runtime upgrade. It requires you to think carefully about migration. But it also means there's no single binary whose upgrade you have to push through governance before you can change behavior. Different cells can reference different versions of a script simultaneously. You don't have to convince an entire chain to upgrade; you just upgrade your own cells.

### A Note for Solidity Developers

If you're used to writing contracts for `pallet-revive` (or for any EVM chain), the shift is even sharper than for pallet writers. Your contract's owned storage, event emissions, and `msg.sender` don't map to CKB at all. What you'd write on CKB is a Type Script: a RISC-V validator that inspects the proposed transaction and returns success or an error. The equivalent of "your contract's balance" becomes "the sum of cells carrying your Type Script, in this specific transaction." No hidden state, no side effects, no reentrancy in the EVM sense — because there's nothing to re-enter.

---

## Part II: For Dapp Developers

*You build frontends, SDKs, indexers, or off-chain tooling. You think in terms of RPC calls, signed transactions, event subscriptions, and contract method calls.*

### There Are No Contract Methods

The Polkadot dapp developer's mental model is service-oriented. The modern standard is PAPI (Polkadot-API) — a light-client-first TypeScript library whose types are generated directly from on-chain metadata. You run a single command and your editor immediately knows every storage key, every extrinsic, every event on the chain.

The key thing PAPI gives you: the chain's entire surface area is statically typed from metadata. Your IDE knows what a storage query returns before you run a single line of code. The chain is a typed service you call.

On CKB, none of this exists. There is no `api.tx.token.transfer()`. There is no metadata. There is no schema. The dapp developer's job changes from **calling a typed service** to **constructing a state transition from raw bytes**.

A token transfer on CKB involves:

1. **Collect input cells**: scan the live cell set for cells owned by the sender whose Type Script matches the token type you want to send
2. **Calculate amounts**: sum the token amounts in those cells' `data` fields
3. **Construct output cells**: build new cells — one for the recipient (locked to their key), one for change back to the sender if the input amount exceeded the transfer amount
4. **Attach cellDeps**: include a reference to the xUDT script cell so the CKB-VM can load the validation logic
5. **Sign and submit**: sign the transaction with the sender's key (satisfying the Lock Scripts on the input cells) and broadcast

There's no "transfer" function. You're not calling into a contract. You're building the entire state transition yourself, proposing it to the network, and the network's validation layer (the scripts) either accepts or rejects it.

Modern SDKs like [CCC (CKBers' Codebase)](https://docs.ckbccc.com/) provide helpers that pick input cells and calculate fees for you. But you still declare the outputs by hand. The transaction, not a method call, remains the developer's unit of thought.

### Querying State

On Polkadot, querying state means reading from a well-defined storage layout that the runtime exposes and PAPI makes frictionless — it generates TypeScript types directly from metadata. The chain tells PAPI its schema; PAPI tells your IDE. When the runtime upgrades and storage changes, you re-run a single command and your descriptors update. The type system catches breakage at compile time.

On CKB, there is no metadata. There is no schema the chain publishes. The CKB node exposes an RPC to query the live cell set with filters — by Lock Script, by Type Script, by capacity range — but the meaning of the bytes in each cell's `data` field is entirely up to you to know and decode.

The result of any state query is a list of live cells. You sum the amounts in their `data` fields to get a balance. There is no typed query that returns a single number. Balance is a derived quantity computed from raw bytes — exactly like Bitcoin's UTXO model, and exactly unlike PAPI's compile-time-typed storage reads.

For production dapps, this is where indexers come in. CKB's Lumos SDK and services like CKB Explorer provide indexed views over the cell set, so you're not doing raw cell scanning in your frontend. But understanding the underlying model — balance as a sum of cells, not a database row — changes how you think about state design in your application.

### The Ownership Model Is Explicit, Not Implicit

On Polkadot, access control to state is mostly handled by the runtime's origin system. A dispatchable call checks the caller's identity and then has full permission to mutate whatever storage it references, as long as the runtime's logic allows it.

On CKB, ownership is enforced by the Lock Script on every cell, evaluated independently by every full node in the network. There's no runtime with privileged access. If your Lock Script says a transaction requires signature X, then no transaction consuming that cell will be valid without signature X — not because nodes are well-behaved, but because every node runs the script independently and rejects anything that fails.

This makes ownership composable in ways that Polkadot's model isn't. You can put a cell under a multisig Lock Script that requires keys from two different parties, with no central contract coordinating. You can put a cell under a time-lock that opens after a certain block number. Any code that compiles to RISC-V and returns success or an error is a valid Lock Script.

For dapp developers, this means the locking logic lives in the asset, not in a contract the dapp calls. When you're designing your application's access control, you're designing scripts that get embedded in cells, not functions you call on a contract.

---

## The Mental Model Break, Stated Plainly

If you come from Polkadot, the single hardest thing to internalize about CKB is this:

**On Polkadot, logic owns state. On CKB, logic validates state. Nothing owns state.**

In Substrate, your pallet is a module that has a storage namespace it controls. External code cannot legitimately modify that storage except through the pallet's defined API. The pallet *is* the authority over its state.

On CKB, a script is a pure function: transaction in, success or error out. It runs, it checks, it exits. The cells it validated still exist after it exits. They'll be consumed by a future transaction, which will invoke whatever scripts are relevant to that transaction, and those scripts will run, check, and exit too. No script accumulates state. No script owns a cell. Ownership is encoded in the lock on the cell itself, not in any program's module boundary.

This feels like a loss of structure when you first encounter it. On Substrate, the pallet is the natural organizing principle: one pallet for tokens, one for governance, one for staking. On CKB, there's no equivalent. Your application's logic is scattered across scripts deployed as cells, invoked at transaction time, then silent.

But what you get in exchange is significant:

**Parallelism is natural.** Two transactions that don't consume the same input cells can be validated completely independently, simultaneously. There's no shared mutable runtime state to serialize around. This is why CKB can eventually support parallel transaction execution at the base layer without needing the elaborate scheduler that EVM-based chains require.

**Composability is structural, not contractual.** On Polkadot, composing two pallets requires their types to align and their storage layouts to be compatible. On CKB, composing two scripts means building a transaction that satisfies both scripts simultaneously. The composition happens at the transaction level, not at the code level. You can compose scripts that were written independently, by different teams, without coordination.

**Cryptography is not privileged.** CKB's native address format uses secp256k1 — the same curve as Bitcoin and Ethereum. But secp256k1 is not hardcoded at the protocol level. It's implemented as a Lock Script in a system cell. [JoyID's](https://joy.id/) passkey-based wallet uses WebAuthn signatures instead, with a completely different Lock Script. Both are first-class citizens. There are no precompiles, no hard forks required, no permission needed.

---

## Why You Should Consider Making the Jump or Building on CKB

CKB isn't a replacement for Polkadot, and it doesn't try to be. What it offers is a different set of primitives for a specific class of problems — worth adding to your toolkit even if you keep shipping Polkadot code.

**Composition without cross-chain overhead.** If you've spent time with XCM — routing assets or calls between parachains — you know the design work involved. CKB's single-chain, cell-based model sidesteps that. An app that combines a token protocol, an identity protocol, and a governance protocol composes them by building one transaction that touches all the relevant cells. No message routing, no protocol overhead. The tradeoff is real: Polkadot's parachain model gives each domain its own sovereign execution environment, which CKB doesn't offer. But for apps that don't need domain sovereignty, the composition story is dramatically simpler.

**Ownership as a first-class primitive.** On Polkadot, access control is mostly runtime-mediated. On CKB, ownership is the Lock Script on the cell, evaluated independently by every node. Multisig, time-locks, passkey-based auth ([JoyID](https://joy.id/)), or entirely custom access rules ship without touching a runtime or waiting on a governance upgrade. Polkadot doesn't really have an equivalent design surface for this.

**A directly-inspectable execution model.** On CKB, a transaction body enumerates every cell it consumes and produces. No hidden side effects, no block-level runtime hooks mutating state you didn't ask for, no `on_initialize` firing under the hood. You still have to audit the scripts themselves (they're loaded from cellDeps, not inlined), but the state footprint of any transaction — which cells changed, and how — is fully visible in the transaction body. Substrate and PAPI are clean, but this explicit-state-footprint mental model pays off for audits, dapp security reviews, and protocol analysis.

The shift from Polkadot to CKB is not a lateral move. The tooling is different, the mental model is different, and the composability story is different. But the question CKB is answering — how do you build a programmable UTXO chain where every cell carries its own rules for who can spend it and how it can change — is worth understanding, wherever you end up shipping code.

---

## Further Reading & Getting Started

**Official documentation**

- [Nervos Docs](https://docs.nervos.org/) — the main entry point
- [Introduction to Nervos CKB](https://docs.nervos.org/docs/ckb-fundamentals/nervos-blockchain) — basic technical concepts and terminology explained
- [Getting started on CKB](https://docs.nervos.org/docs/getting-started/how-ckb-works) — how CKB works, with hands-on setup

**Community-contributed learning**

- [Learning CKB](https://website-sooty-chi-72.vercel.app/lessons) — 24 lessons across 5 phases
- [Learn CKB in 45 mins](https://github.com/truthixify/learn-ckb-in-45-minutes) — a fast tour repo
