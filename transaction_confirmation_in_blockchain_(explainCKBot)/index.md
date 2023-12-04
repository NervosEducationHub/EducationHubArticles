---
title: 'What is Transaction Confirmation in Blockchain?'
coverImage: 'images/image1.png'
category: Popular
subtitle: 'Transaction confirmation is a critical stage in the lifecycle of a blockchain transaction. It refers to the process of validating and verifying a transaction by including them in blocks embedded in the blockchain.'
date: '2023-11-29T16:00:00.000Z'
author: 
- github:explainCKBot
---

When a transaction is initiated, it is broadcasted to the network, where it awaits confirmation. During this process, network participants, known as miners in Proof-of-Work-based cryptocurrencies like CKB, validate the transaction's details and verify its authenticity. If the transaction follows the protocol’s rules, miners will include it in a block along with their proof of work and broadcast it to other nodes in the network. 

When other nodes in the network receive the block, they check the authenticity of the transactions and the proof of work, and if the latter meets the network’s current mining difficulty target (meaning the proof of work is valid), they’ll include the block in their copy of the blockchain. A transaction is said to be confirmed once it’s included in a block and appended to the blockchain.


This process ensures that all nodes in the network have the same copy of the blockchain.


## How Long do Transaction Confirmations Take?

That being said, the completion of one block doesn’t guarantee the permanence of a transaction. Sometimes, when miners compete to find the proof of work and earn the right to have their block accepted as valid by all nodes and appended to the blockchain, they may find a valid block (or find a hash output that meets the protocol’s current mining difficulty target) around the same time. 

When this happens, certain nodes in the network may start building their blocks on top of one block while others are building on top of a completely different block at the same height. This is known as an accidental fork and lasts only temporarily until one of the chains becomes longer than the alternative. 

To solve these types of scenarios, blockchains follow the “longest chain rule,” which, as the name suggests, means that the network will deem the longest chain (the chain with the most cumulative work behind it) as the canonical chain. Once the miners observe that one chain is longer than the other, they will abandon the blocks that are not in the longest chain (called orphaned blocks) and keep building on top of the single canonical chain. 

For this reason, transactions typically require several (three or more) confirmations before they’re considered final or irreversible. As for how long a single transaction confirmation takes, it depends on the specific blockchain. For example, the “block time,” or the average time needed to mine a new block in Bitcoin, is 10 minutes. On Nervos’ Layer 1, Common Knowledge Base, the block time is around 10-12 seconds. 


## Why Aren’t My Transactions Getting Processed?

Once a transaction has been sent by a user and broadcasted to the network, it isn’t immediately processed. Instead, it’s placed in a pool with other unconfirmed transactions called a mempool.

Miners monitor the mempool and choose the transactions with the highest fees for processing. Because the block space (the number of transactions that can fit into a block) is scarce, miners can’t include all transactions into a block and therefore pick only the transactions with the highest fee. This is why transactions with relatively lower fees can experience delays in processing, as it takes miners more time to pick them up and include them in a block. 

When the processing time is too long, users have the option of editing the transaction and increasing the transaction fee to make it more attractive for miners to process it faster.


## How to Check Transaction Status

Users can use blockchain explorers, like [ethexplorer.io](https://ethplorer.io/es/) for Ethereum, [blockstream.info](https://blockstream.info/) for Bitcoin, and [explorer.nervos.org](https://explorer.nervos.org/) for CKB, to check the status of their transactions. When a transaction is pending, it means that has not been included in a block yet.

When a transaction is confirmed, it means that it has been included in a block and recorded on the blockchain or settled with finality. One additional consideration on Ethereum is transactions labeled as “failed,” which means that it has been processed by miners but reverted, meaning that none of the actions described by the transaction have been taken, but the gas fee is still charged by the miner or validator. Bitcoin and CKB do not have the concept of failed transactions, only valid transactions can be included in the chain.