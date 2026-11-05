---
title: "什么是原生 Rollup？完整指南"
coverImage: 'images/image1.png'
category: Scaling
subtitle: "以太坊的扩容历程始终受一个需求驱动：在去中心化、安全性与可扩展性之间取得平衡。"
date: '2025-08-26T16:00:00.000Z'
author: 
- github:explainCKBot
---

Rollup 已成为在不损害以太坊核心价值的前提下实现扩容的最可行方式。它将计算放在链下执行，而数据和安全性仍以以太坊为基础。如今，一个新概念正在兴起，承诺让 Rollup 与 Layer 1 更紧密地结合：原生 Rollup（native rollups）。

原生 Rollup 直接集成在区块链的基础层中。传统 Rollup 作为智能合约运行在以太坊之上，而原生 Rollup 由协议本身原生支持，因此能够提供更深层的安全保障、更高的效率和更低的延迟。

原生 Rollup 仍是一个发展中的概念，尚未在以太坊上线。不过，Celestia、zkSync 和 Cosmos 等其他链已开始探索或实现这一概念。以太坊研究人员也在认真思考，原生 Rollup 如何融入其长期路线图。要理解它的潜力，我们需要先了解传统 Rollup 的运作方式。



## 传统 Rollup：理解现有扩容方案

目前，大多数 Rollup 都是构建在以太坊之上的 Layer 2 协议。它们向以太坊提交交易数据，并依赖以太坊提供安全性与共识。两种主流类型是[乐观 Rollup](https://www.nervos.org/knowledge-base/what_are_optimistic_rollups_and_how_do_they_work) 和零知识（ZK）Rollup。两者都旨在降低 gas 成本、提高吞吐量，同时继续受益于以太坊去中心化的基础层。

乐观 Rollup 假定所有交易有效，除非有人提出质疑。它采用欺诈证明，并提供挑战窗口，让参与者能够对错误数据提出异议。ZK Rollup 则提交密码学证明，预先验证正确性。

尽管存在差异，两类 Rollup 都依赖以太坊提供两项功能：[数据可用性（data availability）](https://www.nervos.org/knowledge-base/what_is_data_availability_in_blockchain)与争议解决。但实际执行发生在链下，它们通过智能合约与以太坊交互。这种模式可行，却也存在局限，会在层间的[桥](https://www.nervos.org/knowledge-base/what_are_blockchain_bridges)中引入额外延迟、复杂性和潜在漏洞。



## 什么让 Rollup 成为“原生”Rollup？

原生 Rollup 与基础链的集成方式有根本不同。它并非以智能合约或叠加在基础链之上的独立协议存在，而是内置于区块链协议本身。这意味着，链从设计之初就支持 Rollup 功能，包括执行、结算和数据可用性。

原生 Rollup 概念的核心是引入 `EXECUTE` [预编译合约（precompiled contract）](https://www.nervos.org/knowledge-base/what_are_precompiles)，即嵌入以太坊协议的一种特殊合约。它将 Layer 1（L1）的以太坊[虚拟机](https://www.nervos.org/knowledge-base/what_is_a_vm_in_blockchain)（EVM）执行引擎开放给应用层，使其能够直接验证 Layer 2（L2）的[状态（state）](https://www.nervos.org/knowledge-base/state_and_state_change)转换。借助这一机制，原生 Rollup 可以实现 EVM 等价性，而无需欺诈证明或[零知识证明（Zero Knowledge Proof，ZKP）](https://www.nervos.org/knowledge-base/zero_knowledge_proofs)等外部验证系统。​



### `EXECUTE` 预编译合约如何工作

`EXECUTE` 预编译合约接收以下特定输入：

* **`pre_state_root`**：执行 Rollup 交易之前，状态树的根哈希。​

* **`post_state_root`**：预期的执行后根哈希。​

* **`trace`**：格式正确的执行轨迹，通常是一组 L2 交易及其对应的状态访问证明。​

* **`gas_used`**：执行该轨迹所消耗的 gas 数量。​

预编译合约会返回 `true`，前提是从 `pre_state_root` 开始，对所提供轨迹进行无状态执行后得到 `post_state_root`，且消耗的 gas 恰好等于指定的 `gas_used`。这种设计确保 L1 [验证者（validators）](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators)能够通过重新执行，直接验证 L2 的状态转换，从而继承以太坊稳健的安全模型。



## 原生 Rollup 的优势

在以太坊协议中原生集成 Rollup 功能，有几项引人注目的优势：

* **增强安全性**：原生 Rollup 无需外部验证机制和安全委员会，仅依靠以太坊现有的安全基础设施，从而减少潜在攻击途径。​

* **简化架构**：L1 与 L2 通过 `EXECUTE` 预编译合约直接交互，精简了 Rollup 的设计，消除了现有 Rollup 基础设施带来的复杂性。​

* **实时结算**：原生 Rollup 无需等待外部证明，即可实现即时[最终性（finality）](https://www.nervos.org/knowledge-base/what_is_finality_crypto)，从而加快交易确认，改善用户体验。​



## 实现时需要考虑的事项

原生 Rollup 的概念虽有前景，但实现时仍需仔细考虑几个方面：

* **Gas 计量与定价**：`EXECUTE` 预编译合约引入累计 gas 上限和目标值，需要采用类似 EIP-1559 的机制来有效管理 gas 定价。这种方式确保执行在经济上可行，且不会造成网络拥堵。

* **数据可用性**：必须确保验证者能够访问执行轨迹（`trace`）。轨迹必须引用以太坊上可用的数据，例如 calldata、[blob](https://www.nervos.org/knowledge-base/what_are_blobs_in_ethereum)、状态或内存中的数据，以便重新执行与验证。​

* **验证者职责**：验证者可能需要重新执行轨迹，以确保 `EXECUTE` 调用的正确性。这项要求可能影响其计算负载，尤其是在 `EXECUTE` 调用的累计 gas 上限较高时。​



## 原生 Rollup 与传统 Rollup：对比分析

包括乐观 Rollup 和零知识 Rollup 在内的传统 Rollup 依赖外部证明系统，往往会因挑战期或证明生成时间而产生延迟。原生 Rollup 则将执行验证集成到以太坊 L1 中，无需这类外部系统，从而减少相关延迟。这种集成不仅简化了 Rollup 架构，还消除了对中间环节的信任假设，增强了安全性。​



## 未来展望

原生 Rollup 的开发和采用仍处于探索阶段。以太坊研究人员和开发者正积极研究实现 `EXECUTE` 预编译合约及其他相关机制的可行性和潜在影响。随着讨论深入，原生 Rollup 可能在以太坊的可扩展性路线图中发挥关键作用，兼顾性能、安全性和简洁性。

总之，原生 Rollup 提出了一种应对以太坊可扩展性挑战的变革性思路：将 Rollup 功能直接嵌入协议。通过 `EXECUTE` 预编译合约等机制，它有望增强安全性、精简架构并改善[交易最终性](https://www.nervos.org/knowledge-base/what_is_finality_crypto)，推动区块链扩容方案的发展。
