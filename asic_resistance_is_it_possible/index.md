---
title: 'ASIC-Resistance in Crypto Mining: Is it possible?'
coverImage: 'images/image1.png'
category: 'PoW, Popular, mining, ASIC'

date: '2023-04-11T16:00:00.000Z'
---



ASIC-Resistance is a critical concept in blockchain technology that describes how a blockchain's mining algorithm can resist implementation of specialized hardware called [ASICs](https://en.wikipedia.org/wiki/Application-specific_integrated_circuit) (Application-Specific Integrated Circuits). These ASICs are specifically designed to perform a single task—mining cryptocurrency—and operate with efficiency levels that are orders of magnitude higher than general-purpose [crypto mining hardware](https://www.nervos.org/knowledge-base/crypto_mining_hardware_(explainCKBot)) like CPUs or GPUs.

## What is ASIC-Resistance?
The concept of ASIC resistance emerged as a way to maintain a level playing field in mining, where smaller players with consumer-grade hardware could still participate and be rewarded for their contributions to the network. The theory was- by designing a mining algorithm that was difficult to implement in ASICs, the network would be made more decentralized and resistant to centralization by well capitalized, large miners.

One approach to achieving ASIC-resistance is through the use of memory hard functions. These functions require large amounts of memory to be available to the mining hardware in order to perform the calculations required to mine a block. This significantly increases the R&D and manufacturing costs of an ASIC, compared to one that has a purely computational task (like a [hash function](https://www.nervos.org/knowledge-base/what_is_a_hash_function)).

The mining algorithm used to mine Ethereum from 2015 to 2022, [Ethash](https://bitcoinwiki.org/wiki/ethash), is an example of a memory hard function. It required a large amount of data to be read from memory, and this requirement would increase over time, making older hardware impossible to use to mine the chain. 

Similarly, the Grin blockchain employs a memory hard function called [Cuckoo Cycle](https://docs.grin.mw/wiki/miscellaneous/cuckoo-cycle/). This algorithm requires miners to find cycles in a large directed graph, which requires a large amount of memory and high-speed memory access.


## Is ASIC-Resistance possible?

Over time, developers realized that achieving true ASIC-resistance was a difficult task, as ASICs can be designed to mine any algorithm, given enough resources and time. As a result, many [proof-of-work](https://en.wikipedia.org/wiki/Proof_of_work) blockchains that once claimed to be ASIC-resistant have since been overtaken by ASICs, leading to concerns about centralization and control by a few large mining operations. 

The first Ethereum ASIC's took years to produce, but over time grew to comprise 50% of the hash rate of the network. After Ethereum's merge, these ASIC's had no choice but to move to another chain secured by Ethash, [Ethereum Classic](https://en.wikipedia.org/wiki/Ethereum_Classic). It is now unprofitable to mine Etheruem Classic with anything but an ASIC.

To combat this, some blockchains have opted to [hard fork](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork_(explainCKBot)) their protocol in order to change the mining algorithm and render existing ASICs obsolete. This is often done in an effort to restore a level playing field and prevent a small group of miners from controlling the majority of the network's hash power. However, hard forking is not always an easy decision to make, as it can be disruptive to the network and its users, and may require significant effort to ensure a smooth transition.


## Conclusion

It's important to note that while memory hard functions can make it more difficult for ASICs to be developed to mine a blockchain, this strategy is not foolproof. ASIC manufacturers may still be able to develop specialized hardware that is optimized for mining these functions.

As a result, hard forks are required to keep ASIC's off the network. These hard forks create concentrations of power (in the decision making process) and require immense coordination in the ecosystem to implement. 

This kind of hard fork can also undermine important stakeholders in a blockchain's community, as miners and mining hardware manufacturers invest signficant sums in equipment that can not be re-purposed to mine another chain. A hard fork may be in the interest of some community members, but creating a large sunk cost for key stakeholders may not be in the interest of the chain overall.
