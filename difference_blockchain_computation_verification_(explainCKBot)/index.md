---
title: "What's the difference between blockchain computation and verification?"
coverImage: 'images/image1.png'
category: Popular
subtitle: 'Blockchain technology, underpinning cryptocurrencies like Bitcoin and Ethereum, is a complex system that relies on a myriad of processes to function effectively. Two of these key processes are computation and verification. While they may appear similar, they serve distinct purposes within the blockchain ecosystem.'
date: '2023-11-01T16:00:00.000Z'
author: 
- github:explainCKBot
---


This article aims to delve deeper into these concepts, highlighting the differences between blockchain computation and verification and their respective roles in maintaining the integrity and functionality of blockchain networks.


## Understanding Blockchain Computation

Blockchain computation refers to executing the instructions embedded within transactions or smart contracts on the blockchain. The computation process is resource-intensive, requiring significant computational power and energy, especially for blockchains that support complex smart contracts. The computation process is typically done by block producers (miners or validators) that facilitate state changes by executing transactions. However, it's crucial to understand that blockchains are not designed to be computational platforms because they decentralize things by replication instead of distribution, meaning the computational power of the entire network doesn't scale with more nodes, but rather is always limited to the computational power of a single node.


## Understanding Blockchain Verification

On the other hand, blockchain verification is the process of confirming the validity of transactions and blocks on the blockchain. This is the primary role of blockchains—to act as verification machines. Verification involves checking that a transaction adheres to the rules of the blockchain protocol. Unlike computation, verification does not directly change the state of the blockchain, but rather ensures that a proposed change to the state is legitimate and adheres to the rules of the protocol.


## The Interplay Between Computation and Verification

While computation and verification are distinct processes, they are closely intertwined in the operation of a blockchain network. Computation is necessary to execute the instructions within transactions and smart contracts, leading to changes in the state of the blockchain. Verification, meanwhile, ensures that these changes are valid and adhere to the rules of the blockchain protocol. This interplay between computation and verification is crucial for maintaining the integrity and security of the blockchain.

In a blockchain network, different entities are responsible for computation and verification. The miners or validators in the network are typically responsible for computation. They execute the instructions embedded in transactions or smart contracts, leading to changes in the state of the blockchain. On the other hand, full nodes in the network are responsible for verification. They check each transaction and block against the current state of the blockchain to ensure their validity.

However, as blockchains grow and the number of transactions increases, the computational load on miners can become a bottleneck, limiting the scalability of the network. To address this issue, many blockchain networks are turning to Layer 2 solutions—secondary networks or channels that sit on top of the base blockchain (Layer 1) and offload computation from the main chain.

Layer 2 solutions allow transaction execution or computation to be performed off-chain, thereby reducing the computational load on the main chain. This approach allows for faster transaction processing and greater scalability, as the main chain is not bogged down with every single transaction but serves as the ultimate settlement layer for larger batches of transactions that have been compressed into a single transaction.

For example, the Lightning Network for Bitcoin and rollups (optimistic and ZK) for Ethereum, are Layer 2 solutions allowing faster and more scalable transaction processing. The former solution uses smart contracts to open payment channels between parties, allowing them to transact off-chain. Only when the channel is closed is the final state of the transactions committed to the main chain. Rollups, on the other hand bundle or "roll up" multiple off-chain transactions into a single transaction that is then sent to a smart contract on the main chain (Layer 1) responsible for accepting this bundled data and ensuring its validity.


## Rethinking the Role of Layer 1 Blockchains

Historically, Layer 1 blockchains, like Bitcoin and Ethereum, have been seen as all-encompassing platforms. They were responsible for both computation (executing transactions and smart contracts) and verification (ensuring the validity of these transactions). However, as these networks grew, scalability issues became evident. The dual responsibility of computation and verification made it challenging to process a high volume of transactions quickly.

A more modern perspective suggests that Layer 1 blockchains should primarily serve as preservational platforms. Their main task is to maintain an immutable record or "state" of the entire system. By focusing on preserving the state and verifying state changes, Layer 1 blockchains can ensure the integrity and security of data without being bogged down by the computational demands of transaction execution. In light of the computational limitations of Layer 1, Layer 2 solutions should be used. These solutions, like rollups or state/payment channels, handle the bulk of transaction execution off-chain while relying on Layer 1 for verification and final settlement. This division of labor allows for faster, more scalable transaction processing.


This rethinking of the role of Layer 1 blockchains represents a paradigm shift in the blockchain world. It's a move from a "one-size-fits-all" approach to a more modular, layered architecture. By allowing Layer 1 to focus on its core strengths of preservation and verification and letting Layer 2 handle computation, the entire blockchain ecosystem can operate more efficiently and effectively.


## Conclusion

In conclusion, while blockchain computation and verification may seem similar, they serve distinct roles within the blockchain ecosystem. Computation executes the instructions within transactions and smart contracts, leading to changes in the state of the blockchain. Verification, on the other hand, confirms the validity of these changes, ensuring that they adhere to the rules of the blockchain protocol. Understanding the differences between these processes, and their interplay, is crucial for anyone delving into the world of blockchain technology. Furthermore, rethinking the role of blockchains as preservational rather than computational platforms can lead to more efficient and scalable blockchain designs.
