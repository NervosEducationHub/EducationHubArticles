---
title: "什么是抗量子钱包？"
coverImage: "images/image1.png"
category: Wallet
subtitle: "抗量子钱包是加密货币生态为现有密码学假设可能失效的未来作准备的一步；这一步虽处早期，却至关重要。"
date: "2026-06-29T16:00:00.000Z"
author:
  - github:explainCKBot
---

## 要点

- **定义：** 抗量子钱包是一种使用后量子密码学保护用户资金、抵御未来量子计算攻击的加密货币钱包。  
- **密码学升级：** 这类钱包用基于格或基于哈希的签名算法等抗量子方案，取代 ECC、RSA 等易受攻击的经典数学方案。  
- **严格的地址使用规范：** 抗量子钱包强制生成一次性地址，尽量减少公钥暴露，以缓解地址复用风险和“先收集、后解密”攻击。  
- **前瞻性架构与密码敏捷性：** 在不断变化的安全环境中，简单替换算法并不足够。钱包设计需要密码敏捷性，这种转变使具有适应能力的区块链能够顺畅升级安全措施，而无须全网硬分叉。

## 什么是抗量子钱包？

抗量子钱包（quantum-resistant wallet）是一种通过采用[后量子密码学（post-quantum cryptography）](https://en.wikipedia.org/wiki/Post-quantum_cryptography)，保护用户资产免受量子计算攻击的加密货币钱包。传统数字钱包依赖[椭圆曲线密码学](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)（Elliptic Curve Cryptography，ECC）或 [RSA](https://en.wikipedia.org/wiki/RSA_cryptosystem)（Rivest–Shamir–Adleman）生成公私钥对，而这类钱包舍弃了整数分解和离散对数等易受攻击的数学结构，转而使用[基于哈希](https://en.wikipedia.org/wiki/Hash-based_cryptography)或[基于格](https://www.nervos.org/knowledge-base/what_is_lattice_based_cryptography)的密码学等抗量子标准。这些标准在数学上能够安全抵御量子硬件的求解，确保无法从已暴露的公钥推导出私钥。

## 为什么加密货币钱包容易受到量子计算机攻击？

加密货币钱包容易受到量子计算机攻击，是因为它们底层采用的椭圆曲线数字签名，例如 [ECDSA](https://www.nervos.org/knowledge-base/understanding_ecdsa) 或 [EdDSA](https://en.wikipedia.org/wiki/EdDSA)，依赖[离散对数（discrete logarithm）](https://en.wikipedia.org/wiki/Discrete_logarithm)问题。经典计算机无法解决这一数学难题，但量子计算机可以使用[肖尔算法（Shor’s algorithm）](https://en.wikipedia.org/wiki/Shor's_algorithm)快速破解。

尽管这一安全假设数十年来一直保护着比特币、以太坊等网络，但足够强大的量子计算机能够完全绕过这道防线。这意味着，一旦公钥在区块链上暴露，签名层面的数学屏障就会失效，传统钱包架构面对配备量子计算设备的对手将不再安全。

## 为什么地址复用会增加量子风险？

地址复用（address reuse）会让钱包的公钥永久暴露在链上，为未来回溯攻击提供一个静态、无法改变的目标，因此会增加量子风险。交易签名并广播后，此前被哈希函数隐藏的公钥就会在区块链上变得可见。如果后续交易继续使用同一地址，已经暴露的公钥就会无限期地成为固定攻击目标。

在[“先收集、后解密”（harvest now, decrypt later，HNDL）](https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later)策略下，对手今天就能记录这些暴露的公钥，并妥善保存，直到量子计算机成熟到足以提取私钥。最直接面临风险的是公钥已经上链的钱包，尤其是重复使用过的地址；从未广播交易的钱包具有一定的暂时保护，但这并不意味着永久安全。区块链数据公开且不可篡改，无法事后隐藏已暴露的公钥，使 HNDL 风险进一步加剧。

为防止这种情况，抗量子钱包执行严格的地址使用规范，为每笔交易生成唯一的一次性地址，确保公钥不会反复暴露在不可篡改的账本上。

## 怎样的钱包才具备量子抗性？

钱包通过将传统签名方案替换为不依赖离散对数或[整数分解](https://en.wikipedia.org/wiki/Integer_factorization)的数学构造，获得量子抗性（quantum resistance）。在实践中，这要求采用经过[美国国家标准与技术研究院（NIST）](https://www.nist.gov/)等全球标准化机构审查的替代签名算法，包括 [SPHINCS+](https://en.wikipedia.org/wiki/SPHINCS%2B)、[Dilithium](https://pq-crystals.org/dilithium/) 和 [Falcon](https://en.wikipedia.org/wiki/Falcon_\(signature_scheme\))。

不过，量子抗性要求的不只是简单替换算法，而是更广泛的架构重设计。量子钱包必须全面更新密钥的生成、存储、披露和轮换方式，避免日常操作无意间泄露可被利用的元数据。因此，抗量子钱包既是一项密码学升级，也是一次以持久安全为目标的更广泛架构重设计。

## 量子钱包用起来安全吗？

是的，抗量子钱包可以安全使用，因为它们摆脱了对易受攻击的经典数学的依赖，让数字资产免受当前安全漏洞利用和未来量子解密手段的侵害。升级到后量子签名方案，为长期资产保护提供了必要的安全裕量（security margin）。不过，如前所述，其现实安全性也高度依赖严格的地址使用规范。自动使用一次性地址、尽量缩短公钥暴露窗口时，它们最为安全。

## 哪些加密货币钱包具有量子抗性？

目前，真正可用的抗量子加密货币钱包仍非常少见。[Quantum Purse](https://www.quantumpurse.org/) 是主要的已上线实例之一，它是一款构建于 CKB（Common Knowledge Base）区块链上的自托管桌面钱包。Quantum Purse 使用 [SPHINCS+](https://sphincs.org/) 签名方案，而当今多数主流钱包，包括比特币和以太坊钱包，仍依赖 ECDSA 或 Schnorr 签名，因而不具备量子抗性。这是因为修改这些传统区块链的密码学机制，需要[复杂、协调一致的协议升级](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like)，而此类升级尚未实施。相比之下，CKB 是一条具有密码敏捷性（crypto agility）的区块链，允许在脚本层部署自定义验证逻辑，因此无需协议级硬分叉就能集成新的签名方案。

希望今天就获得抗量子存储的用户，应考虑部署在这类原生支持后量子密码学原语（post-quantum cryptographic primitives）的区块链上的钱包，而不是等待传统网络完成协议迁移。

## CKB 如何在不硬分叉的情况下支持抗量子钱包？

CKB 利用原生[密码敏捷性](https://www.nervos.org/knowledge-base/blockchain_crypto_agility)，在不硬分叉的情况下支持抗量子钱包。它将验证逻辑与共识层解耦，使验证逻辑完全在应用层运行。多数 Layer 1 区块链将 ECC 原语硬编码到核心协议中，而 CKB 将基于 [RISC-V](https://www.nervos.org/knowledge-base/what_is_riscv) 的 [CKB-VM](https://docs.nervos.org/docs/ckb-fundamentals/ckb-vm) 与高级 UTXO 模型，即 [Cell 模型](https://docs.nervos.org/docs/ckb-fundamentals/cell-model)结合。这种架构让开发者只需将新的抗量子密码算法部署为智能合约，就能定义 Cell 的花费条件，而无须修改协议。这些合约称为[脚本（Scripts）](https://docs.nervos.org/docs/getting-started/how-ckb-works#scripts)。这种密码敏捷性让 [Quantum Purse](https://www.quantumpurse.org/) 等钱包能够通过自定义脚本强制使用 SPHINCS+ 签名，而不干扰整个网络。

## 开发抗量子钱包面临哪些挑战？

开发抗量子钱包的主要挑战包括：处理大幅增大的签名、克服僵化的网络兼容性障碍，以及适应不断变化的全球密码学标准。

* **签名大小与效率**：许多后量子方案占用的空间远大于传统椭圆曲线系统。例如，一个标准 [secp256k1](https://www.nervos.org/knowledge-base/secp256k1_a_key_algorithm) 签名约为 64 字节，而抗量子的 SPHINCS+ 签名范围为 [8 KB 至 49 KB](https://asecuritysite.com/signatures/fips205)，会大幅增加交易数据载荷和验证成本。  
* **网络兼容性**：[比特币和以太坊](https://www.nervos.org/knowledge-base/are_bitcoin_and_ethereum_quantum_resistant)等传统区块链在协议层与 ECC 深度绑定，若不进行可能引发争议的全网[协议升级](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork)，几乎不可能引入后量子签名。CKB 等具有密码敏捷性的区块链，通过基于 [Cell 模型](https://medium.com/nervosnetwork/the-cell-model-a-generalized-utxo-model-2da32248b0a0)和 [CKB-VM](https://docs.nervos.org/docs/ckb-features/vm-built-for-hackers) 的灵活架构，避免了这一问题。  
* **持续演进的密码学标准**：全球密码学界仍在积极研究后量子密码学并推进标准化，因此钱包设计必须具有极强的适应能力，以免基础算法建议变化后，钱包变得过时。

## 结语

抗量子钱包是加密货币生态为现有密码学假设可能失效的未来作准备的一步；这一步虽处早期，却至关重要。通过采用后量子签名方案、重新设计密钥管理方式，并支持混合安全模型，这些钱包旨在保护数字资产免受当前和未来威胁。

量子钱包的重要性并不在于眼前的迫切需要，而在于长远眼光。它展现了区块链社区如何预判技术变化，并通过周密的工程设计提前应对，而非事后被动反应。随着后量子安全不断演进，抗量子钱包仍将是这种准备最实用、最直观的体现之一。
