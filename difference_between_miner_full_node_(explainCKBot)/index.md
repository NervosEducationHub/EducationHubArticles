---
title: 'What is the Difference Between a Miner and a Full Node?'
coverImage: 'images/image1.png'
category: mining, node
subtitle: 'In the world of cryptocurrencies, two key entities play crucial roles in maintaining the integrity, security, and functionality of blockchain networks: miners and full nodes. While many often assume these two entities to be the same, their roles are distinct, and understanding these differences is essential for anyone delving into the world of cryptocurrencies.'
date: '2023-10-18T16:00:00.000Z'
author: 
- github:explainCKBot
---

## What is a Miner?

In the cryptocurrency world, miners are akin to gold miners in the real world, sifting through the void in search of extremely rare valuable nuggets - in this case, a proof of work that will create a new block on the blockchain, and in turn, a sizeable reward for the miner. Miners play a pivotal role in the blockchain network, validating new transactions and recording them on the global ledger, known as the blockchain. Importantly, miners are a type of full node, meaning they validate all the rules of the blockchain and only accept blocks which conform to these rules.

The process of mining involves verifying transactions, creating blocks, and generating proof of work. Generating a proof of work effectively means finding a [hash output](https://www.nervos.org/knowledge-base/what_is_a_hash_function) that meets the specific conditions set by the protocol.  \
 \
Here's a simplified step-by-step process of how miners generate proof of work:

1. **Transaction Verification:** Miners select transactions from the [mempool](https://www.nervos.org/knowledge-base/mempool_in_cryptocurrency_(explainCKBot)) (a collection of unconfirmed transactions) and verify them, ensuring they are valid.
2. **Block Creation:** The verified transactions are combined with the previous block’s hash (a one-way cryptographic process that involves taking an input and returning a unique fixed-size fingerprint of the input) and a new nonce (a random number used only once) to create a candidate block.
3. **Hashing:** The block candidate is hashed using the [SHA-256](https://www.nervos.org/knowledge-base/SHA256_most_used_hash_function_(explainCKBot)) or other popular hashing algorithm. This produces a hash output in the form of a fixed-size string of numbers and letters.
4. **Difficulty Check:** The resulting hash is compared to the protocol’s current [mining difficulty](https://www.nervos.org/knowledge-base/cryptocurrency_mining_difficulty_(explainCKBot)) target. If the hash output is less than the target, then the miner has successfully mined a new block. If not, the miner changes the nonce and repeats the hashing process until it finds a hash that meet’s the target. To do this, miners use specialized [mining hardware](https://www.nervos.org/knowledge-base/crypto_mining_hardware_(explainCKBot)) or ASIC’s (application-specific integrated circuits) that can process trillions of hashes per second in an attempt to find one that meets the target.
5. **Block Submission:** Once a valid hash is found, the miner submits the new block to the network. The block is verified by the other nodes and effectively “added” to the blockchain, and the miner is rewarded with a certain amount of cryptocurrency. Finding a valid hash takes an enormous amount of “work” (requires an enormous amount of computing power and energy expenditure). This work is readily verifiable by anyone, hence the term “proof of work”.

One of the biggest misconceptions around mining is the belief that it’s an easy way to earn cryptocurrency. In reality, the process is resource-intensive, requiring advanced hardware, technical knowledge, and significant amounts of electricity. Moreover, the competition among miners is fierce, driving the profit margins razor thin.


## What is a Full Node?

While all miners are full nodes, not all full nodes are miners. Unlike miners, which are block producers, full nodes act as a sort of librarian for the blockchain network. Full nodes maintain a complete copy of the blockchain, ensuring that every transaction adheres to the network's rules. They verify the legitimacy of transactions and blocks, rejecting those that violate the rules. Non-mining full nodes do not create new blocks, but play a crucial role in maintaining the network's integrity by checking the work of the miners and ensuring the consensus rules of the network are being followed.

Despite playing a critical role, full nodes are often misunderstood. Many people believe that running a full node involves receiving rewards, similar to mining. However, unlike miners, full-node operators do not receive direct rewards for their work. Their contribution to the network is largely altruistic, helping to maintain the network's decentralization and security.

Others will argue that full nodes are powerless actors in the network. While miners produce blocks (at a great cost), full nodes act as an army of blockchain supporters with the power to enforce the network’s consensus rules. A coalition of miners with more than 51% of the hashpower can choose to produce blocks that break the network’s consensus rules, however they do so at the risk that the stakeholders of the blockchain will, by and large, reject these blocks, yielding no reward for the cavalier miners. 

The balance between miners and non-mining full nodes is also crucial. A network dominated by miners could become centralized, undermining the decentralization that is a hallmark of blockchain technology. Conversely, a network with too few miners could be less secure, as it becomes more susceptible to a [51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack), where a single entity or coalition gains control of the majority of the network's mining power and can manipulate the blockchain in malicious ways.


## Conclusion

In conclusion, understanding the difference between miners and full nodes is crucial for anyone involved in the world of cryptocurrencies. While they perform different roles, both are integral to the functioning, security, and integrity of the blockchain network. Miners, with their computational prowess, add new transactions to the blockchain, while full nodes, the vigilant librarians, maintain the network's integrity by verifying these transactions. 

Together, they ensure the smooth operation of blockchain networks.
