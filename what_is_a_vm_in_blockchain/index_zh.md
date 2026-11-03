---
title: '区块链中的虚拟机（VM）是什么？'
coverImage: 'images/image1.png'
category:
subtitle: '在区块链领域，虚拟机（VM）是执行智能合约和去中心化应用（dApp）的重要技术。虚拟机在传统计算领域已是广为人知的概念，而用于区块链时，又具备了适应这些网络去中心化特性的独特功能和优势。'
date: '2024-08-07 T20:00:00.000Z'
author:
- github:explainCKBot
---


## 理解虚拟机（VM）

在一般计算领域，虚拟机（VM）是对物理计算机的软件模拟。它让多个操作系统能够同时在一台物理机器上运行，各自处于独立环境中。通过将不同应用和操作系统彼此隔离，这种模拟提供了灵活性、资源优化和安全性。

虚拟机的核心组件是虚拟机监控器（hypervisor），这是一种负责创建和管理虚拟机的软件。它为每台虚拟机分配 CPU、内存和存储资源，并确保它们独立运行。虚拟机监控器主要有两类：

1. **第 1 类（裸机型，Bare-Metal）虚拟机监控器** 直接运行在物理硬件上，并管理客户操作系统（guest operating systems）。例如 [VMware ESXi](https://en.wikipedia.org/wiki/VMware_ESXi)、[Microsoft Hyper-V](https://en.wikipedia.org/wiki/Hyper-V) 和 [Xen](https://en.wikipedia.org/wiki/Xen)。

2. **第 2 类（宿主型，Hosted）虚拟机监控器** ：运行在已有操作系统之上，为客户操作系统提供虚拟化服务。例如 [VMware Workstation](https://en.wikipedia.org/wiki/VMware_Workstation)、[Oracle VirtualBox](https://en.wikipedia.org/wiki/VirtualBox) 和 [Parallels Desktop](https://en.wikipedia.org/wiki/Parallels_Desktop_for_Mac)。

每台虚拟机都会模拟 CPU、内存、网络接口和存储设备等硬件组件。这些虚拟硬件呈现给客户操作系统，后者会像与物理硬件交互一样与之交互。客户操作系统就是安装在虚拟机上的操作系统，例如 Windows、Linux 或 macOS。它像在物理机器上一样运行应用和服务，并不知道自己处于虚拟环境中。宿主操作系统则直接运行在物理硬件上，并承载虚拟机。

虚拟机的一项主要优势，是能够隔离环境。每台虚拟机都在沙盒环境中运行，意味着某台虚拟机内部的任何问题、崩溃或安全事件，都不会影响其他虚拟机或宿主系统。这种隔离对于维护安全性和稳定性至关重要，尤其是在数据中心和云平台等多租户环境中。


## 区块链中的虚拟机

在区块链语境中，虚拟机是专门用于执行智能合约和运行去中心化应用（dApp）的软件环境。它作为智能合约代码执行的运行时环境，确保执行过程安全、确定且相互隔离。 


### 主要特性与功能


####  **执行智能合约**

智能合约是将条款直接写入代码、自动执行的合约。区块链虚拟机为这些代码提供执行环境。高级编程语言（如以太坊的 [Solidity](https://en.wikipedia.org/wiki/Solidity)），会被编译为虚拟机能够运行的字节码（bytecode）。


####  **确定性执行**

区块链虚拟机的一项关键特性，是确保确定性执行（deterministic execution）。这意味着，只要输入相同，无论代码何时、何地执行，虚拟机总会产生相同输出。这种一致性对于分布式网络维持共识至关重要，因为所有节点都必须对智能合约的执行结果达成一致。


####  **隔离与安全**

虚拟机在隔离环境中运行，意味着一个智能合约的执行，不会干扰其他合约或区块链本身。这种隔离对安全性至关重要，可以防止恶意或有缺陷的代码影响整个网络。它也有助于资源管理，确保任何单个合约都无法独占网络算力。


###  **区块链虚拟机示例**


####  **以太坊虚拟机（EVM）**

[以太坊虚拟机（EVM）](https://ethereum.org/en/developers/docs/evm/)是最广为人知、使用最广泛的区块链虚拟机。它具有图灵完备性（Turing completeness），意味着只要资源充足，就能执行任何计算。EVM 负责处理智能合约的执行；智能合约是将条款直接写入代码、自动执行的合约。


#####  **EVM 的主要特性**

1. **图灵完备** ：EVM 能够执行任何计算，因此适用于多种应用，从简单的代币转账，到复杂的去中心化应用。

2. **字节码执行** ：用 Solidity 等高级语言编写的智能合约，会被编译成 EVM 字节码，再由 EVM 执行。这些字节码在所有以太坊节点上保持一致，确保智能合约在整个网络中以相同方式运行。

3. **Gas 机制** ：EVM 使用 gas 系统计量执行交易和智能合约所需的计算工作量。[Gas 费用](https://www.nervos.org/knowledge-base/what_is_a_blockchain_gas_fee)可以防止无限循环和过度资源消耗，维护网络稳定与安全。

4. **安全与隔离** ：EVM 将智能合约执行与以太坊区块链隔离，确保恶意或有缺陷的合约不会影响整个网络。


#####  **影响与应用场景**

EVM 支持创建多种去中心化应用，包括去中心化金融（DeFi）平台、非同质化代币（NFT）和去中心化自治组织（DAO）。其广泛采用和强大的开发者生态，使以太坊成为区块链领域的领先者。


####  **CKB-VM（Nervos Common Knowledge Base 虚拟机）**

[CKB-VM](https://docs.nervos.org/docs/ckb-fundamentals/ckb-vm) 是 [Nervos Network](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain) 使用的虚拟机，专为 Common Knowledge Base（CKB）这条 Layer 1 区块链设计。CKB-VM 在区块链虚拟机的设计上独具特色，强调灵活性、兼容性和互操作性。


#####  **CKB-VM 的主要特性**

1. **基于 RISC-V ISA** ：CKB-VM 构建在 [RISC-V](https://www.nervos.org/knowledge-base/what_is_riscv)（Reduced Instruction Set Computing，精简指令集计算）指令集架构（ISA）之上。RISC-V 是一种开放标准，既可扩展，又具有适应性。与专有指令集不同，RISC-V 提供一组精简指令，可以通过自定义功能加以扩展。这使 RISC-V 比 EVM 的专用架构更高效、更灵活。RISC-V ISA 的简洁性便于优化性能和实现，因此适合需要稳健、可适应的计算能力的区块链应用。

2. **高效的执行环境** ：由于以 RISC-V 为基础，CKB-VM 提供了高效的执行环境。RISC-V 指令集复杂度较低，因此开销更小，智能合约执行更快。这种效率对于区块链操作实现高性能至关重要，可以加快交易处理并减少资源消耗。

3. **底层特性与灵活性** ：CKB-VM 的底层特性，使其无需依赖[预编译合约（precompiles）](https://www.nervos.org/knowledge-base/what_are_precompiles)，就能支持所有密码学原语（cryptographic primitives）。EVM 需要通过预编译合约来优化某些密码学操作的性能，CKB-VM 则凭借灵活的架构，能够直接执行这些操作。此外，CKB-VM 支持 C 和 Rust 等多种编程语言，让开发者根据需求选择最合适的工具。


#####  **影响与应用场景**

CKB-VM 支撑着创建通用、安全、可扩展区块链平台 [CKB](https://www.youtube.com/watch?v=zD9xFpLmkVM) 的愿景。它支持 DeFi、NFT 平台和跨链协议等多种应用，是开发者用途广泛的工具。


####  **Solana 虚拟机（SVM）**

Solana 虚拟机（SVM）是 Solana 区块链不可或缺的组成部分，后者以高吞吐量和低延迟闻名。SVM 的设计旨在尽量提高性能和效率，支持 Solana 将区块链交易处理规模提升到极高水平的目标。


#####  **Solana VM 的主要特性**

1. **伯克利包过滤器（BPF）：** SVM 使用[伯克利包过滤器](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)（BPF）字节码格式。BPF 最初用于在类 Unix 操作系统中过滤网络数据包，但其简洁、高效和安全的特性，也使其非常适合在 Solana 上执行智能合约。Solana 智能合约和程序通常用 Rust、C 等高级编程语言编写，然后编译成 BPF 字节码，交由 Solana VM 执行。使用 Rust 和 C 可以利用它们强大的功能和性能优化能力，从而提高 Solana 网络的整体效率。

2. **高性能** ：SVM 利用 Solana 区块链的独特架构，包括[历史证明（Proof of History）](https://medium.com/solana-labs/proof-of-history-explained-by-a-water-clock-e682183417b8)（PoH）与塔式拜占庭容错（[Tower BFT](https://medium.com/solana-labs/tower-bft-solanas-high-performance-implementation-of-pbft-464725911e79)），来实现高交易吞吐量。它每秒可以处理数千笔交易，使其成为最快的区块链之一。

3. **Sealevel 运行时** ：Solana 的运行时 [Sealevel](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) 支持并行执行智能合约，而 EVM 采用串行执行模型。这一设计提高了智能合约处理的效率和速度。


###  **结语**

[以太坊的 EVM、Nervos 的 CKB-VM 和 Solana 的 SVM](https://www.nervos.org/knowledge-base/comparing_blockchain_virtual_machines) 各自提供了适合其网络的独特功能和能力。EVM 为智能合约提供稳健、被广泛采用的环境。CKB-VM 采用基于 RISC-V 的虚拟机，强调灵活性、互操作性和并行化。Solana 的 SVM 专注于高性能和可扩展性，同样支持并行执行。这些虚拟机共同展示了区块链虚拟化的多种实现路径，推动创新，并拓展去中心化应用的潜力。

