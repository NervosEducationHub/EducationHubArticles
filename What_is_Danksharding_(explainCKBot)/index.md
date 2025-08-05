---
title: 'What is Danksharding? Ethereum Data Sharding Solution'
coverImage: 'images/image1.png'
category: Scaling
subtitle: 'Danksharding represents most promising scaling solution of Ethereum to address the its persistent scalability challenge.'
date: '2025-08-04T16:00:00.000Z'
author: 
- github:explainCKBot
---

Ethereum has a scaling problem. As more users and applications flock to the network, blockspace demand continues to outpace supply. [Gas fees](https://www.nervos.org/knowledge-base/what_is_a_blockchain_gas_fee_(explainCKBot)) rise, congestion grows, and the dream of a fast, global settlement layer starts to buckle under its own success. 

Enter [sharding](https://www.nervos.org/knowledge-base/What_is_sharding_in_blockchain_(explainCKBot))—an idea that’s been part of Ethereum's roadmap since the early days. But sharding has evolved. It’s not what it used to be. And today, the term you’ll most often hear is "Danksharding."

Danksharding is Ethereum's future scaling solution that dramatically increases [data availability](https://www.nervos.org/knowledge-base/what_is_data_%20availability_in_blockchain_(explainCKBot)) for rollups. Unlike traditional sharding, which splits computation and state, Danksharding focuses solely on data. It introduces a unified block structure and uses a market-based approach to decide which data gets included. It's named after researcher Dankrad Feist, who proposed the core concept. And while the name might sound playful, the idea behind it is serious business for Ethereum’s future.



## A Brief History of Blockchain Sharding

To understand Danksharding, it helps to know where the idea comes from. Traditional sharding, borrowed from database theory, breaks a system into smaller parts (shards), each responsible for a portion of the data or computation. In Ethereum's early roadmap, this meant creating multiple “mini-Ethereums,” each handling its own transactions and smart contracts.

This sounded promising in theory, but it raised massive complexity. Coordinating [state](https://www.nervos.org/knowledge-base/state_and_state_change_(explainCKBot)) between shards, enabling cross-shard communication, and maintaining security across the system added more problems than it solved. By 2021, Ethereum researchers began shifting focus away from computational sharding toward data sharding.

Why the pivot? Because rollups had changed the game. Instead of scaling Ethereum directly by increasing its computational load, rollups allowed activity to happen off-chain and use Ethereum for security and data availability. This changed what Ethereum needed from sharding: not more computation, but more data space. Danksharding is the result of that shift in thinking.



## The Core Idea: Data Over Computation

Danksharding flips the old idea of sharding on its head. Instead of trying to split Ethereum into multiple stateful shards with smart contracts and transactions happening independently, Danksharding treats Ethereum as a single execution environment that offers large amounts of space for storing data.

This data doesn’t need to be interpreted by Ethereum directly. It exists to support rollups, which read it off-chain, process it, and submit proofs to Ethereum. In this way, Ethereum becomes a data availability layer—a kind of public bulletin board where rollups can publish their transaction data for anyone to see and verify.

By focusing on data rather than execution, Danksharding avoids the complexity of state fragmentation while still achieving massive scalability. The Ethereum base layer remains secure and unified, but it becomes capable of supporting thousands of rollups and millions of users.



## Proto-Danksharding: The First Step

Before Ethereum can implement full Danksharding, it needs to build the infrastructure to support it. That’s where proto-Danksharding comes in. Also known as [EIP-4844](https://www.eip4844.com), proto-Danksharding is a transitional upgrade that introduces the concept of "[blobs](https://www.nervos.org/knowledge-base/what_are_blobs_in_ethereum_(explainCKBot))"—large chunks of binary data that can be attached to blocks.

Blobs are cheaper to store and transmit than regular calldata, making them ideal for rollup data. They don’t persist in Ethereum’s state forever, which helps keep nodes light and manageable. This temporary nature is fine, because rollups don’t need permanent data storage—they just need enough time to retrieve and process the data after it’s published.

Proto-Danksharding is a critical step because it tests many of the components that full Danksharding will rely on. It introduces new fee markets, changes how data is propagated, and gives rollups a taste of what full-scale data availability will look like. Once proto-Danksharding is live and stable, Ethereum can move toward full Danksharding.



## The Role of Block Builders and MEV

One of the most innovative parts of Danksharding is how it changes block construction. Traditional sharding might have involved independent block producers for each shard. But Danksharding uses a single proposer per block, supported by a network of builders who compete to assemble the most profitable and data-efficient blocks.

This is where [Proposer-Builder Separation (PBS)](https://www.nervos.org/knowledge-base/What_is_a_digital_signature_%20in_Blockchain_(explainCKBot)) comes in. Under PBS, block proposers are randomly selected validators who choose from blocks constructed by third-party builders. Builders have the technical skill and resources to optimize block content for maximum [MEV (miner-extractable value)](https://ethereum.org/en/developers/docs/mev/) and efficient use of blob space.

Danksharding incorporates this model by turning data inclusion into a market. Builders submit blocks that include both execution transactions and blob data. Proposers choose the best block according to certain rules and incentives. This system encourages competition, drives down costs, and makes data availability scalable.

The idea is that block builders will include as much useful blob data as the market demands, up to a maximum capacity. Over time, Ethereum can raise this capacity as the network proves it can handle more data. This flexible and incentive-aligned model is central to the Danksharding vision.



## Cryptographic Infrastructure: KZG Commitments and Data Availability Sampling

One technical challenge of Danksharding is ensuring that data blobs are actually available to the network. It’s not enough to publish a commitment to data—the data itself must be retrievable, or rollups can't operate securely. But with large data volumes, [full nodes](https://www.nervos.org/knowledge-base/difference_between_miner_full_node_(explainCKBot)) can’t afford to download everything.

The solution lies in cryptographic tools like [KZG commitments](https://inevitableeth.com/home/concepts/kzg-commitment) and [data availability sampling (DAS)](https://inevitableeth.com/home/ethereum/upgrades/scaling/data/p2p-network/data-availability-sampling). A KZG commitment is a kind of cryptographic fingerprint that allows someone to verify a piece of data without seeing the whole thing. Using KZG, Ethereum can commit to a blob and allow others to verify any part of it efficiently.

DAS lets [light clients](https://www.nervos.org/knowledge-base/what_is_a_light_client_(explainCKBot)) check data availability by sampling small parts of many blobs at random. If enough samples are available and consistent, it becomes statistically very likely that the entire dataset is available. This lets Ethereum maintain strong data guarantees without requiring every node to download every byte.

Together, KZG and DAS form the backbone of Ethereum’s scalable data layer. They make it possible to include large volumes of rollup data without bloating the chain or sacrificing trustlessness. These technologies are already being tested and refined, and they’re essential for Danksharding to work in practice.



## Danksharding Benefits for Rollups and Blockchain Users

Danksharding is not an end in itself. It’s designed to supercharge Ethereum’s Layer 2 ecosystem, making rollups cheaper, faster, and more secure. With access to abundant, low-cost data space, rollups can scale to millions of users without competing for limited Layer 1 bandwidth.

This has a direct impact on end users. Gas fees drop, transactions confirm faster, and applications become more usable. Developers gain confidence that their rollup won't hit a ceiling due to data constraints. The ecosystem grows organically, supported by Ethereum’s security and data guarantees.

Over time, Danksharding could help Ethereum support not just dozens, but hundreds of rollups, each serving different communities and use cases. From games and social apps to global finance and governance systems, everything becomes more viable when the underlying infrastructure can scale.



## Challenges and Criticisms of Danksharding

No upgrade is without trade-offs, and Danksharding is no exception. One concern is complexity. The system introduces new roles, markets, and cryptographic primitives. It requires [validators](https://www.nervos.org/knowledge-base/difference_between_crypto_miners_validators_(explainCKBot)) to handle blob data, builders to compete on multiple fronts, and light clients to perform statistical sampling.

There’s also a coordination challenge. Danksharding depends on other upgrades like PBS and proto-Danksharding being successful. If one component fails or introduces unintended side effects, it could slow down the entire roadmap.

Critics also point to the name—"Danksharding"—as emblematic of Ethereum’s sometimes insular, tongue-in-cheek culture. While many find it endearing, others worry that such naming conventions make the ecosystem harder to take seriously from the outside.

Despite these concerns, most researchers and developers agree that Danksharding represents the most realistic path toward scalable, secure Ethereum rollups. Its focus on data rather than execution keeps the base layer lean, while empowering developers to build complex applications on top.



## A Glimpse Into the Future

As Ethereum moves toward implementing Danksharding, the network is positioning itself not just as a smart contract platform, but as a global data layer. Rollups become the engines of execution, while Ethereum provides the trust, availability, and neutrality they need to function.

In the long run, Danksharding could enable transaction throughput on the order of 100,000 transactions per second or more. This transforms Ethereum from a congested town square into a sprawling metropolis, with Layer 2s acting as districts connected by a shared public ledger.

Future innovations may build on top of Danksharding—such as recursive rollups, decentralized blob markets, and more advanced forms of censorship resistance. The basic principle, though, remains the same: Ethereum scales by giving others the tools to build, not by doing everything itself.



## Conclusion: Sharding, Reimagined

So, what is Danksharding? It’s Ethereum’s answer to the scalability challenge, reimagined for the age of rollups. It abandons the complexity of computational shards in favor of a single, unified data layer that supports decentralized applications at scale.

By focusing on data availability, embracing market-based incentives, and leaning into cryptographic guarantees, Danksharding lays the groundwork for Ethereum’s long-term success. It doesn’t fragment the network; it fortifies it. And in doing so, it gives rollups the room they need to grow—without ever leaving Ethereum behind.
