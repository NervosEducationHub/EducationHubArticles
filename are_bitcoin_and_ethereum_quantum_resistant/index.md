---
title: 'Are Bitcoin and Ethereum Quantum Resistant?'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "Neither Bitcoin nor Ethereum is quantum resistant today. Both rely on ECDSA over secp256k1, which Shor's algorithm can eventually break. Learn how each chain is preparing for Q-Day, why migration will take years, and why cryptographic agility is the long-term solution."
date: '2026-07-15T16:00:00.000Z'
author: 
- github:nervosnetwork
---

## Key Takeaways

- **Neither Bitcoin nor Ethereum is quantum resistant today.** Both rely on ECDSA over secp256k1, the signature scheme a sufficiently powerful quantum computer could break using Shor's algorithm.
- **Millions of coins are already exposed.** More than 7 million BTC sit behind publicly exposed keys, while most active Ethereum accounts have also revealed their public keys. A quantum attacker can harvest the keys now, and decrypt them later when CRQCs come online.
- **Both ecosystems are preparing, but neither has finished the journey.** Bitcoin has early proposals but no agreed migration plan, while Ethereum has a more structured roadmap centered on native account abstraction.
- **Migration—not cryptography—is the real challenge.** Post-quantum signature schemes already exist. The difficult part is deploying them across decentralized networks before quantum computers arrive.
- **Cryptographic agility is the long-term solution.** Future cryptographic standards will continue to evolve. Blockchains that can adopt new signature schemes without protocol-wide migrations will remain adaptable long after the first post-quantum transition.

## The Short Answer: No, and Here's Why It Matters

Neither Bitcoin nor Ethereum is quantum resistant today. Both rely on ECDSA over secp256k1 to authorize transactions—the same public-key signature scheme that [Shor's algorithm](https://www.nervos.org/knowledge-base/shors_algorithm_explained) can break on a sufficiently powerful quantum computer.

That machine does not exist yet, but the trajectory is becoming increasingly concerning. In March 2026, Google Quantum AI reduced its estimated hardware requirement for breaking secp256k1 by nearly twentyfold, underscoring how quickly quantum research is advancing.

More importantly, attackers do not have to wait for [Q-Day](https://www.nervos.org/knowledge-base/what_is_q_day) to begin preparing. Under the Harvest Now, Decrypt Later (HNDL) strategy, they can already collect exposed public keys from public blockchains and store them until a cryptographically relevant quantum computer (CRQC) becomes capable of deriving the corresponding private keys.

That exposure is already significant. More than 7 million BTC sit in addresses with publicly exposed keys ([Project Eleven](https://bitcoin-risq-list.projecteleven.com/)), while on Ethereum, virtually every account that has ever sent a transaction has already revealed its public key. Both ecosystems have begun preparing for this future—but neither has completed the journey.

## Why Are Bitcoin and Ethereum Vulnerable to Quantum Computing?

### How Shor’s Algorithm Breaks ECDSA

Bitcoin, Ethereum, and most major blockchains rely on the same public-key signature scheme: the Elliptic Curve Digital Signature Algorithm (ECDSA) over the secp256k1 curve. Every time a user authorizes a transaction, they prove ownership of a private key by producing an ECDSA signature.

The security of ECDSA rests on the elliptic curve discrete logarithm problem, which is computationally infeasible for classical computers to solve. A sufficiently powerful quantum computer running Shor's algorithm changes that entirely, allowing a private key to be derived from its corresponding public key.

That does not mean every coin is equally vulnerable. The real question is whether the public key an attacker needs is already visible on-chain.

### Bitcoin: Which Addresses Are at Risk

Bitcoin's quantum exposure depends almost entirely on one question: **Has the public key already been revealed?** Different output types answer that question differently.

**Pay-to-Public-Key (P2PK)** outputs place the full public key directly in the locking script. It is exposed from the moment the output is created, making P2PK the most vulnerable address type. Many early Bitcoin outputs—including coins widely believed to belong to Satoshi Nakamoto—fall into this category.

**Pay-to-Public-Key-Hash (P2PKH)** and its descendants, including **P2WPKH**, hide the public key behind a cryptographic hash. As long as an address has never been spent from, the public key remains hidden. The first spend reveals it permanently, and any subsequent address reuse leaves those coins exposed to long-term quantum attacks.

**Taproot (P2TR)** improves privacy and script flexibility, but it does not solve the quantum problem. Every Taproot output contains an [x-only public key](https://bitcoinops.org/en/topics/x-only-public-keys/) in the witness program, making that key visible as soon as the output is created. While Taproot replaces ECDSA with Schnorr signatures, both schemes rely on the same underlying elliptic-curve assumptions and are equally vulnerable to Shor's algorithm.

There is also a theoretical short-exposure attack window. When a P2PKH or P2WPKH transaction enters the mempool, its public key becomes visible before the transaction is confirmed. A sufficiently powerful future quantum computer could, in principle, derive the corresponding private key during that confirmation window.

According to Project Eleven's Bitcoin [Risk List](https://bitcoin-risq-list.projecteleven.com/), more than 14.1 million Bitcoin addresses currently hold exposed public keys. Together, they control over 7.05 million BTC—more than $444 billion at current prices.

### Ethereum: Account-Based Exposure

Ethereum’s exposure looks different because its account model encourages long-term address use.

In Bitcoin, avoiding address reuse is standard privacy and security practice. Most modern wallets automatically generate a new receiving address for each payment. Ethereum works differently: a wallet address typically functions as a persistent account that users keep for years, using it repeatedly to hold assets, interact with applications, and sign transactions.

An Ethereum address initially hides its public key behind a [Keccak-256](https://www.nervos.org/knowledge-base/what_is_keccak256_(explainCKBot)) hash. Once an externally owned account (EOA) sends its first transaction, however, its ECDSA signature allows the public key to be permanently recovered from the blockchain.

Receive-only Ethereum accounts therefore retain some protection, but almost any actively used wallet eventually exposes its public key. Because Ethereum users are expected to keep using the same account rather than rotate addresses after every transaction, this exposure is not an edge case caused by poor wallet hygiene. It is a normal consequence of how Ethereum accounts are designed and used.

As a result, the vast majority of active Ethereum accounts with meaningful balances have public keys that can already be harvested today and targeted after Q-Day.

## How Is Bitcoin Preparing for Quantum Computing?

### BIP-360 and BIP-361: Bitcoin's First Steps Toward Quantum Resistance

Bitcoin's quantum migration has already begun—but only on paper.

The first major proposal is [BIP-360](https://bip360.org/), which introduces Pay-to-Merkle-Root (P2MR), a new output type (prefix: bc1z) designed to eliminate Bitcoin's long-term public-key exposure problem.

P2MR builds on Taproot but removes its most important quantum weakness. While Taproot supports both a key path and a script path, P2MR removes the key path entirely. Instead of committing to an elliptic-curve public key, it commits only to the Merkle root of a script tree. Funds are later spent by revealing a single script and a Merkle proof, without ever placing an elliptic-curve public key directly on-chain.

Importantly, BIP-360 is not a post-quantum signature scheme. It simply creates a new output type that avoids long-term public-key exposure and lays the foundation for introducing post-quantum signatures in the future.

BIP-360 also has a clearly defined limitation. It protects against long-exposure attacks, where a public key remains visible on-chain for months or years. It does not defend against short-exposure attacks, where a public key appears briefly while a transaction waits in the mempool.

Closing that gap requires another step: introducing an actual post-quantum signature scheme into Bitcoin's scripting system through a future soft fork.

As of mid-2026, BIP-360 remains a draft proposal and has no activation timeline. Like every consensus change in Bitcoin, it would require broad ecosystem agreement before it could become part of the protocol.

BIP-360 addresses future outputs. BIP-361 addresses everything that came before.

Published in April 2026, [BIP-361](https://bips.dev/361/) proposes a structured migration away from legacy ECDSA- and Schnorr-protected outputs once post-quantum alternatives become available. Its objective is simple: minimize the economic incentive for quantum attackers by gradually retiring vulnerable signature schemes.

It proposes a deadline-driven plan to migrate Bitcoin away from legacy cryptographic signatures to quantum-resistant alternatives through three phases:

- Phase A (3 years post-activation): Disallows new sends to quantum-vulnerable addresses. Users can spend out of them, but no longer receive new coins with them.
- Phase B (5 years post-activation): Renders ECDSA/Schnorr spends invalid. Prevent all spends in quantum-vulnerable UTXOs. Any unmigrated coins are frozen and rejected by network nodes.
- Phase C (TBD): A separate BIP proposing a method to allow quantum safe recovery of legacy UTXOs, likely via zero knowledge proof of possession of a corresponding BIP-39 seed phrase.

BIP-361's forced signature sunset is deeply controversial. Critics including Adam Back [argue](https://www.coindesk.com/tech/2026/04/16/bitcoin-s-quantum-debate-splits-as-adam-back-pushes-optional-upgrades-over-forced-freeze) for voluntary, gradual upgrades over forced freezes which make unmigrated coins permanently unspendable.

However, the debates over the approach matter less than the timeline. Even if BIP-360 is activated tomorrow, full quantum resistance would still be years away. BIP-360 co-author Ethan Heilman laid out the [timeline](https://www.binance.com/en/square/post/293014450256401) explicitly: BIP completion, code review, and testing: approximately 2.5 years; network activation: another 0.5 years; after that, wallets, custodians, Lightning Network nodes, exchanges, and enterprise treasury software must upgrade individually. "If we're lucky," Heilman said, "90% will have updated five years after activation. The bigger the perceived danger, the faster this will happen." That is roughly seven years under an optimistic scenario where everyone agrees on the roadmap.

### Bitcoin Still Has Two Big Unanswered Questions

BIP-360 and BIP-361 move the discussion forward, but they do not answer Bitcoin's two hardest questions.

**Which post-quantum signature scheme should replace ECDSA?**

And once that decision is made:

**How does a decentralized network migrate billions of dollars' worth of assets without disrupting the very system it is trying to protect?**

The first challenge is choosing a replacement for ECDSA.

NIST has already standardized several post-quantum signature schemes, but none is a perfect fit for Bitcoin.

Hash-based signatures, such as SLH-DSA (formerly SPHINCS+), are conservative and well understood, but their signatures are roughly 50–80 times larger than today's ECDSA signatures.

Lattice-based schemes, including ML-DSA and Falcon, produce much smaller signatures but rely on newer mathematical assumptions that have received less long-term scrutiny.

Stateful hash-based schemes, such as XMSS and LMS, offer strong security but require careful key-state management, making them an awkward fit for self-custodied wallets.

These are only a few of the leading candidates, and each involves difficult trade-offs between security, performance, bandwidth, and long-term confidence.

Choosing an algorithm is only the beginning. Once Bitcoin settles on a cryptographic standard, the network must still persuade millions of users, exchanges, custodians, wallets, payment processors, and infrastructure providers to adopt it.

Several migration strategies have been proposed, each balancing security, decentralization, and disruption differently. Some prioritize voluntary migration, others attempt to limit the economic impact of quantum theft, while the most aggressive approaches would eventually retire legacy signature schemes altogether.

Once an algorithm is chosen, a migration framework must follow. Three approaches have been debated:



<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">Framework</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">Mechanism</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">Fork required</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">Key trade‑off</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Commit-Delay-Reveal (CDR)</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Staged, opt-in migration to a post-quantum key</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Two soft forks</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Non-disruptive, but leaves already-exposed coins vulnerable</td>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Hourglass</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Rate-limits vulnerable coin spends per block</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Two soft forks</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Softens market shock, but does not stop theft of exposed coins</td>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">QRAMP</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Mandatory deadline; classically‑secured coins become unspendable after</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">One hard fork</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Forces full migration, but freezes unmigrated coins</td>
    </tr>
  </tbody>
</table>



None of these approaches is without compromise. Commit-Delay-Reveal minimizes disruption but leaves already-exposed coins vulnerable; hourglass slows large-scale theft but cannot prevent it; and QRAMP provides the strongest long-term protection, yet requires the community to accept freezing coins that are never migrated—a trade-off many Bitcoiners consider unacceptable.

The difficulty of replacing a cryptographic standard is easy to underestimate. The U.S. government recognized [DES](https://en.wikipedia.org/wiki/Data_Encryption_Standard) (Data Encryption Standard) as inadequate in the late 1970s. [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) did not become the official replacement until [2001](https://www.nist.gov/news-events/news/2001/12/commerce-secretary-announces-new-standard-global-information-security). The full [retirement](https://www.nist.gov/news-events/news/2005/06/nist-withdraws-outdated-data-encryption-standard) of DES took another decade after that—more than two decades of transition, with the full weight of federal mandates, centralized procurement, and top-down enforcement behind it.

A blockchain has none of those levers. Swapping a consensus-level signature scheme must happen without any central authority, in a system where every byte costs fees, every change requires broad coordination, and errors are irreversible.

That is why Bitcoin's greatest strength—its resistance to change—may also become its greatest challenge in the quantum era.

SegWit and Taproot each required years of discussion, development, and activation. Replacing Bitcoin's foundational cryptography is an even larger undertaking.

Today, Bitcoin has a direction but not a settled destination. BIP-360 and BIP-361 establish an early framework, but the community has yet to reach consensus on the signature scheme, migration strategy, or activation path that will ultimately secure the network against quantum attacks.

For a deeper technical walkthrough of the proposals and migration paths, see [**How Bitcoin's Path to Quantum Resistance Could Look**](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like).

## How Is Ethereum Preparing for Quantum Computing?

### Ethereum’s Quantum Exposure Extends Beyond User Accounts

Ethereum’s quantum risk is broader than exposed EOA keys alone. In February 2026, Vitalik Buterin [outlined](https://x.com/VitalikButerin/status/2027075026378543132) four major parts of the protocol that rely on quantum-vulnerable cryptography:

- **EOA signatures:** Ethereum accounts use ECDSA over secp256k1. Once an account sends a transaction, its public key becomes recoverable from the signature and remains exposed on-chain.
- **Consensus signatures:** Validators use BLS signatures to attest to blocks. A sufficiently powerful quantum computer could forge these signatures and undermine consensus.
- **Data-availability commitments:** Ethereum uses KZG commitments, which rely on elliptic-curve pairings that are also vulnerable to Shor’s algorithm.
- **Application-layer zero-knowledge proofs:** Many rollups and proving systems rely on KZG or Groth16, both of which depend on quantum-vulnerable elliptic-curve assumptions.

Ethereum therefore faces four separate migration problems: user authentication, validator signatures, data availability, and zero-knowledge proofs. The Ethereum Foundation formed a dedicated [Post-Quantum Security](https://ethereum.org/roadmap/future-proofing/) team in January 2026 to coordinate work across these layers.

### How Native Account Abstraction Enables Crypto Agility

Ethereum’s strategy for protecting user accounts centers on native account abstraction: moving transaction authorization away from one hardcoded signature path and allowing accounts to define their own validation logic.

Today, native Ethereum accounts are tied to ECDSA. Every transaction uses an ECDSA signature to identify the sender, authorize the action, and pay gas. Native account abstraction separates these functions, making it possible for an account to authenticate transactions with a different cryptographic scheme.

The transition has two main stages.

**EIP-7702: Set Code for EOAs**

Introduced with the Pectra upgrade in May 2025, [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) allows an EOA to delegate execution to smart-contract code. This gives ordinary accounts some smart-account functionality and serves as an important step toward broader account abstraction.

However, EIP-7702 does not remove the underlying ECDSA key. The original key remains capable of authorizing transactions, so the account is still vulnerable to a future quantum attack.

**EIP-8141: Frame Transactions**

[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) goes further by introducing a new frame-based transaction type that brings native account abstraction into the protocol.

A conventional Ethereum transaction bundles several responsibilities together: an ECDSA signature identifies the sender, validates authorization, pays gas, and triggers execution. EIP-8141 breaks this process into ordered frames.

A validation frame runs the account’s own authentication logic first. Execution frames then carry out the requested actions. Because the account defines how validation works, it can use a post-quantum signature scheme such as ML-DSA or SLH-DSA instead of relying exclusively on ECDSA.

This creates an opt-in migration path. Users could adopt post-quantum signatures account by account rather than waiting for every Ethereum user to switch at the same time.

As of mid-2026, EIP-8141 has been considered for inclusion in the [Hegotá upgrade](https://ethereum.org/roadmap/future-proofing/) but has not been definitively approved for mainnet. Even after activation, wallets, applications, custodians, exchanges, and infrastructure providers would still need to support the new account model before migration could happen at scale.

### Beyond User Accounts: Consensus, Data, and Proofs

Account abstraction addresses user signatures, but Ethereum must also replace vulnerable cryptography elsewhere in the protocol.

**Consensus signatures**

Ethereum’s validators currently use BLS signatures. One proposed replacement is leanXMSS, a hash-based post-quantum signature scheme, combined with leanVM, a minimal zero-knowledge virtual machine designed to compress and aggregate the much larger signatures efficiently.

**Data availability**

KZG commitments depend on elliptic-curve pairings and are not quantum resistant. Ethereum will eventually need to replace them with hash-based or otherwise post-quantum alternatives.

**Zero-knowledge proofs**

Many existing proof systems rely on elliptic-curve cryptography. Ethereum’s longer-term roadmap increasingly favors STARKs, which derive their security primarily from hash functions and are widely considered post-quantum secure.

This transition aligns with the broader [Lean Ethereum](https://leanroadmap.org/) vision, which treats post-quantum security and protocol simplification as related goals. The idea is not merely to replace one vulnerable primitive with another, but to reduce Ethereum’s dependence on complex cryptographic assumptions across the stack.

### Remaining Gaps

Ethereum's roadmap is more structured than Bitcoin's, but the underlying constraint is the same: native EOA transactions are bound to ECDSA at the protocol level today. EIP-8141 must ship, achieve broad ecosystem adoption, and be followed by a long tail of further upgrades before that changes.

As the [EIP-8141 roadmap](https://eip8141.io/pq-roadmap) itself explains: "EIP-8141 is necessary but not sufficient. It builds the foundational first step... a long sequence of protocol upgrades, precompiles, and eventually full ECDSA deprecation must follow. This roadmap is measured in years, not months."

Another nuance often overlooked: post-quantum cryptography does not retroactively protect accounts whose public keys are already on-chain. Even after Ethereum completes its migration, any account that has previously sent a transaction must actively move funds to a new quantum-safe address.

## Why Crypto Agility Is the Long-Term Solution

The quantum threat exposes a deeper structural problem: most blockchains are not built to change their cryptography.

Crypto agility refers to a system's ability to adopt, replace, or support new cryptographic algorithms quickly and without major disruption to the network or its users. Most blockchains lack this property. On Bitcoin, signature verification is hardcoded in cryptographic operations; on Ethereum, the native EOA model enforces ECDSA at the protocol layer.

When either chain needs to replace its cryptographic scheme, it must do so through slow, ecosystem-wide coordination, a process measured in years, or even decades.

And the problem does not end with one successful migration. Cryptographic standards keep evolving. A chain that hardcodes one quantum-safe algorithm today may face the same migration challenge again later, as research advances and new vulnerabilities emerge. The difference between quantum resistance and crypto agility is the difference between solving one problem and building a system capable of solving the next problem too.

Nervos CKB illustrates what a crypto-agile architecture looks like in practice. On CKB, cryptographic verification lives in programmable Lock Scripts rather than protocol opcodes. The base execution environment, CKB-VM — a general-purpose RISC-V virtual machine, does not prescribe a signature scheme. New cryptographic primitives can be deployed as on-chain code. Users can migrate to them without waiting for a network-wide fork.

CKB already has a [SPHINCS+](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance#implementation-details-sphincs-on-ckb) (SLH-DSA) Lock Script live on mainnet. Quantum Purse, a community-built quantum-safe wallet, lets users opt in to post-quantum signatures today. [Quantum Tracker](https://quantumtracker.org/#report/blockchains/nervos-network) rates CKB as a Tier A (Ahead of the Curve) protocol. What this looks like in architectural detail is covered in: [*Blockchain Crypto Agility: CKB's Key to Quantum Safety*](https://www.nervos.org/knowledge-base/blockchain_crypto_agility).

## **Conclusion**

Neither Bitcoin nor Ethereum is quantum resistant today, but both are moving. BIP-360 was merged in early 2026. Ethereum has a structured post-quantum roadmap, a dedicated security team, and active protocol work targeting hard fork milestones through 2029. But neither of these is live on mainnet, community consensus on algorithm choice and migration frameworks is still unsettled, and full migration for either chain is realistically years away.

The deeper question is not just whether Bitcoin and Ethereum can become quantum resistant, but whether they can adapt when the next cryptographic standard is challenged. The long-term answer is agility, building systems capable of swapping algorithms as the threat landscape changes. 
