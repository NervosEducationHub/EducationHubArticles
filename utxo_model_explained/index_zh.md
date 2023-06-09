---
title: 'UTXO 模型的介绍'
coverImage: 'images/image1.png'
category: 'UTXO'
date: '2023-05-25T16:00:00.000Z'
---

![alt_text](images/image2.png 'image_tooltip')

UTXO（Unspent Transaction Output，未花费的交易输出） 模型在比特币和其他基于 UTXO 的加密货币中起着至关重要的作用。它能准确跟踪代币所有权的变化，并支持了区块链网络的安全性和完整性。

## UTXO 模型中的交易是如何进行的？

在基于 UTXO 的区块链中，账本的状态由一组 UTXO 来表示，它们是不可分割的加密货币单位，可以在未来交易中花费掉。每个 UTXO 都与特定所有者的公钥相关联，只有提供与该公钥相对应的有效签名才能花费这些 UTXO。

基于 UTXO 模型的区块链，其链上交易由输入和输出两部分组成。输入指的是正在花费的 UTXO，而输出是指未花费的 “代币”。一笔交易消耗一个或多个现有的 UTXO 作为输入，并生成新的 UTXO 作为输出，新的 UTXO会被添加到其他 UTXO 合集中。这个过程维护了系统内的价值守恒。

UTXO 模型对于维护区块链网络的安全性和完整性至关重要。该模型通过确保每个 UTXO 只能花费一次来有效防止双花攻击。网络中的节点会维护一个 UTXO 合集，通过检查引用的 UTXO 是否存在以及之前有没有被花费掉来验证交易。如果交易有效，节点会将其添加到它们的内存池中。内存池是一个等待被打包到区块中的未确认的交易池。

当新的区块被挖出并且添加到区块链时，节点通过删除已经花费的输入并添加新创建的 UTXO 来更新他们所维护的 UTXO 合集。在区块链发生重组的情况下，节点也必须更新他们的 UTXO 合集，以反映新链带来的变化。

## 与其他模型的对比

虽然 UTXO 模型广泛应用于比特币、莱特币等加密货币，但市面上还存在其他交易模型。例如，以太坊使用了账户模型，其运作方式更像传统的银行账户。在账户模型中，账本的状态通过账户余额而不是通过 UTXO 来表示。交易发生后，直接更新发送者和接收者的账户余额，并不会创建新的输出。

UTXO 和账户模型各有优缺点。UTXO 模型提供了更强的隐私性和可扩展性，而账户模型则更具简单性和易用性。交易模型的选择取决于区块链项目的个性化需求和目标。

## UTXO 模型的优缺点

如前所述，相比于账户模型，UTXO 模型的优势包括更强的可扩展性和更好的隐私性。

具体来说，基于 UTXO 的区块链更具可扩展性，因为它们可以并行处理交易，即矿工可以独立验证每笔交易并同时处理不同的交易。这与基于账户模型的区块链形成了对比，后者只能以线性方式，按照顺序或者一个接一个地处理交易，在用户需求量大的时候，往往会造成网络拥堵。

在隐私方面，UTXO 模型优于账户模型，因为它抽象出了链上身份的概念。具体来讲，在基于 UTXO 的区块链中，会鼓励用户为他们转账的或接收的每笔交易创建新地址，让第三方更难将交易与用户的身份联系起来。在基于账户模型的区块链中，用户通常使用一个公共地址或者账户来处理他们的所有交易，这使得其链上账户与现实生活中的身份更容易联系起来。

UTXO 模型最明显的缺点是缺乏可编程性或者说智能合约的支持。也就是说，比特币使用的标准 UTXO 模型仅支持简单的加密货币交易，不能用于构建去中心化应用程序。不过，还有一些区块链项目，比如 Nervos CKB 和 Cardano，它们已经实现了自己的通用版 UTXO 模型 —— Cell 模型和 EUTXO（Extended UTXO）模型，它们与基于账户模型的区块链一样，甚至更加灵活，更具可编程性。

