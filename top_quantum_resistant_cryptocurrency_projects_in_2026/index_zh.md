---
title: '2026 年主要抗量子加密货币项目'
coverImage: 'images/image1.png'
category: Popular 
subtitle: '从主网上线状态、密码敏捷性和迁移准备情况，比较 2026 年的抗量子加密货币区块链。'
date: '2026-07-01T16:00:00.000Z'
author: 
- github:nervosnetwork
---

[容错量子计算（fault-tolerant quantum computing）](https://en.wikipedia.org/wiki/Fault_tolerant_quantum_computing)给主要区块链带来了长期安全挑战。大多数传统网络仍依赖椭圆曲线密码学，包括 [ECDSA](https://www.nervos.org/knowledge-base/understanding_ECDSA)、EdDSA 或相关签名方案。一旦出现足以威胁密码系统的量子计算机，这些方案就可能容易受到[肖尔算法（Shor’s algorithm）](https://en.wikipedia.org/wiki/Shor%27s_algorithm)的攻击。

这并不意味着每条区块链如今面临的风险相同。有些网络从一开始就围绕后量子密码学（post-quantum cryptography）设计；有些则在研究从经典签名迁移到后量子替代方案的路径。还有一小类采取了不同思路：不把协议绑定在单一签名方案上，而是让密码学验证足够灵活，能够随时间推移支持新算法。

本文根据四项实用标准，评估 2026 年领先的抗量子加密货币项目：后量子密码学是否已在主网上线、使用哪些算法、网络采用未来密码学标准是否容易，以及用户实际上如何迁移到抗量子保护方案。



## 什么样的加密货币具有量子抗性？

抗量子加密货币是指，其安全模型已经使用后量子密码学，或者在量子攻击变得可行之前，有可信路径替换存在漏洞的公钥密码学的区块链。

关键在于区分 **量子抗性（quantum resistance）** 与 **密码敏捷性（crypto agility）** 。

量子抗性意味着系统使用的密码学算法，被认为面对经典计算机和量子计算机都能保持安全。例如，SPHINCS+ 这样的基于哈希的签名，ML-DSA、Falcon 这样的基于格的签名（lattice-based signatures），以及其他后量子密码学算法家族。

密码敏捷性则不同，它指系统能够随标准演进而更换密码学算法。这一点之所以很重要，是因为后量子密码学并不是一次性升级。标准会继续成熟，实现在生产环境中接受检验，一些算法最终也可能被替换。

将一种后量子签名方案硬编码的区块链，如今可能具有量子抗性，未来在密码学设计上却仍可能僵化。具有密码敏捷性的区块链能够支持多种方案、引入新方案，并让用户迁移，而不必每次密码学升级都动员整个网络协调。

### 评估抗量子区块链项目的关键指标

严肃评估抗量子区块链项目，需要超越营销宣传。重要问题包括：

* **后量子算法：** 使用哪种密码学原语（cryptographic primitive）？它是基于哈希、基于格、基于编码，还是其他后量子算法家族？  
* **主网状态：** 后量子密码学是否已在主网上保护真实资产，还是仍局限于研究、测试网、工具或路线图工作？  
* **保护范围：** 后量子机制保护的是交易授权、状态证明、共识、桥、钱包，还是系统中某个很小的部分？  
* **密码敏捷性：** 网络能否在不改变基础协议的情况下采用新的密码学标准，还是绑定于某一种特定算法？  
* **迁移路径：** 用户能否逐步自主选择迁移，还是需要协调协议升级、强制迁移或硬分叉？

与简单罗列所谓能抵御量子攻击的加密货币项目相比，这些标准让比较更有用。真正的问题，不只是某条链是否在某处支持后量子密码学，而是其架构能否随着密码学环境的变化而演进。

[Quantum Tracker](https://quantumtracker.org/) 等平台也在跟踪这类差异，根据区块链生态的量子风险暴露程度、后量子准备情况和迁移进度进行评估。本文采用类似的实用标准，根据各项目如今提供多少保护，以及其架构能在多大程度上适应后量子标准的持续演进来进行比较。



## 2026 年主要抗量子加密货币


<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
    <thead>
        <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">项目</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">PQC 保护范围</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">算法</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">主网状态</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">密码敏捷性</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f5f5f5;">迁移模型</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">CKB</td>
            <td style="border: 1px solid #ddd; padding: 8px;">通过锁定脚本进行交易授权</td>
            <td style="border: 1px solid #ddd; padding: 8px;">SPHINCS+ 已上线；未来可支持其他方案</td>
            <td style="border: 1px solid #ddd; padding: 8px;">主网已上线</td>
            <td style="border: 1px solid #ddd; padding: 8px;">高</td>
            <td style="border: 1px solid #ddd; padding: 8px;">自主选择迁移到后量子锁</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">QRL</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生交易签名</td>
            <td style="border: 1px solid #ddd; padding: 8px;">XMSS；Zond 正转向 SPHINCS+</td>
            <td style="border: 1px solid #ddd; padding: 8px;">主网已上线</td>
            <td style="border: 1px solid #ddd; padding: 8px;">中等</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生后量子</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Algorand</td>
            <td style="border: 1px solid #ddd; padding: 8px;">状态证明、AVM 验证、后量子账户路线图</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Falcon-1024 / Falcon-512 路线图</td>
            <td style="border: 1px solid #ddd; padding: 8px;">部分实现／分阶段推进</td>
            <td style="border: 1px solid #ddd; padding: 8px;">中等</td>
            <td style="border: 1px solid #ddd; padding: 8px;">分阶段进行协议／账户迁移</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">NEAR</td>
            <td style="border: 1px solid #ddd; padding: 8px;">PQC 测试网工作</td>
            <td style="border: 1px solid #ddd; padding: 8px;">积极集成中</td>
            <td style="border: 1px solid #ddd; padding: 8px;">测试网</td>
            <td style="border: 1px solid #ddd; padding: 8px;">中等</td>
            <td style="border: 1px solid #ddd; padding: 8px;">尚未上主网</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">IOTA</td>
            <td style="border: 1px solid #ddd; padding: 8px;">过去采用 WOTS+，目前规划转型</td>
            <td style="border: 1px solid #ddd; padding: 8px;">混合方案提案</td>
            <td style="border: 1px solid #ddd; padding: 8px;">转型中</td>
            <td style="border: 1px solid #ddd; padding: 8px;">低／不明确</td>
            <td style="border: 1px solid #ddd; padding: 8px;">分阶段迁移</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Abelian</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生隐私／安全层</td>
            <td style="border: 1px solid #ddd; padding: 8px;">基于格</td>
            <td style="border: 1px solid #ddd; padding: 8px;">主网已上线，细节待核验</td>
            <td style="border: 1px solid #ddd; padding: 8px;">中等</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生后量子</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">QubitChain</td>
            <td style="border: 1px solid #ddd; padding: 8px;">声称原生支持 PQC</td>
            <td style="border: 1px solid #ddd; padding: 8px;">ML-KEM / ML-DSA</td>
            <td style="border: 1px solid #ddd; padding: 8px;">测试网</td>
            <td style="border: 1px solid #ddd; padding: 8px;">高</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生后量子</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellframe</td>
            <td style="border: 1px solid #ddd; padding: 8px;">声称采用模块化 PQC</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Dilithium / Falcon</td>
            <td style="border: 1px solid #ddd; padding: 8px;">需要核验</td>
            <td style="border: 1px solid #ddd; padding: 8px;">声称较高</td>
            <td style="border: 1px solid #ddd; padding: 8px;">原生后量子／模块化</td>
        </tr>
    </tbody>
</table>


### 1）CKB：密码敏捷性的路径

[Nervos Network](https://www.nervos.org/)（CKB）在本次评估中排名靠前，被 Quantum Tracker 列为 [Tier A](https://quantumtracker.org/#report/blockchains/nervos-network)（“领先于发展趋势”）协议。其主要技术区别在于密码敏捷性：CKB 不会将一种固定签名方案硬编码进基础协议。资产存储于 Cell 中，每个 Cell 都由可编程的[锁定脚本（Lock Script）](https://docs.nervos.org/docs/tech-explanation/lock-script)保护，由脚本定义其花费方式。

在 CKB 上，每项资产都存储在一个 Cell 中，每个 Cell 都有一个锁定脚本，定义花费它必须满足的条件。在常规区块链中，通常由协议本身决定哪种签名算法有效；在 CKB 上，这套逻辑可以放在锁定脚本中。这意味着，开发者可以部署新的密码学验证逻辑，包括后量子签名方案，而无需为每次算法升级进行硬分叉。

正因如此，CKB 如今可以支持 [SPHINCS+](https://sphincs.org/)，同时对 ML-DSA、Falcon 或其他后量子原语等未来标准保持开放。其生态在 2025 年推出了 [Quantum Purse](https://quantumpurse.org/)，为用户提供了一条可立即使用、自主选择的路径，以 SPHINCS+ 签名保护资产。

### 2）QRL：为抗量子目标原生设计

[Quantum Resistant Ledger](https://www.theqrl.org/)（QRL）于 2018 年推出，从一开始就被设计为后量子区块链。其基础协议使用 [XMSS](https://datatracker.ietf.org/doc/html/rfc8391)，这是一种由美国国家标准与技术研究院（NIST）规定的有状态哈希签名方案，而非传统的椭圆曲线密码学。由于 QRL 从创链时起就使用后量子签名，它不会面临与那些最初采用易受量子攻击签名方案的链相同的存量资产迁移问题。

QRL 目前正在开发 [Project Zond](https://www.theqrl.org/blog/embracing-sphincs-a-strategic-shift-for-qrl-project-zond/)，也称 QRL 2.0，计划将网络从 XMSS 迁移到 SPHINCS+。原因不是 XMSS 作为安全原语已经失效，而是 XMSS 需要谨慎管理状态，以防一次性签名被重复使用。这给钱包、智能合约和自动化应用增加了复杂性。SPHINCS+ 保留了基于哈希的后量子密码学的优势，同时采用无状态设计，更易于运维和集成。

### 3）Algorand：混合模型与渐进转型 

[Algorand](https://algorand.co/) 对后量子安全采取分阶段推进的方式，[Falcon](https://falcon-sign.info/) 签名已用于网络的某些部分。自 2022 年起，Algorand 就使用 Falcon 保护状态证明（State Proofs），即每 256 轮生成一次、对账本状态作出证明的紧凑密码学凭证。2024 年，Falcon 验证加入了 Algorand 虚拟机，使智能合约能够在链上验证 Falcon 签名。

2025 年 11 月，Algorand 进一步推进了这项工作，通过可自主选择的账户抽象（account abstraction）路径，使用 Falcon 签名在主网上执行了一笔后量子交易。这表明，后量子交易授权可以在运行中的公有区块链上保护真实资产，尽管原生后量子账户仍在逐步推出。Algorand 当前的路线图以 2027 年底实现更广泛的量子防护能力为目标，包括原生后量子账户、钱包和 SDK 支持、后量子多重签名，以及进一步研究用于共识的抗量子 VRF。

主要限制在于，Algorand 尚未在每一层都全面具备量子抗性。其后量子保护有实质意义，但仍分阶段实现：状态证明和 Falcon 验证已上线，而原生账户支持和共识相关密码学仍属于路线图内容。尤其是，Algorand 的[纯权益证明（Pure Proof-of-Stake）](https://algorand.co/technology/pure-proof-of-stake)委员会选择，仍依赖基于椭圆曲线的[可验证随机函数（VRF）](https://en.wikipedia.org/wiki/Verifiable_random_function)，共识消息仍依赖 Ed25519 签名。因此，Algorand 是后量子迁移进展较快的传统 Layer 1 之一，但如今仍处于转型中，尚非全面抗量子的系统。

### 4）Abelian：保护隐私的格密码基础设施 

[Abelian](https://www.pqabelian.io/) 对后量子区块链设计采取了更专业化的路径。它不只关注抗量子交易签名，而是将基于格的密码学纳入[面向隐私的架构](https://www.pqabelian.io/blog/mlp101-inside-abelians-multi-layer-privacy-and-quantum-security)。其设计结合后量子安全与交易隐私，展示了后量子密码学（PQC）原语如何同时支持资产保护和保密性。

这使 Abelian 区别于主要把量子抗性视为签名升级的项目。其价值在于展示：如何从基础设计开始，就将基于格的密码学集成进保护隐私的区块链基础设施，而不是事后再添加迁移层。

### 5）QubitChain：绑定于 PQC 的格密码基础

[QubitChain](https://qubitchain.io/) 将自己描述为一条从创链时起就围绕 NIST 标准化格密码构建的后量子区块链。其资料称，网络的交易签名机制是 ML-DSA，这一算法源自 CRYSTALS-Dilithium，并被标准化为 FIPS 204。资料还提到使用 ML-KEM，在节点通信和客户端会话中进行量子安全的密钥封装（key encapsulation）；该算法源自 CRYSTALS-Kyber，并被标准化为 FIPS 203。

这让 QubitChain 具有原生后量子设计，而不是从椭圆曲线签名改造迁移的路径。代价是，其安全模型似乎与一组特定的 NIST 标准化格密码原语紧密绑定。短期内这可能是优势，但也使密码敏捷性成为一个重要问题：如果标准、实现或最佳实践随时间变化，网络的适应能力，将与最初选择什么算法同样重要。

### 6）Cellframe：模块化 PQC 架构

[Cellframe](https://cellframe.net/) 将自己描述为一个面向服务的多层区块链平台，在构建时就考虑了量子安全。其 SDK 资料描述了一种[模块化](https://wiki.cellframe.net/03.+Develop/4.+Cellframe+SDK+Documentation/ETC/Architecture+Overview#Overview)架构，涵盖共识机制、链管理、代币系统、网络和密码学原语，包括支持 Kyber、Falcon 和 SPHINCS+ 等后量子密码学方案。

相比围绕单一固定签名方案构建的项目，这让 Cellframe 的后量子设计更灵活。Cellframe 的架构不把量子抗性仅仅视为一种硬编码算法，而是强调模块化和可扩展性，理论上可以随着标准和实现实践的演进，更容易地更新密码学组件。但在实际层面，这一密码敏捷性主张取决于这些更新能否容易地在整个网络的生产环境中部署、采用和使用。

### 7）IOTA：通过混合签名分阶段转型

[IOTA](https://www.iota.org/) 的后量子历史，比此类项目中的大多数都更复杂。其原始设计使用 Winternitz 一次性签名（Winternitz One-Time Signatures），这是一种具有后量子性质的哈希签名方案。不过，协议后来不再使用 [WOTS+](https://eprint.iacr.org/2017/965)，而是通过 Chrysalis 升级采用了可重复使用的 Ed25519 签名，优先考虑可用性、性能和更简单的钱包体验。

这一转型改善了实际可用性，却降低了 IOTA 当时实际具备的量子抗性，因为 Ed25519 仍属于椭圆曲线密码学，会受到足够强大的量子计算机的攻击。近期，IOTA 开始通过 IOTA Identity，在更有限的范围内分阶段重新引入后量子密码学。其身份工具如今支持为可验证凭证（verifiable credentials）和可验证展示（presentations）使用后量子签名，包括 ML-DSA、SLH-DSA、Falcon，以及 ML-DSA \+ Ed25519 混合签名方案。

因此，对 IOTA 更恰当的理解是：它早期具有后量子基础，如今在身份层重新开展 PQC 工作，而不是一条当前已全面抗量子的底层协议。它在这一类别中的长期地位，将取决于后量子签名能否走出身份工具，进入更广泛的交易和账户安全模型。

### 8）NEAR Protocol：积极集成阶段

Quantum Tracker 将 [NEAR Protocol](https://www.near.org/) 列为 [Tier B](https://quantumtracker.org/#report/blockchains/near-protocol)（“正在构建”）项目，反映出其后量子工作已超越研究阶段，进入积极实施阶段。NEAR 正在集成 FIPS-204 / ML-DSA 签名，目标是让用户将账户密钥轮换为抗量子凭据，而不必进行会造成较大影响的账户迁移。

这使 NEAR 成为较值得关注的传统 Layer 1 之一。其账户模型为后量子密钥轮换提供了可行路径，但这种保护尚未广泛用于主网活动。在相关升级被确认已上线、经过审计、获得钱包支持，并被用户采用之前，NEAR 仍属于转型阶段，而非全面抗量子类别。

### 传统网络的脆弱性

虽然以太坊基金会在 2026 年 2 月公布了正式的[后量子路线图](https://ethereum.org/roadmap/future-proofing/quantum-resistance/)，比特币也在 2026 年初合并了首个抗量子地址格式提案（[BIP 360](https://bip360.org/)），但这两项转型都远未完成。对这些传统协议而言，迁移在结构上仍十分复杂。[目前的估计](https://www.coindesk.com/tech/2026/05/18/bitcoin-faces-outsized-quantum-threat-as-computing-breakthroughs-accelerate-citi-says)认为，约 690 万 BTC 仍在传统地址中暴露于风险之下。这意味着，在量子计算能力进一步发展之前，采用经典密码学的链必须争分夺秒地部署保护措施。



## 结语：2026 年最佳抗量子加密货币

按主网就绪程度、迁移灵活性和长期密码敏捷性评估，Nervos Network（CKB）是当今最强的抗量子加密货币架构。其核心优势不只是支持一种后量子签名方案，而是其架构能够引入新的密码学标准，无需反复改变核心协议。

CKB 将密码学验证与共识解耦，使用户能够通过 SPHINCS+ 锁定脚本，自主选择已上线、经 NIST 标准化的后量子保护，同时保留随领域发展而采用 ML-DSA、Falcon 或其他后量子原语等未来标准的能力。这使 CKB 既不同于仍在规划迁移的传统链，也不同于固定在某种密码学设计中的原生 PQC 链。

更广泛的行业正通过几条不同路径应对量子风险。Algorand 展示了大型智能合约平台如何为网络的特定层逐步引入基于 Falcon 的保护。QRL、Abelian、Cellframe 和 QubitChain 展示了从创链时起围绕格密码或哈希密码学构建系统的价值。而 CKB 提供了更持久的东西：不仅是如今的量子抗性，更是一种为密码学变化本身而设计的架构。



## 常见问题

**加密货币中的量子抗性是什么？**

在密码学语境中，量子抗性指的是使用后量子密码学（PQC）算法的区块链，例如基于格或基于哈希的签名，能够抵御未来容错量子计算机的攻击。这些算法替代 ECDSA 等存在漏洞的经典标准，后者在数学上容易受到肖尔算法的攻击。

**什么是量子安全加密货币？**

量子安全加密货币（quantum safe crypto）与抗量子加密货币在功能上同义，指由先进、经 NIST 批准、量子算法难以求解的数学方法保护的数字资产和区块链架构。这确保了账本的长期完整性，并保护用户资金免受密钥恢复攻击（key-recovery attacks）。

**有量子安全的加密货币吗？**

有。比特币和以太坊等传统网络仍处于研究和路线图阶段，一些现代协议则已具备量子安全性。如前面的比较所述，这些方案分为两类：从创链时起就硬编码了抗量子密码学的原生 PQC 区块链，以及已经成功将后量子锁定脚本集成到现有主网中的高度密码敏捷网络。

**哪些加密货币能抵御量子攻击？**

一些网络在部署可验证、实际运行的后量子保护方面处于行业前列。Nervos Network（CKB）在主网上提供高度灵活、可自主选择的 SPHINCS+ 锁定脚本。Algorand 使用基于格的 Falcon-1024 签名保护其状态证明。此外，QRL、Abelian、Cellframe 和 QubitChain 等原生 PQC 架构，提供了从根本上以后量子密码学为基础的稳健生态。NEAR Protocol 也因在测试网环境中积极部署 PQC 机制而表现突出。

**什么是密码敏捷性？**

密码敏捷性是区块链在结构上升级或替换密码学标准的能力，无需进行会造成较大影响的全网硬分叉。在量子计算背景下，CKB 这样的高度敏捷架构，将密码学与共识层解耦，让用户能够随着时间推移，实际迁移到新出现的 NIST 标准，而不是永久绑定在单一数学方法上。 
