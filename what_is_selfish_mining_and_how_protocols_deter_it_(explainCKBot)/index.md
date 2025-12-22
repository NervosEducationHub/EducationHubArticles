---
title: 'What Is Selfish Mining and How Protocols Deter It?'
coverImage: 'images/image1.png'
category: Mining
subtitle: 'Selfish mining illustrates the delicate balance between economics, technology, and trust that defines blockchain systems.'
date: '2025-12-23T16:00:00.000Z'
author: 
- github:explainCKBot
---

[Crypto mining](https://www.nervos.org/knowledge-base/cryptocurrency_mining_pools_(explainCKBot)) is the foundation that keeps [Proof-of-Work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) (PoW) blockchains secure and consistent. Every miner, regardless of location or [equipment](https://www.nervos.org/knowledge-base/crypto_mining_hardware_(explainCKBot)), is expected to play by the same rules and compete equally for rewards. However, not every participant behaves honestly. One particular form of strategic misbehavior capable of distorting incentives and harming blockchain security is known as selfish mining.

Selfish mining is a manipulative strategy in which a miner or [mining pool](https://www.nervos.org/knowledge-base/cryptocurrency_mining_pools_(explainCKBot)) deliberately withholds newly found blocks. Instead of publishing them immediately, the miner keeps those blocks private to gain a competitive advantage. This practice can disrupt the normal operation of a blockchain network, weaken trust, and reduce fairness.



## The Foundation of Honest Mining

In a PoW blockchain like Bitcoin, mining is the process through which new blocks are added to the blockchain. Miners compete to solve cryptographic puzzles, and the first one to solve it earns the right to publish the next block. This system aligns individual incentives with the collective goal of maintaining a secure, decentralized ledger.

Honest miners follow a straightforward rule: once a block is found, it should be broadcast to the network immediately. Other miners then verify it and start working on the next block. This rapid sharing ensures that the blockchain grows smoothly and consistently. Every [node](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot)) agrees on which chain is the longest and therefore valid, maintaining the integrity of the system.

However, the open and competitive nature of mining also creates opportunities for exploitation. When some participants realize that they can earn more by temporarily breaking the rules, the system becomes vulnerable. Selfish mining is one of the most studied examples of this kind of exploitation. It does not require breaking cryptography or rewriting code. It simply exploits timing and coordination.



## What Is Selfish Mining?

Selfish mining occurs when a miner or mining pool deliberately withholds a block they have found instead of broadcasting it immediately. By keeping this block secret, they temporarily create a private branch of the blockchain. If they find additional blocks before the rest of the network discovers a competing block, they can later release their private chain, which is longer and therefore valid according to the “[longest chain rule](https://www.nervos.org/knowledge-base/What_is_the_Longest_Chain_Rule_in_Bitcoin_and_Blockchain_(explainCKBot)).”

This behavior causes honest miners’ work to be wasted. The honest miners may have been building on an outdated version of the chain, unaware that a longer one existed in secret. Once the selfish miner reveals their chain, the honest miners’ blocks are discarded as “orphans.” The selfish miner, on the other hand, collects the rewards from their hidden chain.

In essence, selfish mining manipulates the normal race for block discovery by controlling information. The strategy relies not on computational power alone but also on timing, coordination, and deception.

The idea was first formally analyzed in 2013 by researchers *Ittay Eyal* and *Emin Gün Sirer* in their seminal paper “[*Majority Is Not Enough: Bitcoin Mining Is Vulnerable*](https://arxiv.org/pdf/1311.0243)*.*” Their analysis showed that m*iners controlling as little as one-third of the total network hash power could manipulate block release timing to increase revenue.* This finding contradicted the long-held belief that only those with over 50 percent of the network’s power could threaten Bitcoin’s security.



## How Selfish Mining Works

Consider a miner who discovers a new block but decides to keep it secret. While others continue mining on the old public chain, the selfish miner begins mining the next block privately on top of the hidden one. If the selfish miner finds another block before the network finds the next public one, the private chain now leads by one block.

At this point, the selfish miner continues to stay silent, maintaining the lead. However, if honest miners eventually find a block on the public chain, the selfish miner releases their hidden chain. Because the blockchain protocol prioritizes the longest chain, the selfish miner’s version becomes the new official one, and the honest miners’ latest block is discarded.

One crucial aspect of selfish mining is the propagation advantage. When a selfish miner releases their hidden chain, they must ensure it spreads through the network faster than the honest chain. Otherwise, the network might continue following the honest chain. Therefore, miners with better connectivity or geographic advantages have a higher chance of executing the attack successfully.

This process can repeat indefinitely. The more often the selfish miner manages to maintain a lead, the more block rewards they collect relative to their share of computational power. Over time, this creates an unfair advantage and discourages honest participation.



## The Impact of Selfish Mining 

Selfish mining fundamentally undermines economic fairness within a blockchain network. Honest miners invest computational power and energy to follow protocol rules, yet they may receive a smaller share of rewards when selfish miners strategically withhold blocks to gain an advantage. This imbalance distorts the incentive structure that blockchains rely on. Over time, smaller or less capitalized miners may find participation unprofitable and exit the network, accelerating mining power concentration in the hands of a few dominant players.

Beyond pure economics, the perception of fairness plays a decisive role in a network’s long-term health. When community members suspect that certain actors can consistently manipulate block production and rewards, confidence in the system begins to fade. Reduced trust leads to lower participation from miners, developers, and users alike. As engagement declines, decentralization weakens, and the network risks drifting away from its original open and trust-minimized design.

Selfish mining also increases the frequency of orphaned blocks. These discarded blocks represent wasted computational effort and energy, while also contributing to network congestion and slower confirmation times. As inefficiencies accumulate, the effective security of the blockchain deteriorates. A network burdened by frequent orphaning becomes more susceptible to further attacks, including double-spending, ultimately threatening both reliability and long-term stability.



## How Blockchain Protocols Deter Selfish Mining

Over time, researchers and developers have proposed several countermeasures to deter selfish mining. The goal is not only to punish dishonest behavior but also to realign incentives so that honest mining becomes the most profitable strategy.

One common approach involves modifying the block reward policy. For instance, before its shift to proof-of-stake (PoS), Ethereum’s implementation of uncle and nephew rewards partially mitigated selfish mining by rewarding miners whose blocks were orphaned but still contributed to network security. This mechanism reduced wasted effort and lessened the financial advantage of withholding blocks.

Another defense strategy focuses on improving block propagation. When new blocks spread faster, the window of opportunity for selfish miners shrinks. Bitcoin’s “[Compact Blocks](https://bitcoincore.org/en/2016/06/07/compact-blocks-faq/)” and Ethereum’s “[GossipSub](https://www.blocknative.com/blog/gossipsub-overlays-ethereum-consensus-layer)” protocols are examples of improvements aimed at faster communication. Nervos’ [NC-MAX consensus](https://docs-new.nervos.org/docs/tech-explanation/consensus) addresses this challenge by splitting the confirmation process into two steps: propose and commit, thereby allowing transactions to be fully propagated before being committed, eliminating delays and vulnerabilities associated with incomplete transaction distribution.

Some projects, like Bitcoin Cash, introduced alternative [difficulty adjustment](https://www.nervos.org/knowledge-base/cryptocurrency_mining_difficulty_(explainCKBot)) algorithms to limit the impact of manipulation. Other designs, such as [GHOST](https://www.geeksforgeeks.org/ethical-hacking/what-is-ghost-protocol-for-ethereum/) (Greedy Heaviest-Observed Sub-Tree), account for orphaned blocks by including them in the chain’s weight calculation. This means even discarded blocks contribute to security, reducing the impact of selfish mining.



## Conclusion

Selfish mining illustrates the delicate balance between economics, technology, and trust that defines blockchain systems. It is not an attack in the traditional sense, but rather a strategic exploitation of incentives and information flow. By withholding blocks and manipulating timing, selfish miners can distort fairness and gain a disproportionate share of rewards, even without controlling a majority of the network’s hash power.

It is worth noting, however, that despite extensive academic analysis, Bitcoin itself has not experienced any confirmed, sustained selfish mining attacks in practice. This absence is not accidental. Several structural factors make selfish mining difficult to execute profitably on Bitcoin’s mainnet. The network’s massive and highly distributed hash power raises the coordination threshold required for the attack. At the same time, Bitcoin’s robust peer-to-peer topology and continual improvements in block propagation reduce the informational advantages that selfish miners rely on. Any private lead is harder to maintain when blocks spread quickly and globally.

Economic incentives also play a critical role. For large mining pools operating on Bitcoin, overtly selfish behavior carries reputational and business risks. Pool participants can leave if manipulation is suspected, and exchanges or other ecosystem actors may respond negatively. As a result, strategies that appear profitable in theoretical models often become unattractive in real-world conditions where trust, scale, and long-term stability matter.

The broader lesson is that selfish mining serves less as an imminent threat and more as a stress test for consensus design. By exposing edge cases where incentives can diverge from honest behavior, it has pushed protocol designers to improve block propagation, reward structures, and consensus rules. Through ongoing research and iterative upgrades, blockchain networks continue to evolve toward systems where honest participation is not only ethically preferred but also economically dominant.
