---
title: '什么是 Q-Day？加密货币能否渡过这一关？'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "加密货币能否渡过 Q-Day？了解 Q-Day 对比特币意味着什么、量子计算机何时可能构成威胁，以及区块链正在如何准备。"
date: '2026-07-13T16:00:00.000Z'
author: 
- github:nervosnetwork
---

Q-Day 指量子计算机强大到足以破解现代数字系统广泛采用的公钥密码学（public-key cryptography）的那一刻。

对加密货币而言，这意味着一件非常具体的事：未来的量子计算机可能从已暴露的公钥推导出私钥，伪造有效的交易签名，并在未经所有者同意的情况下转走资金。

今天还做不到这一点。目前尚不存在具备密码破解能力的量子计算机（cryptographically relevant quantum computer，CRQC）。但这一风险现在就值得重视，因为区块链账本公开且永久保存。公钥一旦出现在链上，就会永远可见。未来的攻击者不需要解密区块链；他们可以现在收集已暴露的公钥，以后再尝试恢复私钥。

本文将解释 Q-Day 对加密货币意味着什么、量子计算机何时可能威胁比特币、哪些币面临的风险最大、比特币和以太坊正在如何准备，以及 CKB 等具备加密敏捷性（crypto agility）的网络为何在设计上有所不同。

## Q-Day 对加密货币意味着什么？

Q-Day 是一个假想的时间点，届时具备密码破解能力的量子计算机能够破解广泛使用的公钥密码学。

仅凭这一能力，攻击者就能伪造交易签名，花费他人的加密货币，破坏每条区块链所依赖的信任模型。

漏洞在于区块链证明所有权的方式。几乎所有主流链都使用公钥密码学来授权交易：用户持有私钥，网络验证相应的公钥，数字签名将两者联系起来。其安全性建立在一个假设上：没有人能从公钥推导出私钥。一台运行肖尔算法（Shor's algorithm）、足够强大的量子计算机会打破这一假设。

## Q-Day 为什么关系到比特币？

Q-Day 关系到比特币，是因为比特币的交易授权依赖 [secp256k1](https://www.nervos.org/knowledge-base/secp256k1_a_key_algorithm)，即其签名方案所使用的椭圆曲线。

较早的比特币输出使用基于 secp256k1 的 [ECDSA](https://www.nervos.org/knowledge-base/understanding_ecdsa)。Taproot 使用同样基于 secp256k1 的 [Schnorr 签名](https://www.nervos.org/knowledge-base/schnorr_signatures)。两者是不同的签名方案，但都依赖同一个底层难题：椭圆曲线离散对数问题。

对于比特币使用的密钥长度，经典计算机无法在任何实际可接受的时间内求解这一问题，但足够强大的量子计算机可以。

因此，比特币真正面临的 Q-Day 风险是公钥暴露。如果一个比特币公钥在链上可见，未来的 CRQC 理论上就能推导出私钥，并生成有效签名。

新生成、受哈希保护的输出更加安全，因为在币被花费之前，公钥一直隐藏在哈希之后。但公钥一旦公开，暴露就会永久持续，风险的倒计时也随之开始。

## 估计量子计算的发展时间表

无法确定 Q-Day 的确切日期，因为它取决于无人能够预先安排的硬件突破。

对加密货币而言，更合理的理解方式是将量子计算的发展时间表视为一个风险窗口，而不是倒计时。

一些信号让这个时间表显得更加紧迫。美国国家标准与技术研究院（NIST）已发布从易受量子攻击的公钥密码学迁移到后量子标准的过渡指南（[NIST IR 8547](https://csrc.nist.gov/pubs/ir/8547/ipd)）。[Cloudflare](https://blog.cloudflare.com/post-quantum-roadmap/) 目前的目标是在 2029 年实现全面的后量子安全，包括后量子认证。IBM [计划](https://www.ibm.com/quantum/blog/large-scale-ftqc)于 2029 年推出首个容错系统 Starling，具备 200 个逻辑量子比特。Google Quantum AI 在 2026 年的一项研究[估计](https://arxiv.org/abs/2603.28846)，在对超导硬件作出特定假设的条件下，攻击 256 位椭圆曲线离散对数问题所需的物理量子比特可能少于 50 万个。

这些信号很重要，但并不意味着比特币会在 2029 年被破解。

例如，IBM 计划于 2029 年推出的系统，其逻辑量子比特规模仍远低于 Google 对加密货币攻击的估算。NIST 提到的 2030 年和 2035 年是迁移期限，不是对 Q-Day 的预测。Cloudflare 的 2029 年目标是内部安全迁移目标，也不是在预测届时会出现 CRQC。

审慎的结论是：

最早可能出现风险的窗口已经向 2020 年代末至 2030 年代初靠近，但真实日期无从知晓。一些预测仍认为，严重风险要到 2030 年代较晚时候，甚至更久以后才会出现。

与确切日期相比，迁移问题更加重要。比特币和其他区块链需要在 Q-Day 到来之前完成升级，而不是之后。

### 为什么量子破解的时间预测各不相同

对 Q-Day 的预测之所以不同，是因为它们取决于难以精确安排进度的工程难题。

CRQC 需要足够多的逻辑[量子比特（qubits）](https://en.wikipedia.org/wiki/Qubit)、足够低的错误率、足够深的电路、足够快的纠错速度，以及足够可靠的运行能力，才能在错误淹没计算过程之前完成密码攻击。

这与单纯拥有大量物理量子比特是两回事。

物理量子比特是带有噪声的硬件单元。逻辑量子比特则由多个物理量子比特构成，并经过纠错。密码攻击需要的是逻辑量子比特，而不只是看起来惊人的原始量子比特数量。

这就是公开预测会相差数年乃至数十年的原因。一些研究者关注算法的快速进步，另一些则关注容错硬件规模扩展的难度。

不过，有几点可以明确地说：

**攻击仍停留在理论层面。** 目前还没有具备密码破解能力的量子计算机。当今领先的处理器，从 IBM 的 [Heron](https://quantum.cloud.ibm.com/docs/en/guides/processor-types#heron) 到 QuEra 的 [Libra](https://www.quera.com/press-releases/quera-announces-2028-fault-tolerant-quantum-computer-and-expanded-multi-year-strategic-collaboration-with-aws)，其物理量子比特数量在数百至数千个左右，错误率仍然过高，无法大规模运行肖尔算法。

**近期的进展来自软件。** 2025 至 2026 年间，对攻击所需量子比特数量的估计大幅下降，原因是算法和纠错技术改进，而非处理器拥有了更多量子比特。[Craig Gidney](https://arxiv.org/abs/2505.15917) 将破解 RSA-2048 所需的量子比特估计从 2,000 万个降到了不足 100 万个；Google 于 2026 年 3 月发表的[论文](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/)则将攻击比特币和以太坊所用椭圆曲线所需的物理量子比特估计降到了不足 50 万个。这让时间表变得难以预测：一个算法上的新思路，就可能抹去原先以为还拥有的数年安全余量。与此同时，剩余的硬件工程工作，历来推进得比乐观者预测的更慢。

**预测也因预测者而异。** 正如 Nervos 对[加密敏捷性](https://www.nervos.org/knowledge-base/blockchain_crypto_agility)的分析所指出的，量子硬件公司有理由强调快速进展，而某些区块链社区则有理由淡化风险。因此，公开估计的跨度很大：一端是 Blockstream 首席执行官 Adam Back [声称](https://x.com/adam3us/status/1989721899991986374?ref_src=twsrc%5Etfw)还需“20 至 40 年”，另一端是 Justin Drake 认为到 2032 年出现 CRQC 的[概率有一半](https://x.com/drakefjustin/status/2061793725299224676?ref=bankless.ghost.io)。

结论是：*日期*无法预知，*方向*却是明确的。每一次重要修正都让 Q-Day 更近，而非更远。

## Q-Day 究竟会破解什么？

Q-Day 主要威胁非对称密码学，也称公钥密码学。在区块链系统中，这通常指用于授权交易的签名方案。

对于比特币，脆弱的密码学原语是基于 secp256k1 椭圆曲线的 ECDSA 和 Schnorr 签名。对于以太坊，标准的外部拥有账户（Externally Owned Accounts，EOAs）同样依赖基于 secp256k1 的 ECDSA。以太坊还有其他易受量子攻击的组件，包括共识层的 BLS 签名和 KZG 承诺（KZG commitments），两者均依赖椭圆曲线配对。

哈希函数则不同。肖尔算法无法破解 [SHA-256](https://www.nervos.org/knowledge-base/unbreakable_sha256_why_even_quantum_computers_cannot_do_it)，也无法以同样直接的方式破解比特币的工作量证明（proof-of-work）。[格罗弗算法（Grover’s algorithm）](https://en.wikipedia.org/wiki/Grover%27s_algorithm)理论上可以加快暴力穷举（brute-force search），但这种加速与肖尔算法对公钥密码学造成的结构性破解并不相同。

薄弱环节是交易授权。如果公钥已暴露，而其背后的签名方案容易受到量子攻击，具备密码破解能力的量子计算机就可能推导出私钥，将这个已暴露的公钥变成可花费的资金。

## 密码学迁移需要多久？

评估量子威胁时，不仅要关注硬件的时间表，还要关注密码学迁移实际需要多长时间。

密码学迁移是计算机发展史上最缓慢的转变之一，即使由中心化机构控制，也可能持续数十年甚至更久。从[数据加密标准](https://en.wikipedia.org/wiki/Data_Encryption_Standard)（DES）迁移到[高级加密标准](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)（AES）就是历史上的一个例子。DES 于 [1977 年](https://csrc.nist.gov/pubs/fips/46/final)成为美国联邦标准；到 [1990 年代末](https://grokipedia.com/page/56_bit_encryption)，其 56 位密钥已被证明不够安全。NIST 从 1997 年开始举办[替代标准](https://www.nist.gov/news-events/news/1999/08/nist-announces-encryption-standard-finalists)竞赛，并在 [2001 年](https://csrc.nist.gov/pubs/fips/197/final)将 AES 标准化。然而，DES 直到 [2005 年](https://www.nist.gov/news-events/news/2005/06/nist-withdraws-outdated-data-encryption-standard)才被正式撤销，其强化变体 [3DES](https://en.wikipedia.org/wiki/Triple_DES)又延续了更长时间。在有中央机构主导的情况下，这场从“已知存在风险”到“完全退役”的替换，仍耗时二十多年。

上述变更远比替换区块链的签名方案简单。对于没有中央机构、无法强制升级，且旧地址中存有价值数十亿美元资产的去中心化区块链来说，密码学转型会成为一个持续数年，甚至可能数十年的协调问题。这正是时间表争论的重要性所在：迁移必须在 Q-Day *之前*完成，而不是届时才开始。

## 比特币和以太坊的升级挑战

### 比特币：没有轻松的路径

比特币最大的优势是抗拒变更，但这也可能成为它面对 Q-Day 时最大的弱点。隔离见证（SegWit）和 Taproot 升级各自都花了多年才激活，而这两项变更都远比替换网络的密码学机制简单；后者是一次更复杂、关乎存亡的跨越。

比特币的后量子升级可以分成两个不同目标：尽量减少链上公钥暴露，以及最终替换 ECDSA。

第一个目标已经在推进。迄今最具体的一步是 [BIP-360](https://bip360.org/)，它引入了一种新的输出类型：支付到 Merkle 根（Pay-to-Merkle-Root，P2MR）。它类似 Taproot，但移除了容易受到量子攻击的密钥路径花费，防止公钥直接暴露在输出中。这缩小了攻击面，并为应对长时间暴露攻击争取了时间，但仅凭它还不能让网络具备完整的量子抗性（quantum resistance）。

第二个目标，即替换签名方案，才是真正的难点。它面临两个尚未解决的障碍：选择哪一种后量子（PQ）算法，以及如何实施迁移。

在选择合适的后量子算法时，并没有一个完美、即插即用的 ECDSA 替代品，有的只是种种取舍：



<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">类型</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">优点</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">缺点</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">基于哈希</td>
      <td style="border: 1px solid #ccc; padding: 8px;">安全假设保守</td>
      <td style="border: 1px solid #ccc; padding: 8px;">体积大、速度慢</td>
      <td style="border: 1px solid #ccc; padding: 8px;">SPHINCS+</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">有状态的基于哈希方案</td>
      <td style="border: 1px solid #ccc; padding: 8px;">安全性强</td>
      <td style="border: 1px solid #ccc; padding: 8px;">状态管理复杂</td>
      <td style="border: 1px solid #ccc; padding: 8px;">XMSS, LMS</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">基于格</td>
      <td style="border: 1px solid #ccc; padding: 8px;">验证速度快，密钥大小适中</td>
      <td style="border: 1px solid #ccc; padding: 8px;">签名较大，安全假设较新</td>
      <td style="border: 1px solid #ccc; padding: 8px;">ML-DSA, Falcon</td>
    </tr>
  </tbody>
</table>



即使是最小的后量子签名，其体积也至少是比特币当前签名的五倍。如果不采取存在争议的增大区块措施，或复杂的聚合机制，网络就可能严重拥堵。

至于迁移框架，目前提出的主要候选方案有三个：


<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">框架</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">机制</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">所需分叉</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">主要取舍</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">承诺—延迟—揭示（Commit-Delay-Reveal，CDR）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">分阶段、自愿迁移到后量子密钥</td>
      <td style="border: 1px solid #ccc; padding: 8px;">两次软分叉</td>
      <td style="border: 1px solid #ccc; padding: 8px;">自愿且不打断现有运作，但只保护密钥尚未暴露的币</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Hourglass</td>
      <td style="border: 1px solid #ccc; padding: 8px;">限制每个区块中可花费的易受攻击币的数量</td>
      <td style="border: 1px solid #ccc; padding: 8px;">两次软分叉</td>
      <td style="border: 1px solid #ccc; padding: 8px;">缓和遭破解后的市场冲击，但无法阻止已暴露币被盗</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">QRAMP</td>
      <td style="border: 1px solid #ccc; padding: 8px;">设定强制期限，期限过后由经典密码学保护的币将无法花费</td>
      <td style="border: 1px solid #ccc; padding: 8px;">一次硬分叉</td>
      <td style="border: 1px solid #ccc; padding: 8px;">强制完成全面迁移，但实际上会销毁未迁移的资金，并侵犯财产权</td>
    </tr>
  </tbody>
</table>



除了迁移如何执行，激活本身还增加了一层难题：任何变更的部署都依赖社区共识。简而言之，比特币有方向，却没有确定的计划。在限制公钥暴露方面已有初步进展，但对于采用哪一种后量子算法、遵循哪一种迁移框架，以及如何激活，仍未达成共识。

### 以太坊：计划更清晰，但尚未完成

以太坊同样面临基于 secp256k1 的 ECDSA 所带来的漏洞，但拥有更大的调整空间，而且已将后量子准备工作写入 [Lean Ethereum](https://leanroadmap.org/) 路线图。

以太坊的风险涉及四个方面：账户签名（ECDSA）、共识签名（验证者投票使用的 BLS 方案）、数据扩容背后的 KZG 承诺，以及 Rollup 使用的零知识证明系统。

对于账户，策略围绕“签名敏捷性（signature agility）”展开：让每个账户选择自己的签名验证方法，使用户无需等待整个协议统一切换，就能转向量子安全签名。

这一策略通过账户抽象（account abstraction）分两个阶段推进。

第一阶段是随 2025 年 5 月 Pectra 升级上线的 [EIP-7702](https://eip7702.io/)，它允许外部拥有账户（EOA）在交易期间暂时像智能合约一样运作。这是一个过渡步骤，账户的 ECDSA 密钥仍然有效，因此量子风险依然存在。

第二阶段是 [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)，它引入了*原生*账户抽象。如今，一笔交易是一项捆绑在一起的操作：一个 ECDSA 签名同时证明你是谁、支付 gas 并触发操作。EIP-8141 将其拆分为名为“帧（frames）”的独立调用。帧按顺序排列：先运行验证帧，再运行执行帧。关键变化在于，验证帧运行账户自己的代码来验证交易，而不是由协议检查一种固定签名。由于每个账户都能自行定义认证方式，用户可以在整个协议完成转型之前，采用量子安全签名。

关键是让账户能够使用不同的签名方案，并允许多种方案共存。用 NIST 的术语来说，这就是密码敏捷性，也是做好后量子准备的真正基础。

其余技术栈也在同步重建。验证者签名计划转向 leanXMSS，并配合一个精简的 zkVM（leanVM），将更大的签名压缩，以确保网络保持快速运行。数据可用性层和证明层则转向同一组经 NIST 标准化的基础方案（ML-KEM、ML-DSA、SLH-DSA）。以太坊通往量子抗性的进展公开记录在 [Post-QuantumEthereum](https://pq.ethereum.org/) 上。

## 密码敏捷性为什么重要

Q-Day 最难的问题，不是找到一种后量子算法。

NIST 已经将后量子方案标准化，包括用于密钥建立的 ML-KEM、用于签名的 ML-DSA，以及 SPHINCS+ 的标准化版本、用于基于哈希的签名的 SLH-DSA。

更难的问题是，区块链能否顺畅地切换密码学机制。

大多数区块链通过操作码（opcode）、预编译合约（precompiled contract）、原生账户规则或固定交易格式，将签名验证内置在协议中。这使密码学迁移变成一场复杂、往往充满争议的全网协调行动。只有网络围绕新的协议规则完成协调，用户才能依赖新方案。

密码敏捷性意味着另一种能力。

具备密码敏捷性的区块链，可以支持新的密码学原语，而无需在密码学形势每次变化时都重新设计基础协议。

这一点很重要，因为 Q-Day 并非唯一的不确定因素。后量子标准也会演变，算法可能被削弱、弃用、优化或替换。如果一条链把某一个“量子安全”答案硬编码进去，将来仍可能面临又一次具有破坏性的迁移。

更持久的优势，是适应变化的能力。

## CKB 如何以不同方式应对 Q-Day

在已经运行的区块链中，Nervos CKB 是最能体现密码敏捷性的例子之一。

大多数区块链将签名验证视为基础协议的一部分。网络能识别的密码学原语是预先规定好的；如果开发者想增加新的原语，通常就需要协调一次协议升级。因此，缺乏灵活性的链很难进行后量子迁移：改变密码学机制，就意味着改变所有人运行的规则。

CKB 采用了另一种方式。它不在协议中硬编码单一签名方案，而是通过可编程的[锁定脚本（Lock Scripts）](https://docs.nervos.org/docs/tech-explanation/lock-script)处理交易授权。这些脚本在 [CKB-VM](https://docs.nervos.org/docs/ckb-fundamentals/ckb-vm) 中运行；CKB-VM 是一个执行链上验证逻辑的 RISC-V 虚拟机。实际上，这意味着 ECDSA 验证器、Schnorr 验证器、多重签名策略或后量子验证器，都可以作为不同的代码存在于同一条链上。

这正是 CKB 的独特之处。基础协议无需预先知道钱包想使用哪种密码学方案，只需运行脚本，并验证脚本是否返回正确结果。因此，新的密码学原语可以作为链上代码部署，用户准备好后，随时都能创建由这些新锁定脚本控制的 Cell。

对于 Q-Day，这彻底改变了迁移问题。在缺乏灵活性的链上，采用后量子密码学（post-quantum cryptography）是一场全网协调行动；在 CKB 上，则可以从部署脚本开始。开发者可以添加新的验证逻辑，钱包可以集成，用户可以逐步迁移，无需等待生态系统中的每个参与者同时行动。

CKB 已经[展示](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance)了这种能力：其 [SPHINCS+](https://sphincs.org/) 锁定脚本于 2023 年实现，经过 ScaleBit 审计，并从 2025 年开始部署到主网。它支持全部 12 组 SPHINCS+ 参数集，为用户提供了今天即可使用的后量子交易授权路径。

这就是在某一时点具备量子抗性，与长期具备密码敏捷性之间的实际区别。抗量子区块链可能只支持一种后量子方案；具备密码敏捷性的链则能随着密码学领域的变化，不断增加新方案。

这一点之所以重要，是因为后量子密码学不会停滞不前。标准会演进，算法可能被优化、削弱、弃用或替换。CKB 的优势在于，它不必作出一次永久性的押注，而是可以随着领域的发展而调整，无需让每次密码学升级都演变成基础层危机。

## 常见问题

### 什么是 Q-Day？

Q-Day 是一个假想的时刻，届时具备密码破解能力的量子计算机会强大到足以破解保护现代数字系统的公钥密码学，包括保护大多数加密货币钱包的 ECDSA 签名。它是一个能力门槛，而不是固定日期。

### Q-Day 是真实的威胁吗？

是的。政府机构（如 NIST、美国国家安全局 NSA）和大型科技公司（如 Google、Cloudflare 和 IBM）都承认，Q-Day 是一个确实需要面对的安全威胁。它们都已设定具体的后量子迁移期限，并在积极制定后量子密码学标准，以提前应对。

“现在收集，将来解密”（harvest now, decrypt later，HNDL）策略增加了紧迫性：攻击者正在收集暴露的数据和公钥，以便在硬件成熟后发起攻击。对于账本永久保存且公开可读的所有公有区块链，及早准备是合理的应对方式。

### 我们离 Q-Day 还有多远？

目前还没有量子计算机能够实施这种攻击。现有机器的量子比特数量不足，错误率也仍然过高。但对攻击所需资源的估计正在快速下降。Google 的 Craig Gidney 将破解 RSA-2048 所需的物理量子比特估计，从 2019 年的约 2,000 万个降到了 2025 年的不足 100 万个。2026 年的一篇论文估计，破解比特币和以太坊背后的椭圆曲线密码学，需要的物理量子比特少于 50 万个。发展方向很明确：量子计算机需要跨过的门槛正在不断降低。

### 量子计算机何时会破解比特币？

没人知道确切年份，因为有能力做到这一点的机器尚不存在。但迁移窗口已经逐渐清晰。NIST 将 2030 至 2035 年设定为停止使用比特币如今依赖的密码学机制的期限。研究过量子风险的以太坊基金会研究员 Justin Drake 估计，到 2030 年出现具备密码破解能力的量子计算机的概率约为 10%，到 2032 年则约为 50%。确切日期仍不确定，但趋势是明确的：估计时间一直在提前。

### 量子计算机何时会破解加密？

对于依赖 RSA 和椭圆曲线的公钥加密与签名，可信机构的估计指向 2029 至 2035 年这一窗口，因此 NIST 将 2030 年定为弃用期限，2035 年定为全面禁用期限。AES-256 等对称加密方案，以及 SHA-256 等哈希函数，更能抵御量子攻击，预计不会被彻底破解。简而言之，研究认为非对称加密（如 RSA 和 ECDSA）很可能在未来十年内被攻破。

### 比特币能否渡过 Q-Day？

比特币可以渡过 Q-Day，但前提是网络在量子计算机投入运行之前，协调一次硬分叉以实现后量子密码学（PQC）。比特币的工作量证明和基于哈希的保护大体上能够抵御量子攻击，但 ECDSA 签名不能。

比特币能否存续，取决于社区能否就后量子签名方案达成一致，并在具备密码破解能力的量子计算机出现之前迁移资金。公钥已暴露、却因丢失或长期不活跃而未使用的钱包，其中的币可能永久处于风险之中。

---

本文属于 Nervos 知识库。相关背景可参阅[*区块链的量子抗性*](https://www.nervos.org/knowledge-base/quantum_resistance)*、[区块链密码敏捷性：CKB 实现量子安全的关键](https://www.nervos.org/knowledge-base/blockchain_crypto_agility)，以及[比特币通往量子抗性的路径可能是什么样](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like)。* 
