---
title: 'Parallel vs Sequential Transaction Execution in Blockchain'
coverImage: 'images/image1.png'
category:
subtitle: ' The mechanisms that underpin transaction processing play a critical role in defining the performance and scalability of blockchains.'
date: '2024-07-05 T23:00:00.000Z'
author:
- github:explainCKBot
---

Two primary execution models—parallel and sequential—dictate how transactions are validated and appended to the blockchain. This article examines these models, using Bitcoin and Ethereum as examples of parallel and sequential execution respectively, and explores Solana's innovative approach to parallel processing.


## Blockchain Data Models: UTXOs vs. Accounts


### The UTXO Model: Bitcoin's Approach to Parallel Transaction Processing

The [Unspent Transaction Output (UTXO) model](https://www.nervos.org/knowledge-base/utxo_model_explained), pioneered by Bitcoin and used by many other blockchains, can be likened to handling physical cash, where each coin or bill represents a discrete value that can be spent. 

More specifically, in the UTXO model, each transaction is composed of inputs and outputs. Inputs are references to previous transaction outputs that the current transaction spends, while outputs represent the new UTXOs created for future spending. Essentially, UTXOs are the units of Bitcoin that have not yet been spent and can be used in new transactions.

To better understand this, let’s consider an analogy with physical cash. Imagine you have a $50 bill in your wallet. This bill can be thought of as a UTXO. When you go to a store to buy something worth $30, you hand over your $50 bill, and the store clerk gives you $20 back as change. In this scenario, your $50 bill is "consumed" as an input in the transaction, and two outputs are created: a $30 payment to the store and a $20 change back to you.

In Bitcoin, transactions work the same. Consider Alice with three UTXOs: 0.5 BTC, 1 BTC, and 1.5 BTC. She wants to send 2 BTC to Bob. Here’s how the transaction might proceed:

* **Input Selection**: Alice selects her 1 BTC and 1.5 BTC UTXOs as inputs for the transaction.
* **Transaction Outputs**: Alice creates a transaction that:
    * Sends 2 BTC to Bob.
    * Returns 0.5 BTC to herself as change (since she spent 2.5 BTC in inputs and only needed 2 BTC for Bob).

After this transaction, the original 1 BTC and 1.5 BTC UTXOs are "spent" (destroyed), and two new UTXOs are created: 2 BTC for Bob and 0.5 BTC for Alice.


### Benefits of the UTXO Model

The UTXO model's design in Bitcoin allows for several significant advantages, particularly in transaction processing, verification, and privacy.

First and foremost, the independence of UTXOs facilitates parallel processing. In Bitcoin, each UTXO can be considered a distinct unit of value, much like individual coins or bills in physical currency. Because these units are self-contained and do not depend on one another, multiple transactions involving different UTXOs can be processed simultaneously without conflicts. 

This capability enhances the network's overall capacity and efficiency, as it enables nodes to validate and add multiple transactions to the blockchain concurrently. This parallelism is a key factor in Bitcoin's ability to handle high volumes of transactions efficiently, even under significant network load.

Regarding verification, the UTXO model offers a streamlined process for nodes. When a node validates a transaction, it simply checks that the UTXOs being spent have not already been used in other transactions and are, therefore, still "unspent."

This check is straightforward and requires nodes to verify only the validity of the UTXOs involved in the current transaction without needing to sift through the entire transaction history. This approach reduces the computational burden on the network and speeds up the transaction verification process.

Furthermore, the UTXO model provides substantial privacy and flexibility benefits for users. Because each UTXO is a separate unit, users have the ability to structure transactions in various ways to manage their funds. They can split larger UTXOs into smaller ones, merge smaller UTXOs into a larger amount, or even combine multiple UTXOs from different sources into a single transaction.

This flexibility allows users to optimize how they handle their Bitcoin, whether for consolidating their holdings, facilitating smaller payments, or enhancing privacy. Each transaction can be designed to obscure the total amount and the flow of funds more effectively than with other models, thus offering users greater control over their transaction privacy.


### Account-Based Model: Ethereum’s Execution Method

In contrast to Bitcoin, Ethereum utilizes an account-based model, which can be compared to a system most people are familiar with: bank accounts. 

Imagine you have a checking account at a bank. Your account has a balance, and every time you make a transaction—whether depositing, withdrawing, or transferring money—the bank updates your balance accordingly.

In Ethereum, each account behaves similarly. An Ethereum account has an Ether (ETH) balance, and transactions between accounts update these balances directly. For example, when Alice sends 1 ETH to Bob, Ethereum’s blockchain records this transaction by subtracting 1 ETH from Alice's account and adding 1 ETH to Bob's account, just as a bank would debit and credit two accounts.

The simplicity of this model is apparent in how it directly adjusts account balances. When Alice’s transaction is processed, Ethereum's system ensures that her balance decreases by 1 ETH while Bob’s increases by the same amount. This straightforward updating mechanism facilitates easy balance tracking and enables complex interactions, such as those involving smart contracts, where the direct manipulation of account states is necessary.

However, this model also makes it difficult to process many transactions in parallel. If multiple transactions were to modify the same account simultaneously, it could result in conflicts similar to what might happen if two clerks tried to update the same bank account at the same time without coordinating. One transaction might not correctly account for changes made by another, leading to errors such as double-spending or inaccurate balances.

To avoid these issues, Ethereum processes transactions sequentially. Each transaction’s effects must be fully realized and integrated into the blockchain state before the next transaction begins.

This sequential processing is necessary to prevent double-spending or inconsistent state updates. For example, if a sequence of transactions includes Alice sending ETH to Bob and Bob then sending some of that ETH to Charlie, processing these transactions out of order could result in Bob not having sufficient ETH to send to Charlie if Alice’s transaction hasn’t been processed yet. Thus, sequential execution guarantees the correctness and orderliness of transaction processing in Ethereum.


## Sequential Execution in Account-Based Blockchains


### How Sequential Transaction Processing Works

To understand how Ethereum's sequential execution works, envision the network as a global accounting ledger where every transaction modifies the state of this ledger. In Ethereum, maintaining an accurate and consistent global state is paramount. Here’s a detailed breakdown of how this process unfolds:


#### Step-by-Step Process of Sequential Execution

1. **Transaction Queue**: Users submit transactions to the Ethereum network, which are then placed in a so-called "[mempool](https://www.nervos.org/knowledge-base/mempool_in_cryptocurrency_(explainCKBot))," where they await confirmation by [miners or validators](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)).
2. **Order of Processing**: Transactions in the mempool are typically prioritized based on factors like [gas fees](https://www.nervos.org/knowledge-base/what_is_a_blockchain_gas_fee_(explainCKBot)) the sender offers. Miners select transactions from this pool, often starting with those that offer higher fees, and order them sequentially in the block they are mining.
3. **Validation and Execution**: Each transaction is picked from the block in the order it appears and then validated. Validation ensures the transaction adheres to the protocol rules, such as checking that the sender’s account has enough Ether to cover the transaction and fees.
4. **State Transition**: Upon validation, the transaction is executed. Execution involves updating the account balances and any relevant contract states. For example, if Alice transfers 2 ETH to Bob, Alice’s balance decreases by 2 ETH, and Bob’s balance increases by 2 ETH. If the transaction involves a smart contract, the contract’s state is updated accordingly.
5. **Updating the Global State**: After a transaction is executed, its effects are integrated into the current global state of the blockchain. This new state reflects all the cumulative changes brought about by all previous transactions in the block.
6. **Block Completion**: Once all transactions in the block have been validated and executed in sequence, the block is completed and proposed to the network. Other nodes then verify the block's transactions and the resulting state.
7. **Consensus and Finalization**: If the block is accepted by the network through the consensus mechanism ([proof-of-work or proof-of-stake](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot))), it is added to the blockchain. This ensures that all nodes update their records to reflect the same global state.


### Advantages of Sequential Execution

The primary advantage of sequential execution is its simplicity and the ease with which it maintains a consistent and accurate state across the blockchain. By processing transactions one at a time, Ethereum can manage account balances and contract states in a straighforward way, ensuring each transaction is valid and conflict-free.

This approach is also well-suited to Ethereum’s support for smart contracts. These contracts can involve intricate and interdependent operations that require a consistent and ordered execution to function correctly. Sequential processing simplifies the implementation and verification of these contracts, making it easier to build and deploy complex decentralized applications (dApps).

Furthermore, sequential execution minimizes the risk of data conflicts and inconsistencies. Since each transaction is fully processed before the next one begins, there is no need to resolve conflicts or manage dependencies between concurrent transactions, reducing the potential for errors and enhancing the stability of the network.


### Disadvantages of Sequential Execution

Despite its benefits, sequential execution also has significant drawbacks, primarily regarding scalability and performance. The necessity of processing each transaction individually and in sequential order imposes a natural limit on the network's throughput. As the number of transactions increases, the time required to validate and record each can lead to bottlenecks, resulting in slower transaction times and higher fees.

This limitation is particularly evident during periods of high network activity. When demand exceeds the network’s capacity to process transactions, users can experience delays and increased costs, which hinders the user experience and the overall utility of the network.


## Parallel Execution in UTXO-Based Blockchains


### How Parallel Transaction Processing Works

Parallel execution is a defining feature of Bitcoin’s UTXO model. This model allows multiple transactions to be processed simultaneously, provided they do not spend the same UTXOs. Each transaction in Bitcoin operates on its own set of inputs and outputs, which makes them largely independent of each other.

For example, consider a scenario where Alice, Bob, and Charlie each send Bitcoin in separate transactions. If these transactions do not involve the same UTXOs, they can all be processed concurrently by different nodes in the network. This parallelism enables UTXO-based chains to handle many transactions efficiently, achieving high throughput.

To use an analogy, each UTXO is like a separate coin or bill in your wallet. When you spend it, you pass it along, and it becomes an input for another person's wallet. Since each UTXO is a distinct entity, transactions that do not attempt to spend the same UTXOs can be processed simultaneously without any conflicts.


### Advantages of Parallel Execution

The most significant advantage of parallel execution is its ability to enhance the blockchain's throughput and efficiency. This means that the throughput of UTXO-based chains isn’t necessarily limited by the execution times but by the block size or the number of transactions that can fit inside each block, and the [block time](https://www.nervos.org/knowledge-base/block_time_in_blockchain_(explainCKBot)), or the amount of time it takes to verify and add a new block to a blockchain.

Parallel execution also reduces the time required to validate transactions, improving the network's overall speed. This benefit is particularly valuable for applications that require quick transaction processing, such as financial services and real-time payments.

Additionally, the parallel processing capability of the UTXO model simplifies the architecture of Bitcoin’s validation process. Because transactions are independent, nodes can validate them without needing to coordinate or resolve dependencies, enhancing the network's robustness and reliability.


### Disadvantages of Parallel Execution

Despite its advantages, parallel execution also presents challenges, particularly in managing data consistency and resolving conflicts. If two transactions attempt to spend the same UTXO, the network must detect and handle this conflict to ensure the integrity of the blockchain. This conflict detection and resolution process adds complexity to the validation process and requires sophisticated algorithms to maintain consistency across the network.

Furthermore, ensuring all nodes maintain a consistent view of the blockchain state can be more complex in a parallel execution environment. The need to synchronize and coordinate parallel transactions introduces additional overhead, particularly in large and distributed networks. Managing these complexities is crucial to maintaining the blockchain's performance and security.


## Case Study: Solana’s Approach to Parallel Execution


### Overview of Solana

Solana is a high-performance blockchain platform that supports decentralized applications with high throughput and low latency. Unlike Bitcoin and Ethereum, Solana employs a novel approach to achieve parallel execution, positioning itself as one of the fastest blockchain networks in operation today.

Solana’s Sealevel execution environment is specifically designed to enable parallel execution of smart contract transactions. Sealevel identifies transactions that can be executed concurrently by analyzing their dependencies. If transactions do not interact with the same accounts or data, they can be processed simultaneously, significantly boosting the network's throughput.

For example, if one transaction involves a smart contract updating a user’s token balance and another transaction involves a different contract performing an unrelated operation, Sealevel can execute these transactions in parallel. This parallel processing capability is a key factor behind Solana's ability to efficiently handle a high volume of transactions.

Sealevel leverages optimistic concurrency control, a technique that assumes most transactions will not conflict with each other and allows them to be executed in parallel. If a conflict is detected during execution, Sealevel rolls back and retries the conflicting transactions sequentially. This approach combines the benefits of parallel execution with mechanisms to ensure data consistency and conflict resolution.
