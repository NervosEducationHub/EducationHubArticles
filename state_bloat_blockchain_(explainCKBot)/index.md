---
title: 'What is State Bloat in Blockchains?'
coverImage: 'images/image1.png'
category: Blockchain, State
subtitle: 'In the world of blockchain technology, a long-standing issue is state bloat.'
date: '2023-11-14T16:00:00.000Z'
author: 
- github:explainCKBot
---

# What is State Bloat in Blockchains?

In the world of blockchain technology, a long-standing issue is state bloat. This phenomenon, while not immediately apparent, can have significant implications for the performance, scalability, and usability of a blockchain network. This article aims to demystify state bloat, exploring its causes, effects, and potential solutions to this persistent challenge.


## Understanding State in Blockchain

To understand state bloat, one must first understand the concept of [state](https://www.nervos.org/knowledge-base/state_and_state_change_%28explainCKBot%29) in a blockchain context. In blockchains, state represents the current information of all accounts, including their balance, contract code, and storage. Each transaction in the blockchain alters the state in some way, such as changing the balance of two accounts, when a cryptocurrency transaction occurs.

The state is stored in each full node of the blockchain network, allowing them to validate new transactions and blocks. This distributed storage of state is a key factor in the decentralization and security of blockchain networks.


## What is State Bloat?

Full nodes are like the diligent librarians of the blockchain world. They need two things: a history book (historical data) when getting in sync with the blockchain for the first time, and a real-time news feed (global state) to check the validity of new blocks and make new [state changes](https://www.nervos.org/knowledge-base/state_and_state_change_%28explainCKBot%29).

But as the blockchain grows, it's like the library's shelves are getting more and more packed. Reading from and writing to these packed shelves (the state) becomes a slower and more expensive task. And if the library's shelves are full, the full nodes have to start storing books in the basement (external disk space storage).

When a blockchain's storage needs keep growing, it can lead to a problem called state bloat. It's like the library is so full of books that it's hard for the librarians (full nodes) to keep up with the latest news (the chain tip). And for new librarians (users syncing up new full nodes), it's even harder to catch up.

Several things can make state bloat more likely. These include a long history of the ledger, new blocks being added frequently, larger-sized blocks, and lots of data that needs to be stored on-chain to check transactions and make state changes.

State bloat is an issue because as the state grows, it requires more storage space, more computational resources to process, and more bandwidth to transmit. This raises the requirements and increases the costs for running a full node, which—beyond affecting the performance or scalability of the network— can discourage participation in the network and lead to centralization.


## Addressing State Bloat 

Addressing state bloat is a complex challenge that requires careful design and engineering. One approach is to use state pruning, which involves removing unnecessary data from the state. For example, accounts that have been empty for a long time could be removed from the state.

Another approach is to use stateless clients, which do not store the entire state but instead rely on other nodes to provide the necessary data when validating transactions. This can significantly reduce the resources required to run a light node but doesn’t really change anything for running full nodes, which is more relevant for decentralization.

Finally, sharding—dividing the state into smaller, more manageable pieces—can also help mitigate state bloat. In theory, each shard would have a smaller state, making it easier to store and process, but this method is yet to be battle-tested on a larger scale in practice. \

The only blockchain that has directly addressed and solved the issue of state bloat is Nervos Network’s Layer 1, Common Knowledge Base (CKB). This is done through a combination of innovative tokenomics and architectural design. Here's how Nervos deals with state bloat:

**State Rent and Privatization of State Space**

CKB introduces the concept of state rent, which is an ongoing cost for occupying state space on the blockchain. This is achieved through a secondary issuance, which effectively imposes an "inflation tax" on state occupiers. This inflation tax is used to compensate miners for preserving the state over time.

In addition, ownership of state space is privatized. On CKB, state capacity is a first-class asset that is directly owned and controlled by users. To store any data on the blockchain, a user must lock a requisite amount of CKB tokens (commensurate with how much data is being stored). This effectively bounds the state growth, as the global state of the blockchain can only grow as much as the total issuance of CKB tokens allows.

**Incentives for State Pruning**

Because state is a first-class asset on CKB, the state occupiers are also technically state owners, incentivized to remove unnecessary data from the blockchain (state pruning) to keep it manageable in the long term. When they no longer need to utilize the scarce state space, they can consume the cells that occupy it, release the locked CKB tokens and then deposit them into the [NervosDAO](https://medium.com/nervosnetwork/nervos-dao-explained-95e33898b1c) inflation shelter to stop paying for state rent.


## Conclusion

In conclusion, state bloat is a significant challenge in the world of blockchain technology. As the state of a blockchain network grows, it can lead to increased costs, reduced performance, and potential centralization. However, with careful design and innovative solutions it is possible to mitigate the effects of state bloat and ensure the scalability and usability of blockchain networks. 

CKB’s approach to managing state bloat, which involves a combination of innovative tokenomics and architectural design, is a leading example. By introducing state rent, privatizing state space, and creating a unique value capture mechanism through CKB tokens, the blockchain is well-equipped to handle state bloat while preserving the core principles of decentralization and security.
