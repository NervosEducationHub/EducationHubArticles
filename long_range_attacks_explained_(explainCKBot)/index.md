---
title: 'Long-Range Attacks Explained: How Attackers Could Rewrite Blockchain History'
coverImage: 'images/image1.png'
category: Education
subtitle: 'Long-range attacks challenge one of the most deeply held intuitions in blockchain systems: the immutability of history.'
date: '2026-01-15T16:00:00.000Z'
author: 
- github:explainCKBot
---

A long-range attack refers to an attempt to rewrite blockchain history by starting far back in the past, often close to the genesis block or an early checkpoint, and rebuilding an alternative version of the chain.

For most users, blockchain history appears permanent. Transactions are confirmed, blocks accumulate, and after sufficient time has passed, people assume the past is settled. However, in some consensus systems, particularly [Proof-of-Stake](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) (PoS), this assumption deserves closer examination.



## Blockchain History and Consensus Mechanisms

Blockchain history is the ordered sequence of blocks that records every accepted transaction since the network’s genesis. Each block contains a batch of transactions and a cryptographic reference to the preceding block. This structure forms a chain in which altering a past block changes every subsequent block. This property is often presented as the foundation of blockchain immutability.

In reality, blockchain history is not enforced by cryptography alone. Cryptography ensures that blocks are linked and tamper-evident, but it does not decide which chain is correct when multiple valid chains exist. That decision is made by consensus rules. Blockchain history, therefore, is not just data—it is a social and economic agreement among network participants regarding which sequence of blocks counts as truth.

Consensus mechanisms answer one fundamental question: “Who gets to decide the next block?” In Proof-of-Work (PoW) systems, such as Bitcoin, this decision is tied to computational effort. [Miners](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot)) compete to solve cryptographic puzzles, and the longest chain with the most accumulated work is accepted as valid. Rewriting history requires reproducing enormous amounts of work, which quickly becomes impractical as the number of blocks accumulates.

Proof-of-Stake systems replace computational work with economic stake. Validators are randomly selected to propose and attest to blocks based on the amount of cryptocurrency they lock up as collateral. This approach reduces energy consumption and improves efficiency, but it also alters the security model. Rather than physical costs such as electricity, security depends on economic incentives, penalties, and protocol rules.

While both systems aim to maintain a single agreed-upon history, the assumptions on which they rely differ. Proof-of-Work assumes that attackers cannot outcompute the honest majority, whereas Proof-of-Stake assumes that attackers cannot convincingly fake stake-based consensus over time. Long-range attacks test the limits of that second assumption.



## What Is a Long-Range Attack

A long-range attack is an attempt to create an alternative version of a blockchain that starts far back in history and then grows forward to the present, eventually competing with or replacing the canonical chain. In this attack, the adversary does not attempt to overwhelm the current network directly. Instead, they quietly rebuild the past.

Such attacks typically involve validators or participants who previously held legitimate authority within the network. These participants might have held stake or signing keys in the past. Even if they no longer participate today, their former authority can still be invoked to sign an alternative history.

The defining feature of a long-range attack is that it occurs out of view. The attacker does not need to race the current network block by block. They can generate an alternative chain slowly, cheaply, and privately. If they later present this chain to a node that has been offline for an extended period, that node might accept the fabricated history as valid.



## Why Long-Range Attacks Are Mostly a PoS Concern

Long-range attacks are primarily discussed in the context of Proof-of-Stake because of differences in cost structure and time assumptions. In Proof-of-Work, rewriting history is extremely expensive. An attacker would need to redo the computational work for every block they want to replace. That work represents real-world energy costs that cannot be recovered.

In Proof-of-Stake, block production is based on stake ownership and cryptographic signatures. Once a validator signs a block, there is no physical cost attached to that signature. If the validator later sells their stake or leaves the system, the signature they could have produced in the past does not suddenly disappear.

This creates a unique asymmetry. An attacker could collect old private keys from validators who are no longer active. These keys might be sold, leaked, or simply abandoned. Using them, the attacker can sign blocks as if they were legitimate validators at a previous point in time.

Because there is no [mining difficulty](https://www.nervos.org/knowledge-base/cryptocurrency_mining_difficulty_(explainCKBot)) in Proof-of-Stake, an attacker can generate a long alternative chain very quickly. They can sign thousands of blocks in seconds. From the perspective of the protocol rules, this chain might look perfectly valid.



## How Long-Range Attacks Actually Work Step by Step

Consider a Proof-of-Stake blockchain that has been running for several years. Over time, many validators have joined and left. Their keys are no longer used, but they still exist somewhere.

An attacker begins by collecting old validator keys. This could happen through hacking, social engineering, or simply buying them from careless former participants. The attacker then chooses a point far back in the chain.

From that point, the attacker constructs an alternative chain. They sign blocks using the legacy keys, in accordance with all protocol rules. They include transactions, produce blocks at the correct intervals, and respect staking rules as they existed at the time.

Because they are working offline, they face no competition. There is no race. They can generate years of blockchain history in minutes. Eventually, they reach the present day with a complete alternative chain.

Now comes the critical moment. The attacker presents this chain to a node that has been offline for an extended period. According to the node’s rules, it sees two valid chains. One is the real chain, but the node is unaware of this. The other is the attacker’s chain, which might even appear longer or better according to naive rules.

If the node accepts the attacker’s chain, it will now have a completely different view of history. That is the essence of a successful long-range attack.



## The Role of Finality and Why It Matters

Finality is a core defense against long-range attacks. At its simplest, finality means that once a block is finalized, it cannot be reverted under the protocol’s rules. It is not merely unlikely to change; it is explicitly disallowed.

Some blockchains provide probabilistic finality. In these systems, blocks become increasingly difficult to reverse as more blocks are built on top of them. There is no discrete moment at which a block becomes final. Instead, confidence accumulates over time. Bitcoin is the canonical example: each additional confirmation reduces the probability of reorganization, but never eliminates it entirely.

Other blockchains pursue economic or cryptographic finality. Here, validators explicitly agree to finalize specific blocks through structured voting mechanisms. Once a block is finalized, reverting it would require either violating cryptographic assumptions or triggering severe economic penalties, such as slashing a substantial fraction of the total stake.

Long-range attacks exploit the absence or weakness of finality. If a protocol allows sufficiently old blocks to be reconsidered indefinitely, an attacker can always propose an alternative historical chain. Finality imposes a clear historical cutoff. Blocks prior to that point are no longer subject to revision, regardless of later events.

For this reason, modern Proof-of-Stake systems often incorporate strong finality gadgets. Ethereum is a prominent example. These mechanisms ensure that even if historical validator keys are later compromised, they cannot be used to rewrite finalized history, preserving the integrity of the chain’s past.



## Weak Subjectivity and Social Consensus

Weak subjectivity is a concept that appears abstract but addresses a very practical problem. It recognizes that, in some cases, nodes require a limited amount of trusted information from outside the protocol to determine which chain history is valid. This information need not be updated continuously, but it must be sufficiently recent to remain meaningful.

In practice, weak subjectivity is often implemented through checkpoints. A checkpoint is a known-good block hash at a specific height. A new or recovering node can initialize from this reference point and accept only chains that extend from it, rather than attempting to evaluate all possible historical forks from genesis.

By explicitly acknowledging and formalizing this reality, Proof-of-Stake systems reduce ambiguity rather than increasing it. Weak subjectivity sharply limits the feasibility of long-range attacks. While an attacker may be able to construct an alternative historical chain, they cannot plausibly convince the broader network to accept it without also subverting the trusted checkpoints that anchor the collective agreement.



## How Modern Blockchains Defend Against Long-Range Attacks

Defenses against long-range attacks are rarely based on a single mechanism. Instead, modern blockchains rely on layered strategies that reinforce one another. Strong finality mechanisms prevent old blocks from being reverted, key expiration policies limit the duration for which historical validator keys remain valid, and slashing conditions penalize validators who sign conflicting histories.

Checkpointing provides new or recovering nodes with a trusted starting reference, while weak subjectivity assumptions are explicitly documented and enforced. Client software is designed to reject chains that violate these assumptions, narrowing the space in which alternative histories can plausibly compete.

No individual defense is sufficient on its own. Together, however, they form a layered security model. The objective is not to make long-range attacks mathematically impossible, but to render them economically irrational and socially implausible.

A natural question is whether long-range attacks have occurred in practice. 

Among major blockchains, there are no known examples of successful long-range attacks causing real-world damage. This is not evidence that the threat is imaginary; rather, it reflects that protocol designers are aware of the risk and actively defend against it. Many attacks never materialize precisely because defenses are effective—much like fire drills that exist even when buildings do not routinely burn down.



## Long-Range Attacks vs. 51% Attacks

[A 51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack) occurs when a miner or coordinated group gains control of a majority of a network’s current hash power. With this dominance, an attacker can reorder transactions, censor activity, or attempt short-range reorganizations. Such attacks are capital-intensive, ongoing, and highly visible.

Long-range attacks operate under a fundamentally different model. They do not require present-day dominance. Instead, they exploit past authority—such as old validator keys or historical stakes. They can be cheap to execute, largely silent, and difficult to detect until a node encounters the alternative history.

This distinction shapes how defenses are designed. Protection against 51% attacks focuses on decentralization, real-time economic costs, and active resource expenditure. Defense against long-range attacks emphasizes finality, key lifecycle management, and explicit assumptions about node synchronization and trust.



## Conclusion

Long-range attacks challenge one of the most deeply held intuitions in blockchain systems: the immutability of history. They demonstrate that, under certain conditions, history can be rewritten—at least in theory.

At the same time, they highlight the resilience of well-designed protocols. With strong finality, weak subjectivity, and active communities, blockchains can defend themselves effectively against these threats.

The takeaway is not that blockchains are fragile. It is that security is contextual. It emerges from the interaction of incentives, assumptions, protocol design, and human behavior—not from cryptography alone.
