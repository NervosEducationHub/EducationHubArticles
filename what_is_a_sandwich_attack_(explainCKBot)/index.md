---
title: 'What Is a Sandwich Attack in Blockchain Networks?'
coverImage: 'images/image1.png'
category: Education
subtitle: 'A sandwich attack is a subtle yet potent threat in blockchain networks, exploiting the transparency of DEXs to profit at the expense of unsuspecting traders.'
date: '2025-12-16T16:00:00.000Z'
author: 
- github:explainCKBot
---

One of the less obvious but increasingly serious threats in decentralized exchanges, or DEXs, is the so-called sandwich attack. A DEX is a peer-to-peer marketplace where users can connect their wallets and swap one cryptocurrency for another directly, without the need for a central authority.

A sandwich attack is a form of malicious trading activity where an attacker places a front-run order before a victim's large buy or sell order on the DEX and a back-run order right after it. By "sandwiching" the victim's transaction, the attacker profits from the price change while the victim ends up paying more or receiving fewer tokens.



## The Building Blocks: AMMs, Blockchain Transparency, and MEV

Unlike centralized exchanges (CEXs), where a company controls the order book and transaction matching, most DEXs rely on [automated market maker](https://blog.uniswap.org/what-is-an-automated-market-maker) (AMM) models. In AMMs, token prices are determined by mathematical formulas that adjust based on liquidity in the pool. This removes the need for intermediaries but also opens the door to new types of market manipulation.

On networks like Ethereum, pending transactions are visible in the [mempool](https://www.nervos.org/knowledge-base/mempool_in_cryptocurrency_(explainCKBot)) (a temporary waiting area for unconfirmed blockchain transactions). This transparency allows validators to verify transactions but also gives attackers a preview of upcoming trades. Many attackers and bots continuously scan the mempool, hunting for profitable opportunities hidden in plain sight.

This is where [MEV](https://ethereum.org/developers/docs/mev/), or Maximal Extractable Value, comes in. MEV represents the additional profit that [miners, validators](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)), or bots can extract by reordering, inserting, or censoring transactions inside a block beyond just the standard transaction fees. Validators or miners who have the power to order transactions within a block can strategically position them to their advantage.

This ability to control transaction order, combined with the public visibility of pending transactions in the mempool and predictable AMM price impact, creates the perfect storm for sandwich attacks to occur regularly on many DEXs.



## What Is a Sandwich Attack and How Does It Work?

A sandwich attack is a sophisticated form of market manipulation that occurs on DEXs when a malicious actor places two transactions around a victim’s trade: one just before it (front‑running) and one just after (back‑running). 

The victim is literally “sandwiched” between the attacker’s two transactions. This allows the attacker to profit by manipulating asset prices to their advantage while leaving the victim with a less favorable outcome.

Suppose Alice wants to buy a large number of tokens on a DEX. Her transaction, once submitted, is visible in the blockchain’s mempool. The mempool contains unconfirmed transactions waiting to be processed by miners or validators. Bob, a malicious actor, monitors the mempool for large trades that are likely to impact token prices. Once he identifies Alice’s transaction, Bob acts strategically.

Bob’s first step is the front-running phase. He places his own buy order before Alice’s transaction. This purchase temporarily drives up the token price due to the nature of AMM algorithms. When Alice’s transaction executes next, she unknowingly buys tokens at a higher price than initially anticipated. 

Bob then executes the back-running phase, selling the tokens he purchased at an even higher price, now inflated by Alice’s transaction. The attacker’s profit is the difference between the tokens he bought at a lower price and sold at a higher price, while Alice incurs a loss due to the price manipulation.

This may seem like a sophisticated endeavor reserved for professional traders, but the proliferation of bots and automated scripts has made sandwich attacks accessible to individuals with minimal technical expertise. These bots continuously scan mempools and execute transactions faster than any human could manually.



## Who is Typically Targeted?

Sandwich attacks don’t only happen to large whales, they can affect anyone trading on a DEX. Common targets include:

- Relatively large single trades in shallow‑liquidity pools, because the attacker can move the price more easily.

- Retail traders who unknowingly set large slippage tolerances (leaving them exposed).

- Trades of less‑liquid or newly listed tokens where price impact is high.

- Emerging chains or new AMM pools where monitoring and mitigation are weaker.

Even small trades can be targeted if liquidity is thin enough. The attacker’s goal is simple: find opportunities where small manipulations yield quick profits.



## Detecting Sandwich Attacks

Detecting sandwich attacks can be challenging, especially for casual traders. The key is understanding the indicators of such manipulation. One common sign is a sudden and unexpected increase in the price of a token just before a trade executes. This is usually followed by a sharp price correction immediately afterward. Traders might notice that their transaction executed at a worse rate than estimated, even though market conditions appeared stable.

On-chain analytics tools have emerged to help identify patterns consistent with sandwich attacks. These platforms monitor transaction histories, mempool activity, and price movements to detect potential exploitation.



## Strategies to Mitigate Sandwich Attacks

For individual traders, one of the most effective methods is setting slippage tolerance limits. By defining how much deviation from the expected trade price is acceptable, users can reduce the likelihood of executing trades at manipulated rates. If the slippage exceeds the predefined limit, the transaction will not proceed, protecting the trader from excessive losses.

Avoiding excessively large trades in thinly liquid markets, diversifying token holdings, and using reputable DEXs with built-in anti-front-running measures can all contribute to risk reduction.

Some DEX aggregators now include MEV‑protection by routing trades through private relays or using miner‑bundled transactions (e.g., via Flashbots). The goal is to move away from fully transparent mempools toward more guarded trade submission flows. Some chains are exploring built‑in fair transaction ordering or MEV exclusion zones. 



## Conclusion

A sandwich attack is a subtle yet potent threat in blockchain networks, exploiting the transparency of DEXs to profit at the expense of unsuspecting traders. By front-running and back-running a victim’s transaction, attackers can manipulate token prices in predictable ways.

To stay safe, traders should lower slippage limits, use deeper liquidity pools, split large trades, and rely on DEXs that offer MEV protection. Developers can help by implementing fair sequencing, private transaction routing, and user education programs.
