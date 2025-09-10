---
title: 'What Are Native Rollups? A Complete Guide'
coverImage: 'images/image1.png'
category: Scaling
subtitle: 'The scaling journey of Ethereum has been driven by the need to balance decentralization, security, and scalability.'
date: '2025-08-26T16:00:00.000Z'
author: 
- github:explainCKBot
---

Rollups emerged as the most viable way to scale Ethereum without compromising its core values. They allow computation to happen off-chain while data and security remain anchored to Ethereum. But now, a new concept is emerging that promises even tighter integration between rollups and Layer 1: native rollups.

Native rollups are rollups that are directly integrated into the base layer of a blockchain. Unlike traditional rollups that operate as smart contracts on top of Ethereum, native rollups are supported natively by the protocol itself. This allows for deeper security guarantees, improved efficiency, and lower latency.

Native rollups are still a developing concept and aren't yet live on Ethereum. But other chains like Celestia, zkSync, and Cosmos have begun exploring or implementing them. Ethereum researchers are also thinking seriously about how native rollups could fit into its long-term roadmap. To understand their potential, we first need to look at how traditional rollups work.



## Traditional Rollups: Understanding Current Scaling Solutions

Most rollups today exist as Layer 2 protocols built on top of Ethereum. They post transaction data to Ethereum and rely on it for security and consensus. The two dominant types are [optimistic rollups](https://www.nervos.org/knowledge-base/What_are_optimistic_rollups_(explainCKBot)) and zero-knowledge (ZK) rollups. Both aim to reduce gas costs and increase throughput while still benefiting from Ethereum's decentralized base layer.

Optimistic rollups operate under the assumption that all transactions are valid unless challenged. They include fraud proofs and offer a challenge window to contest incorrect data. ZK rollups, on the other hand, submit cryptographic proofs that verify correctness upfront.

Despite their differences, both types depend on Ethereum for two things: [data availability](https://www.nervos.org/knowledge-base/what_is_data_%20availability_in_blockchain_(explainCKBot)) and dispute resolution. However, their actual execution happens off-chain, and they interact with Ethereum via smart contracts. This model works but has limitations. It creates additional latency, complexity, and potential vulnerabilities in the [bridge](https://www.nervos.org/knowledge-base/what_are_blockchain_bridges_(explainCKBot)) between layers.



## What Makes a Rollup "Native"?

A native rollup differs fundamentally in how it integrates with the base chain. Instead of existing as a smart contract or separate protocol layered on top, a native rollup is baked into the blockchain protocol itself. This means the chain is designed from the ground up to support rollup functionality, including execution, settlement, and data availability.

At the heart of the native rollup concept is the introduction of the `EXECUTE` [precompile](https://www.nervos.org/knowledge-base/what_are-precompiles_(explainCKBot))—a specialized contract embedded within Ethereum's protocol. This precompile exposes the Layer 1 (L1) Ethereum [Virtual Machine](https://www.nervos.org/knowledge-base/what_is_a_VM_in_blockchain_(explainCKBot)) (EVM) execution engine to the application layer, enabling direct verification of Layer 2 (L2) [state](https://www.nervos.org/knowledge-base/state_and_state_change_(explainCKBot)) transitions. By leveraging this mechanism, native rollups can achieve EVM equivalence without the need for external validation systems such as fraud proofs or [zero-knowledge proofs](https://www.nervos.org/knowledge-base/zero_knowledge_proofs_(explainCKBot)).​



### How the `EXECUTE` Precompile Works

The `EXECUTE` precompile functions by taking specific inputs:

* **`pre_state_root`**: The root hash of the state trie before executing the rollup transactions.​

* **`post_state_root`**: The expected root hash after execution.​

* **`trace`**: A well-formatted execution trace, typically a list of L2 transactions accompanied by corresponding state access proofs.​

* **`gas_used`**: The amount of gas consumed during the execution of the trace.​

The precompile returns `true` if the stateless execution of the provided trace, starting from the `pre_state_root`, results in the `post_state_root` and consumes exactly the specified `gas_used`. This design ensures that L2 state transitions can be verified directly by L1 [validators](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)) through re-execution, thereby inheriting Ethereum's robust security model.



## Advantages of Native Rollups

Integrating rollup functionalities natively within Ethereum's protocol offers several compelling benefits:

* **Enhanced Security**: By eliminating the need for external validation mechanisms and security councils, native rollups reduce potential attack vectors, relying solely on Ethereum's established security infrastructure.​

* **Simplified Architecture**: The direct interaction between L1 and L2 through the `EXECUTE` precompile streamlines the rollup design, removing the complexities associated with current rollup infrastructures.​

* **Real-Time Settlement**: Native rollups can achieve immediate [finality](https://www.nervos.org/knowledge-base/What_is_finality_crypto_(explainCKBot)) without waiting for external proofs, facilitating faster transaction confirmations and improving user experience.​



## Implementation Considerations

While the concept of native rollups is promising, several implementation aspects warrant careful consideration:

* **Gas Metering and Pricing**: The `EXECUTE` precompile introduces a cumulative gas limit and target, necessitating an EIP-1559-style mechanism to manage gas pricing effectively. This approach ensures that the execution remains economically viable and does not congest the network.

* **Data Availability**: Ensuring that the execution trace (`trace`) is accessible to validators is crucial. The trace must reference available Ethereum data from sources such as calldata, [blobs](https://www.nervos.org/knowledge-base/what_are_blobs_in_ethereum_(explainCKBot)), state, or memory to facilitate re-execution and verification.​

* **Validator Responsibilities**: Validators may need to re-execute traces to enforce the correctness of `EXECUTE` calls. This requirement could impact their computational load, especially if the cumulative gas limit for `EXECUTE` calls is substantial.​



## Native Rollups vs Traditional Rollups: Comparative Analysis

Traditional rollups, including optimistic and zero-knowledge variants, rely on external proof systems and often involve latency due to challenge periods or proof generation times. Native rollups, by contrast, integrate execution verification within Ethereum's L1, eliminating the need for such external systems and reducing associated delays. This integration not only simplifies the rollup architecture but also enhances security by removing intermediary trust assumptions.​



## Future Outlook

The development and adoption of native rollups are still in the exploratory phase. Ethereum researchers and developers are actively investigating the feasibility and potential impact of implementing the `EXECUTE` precompile and other related mechanisms. As these discussions progress, native rollups could play a pivotal role in Ethereum's scalability roadmap, offering a harmonious blend of performance, security, and simplicity.

In conclusion, native rollups propose a transformative approach to Ethereum's scalability challenges by embedding rollup functionalities directly into the protocol. Through mechanisms like the `EXECUTE` precompile, they promise enhanced security, streamlined architectures, and improved [transaction finality](https://www.nervos.org/knowledge-base/What_is_finality_crypto_(explainCKBot)), marking a significant step forward in the evolution of blockchain scalability solutions. 
