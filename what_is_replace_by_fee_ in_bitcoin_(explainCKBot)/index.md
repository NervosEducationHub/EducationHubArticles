---
title: 'What Is Replace-by-Fee (RBF) in Bitcoin?'
coverImage: 'images/image1.png'
category: Bitcoin
subtitle: 'RBF is a practical and powerful mechanism that strengthens Bitcoin’s flexibility.'
date: '2025-12-30T16:00:00.000Z'
author: 
- github:explainCKBot
---

Replace-by-Fee, or RBF, is a mechanism in Bitcoin that allows an unconfirmed transaction to be replaced with a new version that includes a higher transaction fee.

This feature exists to help transactions compete for limited block space. It gives senders a way to speed up confirmation when network congestion becomes a problem. At its core, RBF is a tool that helps the Bitcoin network remain flexible and efficient, especially when the [mempool](https://www.nervos.org/knowledge-base/mempool_in_cryptocurrency_(explainCKBot)) becomes crowded and [miners](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)) prioritize transactions with higher fees.



## Understanding the Basics of Bitcoin Transactions

A Bitcoin transaction is essentially a signed message that transfers value from one party to another. Once it is broadcast to the network, miners decide whether or not to include it in the next block. Their decision depends heavily on the fee attached to the transaction, since miners prefer transactions that maximize their rewards.

The Bitcoin mempool serves as a waiting area for all pending transactions. When network activity increases, thousands of transactions compete for limited block space. Low-fee transactions may sit unconfirmed for long periods, sometimes for hours or even days. During heavy congestion, a competitive fee becomes the most effective way to secure a timely confirmation.

Early in Bitcoin’s history, fee selection was treated as final once a transaction was broadcast. There was no straightforward way to increase a fee after the fact. This frustrated users, especially when a low-fee transaction became stuck in the mempool.

RBF was introduced as a solution. It provides a predictable, safe method for modifying an unconfirmed transaction so that it can better adapt to changing network conditions.



## What Is Replace-by-Fee (RBF)?

RBF is a feature that allows an unconfirmed Bitcoin transaction to be replaced with a new transaction that pays a higher fee. This transaction essentially overwrites the old one, giving miners a stronger incentive to include it in the next block.

The earliest form of RBF was introduced by Bitcoin’s creator, Satoshi Nakamoto, who designed an opt-in mechanism that allowed transactions to be replaced under certain conditions. Over time, the concept was refined, modernized, and formalized into what is now known as “opt-in RBF” in [BIP 125](https://en.bitcoin.it/wiki/BIP_0125) (Bitcoin Improvement Proposal 125).

The core purpose of RBF is fee bumping. When a transaction lingers in the mempool because its fee is too low, the sender can issue a replacement with a higher fee. This keeps transactions from getting stuck and helps the Bitcoin fee market function efficiently. By enabling senders to correct underpriced fees, RBF has become an essential part of modern Bitcoin transaction management, especially during periods of high demand.



## Types of RBF: Opt-In vs. Full RBF

RBF comes in two main forms: Opt-in RBF and Full RBF. Each represents a different philosophy regarding how flexible Bitcoin transactions should be before confirmation.

Opt-in RBF is the most widely used form. Under this system, a transaction is eligible for replacement only if it signals its replaceability. This signal is embedded in the sequence number field. As a result, most transactions remain final upon broadcast unless the sender explicitly chooses otherwise. This preserves traditional expectations around [transaction finality](https://www.nervos.org/knowledge-base/What_is_finality_crypto_(explainCKBot)) while still offering flexibility for those who want it.

Full RBF, by contrast, permits any unconfirmed transaction to be replaced, regardless of whether it signals replaceability. This version treats all mempool transactions as incomplete until confirmed, giving senders maximum flexibility to modify their fees at any time.



## How RBF Works Behind the Scenes

RBF works through a combination of transaction structure, mempool policy, and node rules. At the base layer, each Bitcoin transaction includes a field called [nSequence](https://bitcoinwiki.org/wiki/nsequence). This sequence number originally related to locktime, but BIP 125 uses it to signal replaceability. If the sequence number is set below a certain threshold, the transaction becomes the opt-in RBF. Nodes interpret it as permission to consider replacements.

A replacement transaction must follow strict rules. It must pay a higher fee rate and a higher absolute fee. It must also spend at least one of the same inputs as the original transaction. This prevents users from replacing unrelated transactions in a way that could disrupt network behavior. The new transaction must not introduce conflicts that violate node policy. These requirements make RBF predictable and reduce the chance of abuse.

Node policies differ slightly. Opt-in RBF follows BIP 125 precisely. Full RBF, used by some nodes, allows replacement even without opt-in signaling. In full RBF configurations, the first-seen rule does not apply, so any higher-fee transaction can replace a lower-fee one before confirmation. Some experimental variants require replacements to keep outputs the same, or they delay replacement after a certain age. Although full RBF is controversial, it remains a policy decision each node operator can choose independently.

The mempool plays a central role. When a node receives a replacement transaction, it checks the BIP 125 rules or its configured policy. If the replacement is acceptable, it removes the old transaction from the mempool and adds the new one. The new transaction then propagates across the network. Miners see the higher fee and typically choose it over the older version. When the new transaction enters a block, the original is permanently discarded.



## RBF and Zero-Confirmation Transactions

A zero-confirmation (zero-conf) transaction in Bitcoin refers to a transaction that has been broadcast but not yet included in a block. Some merchants historically accepted zero-conf payments to achieve fast checkout experiences, particularly in retail. However, these transactions carry inherent risks because they are not part of the distributed ledger until miners confirm them.

RBF affects zero-conf payments in a significant way. If a zero-conf payment signals replaceability, it can be replaced before confirmation. This makes it unsuitable for payment scenarios that depend on immediate and irreversible finality.

Even without RBF, zero-conf payments remain vulnerable to [double-spending](https://en.wikipedia.org/wiki/Double-spending) attempts, since a sender can create another transaction spending the same coins, hoping that miners will accept the second version instead of the first. RBF does not create this risk, but it does formalize and reveal it more openly, making zero-conf transactions less attractive for certain use cases.

Nowadays, some merchants continue to use zero-conf payments for low-value transactions, relying on behavioral assumptions rather than technical guarantees. In these cases, the concern around RBF becomes part of the operational decision.



## Workflows and Real Examples of RBF

RBF is straightforward to use once the wallet supports it. A user broadcasts a transaction with a standard fee. If the network becomes congested or if the transaction remains unconfirmed longer than desired, the wallet provides a button or menu option to increase the fee. The wallet then constructs a new transaction that spends the same inputs while adding a higher fee. When the user approves, the wallet broadcasts the replacement. Nodes verify the replacement, and if it meets policy requirements, they propagate it across the network.

For example, Blockchain.com’s wallet includes a [Speed Up](https://support.blockchain.com/hc/en-us/articles/19908136239900-How-to-Speed-Up-a-Stuck-Bitcoin-Transaction-Using-RBF-in-the-Wallet) button. When a transaction stalls and the user clicks the button, the wallet calculates an appropriate fee rate based on current mempool conditions, constructs a replacement, and broadcasts it automatically. This design hides technical details behind an intuitive interface, making fee bumping accessible for beginners.



## RBF vs. Other Fee-Bumping Methods

RBF is not the only method to increase Bitcoin transaction fees. Another commonly used approach is [Child-Pays-for-Parent](https://river.com/learn/terms/c/child-pays-for-parent-cpfp/) (CPFP). While both RBF and CPFP enable fee increases, they operate through different mechanisms and apply to different scenarios.

RBF modifies the original transaction by replacing it with a new version that includes a higher fee. CPFP works by creating a new transaction that spends the output of a stuck transaction. This new transaction includes a high fee to incentivize miners to process both the parent and the child together.

The most important distinction is that RBF requires the original sender to initiate the fee bump. CPFP can be used by the recipient or any party who controls an output from the stuck transaction. This difference gives CPFP an advantage in situations where the sender is unable or unwilling to modify the original transaction.

RBF tends to be more efficient when the sender controls the inputs and can simply adjust the original transaction. CPFP becomes useful when control lies with the recipient, particularly in merchant payments, exchanges, or custodial services. Together, both methods contribute to a flexible fee market that adapts to changing network conditions.



## Conclusion

RBF is a practical and powerful mechanism that strengthens Bitcoin’s flexibility. It allows unconfirmed transactions to be updated with higher fees, preventing them from getting stuck when network conditions shift.

As Bitcoin continues to grow and block space becomes more valuable, flexible fee management becomes increasingly important. RBF contributes directly to this evolution. It offers a practical way to navigate fluctuating fees, and it strengthens the overall efficiency of the Bitcoin network.
