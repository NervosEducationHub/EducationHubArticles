---
title: 'Fiber Network: An Open Payment Network for the Digital Economy'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "Crypto payments are moving offchain. Fiber turns isolated payment channels into an open network that anyone can join, build on, and use."
date: '2026-08-03T16:00:00.000Z'
author: 
- github:nervosnetwork
---

Crypto has transformed how value is created, owned, and exchanged. But its original promise—making digital payments better—remains largely unfinished.

Bitcoin made it possible to transfer value globally without a bank. Stablecoins addressed crypto’s volatility problem by introducing internet-native money that people can reliably use to price goods and services. The Lightning Network showed that not every payment needs to settle individually onchain: value can move instantly and cheaply through offchain payment channels.

Across the industry, the direction is becoming clear. Legacy payment rails were not designed for the generation of the digital economy now taking shape, while conventional blockchains cannot efficiently process every payment individually onchain.

Payment channels, payment sessions, batching systems, streaming payments, x402, and other emerging technologies are all part of the transition. Together, they make it possible to move smaller amounts, more frequently, and with less friction than legacy rails or conventional blockchains allow.

Fiber Network belongs to this movement. Its ambition is to take the existing payment-channel model and turn it into open, programmable payment infrastructure—one that can route value across users, applications, services, and assets without placing a single company at the center.

## What Is Fiber Network?

Fiber is an open, peer-to-peer payment network built on CKB.

At its foundation are payment channels. Two parties lock funds into a channel and can then exchange many payments without publishing every transaction to the blockchain. Only the opening andor eventual closing of the channel needs to be settled onchain.

That makes payments fast, inexpensive, and more private.

But a direct channel only connects two parties. Much like the Lightning Network, Fiber links many channels together, allowing payments to travel through intermediate nodes until they reach their destination. The sender does not need to open a separate channel with every person, application, or merchant they want to pay.

The simplest way to understand Fiber is:

> Connect to the network, then pay across it.

Where Fiber goes further is in what the network can become. Lightning is built around Bitcoin and constrained by Bitcoin’s intentionally limited scripting environment. Fiber is built on CKB, where channel rules are implemented through programmable scripts. This gives developers much greater freedom to define how channels are authorized, updated, settled, and disputed.

Fiber currently uses bilateral payment channels, but its architecture is not limited to them. Over time, the same programmable foundation can support more advanced constructions, including multiparty channels and entirely new channel designs that have not yet been standardized. It also enables native support for multiple assets—including stablecoins—atomic swaps within payment flows, interoperability with external networks such as Lightning, and richer conditional, streaming, and pay-as-you-go payment logic.

In other words, Fiber does not merely recreate Lightning on another blockchain. It takes the open, routed model Lightning pioneered and expands it into a private, multi-asset, programmable payment layer that can keep evolving as new forms of digital commerce emerge. Its longer-term vision is a network where value can move across assets and payment ecosystems, so the payer does not always need to hold the exact asset the recipient wants to receive.

## Open Infrastructure, Not Another Walled Garden

Fiber is part of a much broader industry movement. 

Circle is developing gas-free USDC nanopayments through Gateway. 

Stripe and Bridge are building stablecoin infrastructure for payments, payouts, treasury, and global money movement. 

Tempo’s MPP sessions allow customers to pay services continuously through offchain vouchers, while Coinbase’s x402 gives applications a standard way to request and complete payments over the internet. 

Together, these projects reinforce the same conclusion: the digital economy needs payment rails designed for smaller, faster, and more programmable transactions.

Now, managed payment infrastructure admittedly has real advantages. One provider can abstract away liquidity management, settlement, compliance, and technical complexity while offering businesses a predictable user experience, customer support, and a single accountable counterparty. For many companies and individuals, that convenience is exactly what makes the system usable.

The trade-off, however, is that participants remain dependent on the provider’s infrastructure, supported assets, pricing, availability, and policies. Bilateral payment sessions introduce a different limitation: they work efficiently when one customer repeatedly pays one service, but each new relationship may require its own separately funded connection.

Fiber, on the other hand, explores a different model.

Rather than placing one company at the center or requiring a direct payment relationship with every recipient, Fiber connects participants through an open routing network. Anyone can run a node, open channels, provide liquidity, route payments, and build applications on top. No single operator is required to verify and process every payment across the network.

Thisat creates several important advantages. Liquidity can be reused to reach many recipients rather than being isolated inside one commercial relationship. Independent node operators can compete to provide routes, liquidity, fees, and specialized services. Applications are not permanently tied to one processor, while communities and businesses can operate their own infrastructure without asking permission from a platform owner.

It also makes the network more resilient and economically open. Fiber still relies on intermediaries in the form of routing nodes and liquidity providers, but those intermediaries are replaceable and open to competition. No single one of them is supposed to control the entire payment system.

The infrastructure is therefore not only open to the people using it, but also to those who want to operate it, build businesses around it, and help the network grow.

## More Than Fast Payments

Fiber’s combination of offchain speed, open routing, multiple assets, and programmable settlement creates possibilities that are difficult to support with conventional payment infrastructure.

We cover some of these below, but perhaps more importantly, many are difficult to imagine today. Because Fiber channels are built on CKB’s flexible scripting environment, developers can experiment with entirely new ways to authorize, exchange, and settle value.

Future channel designs could support novel multiparty constructions, conditional micropayments released only when a service delivers a verifiable result, transactions that combine payment and asset exchange in a single flow, and much more.

That is what makes programmable payment infrastructure exciting: it does not merely make existing payments faster. It creates room for entirely new types of economic relationships to form.

### Micropayments

Card fees and onchain transaction costs make very small payments impractical. It rarely makes economic sense to pay a few cents to read one article, reward a useful comment, access one dataset, or unlock a single feature inside an application.

When payments can move at very low marginal cost, a new range of transactions becomes viable. Creators can be paid directly and instantly, and applications can charge for one AI query, one software action, one game item, or one piece of premium content rather than forcing users into a subscription.

Micropayments do not simply let users pay less. They unlock services that would otherwise be uneconomical to offer, allowing people to pay for individual pieces of value instead of being forced into subscriptions or larger purchases.

### Pay-As-You-Go Services

Subscriptions require users to commit to a fixed price before they know how much of a service they will actually consume. Fiber opens the door to pricing that follows usage in real time.

Instead of paying $20 or $200 each month for access to an AI service, a user could pay continuously for each token the model generates. A developer could rent a powerful GPU for fourteen seconds to complete one task, pay for exactly 3.342 gigabytes of storage, or purchase bandwidth only while an application is actively using it.

The same model could apply to EV charging, cloud software, gaming, media, data feeds, and many other digital services.

Instead of paying by the month, users can pay by the second, request, token, kilowatt-hour, or unit of consumption.

### Machine-to-Machine Payments

The next stage of the digital economy will involve software transacting directly with other software.

An AI research agent might pay one service for market data, another for model inference, and a third to verify the result. A vehicle could purchase electricity from a charging station. A connected device could buy additional bandwidth for the next ten minutes, while an application could automatically rent more computing power whenever demand increases.

These transactions cannot depend on a person opening a checkout page, entering card details, or approving every purchase individually. Machines and AI agents need to discover prices, authorize payments, receive services, and settle value continuously and autonomously.

Emerging standards such as x402 and MPP give software common ways to request and authorize payments over the internet. Fiber already has an x402 facilitator implementation, while MPP is payment-method agnostic and allows new payment rails to be added through custom payment methods. This creates a path for Fiber to work withbeneath both standards as the open, routed infrastructure through which their payments move.

Rather than opening and funding a separate payment relationship with every provider, an application or agent could connect to Fiber and pay across the network—reaching many services, using different assets, and switching providers as its needs change.

Thise infrastructure may serve machines, but the benefits ultimately flow to people: cheaper services, more precise pricing, greater competition between providers, and new ways to earn from data, compute, energy, bandwidth, and other resources. And as AI agents take over more routine work and economic coordination, they could ultimately give people something even more valuable: more time.

## Conclusion

The payments industry is arriving at a shared conclusion: the digital economy needs faster, smaller, more frequent, and more flexible ways to move value.

Lightning proved that payments can move through an open offchain network. Stablecoins made digital value practical for everyday pricing. Payment sessions, batching systems, streaming payments, and protocols such as x402 are making new forms of commerce possible.

Fiber brings these ideas together and pushes them further.

It is not merely another checkout product, another corporate balance system, or another blockchain promising faster transactions. It is an effortattempt to build open payment infrastructure that can route value across people, AI agents, services, assets, and networks.

Infrastructure that anyone can connect to. Anyone can build on. Anyone can help operate and grow.

And because its foundations are programmable, Fiber is not limited to the payment channel models that exist today. It can evolve alongside the economy being built on top of it.

Connect to the network. Pay across it. Build what comes next.
