---
title: 'Harvest Now, Decrypt Later: How Quantum Computers Threaten Exposed Crypto Public Keys'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "What is Harvest Now, Decrypt Later? Learn how this quantum attack strategy targets exposed crypto public keys, which assets are vulnerable after Q-Day, and how to protect your holdings."
date: '2026-07-15T16:00:00.000Z'
author: 
- github:nervosnetwork
---

## Key takeaways

- **Harvest now, decrypt later is already underway.** Attackers do not need a quantum computer today; they can collect exposed blockchain public keys now and wait until future quantum hardware can break them.
- **The risk is concentrated in addresses with exposed public keys.** Roughly a quarter of Bitcoin’s supply and a majority of Ethereum’s may be vulnerable because the relevant public keys are already visible on-chain.
- **A post-quantum upgrade does not automatically protect old addresses.** It creates a safer destination, but users must still move funds away from quantum-vulnerable keys before Q-Day.
- **Blockchain architecture determines how quickly users can respond.** Networks that require protocol-wide upgrades make migration dependent on ecosystem coordination, while more flexible architectures let users adopt post-quantum security at their own pace.
- **The real challenge is migration, not the lack of cryptography.** Post-quantum signature schemes already exist; the critical question is whether blockchains can deploy them on time and without major network disruptions.

Anyone can download the entire Bitcoin blockchain today, and that is not a crime. But the harvest now, decrypt later (HNDL) strategy turns this ordinary download into a patient attack: attackers collect the data now and wait until quantum computers become capable of breaking the cryptography. What follows is which coins are actually at risk, why, and how a blockchain's architecture ultimately determines how exposed its users are.

## What Does Harvest Now, Decrypt Later Mean for Crypto?

Harvest now, decrypt later (HNDL) is a quantum attack strategy in which an adversary collects cryptographically protected data today, stores it for years, and decrypts it once quantum computers become capable of breaking the underlying cryptography.

The attack unfolds in two phases separated by years. The **harvest** phase happens today and requires no special capability. The **decrypt** phase begins after [Q-Day](https://www.nervos.org/knowledge-base/what_is_q_day), when a cryptographically relevant quantum computer (CRQC) becomes powerful enough to break today's widely used public-key cryptography.

No quantum computer can break this cryptography yet, which is precisely why attackers harvest the data now and wait. The threat is already active. The danger is not that your data will be stolen in some distant quantum future, but that a copy may already be sitting on an attacker's disk.

## Why Public Blockchains Are Particularly Vulnerable to HNDL?

Public blockchains are particularly vulnerable to HNDL because every transaction is permanently public. The ledger is replicated across thousands of nodes and can be downloaded by anyone. For HNDL attacks, the harvest phase is essentially free. And immutability, one of blockchain's defining strengths, cuts both ways: every transaction and exposed public key become part of a permanent public record. As the Federal Reserve [notes](https://www.federalreserve.gov/econres/feds/files/2025093pap.pdf) in their analysis paper, once data is committed to a ledger under traditional cryptography, it cannot be retroactively re-encrypted without rewriting history.

## Can a Post-Quantum Upgrade Protect Already-Exposed Public Keys?

Not automatically. A blockchain can add post-quantum cryptography to protect new addresses and future transactions, but that upgrade does not retroactively secure funds that remain locked to an old, quantum-vulnerable public key.

Once a public key has been exposed on-chain, an attacker can copy and store it indefinitely. If the owner later moves the funds to a post-quantum address before Q-Day, the harvested key becomes useless because it no longer controls anything. But if the funds remain at the old address when a cryptographically relevant quantum computer arrives, the attacker may be able to derive the private key and spend them.

This is the crucial distinction: post-quantum cryptography can provide a safe destination, but users still have to migrate their assets to it in time. A protocol upgrade alone does not protect every old address. It must be followed by a migration of funds away from vulnerable keys.

That is why blockchain architecture matters. The faster a network can introduce post-quantum verification—and the more easily individual users can opt in—the more time holders have to move exposed assets before those keys become breakable.

## How Much Bitcoin is at Risk From Quantum Computing?

Can quantum computers steal old Bitcoin? Yes. Once a cryptographically relevant quantum computer exists, it will be able to derive a private key from an exposed public key and spend the associated coins.

The quantum risk ultimately comes down to a single question: **Has your public key already been revealed on-chain?** If it is still protected behind a hash, an attacker has nothing to target. But once that public key is exposed, it becomes part of the permanent public record. An attacker can harvest it today, store it indefinitely, and derive the corresponding private key when quantum hardware becomes capable enough. That is how a future quantum computer could steal Bitcoin.

Roughly **4.5 to 7 million BTC** sit in addresses with exposed public keys and are therefore vulnerable once a CRQC exists. Independent estimates converge on this range. [Citi](https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf)'s January 2026 report estimated that roughly 25% of Bitcoin's supply (4.5–6.7 million BTC) falls into the exposed category. [Glassnode](https://research.glassnode.com/measuring-bitcoins-quantum-exposed-supply/) estimated approximately 6 million BTC, while [Chaincode Labs](https://chaincode.com/bitcoin-post-quantum.pdf) estimated around 6.26 million BTC exposed through public-key reuse.

The risk is not evenly distributed, however. Which specific coins are vulnerable depends almost entirely on the address type.

## Which Bitcoin Addresses Are Vulnerable?

The HNDL risk primarily affects three address types.

### Pay-to-Public-Key (P2PK)

Bitcoin's original address format writes the full public key directly into the locking script. The key is visible from the moment the coins are received and remains permanently exposed, making P2PK outputs the most vulnerable category. Many of these coins date back to Bitcoin's earliest years, including wallets believed to belong to Satoshi Nakamoto. Roughly **1.7 million BTC** in P2PK outputs are widely believed to be permanently lost.

### Pay-to-Public-Key-Hash (P2PKH) and other hash-based formats (P2SH, P2WPKH, and P2WSH)

These address formats hide the public key behind a cryptographic hash. As long as an address has never been spent from, its public key remains hidden. The key is revealed only when funds are spent. If the address is reused afterward, that public key remains permanently exposed, allowing it to be harvested for a future quantum attack.

### Taproot (P2TR)

Taproot improves Bitcoin's privacy and efficiency, but it places a tweaked public key directly in the output itself. That means the public key is visible as soon as the coins are received, before any spending occurs. As a result, Taproot outputs belong to the long-range HNDL risk category. Although Taproot uses [Schnorr](https://www.nervos.org/knowledge-base/shors_algorithm_explained) signatures rather than ECDSA, both rely on elliptic-curve cryptography and are therefore vulnerable to Shor's algorithm.

Much of Bitcoin's quantum exposure is avoidable. Coins held in never-spent, hash-protected P2PKH-style addresses still keep their public keys hidden. Users who move exposed coins to a quantum-safe address before Q-Day eliminate the theft risk entirely.

## What Does HNDL Mean for Ethereum?

Ethereum—and many other blockchains—uses the same underlying cryptography as Bitcoin: ECDSA over the secp256k1 elliptic curve. Its security depends on the elliptic-curve discrete logarithm problem, which is infeasible for classical computers to solve at scale. A sufficiently powerful quantum computer running Shor's algorithm changes that completely, allowing private keys to be derived from public keys in polynomial time.

Unlike Bitcoin, Ethereum does not hide public keys behind hashes until coins are spent. It uses an account-based model. As the Ethereum Foundation [notes](https://ethereum.org/roadmap/future-proofing/), once an account sends its very first transaction, its public key is permanently exposed on-chain. In practice, that means the overwhelming majority of active Ethereum wallets have already revealed their public keys. Citi [estimates](https://www.citigroup.com/rcs/citigpa/storage/public/Citi_Institute_Quantum_Threat.pdf) that more than **65% of Ethereum's supply** could ultimately be vulnerable to quantum attacks.

Despite this broader exposure, Ethereum offers a comparatively smoother migration [path](https://ethereum.org/roadmap/future-proofing/quantum-resistance/). Rather than tying transaction authorization to a single protocol-defined signature scheme forever, Ethereum is moving toward native account abstraction. Proposals such as [**EIP-8141**](https://eips.ethereum.org/EIPS/eip-8141) would allow accounts to define their own signature verification logic, creating a native, opt-in path from ECDSA to post-quantum signatures.

This approach cannot retroactively protect public keys that are already exposed, but it does make future migration significantly easier by allowing individual users to upgrade without waiting for every account on the network to move simultaneously.

## What Makes a Blockchain Less Vulnerable to Harvest Now, Decrypt Later?

Eventually, every blockchain will need to adopt new cryptographic standards. That much is no longer in doubt. In August 2024, NIST [finalized](https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved) the first generation of post-quantum digital signature standards, including ML-DSA and SLH-DSA, giving the industry a clear cryptographic destination.

The challenge is no longer choosing an algorithm. It is migrating an entire decentralized network to it.

Without a central authority to coordinate upgrades, migration becomes the real bottleneck. On legacy blockchains, changing the signature scheme requires years of ecosystem-wide coordination.

On Bitcoin, transaction authorization is tied to signature rules enforced at the consensus layer, so adding post-quantum signatures would require a network-wide protocol upgrade. [BIP-360](https://bip360.org/), the leading proposal in this area, remains a draft and would still need broad ecosystem agreement to activate. It also does not introduce a post-quantum signature scheme itself; instead, it proposes a new output type that removes Taproot’s quantum-vulnerable key-path spend and creates a safer foundation for a future post-quantum migration.

Ethereum provides a more flexible path through proposals such as EIP-8141, but enabling native account abstraction still requires protocol-level upgrades across the network before users can opt in.

In both ecosystems, major protocol upgrades are historically slow and often contentious. Bitcoin still has no agreed post-quantum migration timeline. BIP-360 is only an initial step, while major questions—including which post-quantum signatures to adopt, how existing holders would migrate, and what happens to unmoved vulnerable coins—remain unresolved.

That uncertainty matters because exposed public keys remain vulnerable until funds are moved behind post-quantum signatures. On architectures that require network-wide consensus, users cannot act as soon as they are ready; their migration window depends on when the broader ecosystem completes the necessary upgrades.

A blockchain is therefore structurally less exposed to HNDL when users can move to quantum-safe addresses at their own pace, without waiting for a coordinated protocol change. Self-paced migration shortens the gap between recognizing the threat and actually securing funds.

Some blockchains are designed around this principle. Nervos CKB, for example, keeps cryptographic verification in programmable [Lock Scripts](https://docs.nervos.org/docs/tech-explanation/lock-script) running in [CKB-VM](https://docs.nervos.org/docs/ckb-fundamentals/ckb-vm) rather than embedding signature verification in the consensus rules themselves. New signature schemes can therefore be deployed without requiring a hard fork or protocol upgrade, allowing users to migrate whenever they choose.

This is not merely theoretical. A production-ready [SPHINCS+](https://sphincs.org/) (SLH-DSA) Lock Script is already live on CKB mainnet and powers [Quantum Purse](https://quantumpurse.org/), giving users a post-quantum destination they can migrate to today.

For a practical migration guide, see *[**How to Protect Your Crypto from Quantum Computing**](https://www.nervos.org/knowledge-base/how_to_protect_your_crypto_from_quantum_computing)*.

## Conclusion

Harvest now, decrypt later is not a future threat. It is already underway. No quantum computer can break blockchain cryptography today, but attackers do not need one to begin preparing. Every exposed public key can already be harvested and stored for the day quantum hardware catches up.

The assets most at risk are those whose public keys are already visible on-chain: roughly a quarter of Bitcoin's supply and a majority of Ethereum's. The theft itself may still be years away, but the preparation phase has already begun.

Fortunately, this is one part of the quantum threat that users can prevent. Moving funds from exposed keys to quantum-safe addresses before Q-Day eliminates the attack entirely. The challenge is making that migration possible before quantum computers arrive.

That is why blockchain architecture matters as much as cryptography itself. Post-quantum algorithms already exist. The real challenge is deploying them quickly enough—and giving users a practical way to adopt them. Networks that let users migrate at their own pace, rather than waiting for years of protocol coordination, dramatically shrink the window in which harvest now, decrypt later quantum attacks can succeed. 
