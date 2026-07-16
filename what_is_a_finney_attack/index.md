---
title: 'What Is a Finney Attack?'
coverImage: 'images/image1.png'
category: Education
subtitle: 'A Finney attack is a narrowly scoped but conceptually powerful example of how double-spending can occur in PoW blockchains under specific conditions.'
date: '2026-02-23T16:00:00.000Z'
author: 
- github:explainCKBot
---

A Finney attack is a specific type of [double-spending](https://en.wikipedia.org/wiki/Double-spending) attack that can occur in blockchain-based payment systems, particularly those relying on [Proof-of-Work](https://www.nervos.org/knowledge-base/pow_vs_pos_unravelling_(explainCKBot)) (PoW) consensus mechanisms. In simple terms, a Finney attack exploits the time gap between when a transaction is broadcast to the network and when it is confirmed in a block, allowing an attacker who controls mining power to spend the same coins twice under carefully prepared conditions.

The concept was first described by [Hal Finney](https://en.wikipedia.org/wiki/Hal_Finney_(computer_scientist)), one of Bitcoin’s earliest developers and contributors, which is why the attack bears his name. It represents an important theoretical and practical lesson in understanding blockchain security, [transaction finality](https://www.nervos.org/knowledge-base/What_is_finality_crypto_(explainCKBot)), and the assumptions that underpin trust in decentralized systems.



## Understanding Double-Spending in Blockchain Networks

Double-spending refers to the risk that a crypto token might be spent more than once. Traditional financial systems prevent this through centralized ledgers maintained by banks or payment processors. Blockchain systems solve this problem through distributed consensus, in which a network of independent [nodes](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot)) agrees on a shared transaction history.

In PoW blockchains like Bitcoin, transactions are grouped into blocks, and miners compete to add these blocks to the chain by solving cryptographic puzzles. Once a transaction is included in a block and that block becomes part of the longest valid chain, the transaction is considered confirmed. Each additional block built on top of it increases confidence that the transaction will not be reversed. This mechanism is effective, but it is not instantaneous. Between the moment a transaction is broadcast and the moment it is confirmed, there is a window of uncertainty.

Double-spending attacks exploit this window. They attempt to create conflicting transactions that spend the same inputs and manipulate which one the network ultimately accepts. Some attacks rely on speed, others on network positioning, and others on mining power. The Finney attack belongs to the category of attacks that rely on pre-mining a block and strategically releasing it at the right moment. It is more sophisticated than simple race attacks, yet less powerful than [a 51% attack](https://www.nervos.org/knowledge-base/what_is_51_attack).



## What Is a Finney Attack?

A Finney attack is a type of double-spending attack and is best understood as a targeted, opportunistic attack rather than a systemic threat. It exploits trust assumptions around unconfirmed transactions and highlights why confirmation policies are a fundamental part of blockchain security.

The mechanics of a Finney attack unfold in a precise sequence, and each step is critical to its success. First, the attacker prepares two transactions that spend the same coins. One transaction sends the coins back to an address controlled by the attacker. The other transaction sends the coins to the merchant in exchange for goods or services. At this stage, neither transaction has been broadcast.

Next, the attacker begins mining a block privately. This block includes the self-payment transaction but excludes the merchant transaction. The attacker does not broadcast this block to the network after it is mined. Instead, it is kept hidden. This step is the most resource-intensive and uncertain part of the attack, because mining a block requires computational power and time, with no guarantee of success.

Once the attacker has successfully mined a block containing the self-payment transaction, the attack enters its execution phase. The attacker goes to the merchant and broadcasts the second transaction, which pays the merchant. From the merchant’s perspective, this transaction appears valid and unspent. If the merchant accepts zero-confirmation transactions, the goods or services are delivered immediately.

Finally, after the merchant has accepted the transaction, the attacker broadcasts the previously mined block to the network. Because this block is valid and extends the existing chain, the network accepts it. The merchant’s transaction now conflicts with a confirmed transaction and is rejected by the network. The result is that the attacker retains the coins while also having received the goods.

Each step relies on specific assumptions about network behavior, confirmation policies, and mining incentives. If any assumption fails, the attack collapses. This fragility is why Finney attacks are largely theoretical attack vectors, yet their existence remains important for understanding blockchain risk.



## Conditions Required for a Successful Finney Attack

A Finney attack is only possible under a narrow set of conditions, which significantly limits its practicality. The most important requirement is that the attacker must be a miner with sufficient hash power to mine a block within a reasonable timeframe. While majority control is not required, having a very small share of hash power makes the attack economically unrealistic, as the attacker might wait months or years to mine a single block.

Another critical condition is the victim's acceptance of zero-confirmation transactions. If the merchant waits for even one confirmation, the attack becomes far more difficult because the attacker would need to outpace the rest of the network after releasing the private block. In practice, many high-value transactions require multiple confirmations precisely to guard against this risk.

Network latency and propagation also matter. The attacker’s private block must not be overtaken by another block mined by the honest network before it is released. If another miner finds a block first, the attacker’s private block may become stale or orphaned, rendering the attack useless and costly.

Finally, the value of the goods or services must justify the cost and risk of the attack. Mining a block consumes electricity and [hardware resources](https://www.nervos.org/knowledge-base/crypto_mining_hardware_(explainCKBot)). If the reward from the double-spend is lower than the expected mining reward or the opportunity cost, rational attackers are unlikely to attempt it. These economic constraints are a core reason PoW systems remain secure despite known theoretical attacks.



## Mitigations and Defensive Strategies

Waiting for confirmations–which is a very common practice–is the most effective mitigation against Finney attacks. Each confirmation exponentially reduces the probability that a transaction can be reversed by a single miner. Even a single confirmation significantly increases the cost and complexity of an attack.

Beyond confirmations, monitoring tools can detect suspicious behavior, such as miners withholding blocks or unusual transaction patterns. While these signals are imperfect, they add layers of defense. Some systems also use risk-based models, where transaction size determines the required confirmation depth.

At the protocol level, alternative consensus mechanisms, such as Proof-of-Stake (PoS), change the dynamics of attacks like the Finney attack but introduce different trade-offs and additional threat models. No system is perfectly secure, but thoughtful design and conservative assumptions dramatically reduce risk.



## Conclusion

A Finney attack is a narrowly scoped but conceptually powerful example of how double-spending can occur in PoW blockchains under specific conditions. By pre-mining a block and exploiting zero-confirmation acceptance, an attacker can reverse a transaction without controlling the entire network. As a largely theoretical attack vector, it highlights fundamental truths about blockchain security, transaction finality, and economic incentives.

Understanding the Finney attack helps demystify the idea that blockchain transactions are instantly final or absolutely irreversible. Instead, it reveals a system where trust emerges over time, shaped by probability, incentives, and collective agreement.
