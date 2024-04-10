---
title: 'Understanding Bitcoin Layer 2 with RGB++ Protocol'
coverImage: 'images/image1.jpg'
category: BTCKB
subtitle: 'This article has been quoted from [WuBlockchain](https://wublock.substack.com/p/understanding-bitcoin-layer-2-with?utm_source=profile&utm_medium=reader2)'
date: '2024-03-28T16:00:00.000Z'
author: 'GaryMa, Wu Blockchain'
---



Since the introduction of Ordinals & Inscription on Bitcoin, it has brought further traffic and attention to the Bitcoin network. While protocols like Ordinals significantly enhance the programmability of the Bitcoin network, they essentially just “exploit” the “op_if” opcode in Bitcoin scripts, introducing new asset issuance methods. However, Bitcoin is essentially a decentralized ledger system, and its script system lacks Turing completeness. These assets have nowhere to be applied except for trading. Therefore, to further develop and prosper the Bitcoin ecosystem, it is urgent to explore Layer 2 solutions suitable for smart contract development on the Bitcoin network.

Currently, the categories of Bitcoin Layer 2 solutions roughly include state channels (such as the Lightning Network), sidechains (such as Liquid, Merlin), Rollups (such as Rollkit), client verification (such as RGB, RGB++, Taro), and others. Among them, the most famous is the Lightning Network, which is considered an excellent choice in terms of scalability, security, and privacy. However, progress in this area seems relatively slow at the moment.

Therefore, given the current market trends, perhaps we can temporarily classify the current Bitcoin Layer 2 groups into two categories:

● EVM group: Such as Merlin, which is currently hot in staking and airdrops.

● UTXO group: A faction derived based on the UTXO model, such as CKB proposing the RGB++ protocol.

For the EVM group, it is more about using sidechain technology, that is, building a sidechain outside the Bitcoin network, crossing assets from BTC and EVM chains to Layer 2. Although this approach can significantly improve performance, it cannot achieve the security of the BTC mainnet. With the operation of staking airdrops and users’ familiarity with EVM and related L2 technologies, it is relatively easy to capture user mindshare and market share.

For the UTXO group, it belongs to a more native technical faction. CKB, the focus of this article, is a popular player in this field, and recently proposed the RGB++ extension protocol. Although the UTXO group may be relatively native and homogeneous in terms of technology, this understanding threshold makes it difficult for many people to understand the advantages of such designs. This article combines CKB, a UTXO public chain, and its related Bitcoin Layer 2 technical route to explain this type of Bitcoin Layer 2 solution to everyone.

**Technical Background: UTXO Model & RGB**

**UTXO Model and Account Model**

The account model is easier to understand, just like a bank account, where the total amount of funds in the account is intuitively displayed as a whole balance, and the system only needs to track the balance changes of user accounts. This is the model adopted by most public chains currently, such as Ethereum, etc.

The UTXO model is closer to the scenario of cash transactions, like having many different denominations of banknotes. Each banknote can be regarded as a UTXO, i.e., money you can use. Analogous to systems like Bitcoin, when you receive Bitcoin from someone else, it’s like receiving a new banknote in your wallet; you haven’t used it to pay for anything yet, so it is “unspent.” When you make a transaction, such as using $100 to buy something worth $40, you will receive $60 in change. In Bitcoin terms, you are using your unspent UTXO ($100) to create two new UTXOs, one for the purchase ($40) and one as change for yourself ($60).

_Note: Understanding the UTXO model is key to understanding RGB and the following content._

**RGB**

Simply put, we can say that Ordinals are used to track the smallest unit of Bitcoin currency, Satoshi, and Inscription writes data content (such as images, text, or even code) into the segregated Witness zone based on this, realizing the binding of data and Satoshi, thus completing asset issuance and circulation. However, with the development of the Ordinals protocol, people gradually realized the drawbacks of storing all data on the Bitcoin mainnet, which not only incurs high transaction fees but also congests the Bitcoin network, and fundamentally cannot bring a programmable smart contract system to the Bitcoin network.

As early as many years ago, developers proposed the idea of “only putting the most important parts of the data on the chain,” which is the concept of RGB: only use the Bitcoin blockchain when necessary. The verification work for token transfers is removed from the full-chain consensus layer and placed off-chain, only verified by the client of the party receiving the payment. However, the decentralized Bitcoin network is used to prevent double spending and censorship.

Perhaps by contrasting Ordinals with RGB, readers can better understand:

● RGB binds relevant assets to UTXOs, while Ordinals go as far as binding them to the smallest unit, Satoshi.

● RGB only writes transaction commitments (i.e., a hash value) of relevant assets to the Bitcoin, and the specific verification process is performed off-chain. On the other hand, Ordinals depend entirely on the Bitcoin mainnet for all data and verification logic.

With the groundwork laid out above, we can introduce the two core technologies of RGB:

**Single-Use-Seals: Binding with UTXOs as mentioned earlier**

The asset tokens issued under the RGB protocol through RGB protocol do not exist on a specific public chain (the same goes for protocols like Ordinals/Atomicals), and each asset token related to RGB protocol must specify a specific UTXO on the Bitcoin network to correspond to it. If someone owns a specific UTXO on the Bitcoin network, they also own the RGB asset token corresponding to that UTXO as recorded in the RGB protocol. To transfer RGB-related assets, the holder needs to spend the corresponding UTXO. Since UTXOs are disposable, once spent, they are gone, corresponding to spending the RGB assets in the RGB protocol. This spending of UTXOs is the process of opening a disposable seal. The main advantage of this design is that when we need to verify a certain state of a contract, we don’t need to obtain all the block data. Each state of each contract must be attached to a certain Bitcoin UTXO, and once this state needs to be changed, the corresponding UTXO must be spent, allowing the transaction spending it to be confirmed by the blockchain. And by means of the relevant transaction information attached to the UTXO, we can trace back to the initial state of the contract, enabling us to identify the essence of this state. However, the transactions in RGB are not verified between Bitcoin nodes like Bitcoin transactions. The RGB solution is client-side validation, allowing users to verify them off-chain.

**Client-Side Validation**

Unlike the broadcast of transaction data by the Bitcoin main network and the synchronization of transaction verification records by full-network nodes, the RGB protocol places this process off-chain, and transaction information is only transmitted between senders and receivers. After verifying the transaction, the receiver only needs to record the data related to the transaction and meet the requirements of on-chain validation.

**Challenges and Difficulties Faced by RGB**

Although the RGB protocol is excellently designed, it still faces many challenges:

● Data Availability (DA) Problem: As mentioned earlier, transaction information is only transmitted between senders and receivers, and the information required for this (such as the history branches of this UTXO) is difficult for ordinary users to obtain or generate. Moreover, the data stored by each client is independent of each other, leading to data island problems and the inability to view the global state of contracts.

● P2P Network Problem: RGB transactions, as extended transactions of Bitcoin, rely on a P2P network for dissemination. When users transfer transactions, they also need to perform interactive operations, and the recipient needs to provide a receipt. All these depend on a P2P network independent of the Bitcoin network.

● Virtual Machine and Contract Languages: The virtual machine of the RGB protocol mainly uses AluVM. As a new virtual machine, it currently lacks complete development tools and practical code.

● No-Master Contract Problem: The RGB protocol currently lacks a complete solution for interaction with master (public) contracts, making it difficult to realize multi-party interactions.

**CKB Enters the BTC Layer 2 Arena with RGB++**

**CKB Transitioning to BTC L2**

CKB launched its mainnet in November 2019, adopting a PoW consensus mechanism and improving the UTXO model. CKB generalized the UTXO model and named it the Cell model. Like UTXO, a Cell is also a transaction output, but a Cell generalizes the amount in UTXO into two items: capacity and data, thus transforming a space that originally held integers into one that can hold arbitrary data.

Against the backdrop of the burgeoning Bitcoin ecosystem, CKB has formulated the BTCKB “BTC+CKB” plan, hoping to transform into the first Bitcoin Layer 2 completely isomorphic with BTC (based on PoW+UTXO).

**RGB++: RGB Extension Protocol based on CKB**

On February 13th, CKB officially released the RGB++ light paper.

RGB++ is an extension protocol based on the RGB principle. It leverages the core points of RGB, “UTXO,” and the underlying architecture of CKB, combining two key points of the RGB protocol with the architecture of CKB:

● Isomorphic Binding: UTXOs as RGB containers can be mapped and bound to CKB Cells.

● The off-chain client-side validation of RGB can be transformed into on-chain public validation of CKB, and the validation data and status can correspond to the data and type in the Cell.

In the RGB protocol, the two most important components used for ownership determination are UTXOs and commitments used for state management and single-use-seals. The isomorphic binding of RGB++ maps each Bitcoin UTXO to a CKB Cell, synchronizing ownership through the bitcoin lock, and maintains the state through the cell’s data and type.

This not only solves the challenges faced by RGB mentioned above but also endows RGB with more possibilities:

● CKB blockchain will serve as an enhanced validation client: All RGB++ transactions will appear on both the BTC and CKB chains. The former is compatible with RGB protocol transactions, while the latter replaces the client verification process. Users only need to check the relevant transactions on CKB to verify whether the state calculation of this RGB++ transaction is correct. There are no longer issues such as the DA problem or data island problem.

● Transaction Folding: By binding Bitcoin UTXOs with CKB Cells, CKB Cell verification supports Turing-complete Bitcoin UTXO transactions. If we further utilize the programmability of CKB Cells, we can correspond multiple CKB transactions to a Bitcoin RGB++ transaction, thus using the high-performance CKB chain to expand the low-speed and low-throughput Bitcoin chain.

● Non-interactive Transfers: One problem with the original RGB protocol is that the payee must be online to complete a regular transaction, increasing user understanding and product complexity. RGB++ can leverage the advantages of the Turing-complete environment to place interactive behavior in the CKB environment and use a send-receive two-step operation to achieve non-interactive transfer logic.

In summary, RGB++ inherits the core ideas of the RGB protocol, adopts different virtual machines and validation schemes, users do not need independent RGB++ clients, and only need to access Bitcoin and CKB light nodes to independently complete all verifications. RGB++ can also bring Turing-complete contract extensions and tens of times performance extensions to Bitcoin. It does not use any cross-chain bridges but native client verification solutions, ensuring security and censorship resistance.

**BTC L2 Competition: What are CKB’s Advantages? What’s the Future Plan?**

**Comparative Analysis of groups**

As mentioned earlier, based on the current market trends and heat, we can roughly divide Bitcoin L2 into “EVM group” and “UTXO group”.

● The “EVM group,” led by projects like Merlin and B², is engaging in a fierce competition of staking TVL, attempting to seize the early window of opportunity in the Bitcoin ecosystem to gain a first-mover advantage and capture market share.

● On the other hand, the “UTXO group,” led by CKB, leverages its technical prowess, being fully compatible with BTC (based on PoW+UTXO) and recognized by the Bitcoin community for its extensions like RGB. This group occupies a high ground of technical superiority, capable of bringing Turing-complete contract extensions and performance enhancements to Bitcoin without the need for cross-chain solutions. However, it might lack the immediate impact seen with staking incentives for initial adoption and ecosystem asset attraction.

**Roadmap**

CKB’s first product, RGB++, is expected to launch in early April, enabling the issuance of RGB++ assets on the Bitcoin mainnet, potentially reigniting the issuance wave seen with protocols like Ordinals/Atomicals/Runes. Therefore, it might be worth paying attention to related asset issuance tools at that time, with opportunities similar to those seen with inscriptions.

To advance the BTCKB plan, CKB has also established a company called CELL Studio. For better understanding, one could liken CELL Studio to ConsenSys in the Ethereum ecosystem, focusing on bridging the BTC and CKB ecosystems.

In terms of marketing operations, CKB will host two Bitcoin conferences:

● Bitcoin Singapore in March, with approximately 100 participants, mainly targeting those deeply interested in the Bitcoin ecosystem, with some understanding of Bitcoin technology but not fully acquainted with the latest developments.

● The WanXiang Blockchain Summit in early April, co-hosted with Bitcoin Magazine, will have a larger and more public audience.

From a long-term perspective, CKB co-founder Cipher has expressed a desire to integrate RGB++ with the Lightning Network by the end of the year. The Lightning Network will be the main battlefield for CKB’s long-term efforts. At that time, RGB++ assets can circulate in the Bitcoin ecosystem via the Lightning Network without the need for cross-chain bridges.

**Conclusion**

Previously, CKB might have been seen as an “outsider” by most people. Against the backdrop of Ethereum’s shift to PoS, CKB chose the Bitcoin technology route: PoW+UTXO. Therefore, amidst the narrative of new public chains and Rollup L2, CKB remained lukewarm. Now, with the market igniting the narrative of the Bitcoin L2 ecosystem, CKB has timely seized this opportunity. With its feature of being fully compatible with Bitcoin and the innovative RGB++ protocol, CKB has rapidly become a leading player in the current Bitcoin L2 seactor. Moreover, it is no longer solely focused on technical development but has also begun marketing operations and brand promotion, establishing the ecosystem-leading company CELL Studio. Although CKB might not be the fastest starter in the current BTC L2 market, with its technical advantages, it still has the potential to become an important part of the Bitcoin ecosystem. After all, the narrative of Bitcoin L2 doesn’t seem to be a short-lived bubble in a single cycle but rather the beginning of the expansion of the Bitcoin network ecosystem.

Reference Links:

[https://mp.weixin.qq.com/s/iMQPXFPWBpT9dQLyR8rzUg](https://mp.weixin.qq.com/s/iMQPXFPWBpT9dQLyR8rzUg)

[https://www.btcstudy.org/2023/09/12/the-potential-of-RGB-protocol/](https://www.btcstudy.org/2023/09/12/the-potential-of-RGB-protocol/)

Follow us \
Twitter:[ https://twitter.com/WuBlockchain \
](https://twitter.com/WuBlockchain)Telegram:[ https://t.me/wublockchainenglish](https://t.me/wublockchainenglish) \
