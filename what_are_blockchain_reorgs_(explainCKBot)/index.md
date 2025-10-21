---
title: 'What are Blockchain Reorgs?'
coverImage: 'images/image1.png'
category: Blockchain
subtitle: 'Blockchain reorg is both a natural byproduct of how blockchains achieve consensus and a potential vector for attacks.'
date: '2025-10-08T16:00:00.000Z'
author: 
- github:explainCKBot
---

Blockchain transactions are supposed to be immutable once they’re recorded. This principle of immutability is the foundation of trust in decentralized systems like Bitcoin, Ethereum, and many other blockchains. But in reality, the process of adding new blocks to a blockchain is messy and competitive. Sometimes, more than one version of the blockchain emerges temporarily, and the network must decide which one becomes the “official” record.

This process can result in what is known as a blockchain reorganization—or “reorg” for short. Blockchain reorg is both a natural byproduct of how blockchains achieve consensus and a potential vector for attacks.



## What is a Blockchain Reorg?

Most [proof-of-work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) blockchains, like Bitcoin, rely on [miners](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)) competing to add new blocks. Miners expend computational power to solve cryptographic puzzles, and the first miner to solve the puzzle gets the right to append a block and earn the reward. This competition is continuous and probabilistic, meaning miners across the globe may solve puzzles almost simultaneously.

When this happens, two different blocks might be proposed at the same height. This temporarily creates a [fork](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork_(explainCKBot)) in the chain, where different parts of the network see different “truths.” Eventually, consensus mechanisms resolve the conflict by adopting the longest or “heaviest” chain. 

A blockchain reorg is the process by which nodes discard one or more blocks it had previously accepted and replace them with a different set of blocks that form a chain with higher priority—typically one that is longer or has more accumulated weight. Blockchain reorg is the network’s way of correcting itself when two or more candidate histories temporarily compete and the consensus rules select one as canonical.

### **Depth of Reorgs** 

Not all reorgs are equal in scale or consequence. Short reorgs, typically one or two blocks deep, are relatively common and generally harmless. They occur naturally and are usually resolved within minutes.

Long reorgs, however, are more concerning. When several blocks are invalidated, it can shake confidence in the system. Deep reorgs may indicate a serious attack, network instability, or protocol-level bugs.

The “depth” of a reorg refers to the number of blocks rolled back. A one-block reorg means only the most recent block was replaced. A ten-block reorg means ten blocks of history were rewritten—a rare and usually malicious occurrence.

### **How Reorgs Differ Across Consensus Mechanisms**

While reorgs are most commonly discussed in the context of proof-of-work systems like Bitcoin, they also appear in other consensus mechanisms, though in different forms.

In proof-of-stake systems, [validators](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)) propose and vote on blocks. Reorgs can still occur if validators disagree or if malicious actors attempt to finalize competing chains. However,[ slashing](https://www.nervos.org/knowledge-base/slashing_in_PoS_(explainCKBot)) penalties and [finality](https://www.nervos.org/knowledge-base/What_is_finality_crypto_(explainCKBot)) gadgets make deep reorgs less likely than in proof-of-work.

Delegated proof-of-stake and other variants often rely on small sets of validators. These systems can avoid frequent reorgs due to their more centralized nature, but when reorgs happen, they may be politically rather than technically driven.

Hybrid systems attempt to combine the strengths of different mechanisms, but the fundamental trade-off remains: reorgs reflect the tension between decentralization, speed, and security.

As blockchains scale and evolve, especially with innovations like layer-2 [rollups](https://www.nervos.org/knowledge-base/What_are_optimistic_rollups_(explainCKBot)), [sharding](https://www.nervos.org/knowledge-base/What_is_sharding_in_blockchain_(explainCKBot)), and[ cross-chain bridges](https://www.nervos.org/knowledge-base/what_are_blockchain_bridges_(explainCKBot)), the dynamics of reorganizations will only grow more complex. For instance, a reorg on a base layer can ripple into connected systems, potentially destabilizing entire ecosystems.



## Causes of Blockchain Reorgs

Reorgs occur for a variety of reasons:

- **Simultaneous Block Discovery**. Because mining is probabilistic, two miners may solve a block at nearly the same time. Both blocks propagate through the network, but not all nodes receive them at once. Some nodes accept one block while others accept the competing one. Eventually, when another miner extends one of the chains, the network converges on the longer one, leaving the other behind.

- **Network Latency and Geographic Distribution**. A miner in Asia may find a block, but due to latency, miners in North America might not hear about it before producing their own block. The network is then left with competing chains until one overtakes the other.

- **Deliberate Attacks**. A miner or group of miners with enough computational power might try to secretly build an alternative chain that excludes certain transactions. Once their hidden chain grows longer, they release it to the network, forcing a reorg that overrides previous blocks. This tactic is at the heart of the infamous [51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack).

Other causes include software bugs, network partitions (where parts of the network can't communicate), or even upgrades.



## Reorgs and the 51% Attack

A 51% attack occurs when a single miner or coalition controls more than half of the network’s total hash rate. With majority control, the attacker can effectively dictate which chain becomes canonical. This enables them to orchestrate deep reorgs, invalidating multiple blocks at once.

Why would someone do this? The main motivation is double spending. In a double-spend scenario, the attacker sends cryptocurrency to a merchant or exchange, waits for the transaction to be confirmed, and then secretly works on an alternate chain where the transaction never happened. Once their private chain overtakes the public one, they broadcast it to the network. The reorg erases the original transaction, and the attacker regains their coins while the merchant is left unpaid.



## Risks and Implications of Reorgs

The risks associated with blockchain reorgs depend on their frequency and depth. Reorgs create uncertainty. If a transaction users thought was final disappears, trust in the system is shaken. This undermines the confidence of both everyday users and institutional participants.

For exchanges and merchants, reorgs carry financial risk. If a transaction is invalidated after goods are delivered or funds are credited, losses occur. This is why exchanges enforce confirmation requirements, sometimes waiting dozens of blocks on smaller blockchains with weaker security. Each additional block confirmation reduces the likelihood that a reorg will invalidate the transaction.

Reorgs also have systemic implications. A network that suffers frequent or deep reorgs is seen as insecure and unstable. This can drive developers, users, and investors away, leading to a decline in value and relevance. On the other hand, a blockchain that manages reorgs effectively strengthens its reputation as resilient and trustworthy.



## Mitigation Strategies Against Reorgs

The most common is the confirmation rule: treating transactions as more secure the deeper they are buried in the chain. Each block added on top makes a reorg less likely, because an attacker must redo more work to rewrite history.

Some blockchains implement finality gadgets—protocols that make blocks irreversible after a certain point, regardless of competing chains. Ethereum introduced finality through its [Casper FFG](https://arxiv.org/pdf/1710.09437) (Friendly Finality Gadget), which drastically reduces the chances of deep reorgs.

At the infrastructure level, miners and validators can adopt practices that minimize network latency, such as improving connectivity and using relay networks to propagate blocks faster. This reduces the chance of natural forks and short reorgs.

When deep reorgs occur, exchanges can temporarily halt deposits and withdrawals to prevent double-spend losses. Developers can also patch vulnerabilities quickly when bugs cause unintended reorgs.



## Conclusion

Blockchain reorgs are temporary rewrites of history, born out of the decentralized and competitive nature of block production. While short reorgs are natural and generally harmless, deep reorgs raise serious concerns about security and trust. 

The future of blockchain will partly depend on how well networks can handle reorgs—whether by reducing their frequency, limiting their depth, or making them harmless through finality guarantees. Ultimately, a robust approach to reorgs will determine which blockchains earn long-term trust.
