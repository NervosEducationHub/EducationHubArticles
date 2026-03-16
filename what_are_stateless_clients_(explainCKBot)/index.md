---
title: 'What Are Stateless Clients?'
coverImage: 'images/image1.png'
category: Education
subtitle: 'Stateless clients are not simply an optimization technique, but a response to a structural challenge that affects all growing blockchains.'
date: '2026-03-16T16:00:00.000Z'
author: 
- github:explainCKBot
---

A stateless client is a blockchain client that can verify transactions and blocks without storing the entire network's historical state. Rather than maintaining a local database of account balances, smart contract storage, and accumulated state transitions, the client relies on compact cryptographic proofs that accompany the data it processes. These proofs enable verification of correctness without requiring long-term storage of the underlying state.

Stateless clients open the door to broader participation across the network, especially for wallets, mobile devices, lightweight applications, and constrained-resource environments. Thus, Ethereum’s long-term roadmap places significant emphasis on stateless clients. 



## Why Blockchain State Growth Is a Structural Challenge

[Blockchain state](https://www.nervos.org/knowledge-base/state_and_state_change_(explainCKBot)) refers to the current status or snapshot of all data stored within the system. This includes but is not limited to account balances, contract code, and storage data. Essentially, the state is a reflection of all the transactions and operations that have taken place up to a given point in time. It's akin to a ledger in traditional finance, but with the added complexity and security features inherent to blockchain technology. 

Over time, this state expands relentlessly. Every new account, every contract deployment, and every piece of application data written on-chain adds to the burden. Even when data becomes obsolete, it often remains part of the state because pruning mechanisms introduce compatibility and complexity challenges that most networks prefer to avoid.

This dynamic creates a paradox. Blockchains aim to be permissionless and decentralized, yet the hardware requirements needed to participate meaningfully grow heavier with each passing year. Running a [full node](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot)) gradually becomes less practical for individuals and increasingly suited to data centers and professional operators. As a result, users begin to rely on [RPCs](https://www.nervos.org/knowledge-base/what_are_rpc_nodes_and_rpc_endpoints_(explainCKBot)) to fetch blockchain data.

The challenge is not limited to storage capacity. Bandwidth requirements and synchronization time also increase as the state grows. A new node must download and verify the full state before it can participate in validation, a process that can take days or even weeks, discouraging participation and weakening network resilience.



## The Core Idea Behind Stateless Clients

A blockchain client is software that interacts with the blockchain protocol by validating blocks, processing transactions, maintaining consensus rules, and exposing data to applications. Depending on how much data the client stores and how it verifies information, different client types emerge.

A full node stores the entire blockchain state and independently verifies every transaction. It provides the highest level of trustless verification, but at the cost of substantial storage and resource usage. A light client stores only block headers and relies on external nodes for detailed data, reducing storage needs but introducing dependency on third parties.

Stateless clients form a third category. They do not store the full state locally, yet they also avoid relying on blind trust in other nodes. Instead, verification is achieved through cryptographic proofs that accompany the specific pieces of state required for each transaction.

The underlying mechanism relies on cryptographic data structures such as Merkle trees, [Merkle Patricia trees](https://www.nervos.org/knowledge-base/merkle_patricia_trie_(explainCKBot)), and, in future designs, Verkle trees. In these structures, every piece of state is part of a tree whose root hash is included in the block header. When a transaction modifies a piece of state, the block producer includes a proof that demonstrates the path from that state element to the root. The client can verify this proof without possessing the entire tree.

In practice, this means that when a transaction updates an account balance or modifies smart contract storage, the stateless client only needs the proof relevant to that specific data. After verification, the information can be discarded. The client performs full verification while avoiding long-term accumulation of state, functioning more like a verifier of evidence than a database manager. This dramatically reduces storage requirements and allows ordinary devices to participate directly in network validation.



## Witnesses and Proofs: The Data That Makes Statelessness Possible

The additional data provided to stateless clients is commonly referred to as a witness. A witness contains all the cryptographic proofs required to demonstrate that the transaction interacts correctly with the relevant parts of the state. Because witnesses carry proof data, they are larger than ordinary transactions. However, this increase is offset by the fact that nodes no longer need to store vast amounts of historical state. 

This design shifts the burden from long-term storage to short-term bandwidth and computation. Block producers must assemble witnesses, which requires access to the full state, while stateless clients consume and verify these proofs. Responsibilities are redistributed across the network. Some nodes specialize in maintaining state and generating proofs, while others specialize in verification without storage. Both roles contribute to decentralization from different perspectives.



## Benefits and Tradeoffs

The most immediate benefit of stateless clients is reduced hardware requirements. Running a verifying node becomes feasible on devices with limited storage, including laptops and mobile devices. This gives users sovereignty and mitigates reliance on RPCs.

Stateless clients also improve node startup time. Because the entire historical state does not need to be downloaded, a new node can begin verifying blocks shortly after syncing headers and receiving witnesses. This flexibility enhances network resilience, as nodes can join and leave more easily without committing to long-term storage obligations.

However, stateless clients do not eliminate complexity. They shift it. Block producers must maintain the full state and generate witnesses, increasing their workload and computational responsibilities. Network bandwidth consumption rises due to the additional proof data transmitted with each block.

Optimizing proof size becomes a central challenge. If proofs are too large, the network becomes inefficient. Ongoing research into advanced data structures such as Verkle trees aims to minimize witness size while preserving strong verifiability.

Another limitation is the reliance on stateful nodes for witness generation. If too few nodes maintain the full state, bottlenecks may emerge.



## Conclusion

Stateless clients are not simply an optimization technique, but a response to a structural challenge that affects all growing blockchains. By decoupling verification from long-term storage, they enable broader participation, faster synchronization, and stronger decentralization.

Although the approach introduces new complexities in witness generation and proof management, advances in cryptographic research and data structure design continue to make stateless verification increasingly practical.

In the long term, stateless clients are likely to become a foundational component of scalable blockchain architecture, ensuring that network growth does not undermine accessibility and that decentralization remains practical rather than merely theoretical. 
