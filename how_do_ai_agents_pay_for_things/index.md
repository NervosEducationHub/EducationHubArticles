---
title: 'How Do AI Agents Pay for Things? A Guide to Machine-to-Machine Payments'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "AI agents need money that moves as quickly and programmatically as they do. Here’s how identity, authorization, payment protocols, crypto assets, and payment channel networks fit together."
date: '2026-08-12T16:00:00.000Z'
author: 
- github:nervosnetwork
---

## What Are AI Agent Payments?

When you start exploring this space, you'll run into a handful of terms that are closely related, frequently used interchangeably, and yet mean slightly different things. It's worth separating them once, clearly, before going deeper.

**AI Agent Payments** are financial transactions executed autonomously by a software agent without human intervention at the moment of purchase. The human sets the boundary (a budget, a spending rate, an expiry), while the agent transacts freely inside it. An agent paying for one API call is a good example.

**Machine-to-Machine (M2M) Economy** or **Autonomous Commerce** refers to a commercial ecosystem where these transactions happen at scale. In this system, software agents, smart devices, and inference endpoints autonomously discover services, negotiate terms, and buy resources from each other without human participants in the transaction loop. Autonomous commerce is the fully realized state of this economy, where humans merely set the overarching policies rather than approving individual purchases



## Why Credit Cards Fail Autonomous Commerce

Card networks were built around a very different shape of commerce: relatively discrete, user-initiated purchases between a customer and a merchant. Autonomous software changes that shape. An agent may need to make dozens or hundreds of tiny economic exchanges while completing a single task, often for fractions of a cent.

That exposes several weaknesses in the traditional card model:

* **The economics break down at very small values.** Card processing commonly includes a fixed per-transaction fee in addition to a percentage fee. Stripe, for example, currently [charges](https://stripe.com/pricing) 2.9% \+ $0.30 for a standard domestic online card transaction in the US. At that pricing, charging $0.002 for a single API request is obviously impossible—the fixed processing fee alone is 150 times larger than the payment itself.  
* **The payment lifecycle is heavier than the interaction it is paying for.** Card authorization happens in real time, but clearing and settlement occur afterward; credit-card settlement commonly takes one to three business days. The agent does not have to wait for settlement—the merchant can act on the authorization—but running a full card payment through authorization, clearing, reconciliation, and settlement for every tiny unit of compute, data, or inference is a poor fit for machine-scale micropayments.  
* **Delegation has to be added on top.** Traditional card credentials identify an account or cardholder; autonomous agents need something more granular: proof that a particular agent is authorized to spend, limits on what it can buy and how much it can spend, and permissions that can expire or be revoked. The payments industry is already building this layer—Stripe's Shared Payment Tokens can be scoped by merchant, amount, and time, while Mastercard's Agent Pay for Machines introduces agent credentialing and programmatically enforced spending controls.  
* **Payments remain reversible long after the service is consumed.** Cardholders can typically initiate disputes for up to 120 days after a payment, and sometimes longer. That protection makes sense when a person buys a physical product or is defrauded. It is a more awkward fit when software purchases an ephemeral resource—an inference, a database query, or a few seconds of computation—that is delivered and consumed immediately.

The practical workaround is to avoid paying for each interaction at all. Instead, many tiny units of consumption are aggregated behind prepaid balances, subscriptions, platform accounts, or periodic invoices.

That works, but it defeats much of the promise of autonomous commerce. The agent is not freely paying for resources as it consumes them; developers are establishing accounts, pre-funding balances, managing billing relationships, and reconciling usage on its behalf.

For machines to become independent economic actors, payments need to become as granular and programmable as the services they consume.



## Layers of AI Payment Infrastructure

Because traditional card networks fail under the demands of software, a new financial stack is required. The infrastructure for AI agent payments typically operates across four distinct layers:

### Identity Layer

**Who is this agent, and whom does it represent?**

Every transaction needs a subject. Traditionally, banks and credit card processors rely on KYC (Know Your Customer) tied to a human being (SSN, passport, physical address) and multi-factor authentication. They assume a human is at the keyboard authorizing the transaction.

When software initiates payments under delegated authority, you have to verify two things at once: the agent's identity and the underlying user's intent. Therefore, an agent must carry a verifiable identity that is distinct from, but provably linked to, the human or organization on whose behalf it acts. An agent’s identity is handled via cryptographic key pairs, Decentralized Identifiers (DIDs), or Verifiable Credentials (VCs). The AI agent holds its own secure, mathematically verifiable identity, allowing it to authenticate without a human intermediary. As a result, the industry is increasingly focusing on Know Your Agent (KYA) alongside Know Your Customer (KYA).

### Authorization & Governance Layer

**What may it spend, on what, until when, and who is accountable?**

This is where mandates live. A mandate is a cryptographically signed, machine-readable digital authorization encoding the exact parameters of an autonomous transaction. It specifies the boundaries on the scope of the purchase, the financial limits, the agent's identity, and the expiry of the permissions.

Governance belongs here as well, because accountability is enforced at the moment of authorization or not at all. This layer must stay deterministic: rule-bound, auditable, and legible, precisely because the reasoning above it is not. An agent may decide adaptively that it needs a paid dataset; the authorization layer decides mechanically whether that spend is permitted.

### The Execution & Protocol Layer

**How is the payment requested, negotiated, and confirmed?**

The execution layer handles the real-time routing, signing, and programmatic settlement of transactions.

Traditional approaches rely on fragmented, proprietary APIs from payment processors (like Stripe or PayPal) that require heavy developer integration. These systems are built on the assumption of human presence, meaning they frequently trigger fraud-prevention checks, MFA (Multi-Factor Authentication), and human-in-the-loop approvals, all of which instantly break autonomous machine-to-machine operations.

Blockchain-based rails use open, programmatic standards, allowing AI agents to negotiate, verify service delivery, and authorize payment simultaneously using smart contracts.

To bridge the gap between an agent's intent and the actual execution of a payment, major tech and financial firms have introduced cryptographic trust and commerce frameworks to standardize these machine handshakes:



| Protocol | Created By            | Core Mechanism                                               | Primary Currency                                          |
| -------- | --------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| **x402** | Coinbase & Cloudflare | Repurposes HTTP 402 Payment Required.Agent hits a paywall, signs an on-chain transaction, and retries. | Stablecoins                                               |
| **MPP**  | Stripe & Tempo        | Uses HTTP 402 but creates an off-chain session.Agent authorizes a spending limit upfront and streams payments against it. | Fiat, stable coins, crypto                                |
| **AP2**  | Google                | Uses Verifiable Credentials (VCs) and cryptographic Mandates to prove the agent has the user's permission to spend. | Agnostic (traditional card & bank, stable coins & crypto) |



**Note**: While these protocols are categorized here under the execution layer, they are not limited to routing and settlement. X402 carries an authorization step, where the agent signs a payment authorization, and a facilitator validates it before settling on-chain. AP2 uses verifiable credentials and cryptographic mandates to prove the agent has the user's permission to spend.

### Settlement & Network Layer

**Where does value actually move, and how quickly can it be reused?**

Once an agent has identified itself, received permission to spend, and agreed on how a payment should be executed, something still has to move the actual value.

This is the settlement layer.

Settlement should not be confused with authorization or finality. Authorization tells a merchant that a payment has been approved. Settlement is the actual transfer of funds between the parties involved in the payment. Finality describes the point at which that transfer becomes irrevocable under the rules of the settlement system.

Traditional fiat rails are poorly matched to the demands of autonomous software.

That does not mean every traditional payment is slow. Card networks authorize purchases almost immediately, ACH supports same-day settlement, and newer systems such as FedNow can settle payments in real time. The mismatch is more fundamental than latency alone.

Today's payment infrastructure was largely designed around discrete transactions between known parties operating through banks, card networks, payment processors, merchant accounts, and established billing relationships. Autonomous commerce introduces a very different pattern. Software may need to discover and purchase resources from many independent services, across borders, around the clock, and in amounts small enough that creating a conventional payment transaction or billing relationship for every interaction becomes impractical.

**Blockchains and crypto assets are much better suited to this environment.**

Crypto turns money into something software can natively hold, verify, and transfer. An agent can control a wallet through cryptographic keys, initiate transactions programmatically, and transact with another machine without first establishing a card account or conventional banking relationship with it. Public blockchain networks operate continuously across borders, while stablecoins provide a price-stable medium of exchange that can move across these networks.

In other words, crypto removes many of the assumptions inherited from human-centric payment systems. Money becomes internet-native: programmable, globally accessible, machine-readable, and transferable under cryptographic rather than institutional authorization.

That makes blockchain-based assets a natural foundation for autonomous commerce.

But there is still another constraint.

If every machine payment is settled individually on-chain, every API request, inference, database query, or second of compute becomes its own blockchain transaction. Each one consumes blockspace, incurs a transaction fee, and depends on the confirmation and finality characteristics of the underlying chain.

For occasional payments, that is perfectly workable. But when machines exchange value continuously—potentially thousands or millions of tiny times—requiring a separate on-chain transaction for every interaction becomes impractical.

Payment channel networks take the next step by moving high-frequency payment execution off-chain while keeping the blockchain as the underlying enforcement and settlement layer.



## Fiber Network: An Open Payment Network for the Agentic Economy

[Fiber Network](https://www.nervos.org/knowledge-base/what_is_fiber) is an open, peer-to-peer payment network built on the [CKB](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain) blockchain.

At its foundation are payment channels: two parties lock funds into a channel and make repeated payments by updating their balances off-chain, without publishing every transaction to the blockchain. CKB acts as the underlying enforcement and settlement layer when channels are opened, closed, or disputed.

Unlike payment channel networks designed around a single native asset, Fiber is multi-asset by design. It supports CKB, [UDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md)s and stablecoins, as well as [RGB++](https://www.nervos.org/knowledge-base/ultimate_guide_to_rgb_rgbpp_and_client_side_validation) assets, while its cross-network architecture enables payments and swaps between Fiber and the Bitcoin Lightning Network.

This is particularly useful for autonomous commerce, where agents may need to pay in stablecoins, exchange between assets, or interact with services across different payment networks.

For autonomous commerce, Fiber has two particularly important advantages: it makes high-frequency micropayments economically viable, and it inherits a much more programmable foundation from CKB.

### Unlocking Micropayments & Stream Payments

A micropayment is a transaction of extremely small value, typically fractions of a cent, used for an individual action such as a database query. A streaming payment extends the same idea over time, releasing a continuous sequence of small payments as a service is consumed—for example, paying per second for compute.

Fiber makes both models practical by moving repeated payments off-chain, where they do not incur the cost or latency of a separate blockchain transaction every time value changes hands.

**No fixed base fee.** Fiber's routing [fee formula](https://www.fiber.world/docs/concept/routing/trampoline-routing#fee-formula) is proportional to the amount being forwarded rather than adding a fixed per-payment charge. Each routing node sets its own proportional rate in millionths of the transferred value. This makes the model particularly well suited to very small payments, where a fixed transaction charge can easily exceed the value being transferred.

**Low-latency payment execution.** Fiber payments are processed between the peers involved in a route without requiring network-wide consensus for every update. Payments can therefore complete off-chain with very low latency while CKB remains the ultimate enforcement and settlement layer.

### **Programmability & Protocol Integration**

Fiber is built on a highly flexible base chain CKB, where channel rules are implemented through programmable scripts. Developers get far greater freedom to define how channels are authorized, updated, settled, and disputed.

**Expressiveness.** Fiber leverages CKB's expressive smart contract environment to govern channel logic. This specifies scripts to operate directly within the application layer, enabling custom execution like conditional payouts, automated spending caps, and custom release conditions directly within the channel.

**Protocol-Agnostic Integration** Fiber has [planned](https://github.com/nervosnetwork/fiber/issues/1255#10-implementation-roadmap) to implement an x402 facilitator, and Fiber’s open routing system serves as the underlying payment rail for other emerging protocols.

### Building the Autonomous Economy: Real-World Use Cases

For teams building decentralized applications, Fiber's practical appeal is that it removes the architectural constraints of slow, expensive settlement. Whether a developer is building a consumer-facing app or an autonomous agent, the ecosystem already demonstrates the necessary foundational building blocks.

Today, builders in the community are experimenting with these building blocks, creating tools like the [Fiber Audio Player](https://fiber-audio-player.vercel.app/) for per-second streaming payments, [fiber-checkout](https://github.com/salmansarwarr/Fiber-checkout) for Stripe-style interfaces, as well as [Fiber L402](https://github.com/RetricSu/fiber-l402) for payment-gated access. Community developers actively discuss these ideas and publish early prototypes on the [Nervos Talk forum](https://talk.nervos.org/), where you might find something interesting or inspiring to build upon.



## Conclusion

The transition from human-centric commerce to the machine-to-machine economy requires a fundamental reimagining of how financial value is transferred. Traditional fiat rails, burdened by high baseline fees, manual identity checks, and slow settlement, simply cannot support the microscopic, high-velocity transactions that autonomous software demands.

While developers across the tech and crypto ecosystems are rapidly standardizing how agents authenticate and negotiate through new identity layers and execution protocols, settlement remains a major bottleneck. Infrastructure like the Fiber Network provides the critical foundation for this new economy. By leveraging payment channels built on a highly expressive blockchain, it eliminates the friction of traditional rails, pushing transaction costs to near zero and achieving near-instantaneous settlement speed. As developers continue experimenting and exploring, the concepts of autonomous commerce and stream payments are becoming practical, real-world tools.
