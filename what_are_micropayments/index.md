---
title: 'What Are Micropayments? Why Tiny Payments Still Matter for the Internet'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "A guide to micropayments, nanopayments, the barriers that kept them from working at scale, and the infrastructure making sub-cent digital commerce practical."
date: '2026-09-03T16:00:00.000Z'
author: 
- github:nervosnetwork
---

### Key Takeaways

- A **micropayment** is a financial transaction so small, typically under a dollar, often just a few cents or fractions of a cent, that traditional payment rails can't process it profitably.
- **Nano payments** and **sub-cent payments** push the concept even further, into the range of a millionth of a dollar, and are mostly used for machine-to-machine and AI agent commerce.
- For decades, widespread adoption was blocked by two factors: human mental transaction costs and the fixed baseline fees of legacy credit card networks.
- Traditional workarounds like custodial batching, direct carrier billing, or subscription bundling bypass these issues but require trusted intermediaries.
- Layer-2 payment channel networks, such as **Fiber Network**, solve these bottlenecks by routing value off-chain, enabling instant, gas-free settlement and pay-per-API-call pricing.

Sending information across the internet is extraordinarily cheap.

An application can make thousands of API requests, download small pieces of data from servers around the world, or stream information continuously without anyone thinking about the cost of each individual packet.

Moving money has historically worked very differently.

Charging someone $20 is easy. Charging them $0.20 can be inconvenient. Charging them $0.002 may cost more to process than the payment itself.

That mismatch has limited micropayments since the early commercial internet.

The idea was attractive: charge a few cents for an article, a song, a game item, or another small piece of digital value instead of bundling everything into subscriptions or larger purchases.

But two problems repeatedly got in the way.

The first was economic. Conventional payment systems impose processing costs that do not shrink proportionally with the transaction amount. At some point, the fee required to collect the payment becomes larger than the payment itself.

The second was behavioral. Even if tiny payments were cheap to process, asking people to stop and approve dozens or hundreds of small purchases throughout the day creates friction. Subscriptions, prepaid balances, and advertising were often easier.

The internet adapted around these constraints. Publishers bundled content into subscriptions. Software companies sold monthly plans instead of charging for every unit consumed. Platforms used prepaid balances or internal accounting to avoid processing tiny payments individually.

Today, both constraints are being revisited. New payment infrastructure can reduce the marginal cost of transferring very small amounts and, at the same time, AI agents and other autonomous software can make purchases within budgets and permissions set in advance, without requiring a person to approve every transaction.

That changes what micropayments are useful for.

The most interesting use case is no longer just asking a person to pay a few cents for an article. It is allowing software to pay exactly for what it consumes: one API call, one model inference, a few seconds of compute, or a small piece of data.

This guide explains what micropayments and nanopayments are, why they struggled to gain traction, and why new payment architectures are making them relevant again.

## What Are Micropayments and Nanopayment?

A **micropayment** is a very small financial transaction where ordinary payment-processing costs or friction become significant relative to the value being transferred.

There is no universally accepted dollar threshold.

A one-dollar payment might qualify in one context, while machine commerce increasingly deals with fractions of a cent. What matters is less the exact number than the economic problem: **can the payment be processed cheaply enough to make charging that amount worthwhile?**

Historically, micropayment proposals focused on human purchases such as individual news articles, songs, tips, game items, or small pieces of digital content.

Today, the concept is becoming much more granular.

An AI agent might pay for:

- one API request;
- one model inference;
- a few seconds of compute;
- a small amount of storage;
- access to one dataset;
- or another narrowly defined unit of digital service.

This has also popularized the term nanopayment.

Nanopayment is not a standardized financial category with a universally agreed threshold. It is generally used to describe extremely small micropayments—often fractions of a cent—where payments are likely to be initiated programmatically rather than manually by a person.

Circle, for example, currently uses the term for its Gateway payment system, which supports USDC transfers as small as [$0.000001](https://developers.circle.com/gateway/nanopayments) by signing payments off-chain and settling them in batches.

Lightning demonstrates the same idea at the protocol level. Lightning payment amounts can be represented in millisatoshis, or one-thousandth of a satoshi, although minimum routable amounts depend on individual channel policies.

The distinction, therefore, is best understood as a matter of granularity rather than a hard boundary.

## The Mental Costs for Micropayment

Low-cost payment rails alone were not the whole problem.

In 1999, computer scientist and cryptographer Nick Szabo identified "[mental transaction costs](https://nakamotoinstitute.org/library/micropayments-and-mental-transaction-costs/)" as the primary psychological barrier. He argued that the cognitive effort required to constantly evaluate and approve tiny purchases creates user fatigue, making flat-rate subscriptions or ad-supported models more appealing. Szabo believed that this mental cost doesn't fall as the payment rail gets cheaper, since nobody wants to consciously weigh 500 times a day whether a one-cent paywall is worth it.

But this constraint only applies to human buyers. Today, the landscape is shifting by the rise of AI agents and [machine-to-machine commerce](https://www.nervos.org/knowledge-base/what_are_machine_to_machine_payments). When an AI agent is spending from a budget a person sets in advance, there's no moment of hesitation to multiply, and human beings no longer have to make every micro-decision. That's why micropayments are resurfacing now less as a consumer feature and more as infrastructure for machines.

## Why Can't You Pay Small Amounts With a Credit Card?

The other restraint is architectural: legacy card rails were never built to move two cents. When a card is swiped, the transaction passes through a payment gateway, a payment processor, an acquiring bank, the card network, and an issuing bank, each one taking a cut for the valuable service they’re providing, and each one protecting its margin with a minimum baseline fee.

A [standard](https://stripe.com/pricing) U.S. credit card transaction fee runs roughly $0.30 plus about 2.9% of the transaction value. If a customer tries to pay $0.10 for a digital article, that fixed $0.30 fee alone is three times the purchase price, and the merchant loses money on every sale. This is also why many merchants set a $5 or $10 minimum for card purchases.

To bypass this, traditional platforms resort to custodial batching: a user pre-loads a balance with a trusted intermediary, who debits it in small increments and settles with the card network in larger, less frequent chunks. Platforms like [Skype](https://support.microsoft.com/en-us/skype/skype-is-retiring-in-may-2025-what-you-need-to-know) (via Skype Credit for minute-by-minute calls) or [Blendle](https://en.wikipedia.org/wiki/Blendle) (a pay-per-article news service) used to rely on this model. It works, but it locks up user capital and still requires trusting a company to hold the money.

## How Do Micropayments Work?

Both restraints above assume a human paying with a card. Two things have changed that. First, software and machines don't get mentally tired of tiny decisions the way people do; second, newer payment infrastructure, such as [payment channel networks](https://www.nervos.org/knowledge-base/ultimate_guide_to_payment_channels), was built specifically to avoid the per-transaction fee floor that makes card networks unworkable.

### Traditional Workarounds & Centralized Batching

Ad-supported access (like Google and YouTube) and subscription bundling (like Spotify or The New York Times) remain most publishers' default, precisely because they avoid per-transaction pricing. [Apple News+](https://www.apple.com/newsroom/2019/03/apple-launches-apple-news-plus-an-immersive-magazine-and-news-reading-experience/) bundles more than 300 magazines and newspapers into one flat $12.99-a-month subscription, splitting revenue with publishers based on reader engagement time instead of individual transactions.

Direct carrier billing, managed by payment processors like Boku or Fortumo, charges a purchase to a customer's phone bill. This is widely used for digital goods across Asia, leveraging the trust a telecom provider (such as NTT DOCOMO) already has with its subscriber.

Platforms like the App stores solve a version of the same problem by setting a price floor, the [$0.29 minimum](https://www.bloomberg.com/news/articles/2022-12-06/apple-overhauls-app-store-pricing-to-range-from-0-29-to-10-000) tier for in-app purchase.

### Decentralized Scaling & Layer 2 Landscape

Cryptocurrency allows value to move directly between parties without relying on a trusted intermediary's internal ledger. But early blockchains like Bitcoin and Ethereum still ran into the same micropayment problem: on-chain fees can become too high or unpredictable for very small transactions.

The broad solution is Layer 2 scaling: moving transaction activity away from the base blockchain so every payment does not need to consume Layer 1 blockspace. Two approaches are especially relevant here:

- **Rollups (optimistic or zero-knowledge):** Rollups execute transactions outside the base blockchain and combine activity before posting data, state commitments, and—in the case of ZK rollups—validity proofs back to Layer 1. This can substantially reduce the cost per transaction, but each user transaction still contributes some marginal cost to the shared rollup environment, making rollups particularly useful for scaling general-purpose applications and shared state, not only payments.
- **Payment channels:** [Payment channels](https://www.nervos.org/knowledge-base/what_are_payment_channels) take a more specialized approach by letting two participants commit funds on-chain once and then repeatedly update their balances off-chain by exchanging signed states, without publishing every payment to the blockchain. A payment channel network connects many of these channels, allowing payments to route through intermediary nodes when sender and recipient do not share a direct channel, as long as enough liquidity exists along the path. The Lightning Network uses this architecture on Bitcoin, while Fiber Network uses it on CKB. Routing nodes can still charge fees and participants must manage channel liquidity, but individual payments avoid a separate base-layer transaction fee, making payment channels particularly well suited to frequent, low-value transfers.

Neither approach is universal. Rollups are better suited to scaling general-purpose blockchain applications, while payment channels are optimized for fast, repeated value transfer.

That makes payment channels especially well suited to micropayments. Once a channel is funded, individual payments avoid base-layer fees and confirmation waits, allowing very small transfers to remain economical even at high frequency.

This is also where **gas-free payments** become relevant. The term generally refers to payments where the user does not pay a blockchain network fee for each individual transfer because activity is handled off-chain or settled in batches. Circle Gateway Nanopayments, for example, lets buyers deposit USDC once and sign off-chain payment authorizations for transfers as small as $0.000001, which Circle later aggregates into on-chain settlement.

Payment channel networks follow a similar transact-often, settle-less-often model, but without requiring every participant to keep funds inside one company's internal ledger. That makes them useful for applications where payments need to be open, frequent, and very small:

**Pay per API call:** An application or AI agent can pay for individual API requests instead of relying on subscriptions, prepaid credits, or monthly billing.

**Streaming media and content:** Through streaming payments, users can make a sequence of small payments that tracks the amount of video, audio, or other content they actually consume.

**Machine-to-machine (M2M) commerce:** Software, AI agents, and connected devices can pay directly for resources such as bandwidth, compute, data, or energy as they consume them. Machine-to-machine payments make this possible without requiring a human to authorize every individual transaction.

## Powering the Machine Economy: Fiber Network

**A payment channel** is a mechanism in which two parties lock funds into a shared on-chain contract once, then exchange many payments by signing updated balances off-chain, only returning to the blockchain to open or close the channel. A **payment channel network** is a set of interconnected payment channels that lets a payment route through several intermediary nodes, so two parties don't need a direct, individually funded channel with each other.

[Fiber Network](https://www.fiber.world/) is an open, [peer-to-peer payment channel network](https://www.nervos.org/knowledge-base/fiber_network) built on the CKB blockchain. Much like the Lightning Network links Bitcoin payment channels together, Fiber links channels on CKB into a routable network.

### Enabling Instant, Low-Cost Routing

Once a channel is funded on the CKB base layer, transactions inside the Fiber Network effectively bypass blockchain block times. Because these updates are completely off-chain and require no global consensus, they settle instantly at the speed of a basic internet ping.

Furthermore, because these off-chain updates carry no base-layer network footprint, the marginal cost to send a sub-cent payment drops to near-zero. This enables developers to build massive, high-frequency payment streams without bleeding capital to network validators.

### Built for Programmable Assets

Because CKB's [scripting](https://docs.nervos.org/docs/script/intro-to-script) environment is highly programmable, Fiber's channel rules are not fixed the way Lightning's are. Developers can define how channels are authorized, updated, settled, and disputed, which lets Fiber support multiple assets (e.g., CKB, stablecoins, tokens issued on Bitcoin, and other user-defined-tokens) natively in the same channel, rather than forcing every payment through one base currency.

That programmability is why Fiber is positioned as infrastructure for the machine economy specifically, more than a faster way of sending crypto among people. The machine economy is defined as an emerging environment in which software, such as AI agents, connected devices, autonomous services, buys and sells directly from other software without a human approving each transaction.

*Fiber's architecture is covered in more depth in*[ *Fiber: A Complete Guide to the Next-Gen Payment Network*](https://www.nervos.org/knowledge-base/what_is_fiber) *and*[ *How Do AI Agents Pay for Things? A Guide to Machine-to-Machine Payments*](https://www.nervos.org/knowledge-base/how_do_ai_agents_pay_for_things)*.*

## Conclusion

While the concept of moving fractions of a cent has been technologically and psychologically constrained for decades, the digital infrastructure has finally caught up to the vision. By shifting the cognitive burden to AI agents and the transactional burden to gas-free payment channels, the digital economy is no longer bound by the fixed baseline fees of legacy credit card networks. With decentralized infrastructure like Fiber Network providing instant, programmable settlement, the foundation is now set for a future where value flows as continuously and seamlessly as data itself.

## FAQs

### How do micropayments work?

Micropayments work by minimizing or eliminating the per-transaction cost that makes small payments unprofitable on traditional rails. They may use prepaid balances, centralized accounting, aggregated billing, or blockchain layer 2 solutions such as payment channels.

### Are micropayments profitable?

They can be, but only once the processing cost per transaction drops well below the payment amount. A $0.30-plus-2.9% card fee makes a two-cent payment deeply unprofitable; a payment channel network like Lightning or Fiber Network, or a gas-free, batched rails like Circle's Gateway nanopayments can push the marginal cost per payment down to a fraction of a cent, which is what makes pay-per-article, pay-per-API-call, and pay-per-token business models viable.

### What is the difference between micropayments and nanopayments?

Micropayments generally cover transactions under about a dollar, often a few cents, made by people for discrete digital purchases. Nanopayments refer to automated, continuous, sub-cent transactions executed by machines or software, often representing fractions of a penny.

### How small can a nanopayment be?

In current crypto-native systems, nanopayments can be as small as $0.000001, the smallest base unit of a stablecoin like USDC, enabled by batched, gas-free settlement that spreads the cost of one on-chain transaction across thousands of individual payments.

### What are nanopayments used for?

Nanopayments are specifically used for ultra-high-frequency automated tasks. Common use cases include real-time continuous metering for data streaming, pay-per-API call models, and granular resource negotiation between autonomous hardware devices in M2M commerce.

### How do gas-free nanopayments work?

Gas-free nanopayments work by aggregating ultra-small off-chain payment authorizations and later settling them on-chain in large, combined batches, effectively eliminating the per-transaction blockchain network gas fee. 
