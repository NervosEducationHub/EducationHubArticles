---
title: 'What Is an Eclipse Attack in Blockchain Networks?'
coverImage: 'images/image1.png'
category: Blockchain
subtitle: 'Eclipse attacks may not dominate headlines the way 51% attacks do, but their subtlety makes them no less dangerous.'
date: '2025-10-08T16:00:00.000Z'
author: 
- github:explainCKBot
---

A blockchain network is a distributed system of [nodes](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot))—computers connected via the internet—that communicate with each other to share information about transactions and blocks. This peer-to-peer (P2P) design is often praised for making blockchains resilient against censorship and attacks, but no system is entirely immune to threats.

One such threat is known as an eclipse attack. This attack doesn’t target wallets directly or exploit a weakness in cryptography. Instead, it lurks quietly in the P2P network, isolating a single node from the honest network and feeding it misinformation. This subtle yet powerful disruption can cascade into broader systemic risks, from double-spending to censorship.



## Understanding Eclipse Attacks

In Bitcoin, Ethereum, and many other blockchain networks, nodes do not rely on a central authority. Instead, they form a peer-to-peer network, where each node maintains connections to a limited number of peers. This limited connectivity means that a node is never directly aware of every other participant. Instead, it relies on its peers to relay information. For example, when a transaction is created, it is broadcast to nearby nodes, who then pass it along to others until the entire network is aware of it. Similarly, when a miner discovers a new block, that block must propagate through the network to achieve consensus.

This decentralized architecture is robust in many ways, but it also introduces vulnerabilities. If an attacker can manipulate the set of peers a victim is connected to, they can control what information reaches the victim. This is precisely the foundation of an eclipse attack.

An eclipse attack is a network-level attack in which a malicious actor monopolizes all the connections of a target node, effectively isolating it from the legitimate blockchain network. Once isolated, the victim only sees the attacker-controlled version of the blockchain. The term “eclipse” is apt: just as the moon can block sunlight from reaching Earth during a solar eclipse, the attacker’s peers block truthful blockchain information from reaching the victim.

### **Eclipse Attacks vs. 51% Attacks**

A [51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack) requires controlling more than 50% of the hash rate—the computational power used by miners to solve the cryptographic puzzle— in [proof-of-work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) blockchains, whereas an eclipse attack only requires controlling the victim’s connections. This makes eclipse attacks more resource-efficient and potentially easier for smaller attackers.

### **Eclipse Attacks vs. Sybil Attacks**

A [Sybil attack](https://www.nervos.org/knowledge-base/sybil_attacks_consensus_mechanisms_(explainCKBot)) is about creating many fake identities to overwhelm the network. Eclipse attacks often use Sybil-like strategies (deploying many fake nodes), but the ultimate goal is targeted isolation rather than global influence. It’s more surgical than systemic.

### **Eclipse Attacks vs. Partition Attacks**

A blockchain partition attack usually divides a blockchain network into two or more separate components, preventing communication and leading to inconsistencies, double-spending, and[ forks](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork_(explainCKBot)) in the blockchain ledger. Eclipse attacks are like sniper shots at individuals, often used as stepping stones toward larger exploits.



## How Eclipse Attacks Work

Nodes usually maintain a certain number of incoming and outgoing connections (for example, Bitcoin Core by default will not make more than 8 outgoing connections). The attacker’s goal is to fill all of these connection slots with their own malicious nodes.

The steps of an eclipse attack:

1. **Preparation**: The attacker deploys many malicious nodes (sometimes thousands). These nodes are spread across different IP addresses and subnets to avoid easy detection.
2. **Connection**: The attacker overwhelms the victim by trying to establish multiple connections. When the victim restarts or refreshes its connections, it unwittingly connects mostly or entirely to the attacker’s nodes. If the victim already has honest peers, attackers may try eviction strategies—forcing disconnections through techniques like flooding with malformed traffic—so that their own nodes fill the vacant slots.
3. **Isolation**: Once a victim's connections are attacker-controlled, the victim is effectively cut off from the real network. The attacker maintains the eclipse by constantly refreshing those connections and preventing any honest peers from slipping through.
4. **Manipulation**: The attacker now decides what information the victim sees. They can delay block propagation, hide certain transactions, or even feed the victim an alternate blockchain. From the victim’s perspective, everything looks normal. Blocks arrive, transactions flow, and the network seems alive. Yet all of this data is curated and controlled by the attacker.

The lifecycle of an eclipse attack can last minutes or hours, depending on the attacker’s goal. What matters is that the victim is blind during that window.



## Motivations Behind Eclipse Attacks

Eclipse attacks exploit social and economic incentives:

- **Double Spending**: An attacker could isolate a merchant’s node, feed it a false transaction, and then spend the same coins elsewhere in the real network. The merchant, unaware of the real blockchain, accepts the fraudulent payment.

- **Selfish Mining**: In a mining context, isolating a miner allows the attacker to manipulate block propagation. The victim miner might waste resources mining on stale or irrelevant blocks while the attacker secretly works on the longest chain.

- **Censorship and Delay**: Attackers may prevent specific transactions from reaching a victim or delay the propagation of certain blocks, effectively censoring information.

- **Strategic Advantage**: In some cases, attackers may simply want to disrupt competitors, slow down rival miners, or destabilize the network to gain influence.

These motivations highlight that eclipse attacks are not always about immediate financial theft. They can also be strategic tools in the complex game of blockchain economics.



## Consequences of Eclipse Attacks

The impact of an eclipse attack depends on the target and the attacker’s goals. For ordinary users, the most immediate risk is accepting invalid transactions or blocks. For merchants, it could mean financial loss from double-spending. For miners, it could result in wasted resources and reduced profitability.

On a systemic level, repeated or large-scale eclipse attacks could erode trust in a blockchain. Even if the cryptographic foundations remain intact, users must trust that the network itself fairly propagates information. If that trust is compromised, adoption and confidence in the blockchain may decline.

In extreme cases, eclipse attacks could serve as stepping stones for larger exploits. For example, isolating enough miners could pave the way for selfish mining or chain reorganizations, which might destabilize the network’s consensus.

Variants of eclipse attacks add nuance. A connection reset attack can continually disrupt honest peers to guarantee attacker dominance. Time dilation attacks use eclipse techniques to slow down block propagation to a miner, subtly reducing its effectiveness. In the [Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) or other layer-2 protocols, eclipse attacks can be used to stall or misroute [payment channels](https://www.nervos.org/knowledge-base/ultimate_guide_to_payment_channels).



## Defenses and Mitigations

While no defense is perfect, the combination of following measures raises the cost and difficulty of executing eclipse attacks, making them less practical at scale.

- **Peer Diversity**: Nodes can be programmed to connect across a wide range of IP addresses and subnets, making it harder for attackers to monopolize all connections.

- **Connection Limits**: Restricting the number of connections from a single IP range reduces the risk of flooding by malicious peers.

- **Peer Rotation**: Regularly changing peers ensures that attackers cannot maintain control indefinitely.

- **Stronger Peer Selection Algorithms**: By carefully evaluating which nodes to connect to, and avoiding suspicious patterns, nodes can better resist attacks.

- **Network-Level Defenses**: Tools like firewalls, rate-limiting, and blacklisting of suspicious peers can reduce exposure.

If an eclipse attack is suspected, the remedy often begins with drastic action: restarting the node, clearing peer lists, or reconnecting through a different network interface. Operators may also rotate IP addresses, increase outbound slots, or use VPNs and Tor to diversify connection sources.

No single measure guarantees safety. What matters is defense in depth: layering best practices, monitoring, and awareness so that even if an attacker succeeds briefly, they cannot maintain control.



## Conclusion

Eclipse attacks may not dominate headlines the way 51% attacks do, but their subtlety makes them no less dangerous. By isolating a node from the honest network, an attacker gains the power to distort reality for that victim. The consequences can be theft, wasted computation, censorship, or systemic distrust.

Over the past decade, researchers and developers have steadily hardened protocols, introduced new defenses, and raised awareness. Yet as long as blockchain networks rely on peer-to-peer architectures with limited connections, the risk cannot be fully eliminated. Vigilance, diversity, and continued research are essential.
