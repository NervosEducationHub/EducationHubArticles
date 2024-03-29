---
title: 'Secp256k1：加密货币的关键算法'
coverImage: 'images/image1.png'
category: Popular
subtitle: 'secp256k1 是区块链项目中应用最多的椭圆曲线算法，源于比特币中的应用，后来的大多数区块链项目都在用。'
date: '2023-08-22T16:00:00.000Z'
author: 
- github:explainCKBot
---

secp256k1 是高效密码组标准（Standards for Efficient Cryptography Group，下文简称 SECG）协会定义的一套椭圆曲线签名算法标准，是有限域上椭圆曲线的一个特定实例。本文将探讨 secp256k1 的意义、特性及它在加密货币中的关键作用。




## 认识椭圆曲线和 secp256k1 

椭圆曲线是二维空间中满足特定数学方程的点的集合。就 secp256k1 而言，方程为：

**y² = x³ + 7 (mod p)**

其中 **p** 是一个大素数，它定义了曲线所覆盖的有限域，**'mod p'** 操作确保所有计算都在这个有限域内执行，这对曲线的加密安全至关重要。

secp256k1 这一名称源自曲线的特性："sec" 代表 "高效密码学标准"，"p" 代表曲线坐标是素数域，"256" 表示素数是 256 位长，"k1" 表示它是 SECG 推荐的第一条此类曲线。



## secp256k1 与加密货币

比特币是第一个也是最著名的加密货币，其公钥加密技术依赖于 secp256k1。 具体来说，它使用了以 secp256k1 作为底层椭圆曲线的椭圆曲线数字签名算法（ECDSA）。此后，包括以太坊和莱特币在内的许多其他加密货币的数字签名方案都采用了这种曲线。

secp256k1 成为加密货币的热门选择有以下几个原因：

* **安全性：** secp256k1的安全性源于椭圆曲线离散对数问题（ECDLP），对于选择良好的曲线和足够大的密钥大小，ECDLP 被认为在计算上是不可行的。secp256k1 中使用的 256 位密钥具有很高的安全性，使其能够抵御已知的攻击。
* **效率：** secp256k1 是一条 Koblitz 曲线，这是特殊椭圆曲线中的一个门类，可实现高效计算。这一特性使其在加密货币中的应用极具吸引力，在加密货币中，计算效率对于大规模的实际应用至关重要。
* **相对较短的密钥大小：** secp256k1 中使用的 256 位密钥大小会产生相对较短的公钥和签名，这有利于提高存储和传输效率，尤其是在区块链上。
* **广泛采用：** 事实上，比特币和其他主要加密货币都采用了 secp256k1，从而形成了一个包含大量工具、库和社区支持的生态系统，使其成为新加密货币项目的一个有吸引力的选择。


### secp256k1 在加密货币中的应用

在加密货币中，secp256k1 用于生成密钥对、签署交易和验证签名。 该过程的工作原理如下：

* **生成密钥对：** 私钥被随机生成为 256 位整数，以创建新的密钥对。 然后通过将私钥乘以 secp256k1 基点 G（曲线上的一个预定义点）来得到相应的公钥。 其结果是曲线上的另一个点，作为公钥。
* **签署交易：** 当用户想要发起加密货币交易时，他们必须使用私钥对其进行签名。签名的过程使用了以 secp256k1 作为底层椭圆曲线的 ECDSA 算法。由此产生的数字签名可以证明私钥持有者授权了交易，却不会泄露私钥本身。
* **验证签名：** 为确保交易的有效性，其他网络参与者必须验证数字签名。这一过程需要使用与签名者地址相关联的公钥和以 secp256k1 作为底层椭圆曲线的 ECDSA 算法。如果签名有效，则可证实交易确实得到了私钥所有者的授权，从而确保交易的完整性和真实性。
* **生成地址：** 在包括比特币在内的大多数加密货币中，公钥经过哈希和编码后会生成一个唯一的地址。该地址用作用户钱包的标识符，允许用户接收和发送加密货币。虽然公钥可以从私钥导出，但从公钥或地址逆向推导出私钥在计算上是不可行的，这就确保了用户资金的安全。



## secp256k1 的其他应用

虽然 secp256k1 最常与加密货币联系在一起，但它的特性也使其适用于其他加密应用。例如，它已被用于传输层安全协议（TLS）和安全外壳协议（SSH）等安全通信协议中，以进行身份验证。此外，一些数字证书方案也采用了 secp256k1，以确保网站和其他数字实体的真实性和完整性。




## 总结

secp256k1 是支撑比特币、以太坊等加密货币的加密系统的重要组成部分。secp256k1 的安全性、高效性和相对较短的密钥大小使其成为这些应用的一个极具吸引力的选择，并且它的广泛采用也催生了一个包含大量工具、库和社区支持的蓬勃发展的生态系统。随着加密货币和分布式账本技术在全球的普及，secp256k1 将继续成为这些系统加密基础的关键组成部分。
