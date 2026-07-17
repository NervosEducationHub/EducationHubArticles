---
title: 'BIP-360 Explained: Pay-to-Merkle-Root (P2MR)'
coverImage: 'images/image1.png'
category: Bitcoin 
subtitle: 'Pay-to-Merkle-Root represents an intriguing proposal within the broader effort to future-proof Bitcoin’s security model.'
date: '2026-06-05T16:00:00.000Z'
author: 
- github:explainCKBot
---

Advances in quantum computing pose a credible long-term risk to the cryptographic assumptions underpinning systems like Bitcoin. In particular, signature schemes based on elliptic curve cryptography could become vulnerable once sufficiently powerful quantum hardware emerges. This is the context in which BIP-360—introducing Pay-to-Merkle-Root (P2MR) outputs—becomes relevant.

At a high level, BIP-360 proposes a new output type designed to minimize public key exposure. Instead of committing directly to a public key, as in most existing Bitcoin outputs, a P2MR output commits to the root of a Merkle tree that encapsulates all possible spending conditions. The actual public keys remain concealed within this structure and are only revealed at the moment of spending.

This shift has important security implications. By delaying key exposure until it is strictly necessary, P2MR significantly reduces the attack window available to adversaries. It is specifically aimed at mitigating long-exposure quantum attacks—scenarios in which an attacker could use a quantum computer to derive a private key from a publicly visible key given enough time.



## Bitcoin Address Evolution: From P2PK to P2MR

Bitcoin’s transaction system has evolved steadily since its launch in 2009. Each new [address format and script upgrade](https://www.nervos.org/knowledge-base/bitcoin_legacy_vs_segwit_vs_taproot_addresses) reflects a balance between usability, efficiency, privacy, and security.

In the earliest days of Bitcoin, transactions commonly used a format called [Pay-to-Public-Key (P2PK)](https://learnmeabitcoin.com/technical/script/p2pk/). In this model, a transaction output directly contained the recipient’s public key, and spending the coins required providing a valid digital signature produced by the corresponding private key. While simple and functional, this design had an important weakness. The public key was visible on the blockchain from the moment the coins were received, giving attackers unlimited time to attempt cryptographic attacks.

To improve security and privacy, Bitcoin soon adopted [Pay-to-Public-Key-Hash (P2PKH)](https://bitcoinwiki.org/wiki/pay-to-pubkey-hash). Instead of storing the public key itself, transactions store a hash of the public key. The actual key only appeared when the coins were spent. This reduced the window of exposure and shortened addresses, improving usability.

Later upgrades expanded Bitcoin’s scripting flexibility. [Pay-to-Script-Hash (P2SH)](https://bitcoinwiki.org/wiki/pay-to-script-hash) allowed complex scripts to be hidden behind a single hash, making advanced features such as [multisignature wallets](https://www.nervos.org/knowledge-base/what_is_a_multisig_wallet) easier to use. The [Segregated Witness (SegWit)](https://en.wikipedia.org/wiki/SegWit) upgrade introduced a new transaction structure that improved scalability and reduced malleability issues. It also created a pathway for future script upgrades.

One of the most significant recent changes was [Taproot](https://en.bitcoin.it/wiki/Taproot), activated in 2021. Taproot introduced Schnorr signatures and a more powerful scripting system called Tapscript, enabling complex spending conditions to be hidden within a Merkle tree. In most cases, transactions could be spent using a simple key path, which preserved privacy and efficiency.

Despite its advantages, Taproot still ultimately commits to a public key. That key becomes visible once coins are spent and, under certain conditions, may remain exposed for extended periods. As researchers began examining the long-term implications of quantum computing, they recognized that even Taproot could eventually face vulnerabilities. BIP-360 builds upon Taproot’s script-tree architecture while removing the public-key commitment entirely.



## What Is Pay-to-Merkle-Root (P2MR)?

Pay-to-Merkle-Root, abbreviated as P2MR, is a proposed Bitcoin output type that commits directly to a Merkle root rather than to a public key. The Merkle root represents a tree of possible scripts that define how the coins may be spent. When a user spends the output, they reveal one of those scripts along with the Merkle proof needed to verify that it belongs to the committed tree.

At a conceptual level, P2MR can be understood as a simplification of Taproot. Taproot combines two spending mechanisms: a key path and a script path. The key path allows coins to be spent using a single aggregated public key, while the script path reveals one branch of a script tree when more complex conditions are required. P2MR removes the key path entirely. Every spend must go through the script tree.

This seemingly small change has significant implications. Because the output does not commit to a public key, no public key exists on-chain until a script branch is revealed during spending. The coins are therefore protected from long-term exposure to quantum attacks.

Another important characteristic of P2MR is its reliance on [Merkle trees](https://en.wikipedia.org/wiki/Merkle_tree), a cryptographic data structure widely used in blockchains. A Merkle tree allows many pieces of data to be represented by a single hash value, known as the root. When one piece of data needs to be verified, a small proof demonstrates its inclusion in the tree without revealing the entire structure.

In the context of P2MR, each leaf of the tree contains a potential spending script. The Merkle root commits to all of them at once. This design allows wallets to define multiple conditions, such as multisignature policies, time locks, or backup recovery paths, while revealing only the branch that is actually used.

By removing the public key commitment and relying solely on script trees, P2MR significantly reduces the time window during which cryptographic keys are exposed. Although this does not eliminate all quantum risks, it meaningfully strengthens Bitcoin’s security model for the long term.



## Long-Exposure vs Short-Exposure Quantum Attacks

The quantum threat to Bitcoin is often misunderstood. Discussions frequently assume that once quantum computers become powerful enough, Bitcoin’s cryptography will instantly collapse. In reality, the situation is more nuanced. Researchers typically distinguish between long-exposure and short-exposure attacks.

A long-exposure attack occurs when an attacker has access to a public key long before the coins are spent. If a sufficiently powerful quantum computer existed, the attacker could run algorithms such as [Shor’s algorithm](https://en.wikipedia.org/wiki/Shor's_algorithm) to derive the corresponding private key. Because the public key might remain visible on the blockchain for years, the attacker would have ample time to perform this computation.

Short-exposure attacks are different. In this scenario, the public key becomes visible only when a transaction is broadcast to the network. The attacker must then break the key before the transaction is confirmed in a block. Since Bitcoin blocks are typically mined every ten minutes, the attacker has very limited time.

P2MR primarily addresses the first scenario. By committing to a Merkle root instead of a public key, the system ensures that public keys remain hidden until spending. Coins stored in a P2MR output could remain secure for decades, because no public key is available for attackers to analyze.

However, P2MR does not eliminate short-exposure risks. Once a script containing a public key is revealed during spending, a sufficiently powerful quantum attacker might still attempt to derive the private key before the transaction confirms. This limitation is why many researchers emphasize that P2MR should eventually be combined with post-quantum signature schemes.



## Criticisms and Debates Around BIP-360

Like most Bitcoin proposals, BIP-360 has sparked discussion and debate within the community. One concern involves transaction size. Because P2MR spends must reveal scripts and Merkle proofs, they may require more witness data than simple Taproot transactions.

Another topic of debate involves privacy. Taproot’s key path allows most transactions to appear identical on the blockchain, which enhances anonymity. Since P2MR always reveals a script path, observers might gain slightly more information about the structure of certain spending policies.

Some developers also argue that addressing quantum threats should focus primarily on adopting post-quantum signature schemes rather than modifying address formats. Others counter that reducing key exposure is a sensible precaution regardless of whether quantum computers arrive soon or decades later.



## Frequently Asked Questions (FAQ)

**Has BIP-360 been activated on Bitcoin?**

At present, it remains a proposal under discussion rather than an implemented upgrade. Like other Bitcoin Improvement Proposals, it would require extensive review and community consensus before deployment.

**Does P2MR make Bitcoin completely quantum-proof?** 

The answer is no. While P2MR reduces certain vulnerabilities, it does not replace the underlying signature algorithms. Full quantum resistance would likely require new cryptographic primitives. 



## Conclusion

Pay-to-Merkle-Root represents an intriguing proposal within the broader effort to future-proof Bitcoin’s security model. By committing directly to a Merkle root rather than a public key, P2MR significantly reduces the time during which cryptographic keys are exposed to potential attackers. This design addresses long-exposure quantum threats while preserving the flexibility introduced by Taproot’s script trees.

At the same time, P2MR is not a complete solution. True quantum resistance will likely require integrating post-quantum signature algorithms and possibly other protocol changes. Nevertheless, reducing key exposure is a logical step that strengthens Bitcoin’s long-term resilience.
