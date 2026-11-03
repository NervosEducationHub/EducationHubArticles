---
title: '什么是 Danksharding？以太坊的数据分片方案'
coverImage: 'images/image1.png'
category: Scaling
subtitle: 'Danksharding 是以太坊最有前景的扩容方案，旨在解决长期存在的可扩展性挑战。'
date: '2025-08-25T16:00:00.000Z'
author: 
- github:explainCKBot
---

以太坊面临扩容难题。随着越来越多的用户和应用涌入网络，区块空间的需求持续超过供给。[Gas 手续费](https://www.nervos.org/knowledge-base/what_is_a_blockchain_gas_fee)上涨、拥堵加剧，构建快速的全球结算层这一梦想，也开始不堪自身成功带来的重负。

[分片（sharding）](https://www.nervos.org/knowledge-base/what_is_sharding_in_blockchain)由此登场。这一构想从早期起就是以太坊路线图的一部分。不过，分片已发生演变，不再是最初的样子。如今，你最常听到的名称是 Danksharding。

Danksharding 是以太坊未来的扩容方案，能大幅提高 Rollup 的[数据可用性（data availability）](https://www.nervos.org/knowledge-base/what_is_data_availability_in_blockchain)。传统分片会拆分计算和状态，而 Danksharding 只专注于数据。它引入统一的区块结构，并通过市场机制决定纳入哪些数据。名称来自提出核心构想的研究人员 Dankrad Feist。这个名字听起来或许有些俏皮，背后的理念却对以太坊的未来至关重要。



## 区块链分片简史

要理解 Danksharding，先了解这一构想的来源会很有帮助。传统分片借鉴数据库理论，将系统拆分为较小的部分，即分片，每个分片负责一部分数据或计算。在以太坊早期路线图中，这意味着创建多个“小型以太坊”，各自处理自己的交易和智能合约。

理论上很有前景，但也带来了极高的复杂度。协调分片间的[状态（state）](https://www.nervos.org/knowledge-base/state_and_state_change)、实现跨分片通信，以及维护整个系统的安全，新增的问题比解决的问题还多。到 2021 年，以太坊研究人员开始将重点从计算分片转向数据分片。

为什么要转向？因为 Rollup 改变了局面。Rollup 不通过增加以太坊的计算负载来直接扩容，而是让活动在链下进行，利用以太坊提供安全性和数据可用性。这改变了以太坊对分片的需求：需要的是更多数据空间，而非更多计算。Danksharding 正是这种思路转变的产物。



## 核心思路：侧重数据，而非计算

Danksharding 颠覆了原先的分片思路。它不再试图将以太坊拆成多个有状态分片，让智能合约和交易独立运行，而是将以太坊视为一个提供大量数据存储空间的统一执行环境。

这些数据无需由以太坊直接解读。它们用于支持 Rollup，由 Rollup 在链下读取、处理，再向以太坊提交证明。这样，以太坊就成为数据可用性层，类似一块公共公告板：Rollup 可以在上面发布交易数据，供任何人查看和验证。

Danksharding 专注于数据而非执行，避免了状态分散的复杂性，同时仍能大幅提升可扩展性。以太坊基础层保持安全与统一，却可以支持数千个 Rollup 和数百万用户。



## Proto-Danksharding：第一步

以太坊实施完整 Danksharding 之前，需要先构建相应的基础设施，这正是 Proto-Danksharding（原型 Danksharding）的作用。Proto-Danksharding 也称为 [EIP-4844](https://www.eip4844.com)，是一项过渡性升级，引入了“[Blob](https://www.nervos.org/knowledge-base/what_are_blobs_in_ethereum)”的概念，即可以附加到区块上的大块二进制数据。

与普通 calldata 相比，Blob 的存储和传输成本更低，因此非常适合承载 Rollup 数据。它们不会永久保留在以太坊状态中，有助于让节点保持轻量、便于管理。临时存储并无大碍，因为 Rollup 不需要永久存储数据，只需在数据发布后，有足够时间取回并处理即可。

Proto-Danksharding 是关键的一步，因为它会测试完整 Danksharding 所依赖的许多组件。它引入新的手续费市场，改变数据传播方式，并让 Rollup 初步体验全面扩展后的数据可用性。Proto-Danksharding 上线并稳定运行后，以太坊就能朝完整 Danksharding 迈进。



## 区块构建者与 MEV 的作用

Danksharding 最具创新性的部分之一，是它改变了区块构建方式。传统分片可能会为每个分片设置独立的区块生产者，而 Danksharding 每个区块只有一名提议者（proposer），由一组构建者（builders）提供支持；构建者相互竞争，争取组装出收益最高、数据利用效率最好的区块。

这就涉及[提议者与构建者分离（Proposer-Builder Separation，PBS）](https://www.nervos.org/knowledge-base/what_is_a_digital_signature_in_blockchain)。在 PBS 模式下，区块提议者是随机选出的验证者（validators），负责从第三方构建者组装的区块中进行选择。构建者具备相应技术能力和资源，可以优化区块内容，争取最高的 [MEV（矿工可提取价值）](https://ethereum.org/en/developers/docs/mev/)，并高效利用 Blob 空间。

Danksharding 将这一模型融入设计，把数据纳入过程变成一个市场。构建者提交同时包含执行交易和 Blob 数据的区块，提议者根据特定规则和激励选择最佳区块。这种系统鼓励竞争、降低成本，并使数据可用性能够扩展。

其思路是，在容量上限之内，区块构建者会根据市场需求，尽可能纳入更多有用的 Blob 数据。随着网络证明自身可以处理更多数据，以太坊就能逐步提高这一容量。这种灵活、激励一致的模型，是 Danksharding 愿景的核心。



## 密码学基础设施：KZG 承诺与数据可用性采样

Danksharding 的一项技术挑战，是确保网络确实能够获取数据 Blob。仅发布数据承诺还不够，数据本身必须能够取回，否则 Rollup 就无法安全运作。但数据量很大时，[全节点（full nodes）](https://www.nervos.org/knowledge-base/difference_between_miner_full_node)也无法承担下载全部数据的负担。

解决办法在于 [KZG 承诺（KZG commitments）](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)和[数据可用性采样（data availability sampling，DAS）](https://www.nervos.org/knowledge-base/what_is_data_availability_sampling)等密码学工具。KZG 承诺是一种密码学指纹，让人在无需看到全部数据的情况下验证其中一部分。利用 KZG，以太坊可以对一个 Blob 作出承诺，并让其他人高效验证其中任意部分。

DAS 让[轻客户端（light clients）](https://www.nervos.org/knowledge-base/what_is_a_light_client)能够通过随机抽取许多 Blob 的少量片段，检查数据可用性。如果足够多的样本可获取且相互一致，从统计上看，整个数据集可用的概率就非常高。这样，以太坊无需让每个节点下载每个字节，也能维持强有力的数据保障。

KZG 与 DAS 共同构成以太坊可扩展数据层的支柱，使其能够纳入大量 Rollup 数据，而不导致链膨胀，也不牺牲无需依赖可信第三方（trustlessness）的特性。这些技术已经在测试和完善，是 Danksharding 实际运作不可缺少的部分。



## Danksharding 对 Rollup 和区块链用户的好处

Danksharding 本身并非最终目的。它旨在大幅增强以太坊 Layer 2 生态，让 Rollup 更便宜、更快、更安全。有了充足而低成本的数据空间，Rollup 就能扩展至数百万用户，无需争夺有限的 Layer 1 带宽。

这会直接影响终端用户：gas 手续费降低、交易确认加快，应用也更易用。开发者会更有信心，不必担心自己的 Rollup 因数据限制而触及发展上限。在以太坊安全性和数据保障的支持下，生态能够自然成长。

随着时间推移，Danksharding 可能帮助以太坊支持数百个，而不只是数十个 Rollup，各自服务于不同社群和用途。从游戏、社交应用，到全球金融和治理系统，只要底层基础设施能够扩展，这些应用都会更具可行性。



## Danksharding 的挑战与批评

任何升级都有取舍，Danksharding 也不例外。复杂度是一个令人担忧的问题。系统引入了新角色、新市场和新的密码学原语，要求[验证者](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators)处理 Blob 数据、构建者在多个方面展开竞争，以及轻客户端进行统计采样。

协调也是一项挑战。Danksharding 依赖 PBS 和 Proto-Danksharding 等其他升级成功实施。某个组件如果失败，或产生意料之外的副作用，就可能拖慢整个路线图的推进。

批评者还指出，“Danksharding”这个名字体现了以太坊文化中有时封闭、带调侃意味的一面。许多人觉得亲切，也有人担心这种命名方式会让外界更难严肃看待这个生态。

尽管存在这些担忧，大多数研究人员和开发者仍认为，Danksharding 是通向可扩展且安全的以太坊 Rollup 最现实的道路。它专注数据而非执行，让基础层保持精简，同时支持开发者在其上构建复杂应用。



## 展望未来

随着以太坊朝实现 Danksharding 迈进，网络正将自身定位为全球数据层，而不只是智能合约平台。Rollup 成为执行引擎，以太坊则提供它们运行所需的信任、可用性和中立性。

从长远来看，Danksharding 可能使交易吞吐量达到每秒 100,000 笔乃至更高。这将使以太坊从拥挤的城镇广场变为广阔的大都市，Layer 2 则像由共享公共账本连接的各个城区。

未来的创新可能在 Danksharding 之上继续发展，例如递归 Rollup、去中心化 Blob 市场，以及更先进的抗审查能力。但基本原则不变：以太坊通过为他人提供构建工具来扩容，而不是自己包办一切。



## 结语：重新构想分片

那么，什么是 Danksharding？它是以太坊面向 Rollup 时代重新设计的可扩展性解决方案。它放弃了复杂的计算分片，转而采用单一、统一的数据层，大规模支持去中心化应用。

通过聚焦数据可用性、采用市场激励并依靠密码学保障，Danksharding 为以太坊的长期成功打下基础。它增强网络，而不将网络割裂，也由此为 Rollup 提供成长所需的空间，让它们始终与以太坊相连。
