---
title: '比特币和以太坊具备量子抗性吗？'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "如今，比特币和以太坊都不具备量子抗性。两者都依赖基于 secp256k1 的 ECDSA，而肖尔算法最终可以将其破解。了解两条链如何为 Q-Day 做准备、迁移为何需要数年，以及密码敏捷性为何是长期解决方案。"
date: '2026-07-15T16:00:00.000Z'
author: 
- github:nervosnetwork
---

## 要点

- **如今，比特币和以太坊都不具备量子抗性。** 两者都依赖基于 secp256k1 的 ECDSA；足够强大的量子计算机可以利用肖尔算法破解这一签名方案。
- **数百万枚币已面临公钥暴露风险。** 超过 700 万枚 BTC 由已公开暴露的密钥保护，大多数活跃的以太坊账户也已公开公钥。量子攻击者可以现在收集这些密钥，等 CRQC 投入使用后再解密。
- **两个生态系统都在准备，但都尚未走完全程。** 比特币已有早期提案，却还没有各方一致同意的迁移计划；以太坊则围绕原生账户抽象建立了更有条理的路线图。
- **真正的挑战是迁移，而非密码学本身。** 后量子签名方案已经存在，难点是在量子计算机到来之前，将其部署到去中心化网络中。
- **加密敏捷性是长期解决方案。** 未来的密码学标准仍会不断演变。能够在不进行全协议迁移的情况下采用新签名方案的区块链，在首次后量子转型之后很久，仍能保持适应能力。

## 简短回答：不具备，而这事关重大

如今，比特币和以太坊都不具备量子抗性（quantum resistance）。两者都依靠基于 secp256k1 的 ECDSA 来授权交易，而足够强大的量子计算机可以通过[肖尔算法（Shor's algorithm）](https://www.nervos.org/knowledge-base/shors_algorithm_explained)破解这种公钥签名方案。

这样的机器尚不存在，但发展趋势愈发令人担忧。2026 年 3 月，Google Quantum AI 将破解 secp256k1 所需的硬件资源估计降至原来的近二十分之一，凸显出量子研究的快速进展。

更重要的是，攻击者不必等到 [Q-Day](https://www.nervos.org/knowledge-base/what_is_q_day) 才开始准备。按照“现在收集，将来解密”（Harvest Now, Decrypt Later，HNDL）策略，他们现在就可以从公有区块链上收集已暴露的公钥并保存起来，等到具备密码破解能力的量子计算机（cryptographically relevant quantum computer，CRQC）能够推导出对应私钥时再使用。

这种暴露已相当严重。超过 700 万枚 BTC 存放在公钥已公开的地址中（[Project Eleven](https://bitcoin-risq-list.projecteleven.com/)）；而在以太坊上，几乎每个曾发送过交易的账户都已经暴露了公钥。两个生态系统都已开始为这种未来做准备，但都尚未完成。

## 比特币和以太坊为何容易受到量子计算攻击？

### 肖尔算法如何破解 ECDSA

比特币、以太坊和大多数主流区块链都依赖同一种公钥签名方案：基于 secp256k1 曲线的椭圆曲线数字签名算法（ECDSA）。用户每次授权交易，都是通过生成 ECDSA 签名来证明自己拥有私钥。

ECDSA 的安全性建立在椭圆曲线离散对数问题之上，经典计算机在计算上无法实际求解这一问题。运行肖尔算法的足够强大的量子计算机，则会彻底改变这一点，使人能够从公钥推导出对应的私钥。

这并不意味着每一枚币都同样脆弱。真正的问题在于：攻击者需要的公钥是否已经在链上可见。

### 比特币：哪些地址面临风险

比特币的量子风险几乎完全取决于一个问题：**公钥是否已经公开？** 不同输出类型的答案不同。

**支付到公钥（Pay-to-Public-Key，P2PK）** 输出将完整公钥直接放在锁定脚本中。从输出创建的那一刻起，公钥就已暴露，这使 P2PK 成为最脆弱的地址类型。许多早期比特币输出，包括被普遍认为属于中本聪（Satoshi Nakamoto）的币，都属于这一类。

**支付到公钥哈希（Pay-to-Public-Key-Hash，P2PKH）** 及其后续类型，包括 **P2WPKH**，会将公钥隐藏在密码学哈希之后。只要一个地址从未花费过资金，其公钥就仍然隐藏。首次花费会使公钥永久公开，此后任何地址复用，都会让其中的币暴露在长期量子攻击风险下。

**Taproot（P2TR）** 改善了隐私和脚本灵活性，但没有解决量子问题。每个 Taproot 输出的见证程序中都包含一个[仅含 x 坐标的公钥（x-only public key）](https://bitcoinops.org/en/topics/x-only-public-keys/)，所以输出一创建，公钥就可见。虽然 Taproot 用 Schnorr 签名（Schnorr signatures）取代了 ECDSA，但两种方案依赖相同的底层椭圆曲线假设，同样容易受到肖尔算法攻击。

理论上还存在一个短时间暴露的攻击窗口。当 P2PKH 或 P2WPKH 交易进入内存池（mempool）时，公钥在交易确认前就已可见。未来足够强大的量子计算机，原则上可以在这一等待确认的窗口中推导出相应私钥。

根据 Project Eleven 的比特币[风险清单](https://bitcoin-risq-list.projecteleven.com/)，目前超过 1,410 万个比特币地址的公钥已经暴露。这些地址共控制超过 705 万枚 BTC，按当前价格计算，价值超过 4,440 亿美元。

### 以太坊：账户模型带来的暴露

以太坊的暴露情况有所不同，因为其账户模型鼓励长期使用同一地址。

在比特币中，避免复用地址是标准的隐私和安全做法。大多数现代钱包会为每次收款自动生成一个新地址。以太坊则不同：钱包地址通常是一个长期使用的账户，用户会连续使用多年，反复用它持有资产、与应用交互并签署交易。

以太坊地址起初通过 [Keccak-256](https://www.nervos.org/knowledge-base/what_is_keccak256) 哈希隐藏公钥。但外部拥有账户（Externally Owned Account，EOA）一旦发送首笔交易，就能通过其 ECDSA 签名，从区块链中永久恢复出公钥。

因此，只收款的以太坊账户仍保有一定保护，但几乎所有经常使用的钱包最终都会暴露公钥。以太坊用户通常持续使用同一账户，而不是每笔交易后都轮换地址，所以这种暴露不是因钱包使用习惯不佳而产生的少见情况，而是以太坊账户设计和使用方式的正常结果。

因此，绝大多数持有可观余额的活跃以太坊账户，其公钥今天就可以被收集，并在 Q-Day 之后成为攻击目标。

## 比特币如何为量子计算做准备？

### BIP-360 与 BIP-361：比特币迈向量子抗性的第一步

比特币的量子迁移已经开始，但还只停留在纸面上。

第一个重要提案是 [BIP-360](https://bip360.org/)，它引入支付到 Merkle 根（Pay-to-Merkle-Root，P2MR），一种前缀为 bc1z 的新输出类型，旨在消除比特币长期公钥暴露的问题。

P2MR 基于 Taproot 构建，但移除了它最主要的量子弱点。Taproot 同时支持密钥路径和脚本路径，P2MR 则完全移除密钥路径。它不再承诺一个椭圆曲线公钥，而只承诺脚本树的 Merkle 根（Merkle root）。之后花费资金时，只需公开一个脚本和一份 Merkle 证明（Merkle proof），整个过程都不必将椭圆曲线公钥直接放到链上。

需要明确的是，BIP-360 并不是后量子签名方案。它只是创建一种避免长期公钥暴露的新输出类型，为未来引入后量子签名打下基础。

BIP-360 的局限也很明确。它防范的是公钥在链上持续可见数月或数年的长时间暴露攻击，无法抵御公钥在交易等待于内存池期间短暂出现所带来的短时间暴露攻击。

弥补这一缺口还需要下一步：通过未来的一次软分叉，将真正的后量子签名方案引入比特币脚本系统。

截至 2026 年中，BIP-360 仍是草案提案，没有激活时间表。与比特币的每一次共识变更一样，它需要获得生态系统的广泛认同，才能成为协议的一部分。

BIP-360 处理未来的输出，BIP-361 则处理此前留下的所有输出。

[BIP-361](https://bips.dev/361/) 于 2026 年 4 月发布，提出在后量子替代方案可用后，有计划地从 ECDSA 和 Schnorr 保护的旧输出迁移出去。其目标很简单：逐步淘汰易受攻击的签名方案，尽量降低量子攻击者的经济动机。

它提出了一项由期限驱动的计划，分三个阶段将比特币从旧有密码学签名迁移到抗量子替代方案：

- 阶段 A（激活后 3 年）：禁止再向易受量子攻击的地址发送资金。用户可以从这些地址花费，但不能再用它们接收新的币。
- 阶段 B（激活后 5 年）：将 ECDSA/Schnorr 花费判为无效，禁止花费任何易受量子攻击的 UTXO。所有未迁移的币都会被冻结，相关花费会被网络节点拒绝。
- 阶段 C（待定）：通过单独的 BIP 提出一种可对旧 UTXO 进行量子安全恢复的方法，很可能通过零知识证明来证明持有相应的 BIP-39 助记词。

BIP-361 强制停用旧签名的做法极具争议。包括 Adam Back 在内的批评者[主张](https://www.coindesk.com/tech/2026/04/16/bitcoin-s-quantum-debate-splits-as-adam-back-pushes-optional-upgrades-over-forced-freeze)采用自愿、渐进的升级，而不是强制冻结，使未迁移的币永久无法花费。

不过，与方案之争相比，时间表更为关键。即使 BIP-360 明天就激活，实现完整的量子抗性仍需数年。BIP-360 的共同作者 Ethan Heilman 明确列出了[时间表](https://www.binance.com/en/square/post/293014450256401)：完成 BIP、代码审查和测试约需 2.5 年，网络激活再需 0.5 年；之后，钱包、托管方、闪电网络节点、交易所和企业资金管理软件还必须各自升级。Heilman 说：“如果运气好，激活五年后会有 90% 完成更新。人们感受到的危险越大，这个过程就越快。”在所有人都同意路线图的乐观情况下，这也大约需要七年。

### 比特币仍有两个重大问题悬而未决

BIP-360 和 BIP-361 推动了讨论，却没有回答比特币最棘手的两个问题。

**应该用哪种后量子签名方案取代 ECDSA？**

以及，作出决定之后：

**一个去中心化网络，如何在不扰乱其试图保护的系统的前提下，迁移价值数十亿美元的资产？**

第一个挑战是选择 ECDSA 的替代方案。

美国国家标准与技术研究院（NIST）已经将若干后量子签名方案标准化，但没有一种与比特币完美契合。

SLH-DSA（前身为 SPHINCS+）等基于哈希的签名，安全假设保守、研究也较充分，但其签名大小约为当前 ECDSA 签名的 50 至 80 倍。

ML-DSA 和 Falcon 等基于格的方案产生的签名小得多，但依赖较新的数学假设，尚未经历同样长期的检验。

XMSS 和 LMS 等有状态的基于哈希的方案安全性很强，但要求谨慎管理密钥状态，与自主保管密钥的钱包并不十分契合。

这些只是主要候选中的一部分，每一种都需要在安全、性能、带宽和长期可信度之间艰难取舍。

选择算法只是开始。比特币确定密码学标准之后，网络仍需说服数百万用户，以及交易所、托管方、钱包、支付处理商和基础设施提供者采用它。

目前已有多种迁移策略提案，各自在安全、去中心化和干扰程度之间作出不同权衡。有的优先考虑自愿迁移，有的试图限制量子盗窃的经济影响，而最激进的方案最终会彻底淘汰旧签名方案。

选定算法后，还需要确定迁移框架。以下三种方式已有讨论：



<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">框架</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">机制</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">所需分叉</th>
      <th style="border: 1px solid #333; padding: 10px 8px; text-align: left; font-weight: 700;">主要取舍</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">承诺—延迟—揭示（Commit-Delay-Reveal，CDR）</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">分阶段、自愿迁移到后量子密钥</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">两次软分叉</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">不打断现有运作，但已暴露的币仍面临风险</td>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">Hourglass</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">限制每个区块中易受攻击币的花费数量</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">两次软分叉</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">缓和市场冲击，但无法阻止已暴露币被盗</td>
    </tr>
    <tr>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">QRAMP</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">设定强制期限；期限过后，由经典密码学保护的币无法花费</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">一次硬分叉</td>
      <td style="border: 1px solid #333; padding: 10px 8px; vertical-align: top;">强制全面迁移，但会冻结未迁移的币</td>
    </tr>
  </tbody>
</table>



这些方式都无法避免取舍。承诺—延迟—揭示尽量减少干扰，却让已暴露的币继续面临风险；Hourglass 减缓大规模盗窃，却无法阻止；QRAMP 提供最强的长期保护，却要求社区接受冻结从未迁移的币，许多比特币支持者认为这一取舍无法接受。

替换密码学标准的难度很容易被低估。美国政府在 1970 年代末就已认识到 [DES](https://en.wikipedia.org/wiki/Data_Encryption_Standard)（数据加密标准）不够安全，但 [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 直到 [2001 年](https://www.nist.gov/news-events/news/2001/12/commerce-secretary-announces-new-standard-global-information-security)才成为正式替代标准。此后 DES 的全面[退役](https://www.nist.gov/news-events/news/2005/06/nist-withdraws-outdated-data-encryption-standard)又花了十年。这场过渡持续了二十多年，而其背后已有联邦强制要求、集中采购和自上而下执行的全力支持。

区块链没有这些手段。替换共识层面的签名方案，必须在没有中央机构的情况下进行；在这样的系统中，每个字节都要支付费用，每项变更都需要广泛协调，而且错误不可逆转。

因此，比特币最大的优势，即抗拒变更，也可能成为它在量子时代最大的挑战。

隔离见证（SegWit）和 Taproot 都经历了数年的讨论、开发与激活。替换比特币底层的密码学机制，是更庞大的工程。

如今，比特币有了方向，却没有确定的终点。BIP-360 和 BIP-361 建立了早期框架，但对于最终用于保护网络免受量子攻击的签名方案、迁移策略和激活路径，社区尚未达成共识。

如需更深入地了解提案和迁移路径的技术细节，请参阅 *[《比特币通往量子抗性的路径可能是什么样》](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like)*。

## 以太坊如何为量子计算做准备？

### 以太坊的量子风险不只涉及用户账户

以太坊的量子风险不只来自暴露的 EOA 公钥。2026 年 2 月，Vitalik Buterin [概述](https://x.com/VitalikButerin/status/2027075026378543132)了协议中依赖易受量子攻击的密码学机制的四个主要部分：

- **EOA 签名：** 以太坊账户使用基于 secp256k1 的 ECDSA。账户一旦发送交易，就能从签名恢复其公钥，公钥也会持续暴露在链上。
- **共识签名：** 验证者使用 BLS 签名对区块作出证明。足够强大的量子计算机可以伪造这些签名，破坏共识。
- **数据可用性承诺：** 以太坊使用 KZG 承诺（KZG commitments），它依赖椭圆曲线配对，同样容易受到肖尔算法攻击。
- **应用层零知识证明：** 许多 Rollup 和证明系统依赖 KZG 或 Groth16，两者都依赖易受量子攻击的椭圆曲线假设。

因此，以太坊面临四个独立的迁移问题：用户认证、验证者签名、数据可用性（data availability）和零知识证明。以太坊基金会于 2026 年 1 月成立了专门的[后量子安全](https://ethereum.org/roadmap/future-proofing/)团队，协调这些层面的工作。

### 原生账户抽象如何实现加密敏捷性

以太坊保护用户账户的策略围绕原生账户抽象（native account abstraction）展开：让交易授权不再绑定于一条硬编码的签名路径，而是允许账户定义自己的验证逻辑。

如今，以太坊原生账户绑定于 ECDSA。每笔交易都用 ECDSA 签名识别发送者、授权操作并支付 gas。原生账户抽象将这些功能分离，让账户可以通过不同的密码学方案对交易进行认证。

这一转变分为两个主要阶段。

**EIP-7702：为 EOA 设置代码**

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 随 2025 年 5 月的 Pectra 升级引入，允许 EOA 将执行委托给智能合约代码。这让普通账户拥有部分智能账户功能，也是迈向更广泛账户抽象的重要一步。

不过，EIP-7702 并没有移除底层的 ECDSA 密钥。原始密钥仍能授权交易，因此账户仍容易受到未来量子攻击。

**EIP-8141：帧交易**

[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) 更进一步，引入一种基于帧的新交易类型，将原生账户抽象带入协议。

传统的以太坊交易把多种职责捆绑在一起：ECDSA 签名识别发送者、验证授权、支付 gas，并触发执行。EIP-8141 将这个过程拆分为按顺序排列的帧（frames）。

验证帧先运行账户自己的认证逻辑，随后执行帧执行所请求的操作。由于账户自行定义验证方式，它可以使用 ML-DSA 或 SLH-DSA 等后量子签名方案，而不再完全依赖 ECDSA。

这创造了一条自愿采用的迁移路径。用户可以逐个账户转向后量子签名，而不必等待所有以太坊用户同时切换。

截至 2026 年中，EIP-8141 已被考虑纳入 [Hegotá 升级](https://ethereum.org/roadmap/future-proofing/)，但尚未最终获准进入主网。即使激活之后，钱包、应用、托管方、交易所和基础设施提供者仍需支持新的账户模型，迁移才能大规模进行。

### 用户账户之外：共识、数据和证明

账户抽象解决的是用户签名，以太坊还必须替换协议其他部分中易受攻击的密码学机制。

**共识签名**

以太坊验证者目前使用 BLS 签名。一种拟议的替代方案是基于哈希的后量子签名方案 leanXMSS，配合精简的零知识虚拟机 leanVM，后者旨在高效压缩和聚合体积大得多的签名。

**数据可用性**

KZG 承诺依赖椭圆曲线配对，不具备量子抗性。以太坊最终需要用基于哈希或其他后量子方案来替换它。

**零知识证明**

许多现有证明系统依赖椭圆曲线密码学。以太坊的长期路线图越来越倾向于 STARK，它主要依靠哈希函数提供安全性，被广泛认为具备后量子安全性。

这一转型符合更广泛的 [Lean Ethereum](https://leanroadmap.org/) 愿景，将后量子安全与协议简化视为相互关联的目标。其思路不仅是用另一个原语替换脆弱原语，还要降低以太坊整个技术栈对复杂密码学假设的依赖。

### 尚存的缺口

以太坊的路线图比比特币更有条理，但底层限制相同：如今，原生 EOA 交易在协议层面仍绑定于 ECDSA。要改变这一点，EIP-8141 必须上线、获得生态系统的广泛采用，之后还要完成一长串后续升级。

正如 [EIP-8141 路线图](https://eip8141.io/pq-roadmap)本身所解释的：“EIP-8141 是必要条件，但不是充分条件。它迈出了奠定基础的第一步……之后还必须进行一系列协议升级、引入预编译合约，最终全面弃用 ECDSA。这条路线图以年为单位，而不是月。”

另一个常被忽视的细节是：后量子密码学（post-quantum cryptography）无法追溯保护公钥已上链的账户。即使以太坊完成迁移，任何曾发送过交易的账户仍必须主动把资金转移到新的量子安全地址。

## 为什么加密敏捷性是长期解决方案

量子威胁暴露了一个更深层的结构性问题：大多数区块链在设计时，并没有为改变自身密码学机制做好准备。

加密敏捷性（crypto agility）指系统能够迅速采用、替换或支持新的密码算法，而不会对网络或用户造成重大干扰。大多数区块链缺乏这种能力。在比特币上，签名验证被硬编码在密码学操作中；在以太坊上，原生 EOA 模型在协议层强制使用 ECDSA。

当其中任何一条链需要替换密码学方案时，都必须经过缓慢的全生态协调，这一过程需要数年，甚至数十年。

而且，一次成功迁移并不能终结问题。密码学标准持续演变，今天硬编码某种量子安全算法的链，随着研究进步和新漏洞出现，将来可能再次面临同样的迁移挑战。量子抗性与加密敏捷性的区别，在于前者解决一个问题，后者则构建出一个也能解决下一个问题的系统。

Nervos CKB 展示了具备加密敏捷性的架构在实践中是什么样。在 CKB 上，密码学验证位于可编程的锁定脚本（Lock Scripts）中，而非协议操作码里。基础执行环境 CKB-VM 是一个通用的 RISC-V 虚拟机，不规定签名方案。新的密码学原语可以作为链上代码部署，用户可以迁移过去，无需等待全网分叉。

CKB 主网上已经有可用的 [SPHINCS+](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance#implementation-details-sphincs-on-ckb)（SLH-DSA）锁定脚本。社区开发的量子安全钱包 Quantum Purse，让用户现在就能自行选择使用后量子签名。[Quantum Tracker](https://quantumtracker.org/#report/blockchains/nervos-network) 将 CKB 评为 A 级（Ahead of the Curve，领先于趋势）协议。有关其架构细节，请参阅：[*《区块链加密敏捷性：CKB 实现量子安全的关键》*](https://www.nervos.org/knowledge-base/blockchain_crypto_agility)。

## **结语**

如今，比特币和以太坊都不具备量子抗性，但两者都在推进。BIP-360 已于 2026 年初合并。以太坊有条理清晰的后量子路线图、专门的安全团队，以及围绕截至 2029 年各次硬分叉里程碑积极开展的协议工作。但这两条路线都尚未在主网上落地，社区对算法选择和迁移框架的共识仍未确定，实际完成全面迁移，对任何一条链来说都还需要数年。

更深层的问题不仅是比特币和以太坊能否具备量子抗性，而是在下一个密码学标准受到挑战时，它们能否适应。长期答案是敏捷性：构建能够随着威胁形势变化而切换算法的系统。 
