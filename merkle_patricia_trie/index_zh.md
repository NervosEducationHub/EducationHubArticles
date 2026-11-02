---
title: 'Merkle Patricia 树：重要的密码学数据结构'
coverImage: 'images/image1.png'
category: Education
subtitle: '在复杂的加密货币世界中，数据结构对保障数据完整性和高效验证发挥着关键作用。'
date: '2024-01-18T16:00:00.000Z'
author: 
- github:explainCKBot
---


这些数据结构通常运用密码学，构成了许多区块链系统的基础，确保数据不可篡改且可以验证。其中，Merkle Patricia 树（Merkle Patricia Trie）将两种基础数据结构独特地结合起来：Merkle 树（Merkle Tree）和 Patricia 树（Patricia Trie）。本文将深入介绍这两种结构的细节、它们的结合方式，以及在以太坊区块链中的应用。


## 什么是 Merkle 树？

Merkle 树起源于早期密码学研究，以其创造者[拉尔夫·默克尔（Ralph Merkle）](https://en.wikipedia.org/wiki/Ralph_Merkle)的名字命名。这种结构的设计目标，是以一种能让任何改动立即显现的方式存储数据。Merkle 树的核心是一组节点，也称叶子，其中每个节点都包含一个哈希值，即从某些输入数据生成的固定长度字节串。这种结构的巧妙之处在于简洁：叶子节点存储各项数据的哈希值，非叶子节点则存储其子节点的哈希值。这种逐层传递的效果，确保即使数据发生极小变化，也会改变根哈希值，让篡改容易被发现。

Merkle 树的数学基础是密码学[哈希函数](https://www.nervos.org/knowledge-base/what_is_a_hash_function)。哈希函数接收输入，产生固定长度的字节串。输出称为哈希摘要（digest），是给定输入所独有的。哈希函数的这种确定性，确保了 Merkle 树在数据验证中的可靠性。


## 理解 Patricia 树

Patricia 树是一种为高效数据存储而优化的结构。Patricia 是 Practical Algorithm To Retrieve Information Coded In Alphanumeric 的缩写，即检索以字母数字编码的信息的实用算法。Merkle 树侧重数据验证，Patricia 树则用于数据存储与检索。它是一种 n 叉树，意味着每个节点都可以根据数据的键拥有多个子节点。这种结构使前缀相似的节点共享同一路径，从而优化存储和检索时间。

例如，在 Patricia 树中存储单词时，tea 和 ted 这样的单词具有共同前缀，会共享开头的路径 te，剩余字符则沿不同路径展开。这种共享路径的机制，使存储更高效、检索更快捷，因此 Patricia 树很适合数据库和路由表。


## Merkle Patricia 树：两种结构的结合

改进型 Merkle Patricia 树（Modified Merkle Patricia Trie，MPT）巧妙地融合了 Merkle 树和 Patricia 树各自的优势。从根本上说，MPT 是一棵树，每个节点都有从其内容派生的唯一哈希值。这种结构同时实现了高效的数据存储和稳健的数据验证，前者得益于 Patricia 树，后者得益于 Merkle 树。

MPT 的节点分为三类：分支节点（branch）、叶子节点（leaf）和扩展节点（extension）。分支节点最多可以有 16 个子节点，对应十六进制字符集中的 16 个字符。叶子节点代表某条数据路径的终点。扩展节点则通过压缩只有一个子节点的节点路径，优化结构。


### Merkle Patricia 树在以太坊中的应用

以太坊采用改进型 Merkle Patricia 树来维护其状态（state），也就是所有账户余额、合约代码和存储的快照。在以太坊架构中，每笔交易都会修改状态，而 MPT 确保这些变化能够高效存储，并保持可验证性。

MPT 在以太坊中发挥着两方面作用。第一，通过根哈希值的变化，让任何篡改显现出来，从而确保数据完整性。第二，优化存储，确保不断增长的以太坊[状态](https://www.nervos.org/knowledge-base/state_and_state_change)仍然易于管理和快速访问。


## 结语

Merkle Patricia 树巧妙地结合了两种强大的数据结构，形成一个针对区块链平台独特挑战而优化的系统。它在以太坊中保障数据完整性和高效存储的作用，凸显了其在加密货币领域的重要性。随着加密货币世界不断演进，MPT 这样的结构无疑仍将处于前沿，引领区块链系统迈向更安全、高效、可扩展的方向。
