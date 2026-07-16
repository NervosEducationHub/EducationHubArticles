---
title: 'What is the Nakamoto Coefficient?'
coverImage: 'images/image1.png'
category: Blockchain
subtitle: 'Decentralization, one of the most praised goals in the crypto industry, is also one of the hardest to define and measure.'
date: '2025-10-28T16:00:00.000Z'
author: 
- github:explainCKBot
---

Many blockchains claim to be decentralized, but few have the means to quantify it. 

The Nakamoto Coefficient is one of the most straightforward ways to do it. It offers a simple numerical metric that expresses how decentralized a blockchain network truly is.



## What is the Nakamoto Coefficient?

The term “Nakamoto Coefficient” was popularized by Balaji Srinivasan and Leland Lee in their 2017 essay [*Quantifying Decentralization*](https://news.earn.com/quantifying-decentralization-e39db233c28e), which sought to translate the vague notion of “distributed power” into something measurable. 

The idea is simple yet powerful, answering one of the most critical questions regarding blockchain design: *How many independent entities would have to collude to take control of a network?*

This straightforward question cuts right through the heart of the issue. If only a few entities can easily collude and take over your protocol, then nothing else, including the number of users, nodes, miners, validators, developers, sequencers, and RPCs, matters.



## How to Calculate the Nakamoto Coefficient

Nakamoto Coefficient identifies the minimum number of entities required to control a blockchain network. 

This threshold varies depending on the consensus mechanism. For [Proof-of-Work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) blockchains like Bitcoin, the critical threshold is typically 51% of the network's hashing power, as this would enable [double-spending attacks](https://www.nervos.org/knowledge-base/what_is_51_attack) and allow manipulation of the transaction history. 

For Proof-of-Stake chains like Ethereum, the threshold may be lower (e.g., 33%, since 33% of stake can block consensus in some protocols and cause significant disruption). But in practice, many analyses still use 50% as a conventional threshold for simplicity.

However, since decentralization isn’t that simple, the Nakamoto Coefficient also takes into account various subsystems within a blockchain ecosystem. Balaji originally proposed six key dimensions:

- Mining (by reward)
- Client (per code base)
- Developers (by software commits)
- Exchanges (by trading volume)
- Nodes (by number)
- Ownership (by address)

Each subsystem offers a different perspective on decentralization, recognizing that control can be concentrated in different aspects of a network's operation. A blockchain might appear decentralized in one dimension while being highly centralized in another—for instance, having many node operators but relying on a single development team for code updates.

The process for calculating the coefficient involves ordering entities within a subsystem by their controlling share (whether of mining power, stake, or other relevant resources), then counting how many are needed to collectively exceed the critical threshold for that subsystem. 

The resulting number is the Nakamoto Coefficient for that particular dimension. The overall coefficient for a blockchain is typically considered to be the lowest number across all measured subsystems, representing the network's most vulnerable point of centralization.

Platforms like [Chainspect](https://chainspect.app/dashboard/decentralization) and the [EDI Dashboard](https://blockchainlab.inf.ed.ac.uk/edi-dashboard/consensus) provide real-time estimates of the Nakamoto Coefficient across major blockchains.



## Why Nakamoto Coefficient Matters

The Nakamoto Coefficient isn’t just a vanity metric. It has profound implications for how blockchain ecosystems are designed, governed, and secured.

A higher coefficient implies greater decentralization, meaning more independent actors would have to coordinate to disrupt the system. This translates to higher resilience against collusion, censorship, and single points of failure.

For protocol designers, the Nakamoto Coefficient serves as a diagnostic tool. It helps them spot and potentially avoid unhealthy concentrations of control (e.g., a single mining pool forming a monopoly, or a couple of dominant validators forming a cartel) early on.

For investors and analysts, it’s a risk assessment metric; a low Nakamoto Coefficient may signal systemic vulnerability. For instance, if a single mining pool controls over half of a blockchain’s hashrate, the chain might be theoretically vulnerable to [a 51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack).

For stakers, this information helps determine where to delegate. Choosing less powerful validators or smaller liquid staking protocols, for example, can indirectly help improve the Nakamoto Coefficient and strengthen the network.

Regulators and researchers can also use the Nakamoto Coefficient to benchmark blockchains and compare their decentralization levels in a standardized way. It provides a quantitative basis for discussions that were once purely ideological.



## Limitations and Critiques

Nakamoto Coefficient captures only a snapshot of a single moment, missing future dynamics, latent collusion, or changing interests. Because stake, mining power, and governance weights shift, the coefficient can miss transitional vulnerabilities.

It also overlooks many other dimensions of decentralization—like software client diversity, node geographical distribution, latency, infrastructure (e.g. who hosts nodes), inter-dependencies, and token ownership outside staking. A blockchain may have hundreds of validators, but if they all run the same software or operate from one country, true decentralization remains questionable.

Defining what counts as an “entity” adds further ambiguity. Should multiple validator nodes controlled by one operator count as one or many? Should a mining pool that coordinates independent miners be treated as a single actor? These gray areas open the door to inconsistent interpretations and gaming.

Statistical uncertainty is another issue, especially in proof-of-work systems where mining power is estimated over time. Short sampling windows lead to error. A 7-day or longer window may produce more reliable estimates. Therefore, a computed coefficient is more like a confidence range than a precise integer.

Lastly, the choice of threshold (commonly 50%) isn’t universal. Some protocols use one-third or two-thirds as their critical limit, so comparing coefficients across systems can be misleading.



## Conclusion

The Nakamoto Coefficient offers a compelling and intuitive framework for quantifying decentralization in blockchain systems. By asking, “How many independent entities would need to collude to control the system?” it reduces a complex phenomenon into a tangible metric.

Yet, as with all metrics, it must be used thoughtfully. It captures only a few dimensions of decentralization, is a snapshot rather than a trend, and relies on clear definitions of “entity” and control. Pairing it with other measures, like Gini coefficients, client diversity, or node geography, provides a more holistic view.
