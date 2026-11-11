---
title: 'Will Quantum Computing Destroy Crypto?'
coverImage: 'images/image1.png'
category: Security
subtitle: 'Will quantum computing break crypto? In a talk, a CKB developer explains the risks to signatures, hashing, and encryption, why upgrading cryptography is hard for blockchains, and how CKB can adapt.'
date: '2026-11-11T16:00:00.000Z'
author: 
- github:Alive24
---

_This article is adapted from a keynote that Chunteng Xiao (Alive24), a full-stack blockchain developer in the CKB community, gave at CryptoMondays London in February 2026. It keeps the talk's first-person voice. Minor edits have been made for readability and technical clarity._

---

In this talk, I’ll cover four things: what quantum computing is and why it matters; how to think clearly about the risk it poses; what the blockchain industry is doing about it and what it has achieved so far; and how CKB's design makes it flexible enough to adopt quantum-resistant cryptography.

I pitch it at the level of a blockchain enthusiast. By the end, you should know enough to explain it to friends and family and sound like you've done your homework.

To give you a sense of how seriously this is being taken: the big names are already moving. The Ethereum Foundation [formed a dedicated quantum-security team in January 2026](https://ethereum.org/roadmap/security/quantum-resistance/). That same month, Coinbase [launched an expert advisory board](https://www.coinbase.com/blog/coinbase-establishes-independent-advisory-board-on-quantum-computing-and-blockchain) to assess what quantum computing means for crypto.

## What Makes Quantum Computing Different?

### From Bits to Qubits

To see what's special about quantum computing, it helps to start with the computers we already have. Over the decades, they've evolved toward ever more efficient ways to store and process information, saving time, space, and cost.

We started with punch cards, then moved to vacuum tubes, transistors, and finally the integrated circuits inside today's CPUs. All of them work in binary: everything is a zero or a one.

Quantum computers are different because they use qubits. A qubit can be a zero or a one, like an ordinary bit, but until it's measured it can also be in a **superposition** of both. That's the mind-bending part.

### Schrödinger's Cat and the Socks Analogy

Two stories help. The first is [Schrödinger's cat](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat), which you may be familiar with. The physicist Erwin Schrödinger imagined a cat sealed in a box with a poison that's released only if a single radioactive atom decays, which may or may not happen. Until someone opens the box and looks, quantum physics describes the cat as both alive and dead.

That's **superposition**. In quantum physics, a system can be in a combination of possible states, rather than simply in one state we don't yet know. It's hard to grasp, and that's exactly what the cat story is meant to show.

The second story, "quantum socks," is less well known. Suppose you buy a pair of socks, pack only one of them, and fly to the other side of the world without knowing which one you took. The moment you open your suitcase and see the left sock, you know the one at home is the right.

You know instantly, however far apart the socks are. That's a rough picture of two quantum particles that are [**entangled**](https://en.wikipedia.org/wiki/Quantum_entanglement). Real entanglement is more subtle than this story, but properties like these are what make quantum computing so powerful.

<aside>

Ordinary computers use bits: zero or one. Quantum computers use qubits, which can be both zero and one at once and can also be linked. That doesn't make them faster at everything, but for certain problems, including the math behind crypto, they could be decisive.

</aside>

## Why Cryptography Matters to Your Wallet

These are fun stories, but why does a quantum computer matter for crypto?

Because a sufficiently powerful one could be a silver bullet against elliptic-curve cryptography (ECC), one of the most widely used forms of asymmetric cryptography today. Much of what you use every day may rely on it, and it underpins trust in blockchains and many other digital systems.

**Asymmetric cryptography**, also called public-key cryptography, protects trust with mathematical problems that are easy to compute in one direction and very hard to reverse. ECC isn't the only kind; RSA is another, and it may well be running on your home router.

Here's how it works in a blockchain wallet. When you create a wallet, you get a randomly generated [mnemonic phrase](https://www.nervos.org/knowledge-base/what_is_a_seed_phrase), which you must keep strictly secret.

Your wallet then shows you an address straight away. You don't have to register it anywhere, because it's derived from your keys: the address comes from a public key, which in turn comes from your private key. The address and the public key are both public. Your private key stays secret.

You share your address every time you use the wallet. So how do you prove, or how does a program check, that you are you? That's where asymmetric cryptography comes in.

With the private key, it's easy to derive the public key or sign a piece of content. With the public key, the signature, and the content, anyone can easily verify that signature. But going the other way, and forging a valid signature without the private key, is extremely hard.

<aside>

Asymmetric cryptography is the backbone of digital systems that need to be secure, and blockchains above all. Bitcoin uses [ECDSA](https://www.nervos.org/knowledge-base/understanding_ECDSA) signatures, and Ethereum, Solana, Polkadot, and Cardano rely on elliptic-curve cryptography too.

</aside>

Hashing is another tool cryptography relies on. A [hash function](https://www.nervos.org/knowledge-base/what_is_a_hash_function) turns any piece of data, however large, into a short string of fixed length called a hash, a kind of digital fingerprint. Change a single character of the data and the hash changes completely, so hashes are a quick way to check that data hasn't been altered. They're used well beyond crypto: websites store a hash of your password rather than the password itself, and software makers publish hashes so you can check a download hasn't been tampered with. Blockchains use them everywhere: every transaction is identified by its hash.

Producing a hash is easy. But finding different data with the same hash, or recovering the original data from the hash alone, is extremely hard. That's why we say hashing is one-way.

## What Is the Quantum Risk to Crypto?

So how should we think about the risk today? In short, the attack algorithms already exist. What's holding things up is building a quantum computer capable of running them. To me it feels imminent, especially with AI now able to help, but that's my judgment, not a confirmed schedule.

We're already seeing promising prototypes and proofs of concept. So how close is it? One optimistic estimate is that there's no chance by 2030 but a strong likelihood by 2040. These are guesses, not established dates, and some people expect it sooner.

### Shor's and Grover's Algorithms

When I say the attack algorithms are ready, I mean two in particular.

The first is [Shor's algorithm](https://www.nervos.org/knowledge-base/shors_algorithm_explained). On a sufficiently capable quantum computer, it can efficiently solve the mathematical problems behind widely used elliptic-curve signature schemes. In other words, it can work out a private key from a public key, which makes it the main quantum threat to private keys.

The second is [Grover's algorithm](https://en.wikipedia.org/wiki/Grover%27s_algorithm). It speeds up brute-force searches, which reduces security margins and poses a possible risk to hash functions.

### What If the Threat Became Real Tomorrow?

That all sounds very technical, so here's a more intuitive question: what would happen if the threat became real tomorrow?

First, private keys would no longer be private, so your assets would no longer be yours.

Second, authentic would no longer mean authentic. You could no longer prove that you are you.

Third, and this one is subtler, encrypted would no longer mean encrypted forever. If I harvest a copy of your encrypted data today, perhaps from a hacked server or an intercepted message, I can't read it now. But if the cryptography protecting it becomes vulnerable later, I may be able to decrypt that old copy. That's the worrying part.

As I mentioned, this wouldn't just threaten blockchains. It would threaten many other digital systems too, which is a little terrifying.

## Signatures, Hashing, and Encryption: Three Different Risks

Hashing, signatures, and encryption are the three most important tools we use in cryptography and software today, and quantum computing affects each one differently.

### Digital Signatures

To sign something, we take content of any size, called a message or payload, and generate a signature from it using a [signature algorithm](https://www.nervos.org/knowledge-base/What_is_a_digital_signature_%20in_Blockchain) and a private key.

Anyone can then check that signature against the message using the corresponding public key. If the check succeeds, it proves mathematically that the signature is valid for that public key and that message. The verifier never needs the private key itself, yet knows the signature was made with it.

A sufficiently powerful quantum computer, however, could work out the private key from an exposed public key in a vulnerable elliptic-curve scheme. An attacker could then forge signatures and pretend to be you. Note that this requires the public key; a transaction hash alone isn't enough.

### Hashing

Unlike signatures, hashing involves no private or public key. You calculate the hash of some content and compare it with a trusted one, which makes hashes easy to create, store, send, and verify. A hash on its own, though, doesn't prove that the content is authentic.

Quantum computers can speed up the search for an input that matches a hash. If they have clues about the data, they can also try to guess secret content from its hash. They don't need the whole message: knowing its structure or a basic pattern lets a quantum computer test likely combinations until it finds a match.

[Editor's note: The speed-up is modest. Hash functions like [SHA-256](https://www.nervos.org/knowledge-base/SHA256_most_used_hash_function) are still considered safe, and where more margin is needed, the fix is simply a longer hash.]

### Encryption and Captured Data

Finally, encryption. Much of what we do online is already encrypted, from messaging apps to web browsing and online banking. With symmetric encryption, the data is encrypted with a shared secret key, sent to the other end, and decrypted there with the same key. Many systems use public-key cryptography to agree on that shared key in the first place.

The symmetric encryption itself holds up well. The weak point is the shared key: if it was agreed using public-key cryptography, a quantum computer could break that exchange and recover the key.

Once encrypted data has leaked, there's no way to undo the damage, and leaks like that are common today. That's the worry: someone can harvest encrypted data now and store it. They can't read it yet, but they may be able to decrypt it in the future. And what people encrypt is usually their most sensitive information.

<aside>

Signatures are the most exposed: a powerful enough quantum computer could forge them. Hashes are only weakened, and longer hashes fix that. Encrypted data stolen today could be read later, once the key exchange that protected it is broken.

</aside>

## Post-Quantum Cryptography and the Migration Challenge

Fortunately, it probably won't happen tomorrow.

The more reassuring news is that we already have [post-quantum cryptography](https://www.nervos.org/knowledge-base/quantum_resistance): new schemes built on mathematical problems believed to be hard even for future quantum computers. They already run on ordinary computers, and there's more than one to choose from.

Traditional software companies can replace vulnerable cryptographic components and become quantum-safe. For blockchains it's trickier, because they're decentralized. There's no CEO to sign off an upgrade: thousands of independent node operators, miners or validators, and users all have to choose to adopt it.

### Why Migration Is Harder for Blockchains

Some newer blockchains were designed with quantum resistance from the start, such as the Quantum Resistant Ledger (QRL), which has similarities to Bitcoin, and Cellframe.

The bigger problem is for existing Layer 1 blockchains. Many are implementing post-quantum cryptography or [researching roadmaps](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like), but the transition could take years and cost a great deal.

They face three main challenges. First, quick patches often won't work. Most chains have their signature algorithms built into the protocol itself, so changing them may require a [protocol upgrade](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork).

Second, some post-quantum schemes have much larger signatures than ECC and need more computation, so they cost more to store and to run.

Third, the whole network has to agree, and choosing which algorithm to use, how to implement it, and what to prioritize can all be contentious.

<aside>

For a sense of how slow this can be: Taproot, Bitcoin's last major upgrade, took nearly four years from first proposal in January 2018 to going live in November 2021, and it had broad support. After a switch to post-quantum signatures, every holder would still have to move their coins to be protected, which is a major undertaking in its own right.

</aside>

## CKB's Approach to Post-Quantum Cryptography

### RISC-V and the Cell Model

This is where CKB comes in.

You can think of [CKB](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain) as **Bitcoin with more general smart contracts**. Launched in 2019, it's a [Layer 1](https://www.nervos.org/knowledge-base/layer_1_vs_layer_2) blockchain that scales through layers built on top of it. It shares Bitcoin's core principles: both use [Proof-of-Work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling), and CKB's Cell model builds on Bitcoin's [UTXO](https://www.nervos.org/knowledge-base/utxo_model_explained) idea. It's also open source and permissionless.

What makes CKB special? If I could give only one answer, it would be RISC-V.

[RISC-V](https://www.nervos.org/knowledge-base/what_is_riscv) is a real computer architecture, the kind used to design actual chips, and CKB's virtual machine is based on it. That means you can compile most ordinary code to run on the blockchain, including different kinds of cryptography, post-quantum schemes among them. That's been possible from the start.

The Cell model, meanwhile, lets you choose which lock script protects your assets, or Cells. Thanks to this UTXO-style design, adding a new kind of lock requires no protocol changes.

How good is this design? We have high praise from Vitalik Buterin himself. When he [proposed RISC-V as a possible future execution model for Ethereum](https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617), one precedent he cited was the Nervos CKB VM, "which is basically RISC-V."

> _"This post proposes a radical idea for the future of the Ethereum execution layer. … The idea: replace the EVM with RISC-V as the virtual machine language that smart contracts are written in."_  
> — Vitalik Buterin, co-founder of Ethereum, Ethereum Magicians forum, April 2025

### Post-Quantum Lock Scripts

Back to quantum resistance. A [SPHINCS+-based lock script](https://github.com/nervosnetwork/quantum-resistant-lock-script) is already live on CKB mainnet. SPHINCS+ is the basis for SLH-DSA, which NIST standardized in [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final).

Because it's just a lock script, the protocol doesn't have to build in one fixed signature scheme. You can use the SPHINCS+ lock for new Cells, or move existing assets to it when their spending conditions allow.

CKB can adopt future post-quantum cryptography the same way: build it, deploy it, and people can use it.

### Quantum Purse

To make this easier to use, the community has released [Quantum Purse](https://github.com/quantumpurse/quantum-purse), a wallet built on CKB and available for mainnet use. As far as I know, it's the first desktop wallet based on SPHINCS+.

It runs its own [light client](https://www.nervos.org/knowledge-base/what_is_a_light_client), so you don't need to rely on a third-party RPC endpoint, and there's a browser demo you can try. It has had an [external security audit](https://scalebit.xyz/reports/Quantum-Purse-Audit-Report-12-15-2025.pdf), although an audit covers only the code and scope it reviewed. We're also working toward a quantum-resistant hardware wallet built on it, for key management. Quantum Purse is open source.

<aside>

On CKB, a signature scheme is just a lock script, so new cryptography can be added without changing the protocol. A SPHINCS+ lock is already live on mainnet, and Quantum Purse lets you use it.

</aside>

## Closing Thoughts

I'll end with some personal thoughts.

People in the CKB community have always been proud of the architecture and vision it started with, and how the technology has evolved since. That pride is where our community-driven culture comes from.

If you're building infrastructure or services where users truly own their assets and data, and you want full control over how it all works, I don't think you'll regret choosing CKB. That's especially true for newcomers from the traditional software industry, whether you're an organization, a company, or an independent developer. That's my honest view.

---

_Originally delivered as a keynote by [Chunteng Xiao (Alive24)](https://github.com/Alive24) at [CryptoMondays London](https://luma.com/vrzpg3f4) in February 2026. [Watch the recording on LinkedIn](https://www.linkedin.com/events/7426943769930862595/)._