---
title: 'What is a Reentrancy Attack and How Does it Work?'
coverImage: 'images/image1.png'
category: Blockchain
subtitle: 'A reentrancy attack is one of the most dangerous types of attacks in blockchain.'
date: '2025-11-07T16:00:00.000Z'
author: 
- github:explainCKBot
---

A reentrancy attack happens when a hacker repeatedly calls a vulnerable function within a smart contract before the first execution is completed, allowing the hacker to drain funds or manipulate the contract’s state in unintended ways.

Reentrancy attacks became world-famous after the DAO hack in 2016, which resulted in millions of dollars’ worth of ETH being stolen and ultimately led to a controversial [hard fork](https://www.nervos.org/knowledge-base/what_is_a_hard_fork_soft_fork_(explainCKBot)).



## Smart Contracts: The Foundation of Blockchain Logic

Smart contracts are self-executing pieces of code that exist on blockchains like ETHeum, Solana, Nervos CKB, and others. They contain predefined logic that automatically enforces agreements without the need for intermediaries.

For example, imagine a smart contract that holds money for an online savings group. The rules might say, “Anyone can deposit ETH, and they can withdraw it later.” That sounds simple enough.

But here’s the catch: smart contracts don’t think like humans. They follow every line of code exactly as it’s written. If there’s even a small mistake or a missing step, someone can exploit that weakness to make the contract behave in unexpected ways.

That’s what reentrancy attacks do. They take advantage of how the contract processes its instructions.



## How a Reentrancy Attack Works

A reentrancy attack takes advantage of timing, specifically the order in which a contract performs actions. To illustrate, consider a simple smart contract that works like a digital bank where people can deposit and withdraw ETH. The typical withdrawal process might look like this:

1. The contract checks if the user has enough balance.
2. The contract sends the requested ETH to the user.
3. The contract updates the user’s balance.

On the surface, this seems logical. But the danger comes from the order of those steps. In the example above, the smart contract sends the ETH before it updates the balance. That tiny mistake opens the door to a reentrancy attack.

Here’s how a hacker could take advantage of it:

- The hacker creates another contract that talks to the bank contract, and deposits some ETH into the bank, say 1 ETH.

- When the hacker withdraws it, his contract “listens” for that money being sent back. The moment the ETH starts to come in, the hacker’s contract quickly calls the bank contract again, before the balance is updated.

- The bank contract thinks the hacker still has 1 ETH to withdraw and sends it again.

- This keeps repeating until the bank’s wallet is empty.

It’s a clever trick, and it all happens in just seconds.

The vulnerability lies not in the Ethereum protocol but in the contract’s logic. Proper sequencing. Updating the state before transferring funds prevents reentrancy. Yet, countless contracts over the years have made the mistake of performing external calls before internal updates, making them easy targets.



## The DAO Hack: A Painful Lesson in Blockchain History

The DAO hack in 2016 remains the most famous example of a reentrancy attack.

The DAO (which stood for “Decentralized Autonomous Organization”) was a decentralized community-run venture capital fund running on Ethereum, where people could invest ETH into the DAO, vote on projects, and the contract would automatically fund the ones that passed. At its peak, the DAO held about 12.7 million ETH, worth around $150 million at the time. That made it one of the biggest crowdfunding projects in history.

But hidden inside the DAO’s code was a vulnerability–the same one we just discussed. The contract sent funds before it updated balances.

An attacker noticed this flaw and wrote a contract that repeatedly called the DAO’s “withdraw” function before it could record that the money was gone. In just a few hours, the hacker drained 3.6 million ETH–roughly a third of the entire fund.

The incident was so severe that it led to a controversial hard fork of the Ethereum blockchain, splitting it into two separate versions. One version, or today’s Ethereum, reversed the hack and gave the stolen funds back. The other version, Ethereum Classic, kept the original, unedited history as a symbol of blockchain immutability.



## Why Reentrancy Attacks Matter in Crypto

The reason reentrancy attacks attract so much attention is simple: the losses they cause are real and often devastating. Some of the most famous hacks in cryptocurrency history stem from this specific type of vulnerability.

Nowadays, reentrancy attacks are still one of the top concerns for developers and auditors because they exploit the very nature of composable finance. In DeFi, protocols are built like interconnected Lego blocks. One contract might borrow from another, trade tokens on a third, and use a fourth to calculate prices. This composability fuels innovation, but it also creates shared risk. A single vulnerable contract can be called by countless others, turning one exploit into a contagion across the ecosystem.

The rise of [cross-chain bridges](https://www.nervos.org/knowledge-base/what_are_blockchain_bridges_(explainCKBot)) introduces another dimension of complexity. Bridges connect different blockchains, allowing assets to move across networks. If one side of the bridge contains a reentrancy vulnerability, attackers could trigger recursive transactions that echo across chains, magnifying the damage.

Layer-2 solutions, which aim to increase transaction speed and reduce fees, also face similar risks. Their smart contracts often depend on main-chain interactions, and any mismatch in timing or sequencing can open the door to new exploits.



## How Developers Can Prevent Reentrancy Attacks

Preventing reentrancy attacks begins with understanding how they arise. The most widely accepted smart contract development principle is known as the “checks-effects-interactions” pattern.

This design approach dictates that a contract should first perform all necessary checks (such as verifying balances or permissions), then update its internal state (recording that the withdrawal occurred), and only then interact with external entities (sending tokens or making external calls). By completing internal updates before reaching outside the contract, the system eliminates the opportunity for an attacker to exploit re-entry.

Another common defense is using something called a reentrancy guard. It works like a lock on the function. When the function starts running, the lock activates, blocking any new calls until the function finishes. Once it’s done, the lock opens again.

Security audits and testing are crucial. Many blockchain projects now pay independent experts to check their contracts for vulnerabilities. Tools also exist that automatically scan for patterns that might lead to reentrancy problems.



## Conclusion

A reentrancy attack may sound like a complicated technical issue, but at its core, it’s really about timing and logic. It’s what happens when a smart contract gives out money before checking whether it still should.

The story of reentrancy attacks. and especially the original DAO hack, is more than a warning. It’s a reminder that even in the most advanced technologies, human attention to detail matters most.
