---
title: "什么是 WebAuthn？安全在线认证的未来"
coverImage: 'images/image1.png'
category: Education
subtitle: "在网络安全担忧日益加剧的数字时代，WebAuthn 带来了新的希望。它不只是又一个技术术语，而是一项可能重新定义在线安全的突破性标准。"
date: '2024-01-30T16:00:00.000Z'
author: 
- github:explainCKBot
---


WebAuthn 由[万维网联盟（World Wide Web Consortium，W3C）](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)与 [FIDO 联盟](https://en.wikipedia.org/wiki/FIDO_Alliance)合作制定，是一项 JavaScript API 规范。它支持在 Web 上进行安全的无密码认证，标志着对传统“用户名—密码”模式的重要转变。在网络威胁和数据泄露频发的世界中，这是一项具有变革意义的创新。


## 为什么安全的在线认证需要 WebAuthn

传统认证方法，主要是密码和双因素认证（[2FA](https://www.investopedia.com/terms/t/twofactor-authentication-2fa.asp#:~:text=Key%20Takeaways,your%20fingerprint%2C%20face%2C%20or%20retina)），已经显露出局限。密码虽然无处不在，却往往强度不足、被重复使用，或容易遭到钓鱼窃取。即使 2FA 增加了一层安全保护，也无法免疫复杂的[网络钓鱼](https://en.wikipedia.org/wiki/Phishing)攻击。

网络攻击和账户接管的惊人数量，表明需要更稳健的方案。对更安全、更易用认证流程的迫切需求，推动了 WebAuthn 的发展。它针对旧方法的核心弱点，同时简化用户体验。


## WebAuthn 如何运作？技术概览

WebAuthn 围绕三个主要实体运行：依赖方（Relying Party）、WebAuthn 客户端（WebAuthn Client）和认证器（Authenticator）。依赖方本质上是请求用户认证的 Web 应用。它在验证过程中发挥关键作用，与客户端和认证器协作，确保用户身份的真实性。WebAuthn 客户端通常内置于浏览器或移动应用等平台中，负责实现 WebAuthn API，充当用户与 Web 应用之间的中介。

认证器是 WebAuthn 框架的关键组成部分，是管理用户凭据创建与存储的硬件或软件机制。传统认证方法要求用户记住密码等凭据，而 WebAuthn 将凭据存储在设备上。认证器形式多样，可以是 USB 安全密钥等外部设备，也可以内置于操作系统，使用指纹、人脸识别等生物识别方法进行验证。

WebAuthn 流程始于用户尝试访问服务或应用（依赖方）。服务与 WebAuthn 客户端通信，请求身份证明。请求随后传递给认证器，后者使用预先登记的凭据，例如生物识别输入或 PIN，验证用户身份。验证成功后，认证器向客户端返回响应，再由客户端转发给依赖方作最终验证。

WebAuthn 最吸引人的特点之一，是依赖公钥密码学（public key cryptography）。用户注册服务时，认证器生成唯一的公私钥对。私钥安全地存储在用户设备上，绝不共享；公钥则登记到在线服务中。认证时，服务发出挑战，要求用户证明自己持有私钥，用户通过密码学签名完成证明。这种方式既通过确保私钥不暴露来增强安全，也简化了认证过程，消除了对传统密码的需求。

WebAuthn 的设计本身就能抵抗网络钓鱼。这主要得益于认证器将凭据绑定到原始网站域名的能力，使攻击者难以仿冒或截取认证过程。此外，认证器通常通过蓝牙或 NFC 等安全方式与用户设备直接通信，增加了一层安全保护，防范[中间人攻击（man-in-the-middle attacks）](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。

WebAuthn 代表了在线安全的一项重要进展，提供稳健、易用且能抵抗钓鱼的认证机制。它采用先进密码学技术，消除基于密码的系统所固有的弱点，有望成为安全在线交互的基础组成部分。


## 采用 WebAuthn 的优势

采用 WebAuthn 带来诸多优势。认证与原始网站域名绑定，使钓鱼攻击几乎不可能，显著增强了安全。WebAuthn 无须密码，用户不必记忆复杂密码，体验更简单。对企业而言，它降低了数据泄露风险，增强客户信任。此外，WebAuthn 作为 W3C 推荐标准，得到主流浏览器和平台的广泛支持，确保其长期适用。


## WebAuthn 在加密货币中的应用：JoyID 钱包

[JoyID](https://joy.id) 代表了加密货币钱包领域的一项重要进展。这款 Web3 钱包以无密码、无助记词安全为设计原则，利用 WebAuthn 协议的稳健性，精心服务于 Web2 和 Web3 用户，让初学者到资深加密爱好者都能获得顺畅且高度安全的体验。


### JoyID 的关键功能

**免去密码和助记词：** JoyID 的独特之处在于，访问时不需要密码、助记词、电子邮箱或电话号码。认证流程的简化带来了显著改变，使钱包既易用，又具有很强的安全性。

**非托管方式：** JoyID 坚持让用户完全控制私钥和资金。钱包设计确保他人无法访问用户资产，强化了其对隐私和安全的承诺。

**轻松备份与恢复：** 钱包通过多种备份方式简化安全管理，包括多设备、区块链钱包、社交恢复，以及[通行密钥（passkeys）](https://www.nervos.org/knowledge-base/what_are-passkeys)，共同支持简单可靠的账户恢复流程。

**多链支持：** 为适应多样化的加密货币生态，JoyID 支持的区块链不断增多，包括比特币、以太坊、Polygon、Solana、[Nervos CKB](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain) 等。这让用户能够跨链管理代币、NFT 等多种资产。

**公共产品与开放标准：** JoyID 不只是一个钱包，也体现了对公共产品的承诺。它基于开放、免费的标准，强调让更广泛的社区受益。


## WebAuthn 的挑战与局限

尽管优势众多，WebAuthn 也面临挑战。用户凭据管理可能很复杂，跨设备场景尤其如此。认证器设备丢失或被盗后的恢复，仍是一项重要问题。此外，虽然 WebAuthn 有望革新在线认证，其采用仍处于早期。这些局限说明，该领域仍需持续开发与创新。


## 结语

WebAuthn 代表了在线认证的范式转变。从增强安全到改善用户体验，它的优势显而易见。在应对数字安全复杂问题的过程中，WebAuthn 成为保护在线身份的重要工具。它的采用和演进，无疑将塑造在线认证的未来。随着普及，我们可以预期，人们理解和实现在线安全的方式将发生重大变化。它完全取代密码的潜力，体现了其稳健性与效率。
