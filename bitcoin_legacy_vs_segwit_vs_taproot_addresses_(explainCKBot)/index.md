---
title: 'Bitcoin Legacy vs. SegWit vs. Taproot Addresses: A Beginner’s Guide to Bitcoin Address Formats'
coverImage: 'images/image1.png'
category: Bitcoin
subtitle: 'As Bitcoin grows into a global asset used for payments, savings, and innovation, understanding its address format matters more than many beginners realize.'
date: '2025-12-29T16:00:00.000Z'
author: 
- github:explainCKBot
---

Bitcoin has evolved dramatically since its creation, and its address formats have transformed alongside it. Today, there are three main types of Bitcoin addresses: Legacy, SegWit, and Taproot. Each generation was designed to solve specific problems, improve performance, and unlock new features.

As Bitcoin grows into a global asset used for payments, savings, and innovation, understanding its address format matters more than many beginners realize. The address type they choose can directly impact their transaction costs, privacy, and access to Bitcoin's latest features.



## What Bitcoin Addresses Actually Are

Bitcoin addresses can be understood as unique digital mailboxes where people can receive Bitcoin. However, these addresses don't actually “store” coins. Instead, they point to specific conditions on the Bitcoin blockchain that determine how those coins can be spent. Each new address format introduces more efficient and flexible spending conditions, so understanding the differences helps explain how Bitcoin matured over time.

In the early days, there was only one address format, now known as Legacy. It served the ecosystem well but carried limitations: higher fees, bulkier transaction data, and little flexibility for future development. As network usage grew, so did pressure for more efficient transactions. This challenge gave rise to SegWit and eventually Taproot.



## Legacy Addresses (P2PKH)

Legacy addresses, also called P2PKH (Pay-to-Public-Key-Hash), are the original Bitcoin addresses. They usually start with the number “1”. When Satoshi Nakamoto launched Bitcoin, this format was the default and only option available.

Legacy addresses come from the conversion of public keys, and spending the funds in a Legacy address requires a valid signature from the matching private key. This method was secure for its time and easy to understand. The simplicity helped Bitcoin gain traction among early adopters who were experimenting with digital money long before it was mainstream.

However, Legacy addresses revealed several drawbacks as Bitcoin grew. Transactions using them take up more block space, which increases network fees, especially during times of traffic. Blocks have limited room, and Legacy transactions often require more space for signatures and data. This inefficiency became more noticeable as Bitcoin adoption widened, especially during 2017’s network congestion. Higher fees made Bitcoin harder to use for everyday payments.

Another limitation is that Legacy addresses do not support many modern Bitcoin features and improvements that were introduced after the [SegWit upgrade](https://en.wikipedia.org/wiki/SegWit).

Today, most wallets and exchanges often apply higher fees or discourage sending Bitcoin to Legacy addresses. While they still function perfectly and remain fully compatible with the Bitcoin network, they're no longer the optimal choice for most users.



## SegWit Addresses

SegWit, short for Segregated Witness, arrived as a major upgrade in 2017. It addressed a pressing problem at the time: transaction malleability and rising fees. With more users joining the network, Bitcoin’s limited block space became a bottleneck. SegWit introduced a clever way to reorganize transaction data, separating signature information (“witness data”) from other parts of the transaction. This change made it possible for blocks to fit more transactions without raising the block size limit.

SegWit addresses exist in two main variants: Nested SegWit and Native SegWit.

- **Nested SegWit** addresses begin with the number “3”. They package SegWit functionality inside a traditional P2SH (Pay-to-Script-Hash) structure, allowing older wallets to interact with SegWit addresses without requiring full protocol upgrades. This design served as an important bridge that helped SegWit adoption grow gradually across the network. Transactions from Nested SegWit addresses are smaller and less expensive than Legacy ones, but not as efficient as fully native SegWit transactions.

- **Native SegWit** addresses begin with “bc1”. They provide better error detection, avoid mixed case characters, and support higher efficiency within transactions. Native SegWit transactions reduce fees significantly compared to Legacy transactions because they fully benefit from the segregation of witness data. Many modern wallets now default to generating Native SegWit addresses for Bitcoin transactions.

By reducing transaction size, SegWit lowers fees, making Bitcoin more practical for everyday use. This improvement also indirectly supports technologies such as the [Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) (LN), which relies heavily on SegWit for channel operations. Lightning Network is a layer-2 scaling solution built on top of Bitcoin to enable faster and cheaper transactions.

Beyond efficiency, SegWit also improved security. The cleanup of the transaction structure made it much harder for attackers to modify parts of a transaction without breaking its validity. This stability laid the groundwork for future innovation.



## Taproot Addresses (P2TR)

Taproot, activated in 2021, represents the most advanced address format currently available on Bitcoin. Taproot addresses typically begin with “bc1p”. They build upon SegWit’s efficiency improvements while offering a much more flexible system for smart contracts and complex spending conditions.

Taproot’s core idea is that complex transactions should look as simple as regular ones. If someone uses a [multisignature wallet](https://www.nervos.org/knowledge-base/what_is_a_multisig_wallet_(explainCKBot)) or a complicated contract that allows spending under several different conditions, Taproot makes that transaction appear on-chain as if it were a simple one-signature payment. This approach protects privacy and reduces fees. Observers cannot easily tell whether a user is performing a simple transaction or using a more advanced contract, which keeps the blockchain cleaner and more private.

The cryptographic technique behind Taproot is called [Schnorr signatures](https://www.nervos.org/knowledge-base/schnorr_signatures_(explainCKBot)). Schnorr signatures allow multiple signatures to be combined into one. By aggregating these signatures, the network saves space and strengthens privacy. This makes Taproot an enormous step forward for developers who want to build more sophisticated applications directly on Bitcoin without revealing unnecessary details on-chain.

Taproot also opens the door for new contract designs that were previously awkward or expensive to implement. For example, partial spending conditions or time-locked features can be made more efficient. The benefits may not always be visible to newcomers right away, but the upgrade fundamentally expands Bitcoin’s potential. Developers now have a flexible foundation to build next-generation protocols, sometimes referred to as “Bitcoin-native smart contracts”.

While Taproot adoption is growing, it is still newer and less universal than SegWit. Some exchanges and older wallets may not fully support Taproot addresses yet. As adoption continues, these limitations are expected to fade.



## Comparing Legacy, SegWit, and Taproot

A comparison of Legacy, SegWit, and Taproot addresses reveals several important differences that affect efficiency, fees, security, and compatibility.

One of the most critical differences is transaction size. Legacy transactions occupy significantly more space because the witness data remains inside the main body of the transaction. SegWit reduces transaction size by moving the witness data into a separate structure. Taproot enhances efficiency even further through signature aggregation and more compact script representation.

Fees correlate closely with transaction size. Larger transactions consume more block space and therefore incur higher fees. Legacy addresses create the largest transactions. SegWit lowers them significantly. Taproot offers the greatest potential for fee savings, especially when complex scripts or multi signature arrangements are involved.

Security differs as well. Legacy was limited by vulnerability to transaction malleability. SegWit resolves this issue by removing signature data from the components used to compute the transaction ID. Taproot further enhances security through the use of Schnorr signatures, which are based on well studied cryptographic primitives and offer strong resistance to known attack vectors.

Compatibility is another major differentiator. Legacy addresses enjoy universal support across all Bitcoin wallets, exchanges, and services. SegWit addresses now have widespread adoption among major platforms. Taproot addresses, however, face more limited support, though adoption is growing. Some exchanges still don't allow withdrawals to Taproot addresses, and some older wallets cannot send to them.

Overall, SegWit and Taproot clearly outperform Legacy in efficiency and security. Taproot outperforms both in privacy and potential smart contract flexibility. But the decision to adopt a newer address format often depends on ecosystem support and user requirements.



## Which Address Format Should Beginners Use?

Beginners often wonder which type of address is best. While Legacy addresses function reliably, they rarely provide any advantage today. SegWit and Taproot are generally recommended. SegWit offers the best mix of compatibility, low fees, and reliability. Taproot offers the latest improvements, though support still varies from platform to platform.

For most newcomers, a native SegWit address (starting with “bc1”) is the most balanced choice. It enjoys near-universal support and provides all the key benefits of SegWit’s efficiency. Many exchanges and hardware wallets now default to SegWit for this reason.

Legacy should be used mainly when dealing with older wallets or systems that cannot process newer formats. Most people will rarely encounter such situations unless interacting with archival or specialized software.

Taproot is ideal for users who want the most modern features and are using updated wallets or services. Developers, privacy-focused users, and individuals experimenting with Bitcoin smart contracts will find Taproot highly attractive. As the ecosystem matures, Taproot addresses may become the primary standard.



## Conclusion

Bitcoin’s address formats reflect an ongoing journey of improvement. Legacy addresses introduced the foundational model and served the ecosystem through its early years. SegWit modernized Bitcoin by reducing fees, increasing efficiency, and fixing transaction malleability. Taproot represents a new era of enhanced privacy, improved scalability, and greater scripting flexibility.

Each address type has strengths and weaknesses. Legacy offers compatibility, SegWit offers efficiency, and Taproot offers advanced capabilities and improved privacy. The best choice depends on service support, intended use, and long term goals.
