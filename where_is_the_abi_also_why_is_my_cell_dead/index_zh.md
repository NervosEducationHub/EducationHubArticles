---
title: 'ABI 在哪里？还有，我的 Cell 为什么死了？'
coverImage: 'images/cover.png'
category: Popular
subtitle: '一位 CKBuilder 对以太坊思维习惯、CKB Cell、类型脚本、见证，以及与证明绑定的状态转换的思考。'
date: '2026-07-10T00:00:00.000Z'
author:
- github:wamimi
---

## ABI 在哪里？还有，我的 Cell 为什么死了？

一个笔记应用，不该让人开始怀疑自己是谁。

你输入内容，点击保存，某个地方的数据库就乖乖更新了。如果你来自以太坊，这个数据库可能就是合约存储。部署合约，验证源码，拿到 ABI，用 `ethers` 或 `wagmi` 接上前端，调用 `saveNote()`，然后继续过日子。

CKB 不让我继续过日子。

我带着对熟悉对象的期待而来：合约。那个有地址、有 ABI、有可调用函数、有内部存储，还能发出事件供前端监听的东西。但 CKB 一会儿指向 Cell，一会儿指向交易，一会儿指向 OutPoint，又指向一个不想被调用、只要求满足条件的脚本。

然后，更糟的是，它告诉我旧 Cell 死了。

不是更新了，不是修改了，而是死了。

新状态如今住在别处，在一笔交易创建的新 Cell 里。那笔交易必须携带正确的数据、正确的脚本、正确的依赖，以及足够的证据，让每个节点都能说：是的，这次转换有效。

这就是 CKB 如何拿走我的以太坊式思维、偷走我的 ABI、杀死我的 Cell，却莫名其妙让我比从前更理解状态转换（state transition）的故事。


## 以太坊式思维的舒适区

以太坊给开发者提供了一套非常舒适的叙事。

写合约，部署，在区块浏览器上验证源码，拿到 ABI，再把 ABI 和合约地址接入 `ethers`、`wagmi`、`viem` 或 `web3.js`。前端调用函数，用户签署交易，合约更新存储，事件发出，索引器捕获事件，界面更新。

这是一个漂亮的开发循环，因为它给大脑一个明确的中心：有个合约，合约有存储，暴露函数，前端通过熟悉的接口与它通信。

如果我要做 ERC-20，还没开始就知道它大致是这样：

```solidity
balances[address] = amount
```

如果我要做 NFT，知道里面大概会有：

```solidity
ownerOf[tokenId]
tokenURI[tokenId]
```

如果我要做笔记应用、投票应用、金库或注册表，第一反应也差不多：

```txt
deploy contract
store state in contract
call functions to mutate state
read state back through contract views or events

（部署合约
在合约中存储状态
调用函数修改状态
通过合约的视图函数或事件读取状态）
```

这个思维模型没有错，而且很强大。但它训练你每次都去寻找同一个中心：合约。

然后我开始学 CKB，而 CKB 一直拒绝给我这个中心。

## 我一直在找合约

我最初的困惑简单得让人不好意思。

在以太坊上，我知道部署后会发生什么：拿到合约地址，拿到 ABI。前端导入 ABI，创建合约实例，然后调用：

```ts
await contract.mint(...)
await contract.transfer(...)
await contract.updateNote(...)
```

即使应用复杂，思考方向也很直接：

```txt
前端 -> 调用合约 -> EVM 执行 -> 合约存储发生变化
```

开始在 CKB 上构建时，我一直想找到对应物。部署脚本后，立刻就去找那个应该由我调用的东西。

ABI 在哪里？函数在哪里？`mintCapsule()` 在哪里？合约存储在哪里？

答案不是“调用脚本”，而是：构造一笔交易。

这笔交易创建 Cell，Cell 引用脚本，脚本在验证时运行。返回 `0`，转换就有效；返回非零值，转换就失败。

这不是小差别，而是改变了我的思考方向。

以太坊教我问：

```txt
我调用什么函数?
```

CKB 开始教我问：

```txt
我在提出什么状态转换？
```

到目前为止，这句话贯穿了我整个 CKBuilder 学习过程，一直萦绕不去。

## Cell 不只是“放数据的地方”

第一个真正让我碰壁的 CKB 概念，就是 Cell。

官方文档把 CKB 的 Cell 模型描述为广义 UTXO 模型。所有状态都存储在 Cell 中。Cell 上链后不可修改；更新数据，需要消耗现有 Cell，再创建包含更新后数据的新 Cell。未被消耗的 Cell 是活跃的（live），被消耗的 Cell 则是已消耗的（dead）。

写成文档时，看起来很清楚。

放进我脑子里，却一团乱。

因为我那颗习惯了以太坊的大脑一直在问：

可是，拥有状态的对象在哪里？

在 CKB 中，Cell 就是状态对象。

Cell 可以携带：

```txt
capacity
lock script 
optional type script
data

（容量
锁定脚本
可选的类型脚本
数据）
```

起初，我把它们错误地理解为：

容量就是余额。

锁定脚本（Lock Script）就是所有权。

类型脚本（Type Script）就是合约逻辑。

数据就是存储。

差不多吧？

是啊，差不多到足以让人糊涂。

容量不只是余额，也是存储权。Cell 占用空间，就需要足够的容量才能存在。

锁定脚本不只是“所有者字段”，而是消耗 Cell 时必须满足的条件。

类型脚本也不完全等于“合约”，而是规定 Cell 状态如何使用或转换的验证逻辑。

数据不会自动具有意义。除非有东西解释它，或对它施加规则，否则它只是字节。

最后这一点，我花了些时间才理解。

## 第一个让人不适的教训：数据不等于意义

我早期的一项实践实验，基于 [Store Data on Cell 教程](https://docs.nervos.org/docs/dapp/store-data-on-cell)。

教程流程简单，却很有效：

1. 将消息编码为十六进制。
2. 创建一笔包含输出 Cell 的交易。
3. 把编码后的消息放进 `outputsData`。
4. 用 CCC 补全输入和手续费。
5. 发送交易。
6. 通过 OutPoint 读取 Cell。
7. 将字节解码为文本。

我用了自定义消息：

```txt
capsule-v0: zk-attestation-placeholder
```

感觉很兴奋。我把自己的数据放进了一个活跃的 CKB Cell。

然后查询 Cell，看到返回的数据是原始十六进制：

```txt
0x63617073756c652d76303a207a6b2d6174746573746174696f6e2d706c616365686f6c646572
```

解码后，它变成：

```txt
capsule-v0: zk-attestation-placeholder
```

这时，我才真正明白：

CKB 不知道这是一个“Capsule”。

CKB 不知道这是“ZK”。

CKB 不知道这是“证明占位内容”。

链存的是字节。

意义是我赋予的。

这种不适是有益的。

把字节放到链上，不等于创建了协议状态。

没有类型脚本，数据靠约定来解释。

有了类型脚本，数据就能成为受规则约束的应用状态。

这成了我最早真正理解的 CKB 规则之一：

```txt
未经约束的 data，不过是存储的字节。
被 Type Script 约束的 data，才成为了具备规则的应用状态。
```

这很重要，因为在以太坊中，我常常默认合约存储自带意义。如果合约有一个叫 `balances` 的映射，里面的值就是合约逻辑的一部分。概念上，代码和存储住在一起。

在 CKB 中，字节可以放在 Cell 里，但意义取决于周围的脚本和约定。

这是很不一样的一种责任。

CKB 给你原始的状态容器。

然后问你：

这些字节是什么意思？谁能消耗它们？哪些转换有效？必须提供什么证据？


## xUDT 让我理解了带类型的状态

下一个顿悟来自 xUDT。

在以太坊中，我对 ERC-20 的思维模型是：

```solidity
balances[address] = amount
```

有一个合约。

合约拥有账本。

账本把账户映射到余额。

转账修改这个映射。

在 CKB 中，xUDT 模型让我换了一种思路。

代币余额可以由活跃 Cell 表示。Cell 的锁定脚本控制谁能消耗它，类型脚本标识并验证代币类别，Cell 数据则携带代币数量。

我形成的简化模型是：

```txt
Cell.lock = 谁拥有该 Token Cell 的控制权
Cell.type = 该 Cell 属于哪种 Token 类别/遵循何种规则
Cell.data = 该 Cell 包含多少 Token 数量
```

转移 xUDT 代币时，代币并不是通过修改合约映射来“移动”的。

旧代币 Cell 被消耗，新代币 Cell 被创建。一部分给接收方，一部分作为代币找零返回。

那是我第一次通过 Cell 模型，而非账户模型，理解同质化代币的记账。

类型脚本也因此不再那么抽象。

接触 xUDT 之前，“类型脚本”只是一个定义。

接触之后，它成了一种职责：

```txt
让这些字节代表 Token 数量。
确保这次转换遵循 Token 规则。
```


## 接着，脚本不再像合约

下一个阶段是用 Rust 写脚本。

这一次，我那套以太坊思维彻底吃了瘪。

在以太坊上写 Solidity 时，合约有自己的持久化存储。我编写函数来修改存储，由 EVM 执行这些函数。

在 CKB 上开始阅读 Rust 脚本时，我一直在等“合约的部分”出现。

存储在哪里？

用户调用的函数在哪里？

状态变量在哪里？

ABI 在哪里？

读得越多、做得越多，答案就越清晰：

CKB 脚本不是状态。

CKB 脚本是验证器（verifier）。

它在交易验证时运行，检查交易上下文，通过系统调用（syscalls）和高层 API 读取允许读取的内容，检查规则，然后返回：

```txt
0 = 有效
non-zero = 无效
```

听起来简单，却是思维上的巨大转变。

脚本不是用户调用的对象。

脚本是交易必须满足的条件。

正因如此，`ckb-std` 开始让我感兴趣。它不只是 Rust 辅助库，更是让裸机 Rust 成为理解 CKB 的验证代码的运行时接口。

普通 Rust 应用给人的感觉是：

```txt
main()
standard library
operating system
files/network/stdout

（main()
标准库
操作系统
文件/网络/stdout）
```

CKB 的 Rust 脚本则更像：

```txt
entry point
CKB-VM
syscalls
transaction context
return code

（入口
CKB-VM
系统调用
交易上下文
返回码）
```
## 外部用 RPC，内部用系统调用

另一个帮助我理解的区别是：

```txt
RPC = 如何从验证之外检查链上数据
Syscalls = 脚本如何从验证内部检查交易数据
```

早期实验中，我用 RPC 方法查询交易和 Cell。

发送交易后，用 `get_transaction` 检查它是否已提交上链；把数据存进 Cell 后，用 `get_live_cell` 按 OutPoint 取回 Cell。

这是外部视角。

但脚本不使用我的浏览器控制台，不调用我的前端状态，也不能任意访问节点。

它通过系统调用读取交易。

它可以加载脚本参数、Cell 数据和见证，也可以检查输入和输出。协议提供哪些交易部分，它就能查看哪些。

到这里，验证程序模型开始变得非常具体。

交易提供：

```txt
input Cells
output Cells
outputsData
witnesses
cellDeps
headers when needed

（输入 Cell
输出 Cell
输出数据
见证
Cell 依赖
需要时提供的区块头）
```

脚本读取选定的部分，检查某个关系，然后接受或拒绝。

这让我有种奇妙的熟悉感。

与零知识证明并不相同，却很熟悉。

因为在 ZK 中，我也会从这些方面思考：

```txt
public inputs
private witness
constraints
verifier
accept/reject

（公开输入
私有见证
约束
验证器
接受/拒绝）
```

CKB 不是 ZK 证明系统。

但像验证程序那样思考的习惯，可以沿用。

## 前端的困惑：我的 ABI 在哪里？

到了前端，这个差异变得格外切身，也格外折腾人。

在以太坊上，部署并验证合约之后，前端流程几乎已成为肌肉记忆：

```txt
contract address
ABI
provider
signer
contract instance
function call

（合约地址
ABI
提供者
签名者
合约实例
函数调用）
```

使用 `ethers` 时，是这样：

```ts
const contract = new ethers.Contract(address, abi, signer);
await contract.mint(...);
```

使用 `wagmi` 时，形式不同，思路相同：

```txt
准备合约写入
发送交易
等待回执
```

ABI 告诉前端有哪些函数，以及如何编码调用数据。

因此，以太坊前端有一种非常明确的结构：

```txt
合约地址 + ABI + signer = 函数调用
```

CKB 却让我构建另一种结构：

```txt
Cells + 脚本 + CellDeps + witnesses + outputsData = 提议的状态转换
```

所以，部署第一个 CKB 脚本后，我脑中冒出了那个典型的 EVM 问题：

ABI 在哪里？

怎么调用类型脚本？

前端怎么调用 `mint`？

答案让我再一次受到小小的挫败：

你不调用类型脚本。

你构造一笔交易，让输出 Cell 使用那个类型脚本。

这就是前端模型。

在 CKB 上，前端主要不是 ABI 调用者，而是交易组装者。

对于我的 Capsule Notes dApp，前端必须构造一笔交易，让输出 Cell 包含：

```txt
lock：我的账户 Lock Script
type：已部署的 capsule-transition-guard Type Script
data：编码后的 Capsule 字节数据
cellDep：已部署的脚本 Cell
```

`cellDep` 这一部分尤其重要。

在以太坊上，合约地址指向已部署的合约代码。调用合约时，EVM 知道代码在哪里。

在 CKB 上，交易必须提供验证所需的代码依赖。脚本代码存在 Cell 中，交易通过 `cellDeps` 引用它，CKB-VM 才能加载并执行验证程序。

就这一个细节，让 CKB 的部署感觉很不一样。

它也让我分清了过去常常混在一起的几件事：

```txt
script code = 存储在 Cell 中的可执行 RISC-V 二进制文件
code hash = 用于标识该代码的哈希值
script = code_hash + hash_type + args
script args = 用于配置该脚本实例的参数
cellDep = 使代码 Cell 可用的交易依赖项
```

因此，前端使用 `capsule-transition-guard` 时，不是导入 ABI 并调用方法，而是构造一个 Cell，让它的 `type` 字段指向配置好的脚本，再把已部署的脚本 Cell 纳入依赖，验证过程才能实际加载代码。

部署的意思不是：

```txt
这里是合约地址。调用它的函数。
```

而是：

```txt
这里是脚本代码，存储在一个 Cell 中。
这里是它的代码哈希（Code Hash）。
这里是你作为 CellDep 所需要的 OutPoint。
现在构建交易，在需要验证时引用这段代码。
```

于是，CKB 前端流程变成：

```txt
推导用户 Lock Script
加载已部署的 Type Script 信息
编码输出 Cell 数据
构建一个 ccc.Transaction
设置 outputs 和 outputsData
包含 CellDeps
按 capacity 补全 inputs
补全手续费
签名并发送
通过 OutPoint 读取创建的 Cell
解码 Cell 数据
```

这并不是更差。

只是中心不同。

以太坊前端通常像这样：

```txt
调用合约函数
```

CKB 前端则更像这样：

```txt
组装合法的状态转换
```

这个区别改变了一切。

## Capsule Notes：我的第一个小协议实验

到了第四周，我想做一个小东西，逼自己真正使用这个模型，而不只是解释它。

于是，我做了 Capsule Notes。

乍听之下，Capsule Notes 像个记笔记的 dApp。但这样描述，低估了我真正学到的东西。我是在尝试构建一个小型状态转换协议。

想法很简单：

Capsule 是一条以带类型的 CKB Cell 表示的笔记。

Cell 数据遵循一种二进制布局：

```txt
[0..10]   magic: CAPSULE_V1
[10..14]  version: u32 小端序
[14..46]  capsule_id: 32 字节
[46..]    笔记正文的字节数据
```

Capsule Notes 成为我的第一个小协议实验，是因为前端不只是在保存笔记，而是在组装交易。

我的账户锁定脚本拥有输出 Cell，已部署的 `capsule-transition-guard` 类型脚本定义 Capsule 的有效性规则。编码后的 Capsule 字节放在 `outputsData` 中，交易以 `cellDep` 形式携带已部署的脚本 Cell。交易成功后，我可以通过 OutPoint 读取新的活跃 Cell，再把 Capsule 解码回 `magic`、`version`、`capsule_id` 和 `body`。

每一部分都需要动手：

```txt
编写 Rust Type Script
编译为 CKB-VM 二进制文件
部署到 Devnet
复制 `codeHash`、`hashType` 和 `CellDeps`
将部署元数据连接至前端
构建包含带类型输出 Cell 的交易
铸造 Live Capsule Cell
通过 OutPoint 读取 Cell
解码原始 Cell 数据
测试非法数据拒绝机制
```


## 选择二进制布局并非偶然

我本来可以用 JSON。

说实话，我身为前端开发者的那一面，确实想用 JSON。

JSON 友好、可读，能让你在难题到来之前，先感受到自己正在高效产出。

随手拼一个：

```json
{
  "version": 1,
  "capsule_id": "...",
  "body": "..."
}
```

然后就可以继续过日子。

但 CKB 脚本验证的是字节。

如果希望类型脚本强制执行规则，就需要一种稳定的字节结构，让脚本能够确定性地解析。

所以，Capsule Notes 使用了自己设计的二进制布局。我不认为这是最终的最佳格式，下一步应该用 Molecule。但在这个阶段，自制格式很有用，因为它迫使我直面真正的问题：

脚本究竟在检查什么？

对于有效的铸造，脚本应该看到：

```txt
magic = CAPSULE_V1
version = 1
capsule_id = 32 字节
body = 非空字节序列
```

对于更新，规则就更有意思了：

```txt
old capsule_id == new capsule_id
new version == old version + 1
```

对于归档／销毁：

```txt
旧 Capsule Cell 被消耗
无需生成替换输出
```

这是一个状态机，类型脚本则是这个状态机的验证程序。

## 第一个无效的 Capsule

测试无效数据，是最有成就感的时刻之一。

我增加了一条无效铸造路径，刻意使用：

```txt
BAD_MAGIC1
```

而不是：

```txt
CAPSULE_V1
```

如果交易成功，就说明类型脚本没有强制执行这条规则。

如果交易失败，就意味着已部署的脚本确实在执行，并拒绝了格式错误的 Capsule 数据。

从技术上说，这也给了我一个清晰的基本检查：

```txt
有效的 Capsule 字节 -> 交易被接受
无效的 magic 字节 -> Type Script 拒绝
```

这是协议强制执行的最小版本，但仍然是协议强制执行。

这一点让我更加敬重 CKB。

你不能只说“这是有效状态”，然后希望所有人都同意。

你编码状态，引用验证程序，提供依赖，提交转换，最后由每个节点检查。

## 交易检查器：因为我不相信魔法

Capsule Notes 跑通后，我仍不满足。

前端铸造了一个 Cell，很好。

但我想看到交易的结构。

我想看到：

```txt
哪个 Lock Script 控制着所有权？
哪个 Type Script 正在强制执行 Capsule 规则？
哪个 CellDep 指向了已部署的脚本？
我实际编码了什么输出数据？
哪个 OutPoint 标识了铸造出的 Cell？
这个 Cell 是存活的（Live）吗？
原始的存活 Cell 长什么样？
```

所以下一步就是 Capsule Transaction Inspector。 

它不是要成为完整的 CKB 版 Tenderly。

至少现在还不是。

更大的梦想是一个 Cell 交易调试器：加载任意交易，展示被消耗和被创建的 Cell，显示容量流向，通过 `ckb-debugger` 运行脚本，显示周期数，并准确指出脚本为什么失败。

我的版本小得多，也更实在：

检查 Capsule Notes 交易。

让看不见的协议组成部分变得可见。

一个好的 Capsule 交易检查器，应该显示：

```txt
账户锁定脚本
Capsule 类型脚本
CellDeps（Cell 依赖）
CCC 交易骨架
补足资金后的 inputs
outputs 和找零输出
输出数据的十六进制表示
解码后的 Capsule 数据
交易哈希
OutPoint
活跃/已消耗状态（live/dead）
原始的活跃 Cell
本地 Capsule 规则检查
```

这很重要，因为调试 CKB，就是调试交易结构。

检查器应该能回答这样的问题：

```txt
输出 Cell 确实带有 Capsule 类型脚本吗？
交易包含脚本所需的 CellDep 吗？
CCC 是否选取了活跃的输入 Cell 来提供容量？
补全手续费时是否创建了找零 Cell？
输出数据能否解码为 Capsule 格式？
铸造所得的 OutPoint 能否解析到一个活跃 Cell？
本地 Capsule 检查是否与脚本规则一致？
```

因此，我开始把它看成更大型 CKB 交易调试器的一个微型、领域专用版本。

如果以太坊调用失败，我常问：

```txt
函数回滚了吗？
调用者获得授权了吗？
输入有误吗？
```

如果 CKB 交易失败，我必须问另一组问题：

```txt
节点能解析输入 Cell 吗？
能解析 CellDeps 吗？
类型脚本确实附加在我以为的位置吗？
输出数据编码正确吗？
脚本能读取到见证吗？
容量足够吗？
脚本是否运行并返回了非零值？
```


## 调试教会我：失败发生在哪一层

CKB 还教会我，并非所有失败都一样。

学习早期，我遇到过一个 simple-lock 错误：

```txt
TransactionFailedToResolve: Resolve failed Unknown(OutPoint(...))
```

起初，我想去调试脚本逻辑。

原像错了吗？

见证格式不对吗？

哈希检查失败了吗？

但查询 OutPoint 时，节点返回：

```txt
status: unknown
```

这完全改变了诊断方向。

不是脚本拒绝了见证。

脚本根本就没运行。

交易在更早的阶段就失败了，因为节点无法解析引用的 Cell。

这让我形成了分层的失败模型：

```txt
引用解析阶段:
节点能找到被引用的 Cell 和依赖吗？

脚本阶段:
脚本能成功执行吗？

提交阶段:
有效交易能被接受并提交上链吗？
```

现在听起来很明显。

盯着报错时，可一点也不明显。

它与验证程序式思维也恰好契合。

验证程序在拒绝证明之前，需要格式正确的陈述和证明对象。

CKB 脚本在拒绝见证数据之前，交易需要先完成引用解析。

对象格式错误，与验证失败，不属于同一类失败。

这种区别，正是我想练就更敏锐判断力的地方。

## ZK 思维醒了

在 Cell、见证、类型脚本和 Capsule Notes 之间摸索时，我的 ZK 思维开始醒了。

让我在意的是，Cell 模型总在逼我提出验证程序式的问题。

CKB 交易开始不那么像函数调用，反而更像一个证明对象：

```txt
old state
new state
dependencies
witness
verifier

（旧状态
新状态
依赖
见证
验证器）
```

每个节点都检查转换是否有效。

这与零知识证明不同，但节奏很熟悉。

相似之处，不在于 CKB 交易就是零知识证明，而在于两者都迫使你定义一个陈述，决定允许提供什么证据，并编写一个拒绝一切不符合规则情况的验证程序。

在 ZK 中，我会考虑：

```txt
statement
public inputs
private witness
constraints
proof
verifier

（陈述
公开输入
私有见证
约束
证明
验证器）
```

在 CKB 中，我开始考虑：

```txt
input Cells
output Cells
outputsData
witnesses
cellDeps
Lock Scripts
Type Scripts

（输入 Cell
输出 Cell
输出数据
见证
Cell 依赖
锁定脚本
类型脚本）
```

相似之处不是字面上的，而是架构上的。两者都迫使你回答同样令人不安的问题：

```txt
哪些内容是公开的？
哪些内容是私有的？
正在检查什么？
提供了什么证据？
接受意味着什么？
```

这些才是我关心的问题。

## CKB 见证不是 ZK 见证

有一点，我很早就必须小心分清：

CKB 使用“见证（witness）”这个词。

ZK 也使用“见证”这个词。

它们不是同一种东西。

在 CKB 中，见证数据（witness data）是脚本可以读取的交易证据，可以包括签名、解锁数据、序列化的证明字节、Merkle 路径，或验证时需要的其他公开材料。

在 ZK 中，见证是证明者用来生成证明的私有输入。

如果把私有的 ZK 见证直接放进 CKB 交易见证，很可能就毁掉了隐私。

因此，我现在采用的模型是：

```txt
私有数据留在链下
证明在链下生成
证明字节 / 公开输入可以放入 CKB 见证
承诺或状态根可以放入 Cell 数据
类型脚本验证状态转换
```

到这里，Capsule Notes 开始像是某个更大系统的小型原语。

今天，Capsule Cell 存储笔记数据。

明天，也许 Capsule Cell 存储的是：

```txt
commitment
nullifier
metadata hash
state root
issuer id
expiry epoch

（承诺
nullifier
元数据哈希
状态根
发行者标识
到期周期）
```

类型脚本不只检查：

```txt
magic == CAPSULE_V1
```

它可能检查：

```txt
该证明已与此旧 Cell 绑定
该证明已与此新 Cell 绑定
Nullifier 未被重复使用
状态根转换合法
发行者已获授权
```

这是让我不停思考的方向：

携带证明的 Cell 转换。

## 与证明绑定的 Capsule

如今，我笔记本上的词是：

```txt
与证明绑定的 Capsule
```

这个想法还不是完成的设计，而是一个问题。

当公开的 Cell 数据只是对私有状态的承诺时，CKB 类型脚本能否强制确保状态转换有效？

例如：

```txt
旧 Capsule Cell：
`data` = 旧承诺（commitment）/ 状态根（state root）

新 Capsule Cell：
`data` = 新承诺（commitment）/ 状态根（state root）

Witness：
证明字节串（proof bytes）
公开输入（public inputs）
授权证据（authorization evidence）

Type Script：
验证该证明确实对应于当前从旧 Cell 到新 Cell 的状态转换
```

最后一行很重要。

孤立地验证证明还不够。

证明必须与 CKB 状态转换绑定。

否则，脚本可能接受一个有效证明，但它对应的是错误的状态、错误的 Cell、错误的用户，或错误的转换。

我认为，这正是 CKB 对 ZK 开发者变得非常有意思的地方。

难点不只是：

能不能在链上验证证明？

难点在于：

这个证明与 Cell 状态的关系，究竟意味着什么？

这是个更好的问题。

而 CKB 总是在推动我提出更好的问题。

## 我认为 CKB 正在教我什么

学了四周，我并不觉得自己已经掌握 CKB。

我觉得，是 CKB 开始纠正我的直觉了。

以太坊让我熟练掌握了一种强大的模式：

```txt
合约拥有存储 
前端调用合约 
合约变更状态
```

CKB 正在教我另一种模式：

```txt
Cell 承载状态 
交易提议转换 
脚本验证规则 
新 Cell 成为 Live 状态 
旧 Cell 成为 Dead 状态
```

以太坊教我问该调用什么函数，CKB 教我问正在证明什么转换。

以太坊教我寻找合约，CKB 教我检查交易。

以太坊教我通过 ABI 连接前端，CKB 教我通过交易构造、CellDeps、脚本和 OutPoint 连接前端。

以太坊让我舒适。

CKB 让我慢下来。

说实话，我觉得自己需要这样。

## 这篇文章写给谁

如果你来自以太坊，CKB 起初可能显得陌生，因为它拒绝按你预想的方式，以合约为中心。

这种陌生感正是关键。

不要只问：

```txt
合约在哪里？
```

还要问：

```txt
状态位于何处？
谁可以消耗它？
是什么让数据变得有意义？
什么转换正被提出？
提供了什么证据？
哪些脚本对其进行验证？
代码来自何处？
需要哪些 CellDeps？
哪个 OutPoint 标识了结果？
```

这些问题更难。

也更有意思。

如果你对 ZK、隐私或协议工程感兴趣，CKB 值得研究的原因，不只有它可能支持密码学验证。它的基础模型本身，就在训练你从验证的角度思考。

Cell 成为状态对象，见证成为证据，脚本成为验证程序，交易成为提议的转换。

这是一个很好的思维健身房。

## 我会继续追问的问题

我带着寻找智能合约的想法来到 CKB。

找到的却是 Cell、见证、类型脚本、CellDeps，以及不拥有状态、只验证转换的 Rust 脚本。

在困惑之中，CKB 渐渐不再像“又一条链”，而更像一个能让我发展 ZK 和协议工程直觉的地方。

我会继续追问的是：

> 当公开的 Cell 数据只是对私有状态的承诺时，CKB 类型脚本能否强制确保状态转换有效？

我还不知道完整答案。

但有一点我知道：

我不再寻找合约。

我在观察转换。

旧状态，新状态，见证，验证程序。

看着这个结构，我的 ZK 思维从角落里抬起头，说：等等，这种语言我懂。

说实话，挺烦人的。

但有用。

我原本来找合约。

CKB 却教会我证明转换。

## 延伸阅读

- [Nervos CKB Cell 模型](https://docs.nervos.org/docs/tech-explanation/cell-model)
- [在 Cell 上存储数据教程](https://docs.nervos.org/docs/dapp/store-data-on-cell)
- [CCC JavaScript/TypeScript SDK 文档](https://docs.nervos.org/docs/sdk-and-devtool/ccc)
- [Rust 脚本快速入门](https://docs.nervos.org/docs/script/rust/rust-quick-start)
