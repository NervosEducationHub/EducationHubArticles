---
title: 'What Are Based Rollups? A Complete Guide'
coverImage: 'images/image1.png'
category: Scaling
subtitle: 'In the ongoing evolution of blockchain technology, new ideas continue to reshape what’s possible in decentralized systems.'
date: '2025-08-01T16:00:00.000Z'
author: 
- github:explainCKBot
---

Ethereum, as a leading smart contract platform, has long struggled with scalability. Rollups emerged as a promising solution, offloading transaction processing from the base layer and significantly reducing costs. But in the fast-paced world of crypto, even solutions to problems eventually need their own refinements. That brings us to based rollups—a new approach that seeks to make rollups better aligned with Ethereum’s long-term vision.

Based rollups are a new kind of Layer 2 solution that more deeply integrates with Ethereum's base layer, specifically by relying on Ethereum block proposers to handle sequencing. 

This seemingly small change has major implications for decentralization, security, and revenue alignment. But to appreciate what makes based rollups special, we need to first understand the role of traditional rollups in Ethereum’s ecosystem.



## The Role of Rollups in Ethereum's Scalability Plan

Ethereum is designed to be secure and decentralized. But these priorities come at the cost of speed and throughput. As the network grew, it became obvious that Ethereum could not handle the demand on-chain. [Gas fees](https://www.nervos.org/knowledge-base/what_is_a_blockchain_gas_fee_(explainCKBot)) skyrocketed, transactions slowed, and users began looking for alternatives.

Rollups entered the picture as a way to scale Ethereum without sacrificing its core principles. In simple terms, a rollup batches and processes many transactions off-chain and posts the final data (or proof) back to Ethereum. This keeps the heavy lifting off the base layer while preserving Ethereum’s security model.

There are two main types: [optimistic rollups](https://www.nervos.org/knowledge-base/What_are_optimistic_rollups_(explainCKBot)) and zero-knowledge (ZK) rollups. 

Optimistic rollups assume transactions are valid unless proven otherwise, while ZK rollups use cryptographic proofs to verify transactions upfront. Both aim to reduce costs and congestion, but they handle validity and trust differently. Either way, rollups need a way to decide which transactions to include and in what order—a process known as sequencing.

Traditionally, rollups have operated their own sequencers. These are essentially trusted parties or systems that decide the order of transactions before finalizing them on Ethereum. While this system works, it introduces centralization risks and creates an economic layer that sits outside Ethereum’s own incentive system. Based rollups flip this model on its head.



## What Makes a Rollup "Based"?

The term "based" in based rollups refers to the idea of being fundamentally grounded in Ethereum itself. More technically, a based rollup uses Ethereum's block proposers as the sequencers of Layer 2 transactions. This is a big shift from traditional rollups, which usually appoint a separate party or mechanism to handle sequencing.

With based rollups, the same Ethereum validators who propose blocks on Layer 1 also choose the transaction ordering for the rollup. In other words, the rollup outsources its sequencing function to Ethereum's base layer. This tight integration can dramatically alter the economic and security dynamics between Layer 1 and Layer 2\.

From a design perspective, based rollups lean into Ethereum's own roadmap. As Ethereum transitions to [proposer-builder separation (PBS)](https://www.nervos.org/knowledge-base/What_is_Proposer_Builder_Separation%20_in_Ethereum_(explainCKBot)) and other MEV-mitigation strategies, based rollups aim to align with those changes rather than work around them. Instead of creating a new, potentially centralized layer of economic control on top of Ethereum, they embrace Ethereum as the foundation for ordering and inclusion. This alignment has deep implications, both positive and negative.



## Why Sequencing Matters: Power and Profits

Sequencing isn't just a technical detail—it's a position of power. Whoever controls the sequencing of transactions can influence who gets included, in what order, and at what cost. This control has real monetary value, especially when you consider [maximal-extractable value (MEV)](https://ethereum.org/en/developers/docs/mev/), where sequencers profit by reordering, inserting, or excluding transactions to their benefit.

In traditional rollups, the sequencing function is often captured by the project itself or delegated to a limited set of actors. This gives those actors outsized power over the rollup ecosystem. It also creates a new silo of economic activity that's separate from Ethereum's own validators. While this might work in practice, it introduces questions about fairness, decentralization, and long-term incentives.

Based rollups attempt to solve this by pushing the sequencing role down to Ethereum's base layer. Instead of giving a new party control, they let Ethereum proposers handle the job as part of their normal block production duties. This keeps the power and profits within Ethereum's existing validator set and avoids duplicating incentive structures.

It also has a regulatory implication: by keeping rollup sequencing within Ethereum, there's less need to build separate governance structures, token systems, or compliance strategies for Layer 2 operations. This can make based rollups leaner, more transparent, and potentially more aligned with Ethereum's ethos.



## The Role of Proposer-Builder Separation (PBS)

One of the core motivations behind based rollups is Ethereum's upcoming proposer-builder separation (PBS) upgrade. 

PBS is a proposed upgrade to Ethereum that splits the job of block production into two roles: builders, who assemble blocks and offer them to the block proposer in each slot, and proposers, who cannot see the contents of the block and simply chose the most profitable one, paying a fee to the block builder before sending the block to tis peers.

PBS is designed to combat MEV centralization and improve fairness across the network. Based rollups are designed to work in harmony with this future. By letting Ethereum proposers handle rollup sequencing, they effectively become another kind of builder-client relationship. Rollup users submit transactions to Ethereum proposers, who include them in their blocks, sequenced appropriately.

This model benefits from the transparency and competition PBS introduces. Rather than one entity owning the sequencing logic, many builders can compete to include rollup transactions in the most efficient or fair way. This creates a natural incentive for better execution without fragmenting the ecosystem into siloed rollup economies.



## Economic Alignment and Value Capture

Another key benefit of based rollups is how they align economic value between Layer 1 and Layer 2\. In traditional rollups, fees paid by users often go to the rollup sequencer or operator, not Ethereum validators. This creates a disconnect: Ethereum provides the security and data availability, but doesn't directly benefit from the fees generated by rollup usage.

Based rollups change this dynamic by making Ethereum proposers the ones who sequence transactions. This means fees paid on the rollup are ultimately captured by Ethereum validators, which boosts Ethereum’s long-term economic security.

It also reduces the risk of Layer 2s becoming financially or politically adversarial to the Layer 1\. If rollups generate significant value and keep it all for themselves, they might eventually try to minimize their reliance on Ethereum or fork away entirely. Based rollups, by contrast, are economically and structurally tied to Ethereum’s success. This alignment may not solve every governance problem, but it does reduce the chances of fragmentation or value leakage.



## Risks and Trade-Offs of Based Rollups

While based rollups offer many benefits, they are not without trade-offs. One of the main concerns is latency. Because sequencing is tied to Ethereum block production, based rollups inherit the timing of Layer 1\. This means users may have to wait longer for transaction inclusion compared to rollups with their own fast sequencers.

There's also the issue of flexibility. Traditional rollups can fine-tune their sequencing logic to support use cases like fast finality, high-frequency trading, or customized ordering. Based rollups, by deferring to Ethereum, give up some of this autonomy. This could make them less appealing for specialized applications that require bespoke performance guarantees.

Security is another consideration. While based rollups benefit from Ethereum’s validator set, they also concentrate more responsibility on proposers. If proposers become corrupted, collude, or censor transactions, it could affect rollup behavior in unpredictable ways. Mechanisms like PBS are designed to mitigate this, but they are still under development and not yet battle-tested.

Finally, there's the challenge of adoption. Based rollups represent a philosophical shift. Convincing developers and projects to give up control over sequencing may be difficult, especially if they already profit from their current setups. Based rollups ask teams to trust the Ethereum base layer more deeply, which may not appeal to everyone.



## Use Cases and Future Outlook of Based Rollups

Despite the challenges, based rollups have promising applications. They could serve as public infrastructure for DeFi protocols that want strong decentralization guarantees without managing their own sequencer logic. They might also appeal to governance-heavy systems like DAOs, where transparency and neutrality in transaction ordering are critical.

As Ethereum continues to evolve, especially with upgrades like [Danksharding](https://ethereum.org/en/roadmap/danksharding/) and stateless clients, based rollups may become more efficient and appealing. The shared roadmap between rollups and Ethereum could reduce costs, simplify integration, and foster a more cohesive user experience across layers.

Looking ahead, we may see hybrid models that combine the best of both worlds. Some projects might operate as traditional rollups in the short term but plan a migration path toward based rollup models as infrastructure matures. Others might adopt a modular approach, letting users choose between fast sequencing or Ethereum-based sequencing depending on their needs.

Ultimately, based rollups reflect a broader trend in blockchain: returning power and value to the most decentralized and secure parts of the stack. By anchoring Layer 2 systems more tightly to Ethereum, they may help build a more sustainable and unified future for decentralized applications.



## Conclusion: A New Layer of Trust

So, what are based rollups? They are a new kind of Layer 2 that shifts sequencing power from standalone operators to Ethereum’s own block proposers. This change isn’t just technical; it’s philosophical. It reflects a belief that Ethereum’s security, transparency, and economic incentives should extend into the scaling layers built on top of it.

While not a perfect fit for every use case, based rollups offer a compelling vision for the next generation of rollup design. They simplify infrastructure, improve alignment, and keep the Ethereum ecosystem cohesive as it grows. As the crypto world searches for better scaling solutions, based rollups stand out not just for what they solve, but for how they solve it—by trusting the base, and building up from there.

