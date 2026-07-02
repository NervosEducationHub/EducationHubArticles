---
title: 'How to Protect Your Crypto from Quantum Computing'
coverImage: 'images/image1.png'
category: Popular 
subtitle: 'As quantum computers get closer to cracking standard blockchain security, safeguarding your digital assets requires strict address hygiene and a transition to quantum-safe networks today.'
date: '2026-07-02T16:00:00.000Z'
author: 
- github:nervosnetwork
---

For years, the need to protect cryptocurrency from quantum attack felt like a distant problem. Today, that timeline is shrinking fast. In 2026, Google Quantum AI researchers published a [whitepaper](https://arxiv.org/abs/2603.28846) with updated resource estimates for breaking secp256k1, the elliptic curve used by Bitcoin, Ethereum, and many other blockchains. Their analysis suggests that, on a future cryptographically relevant quantum computer using a superconducting architecture, such an attack could require fewer than half a million physical qubits and execute in minutes, nearly a 20-fold reduction compared with prior estimates.

Google is taking the threat seriously. The company has now set a 2029 timeline for its own migration to post-quantum cryptography, citing recent progress in quantum hardware, error correction, and resource estimates. For blockchains, the risk is especially urgent because public-chain data is permanent. Addresses, signatures, and exposed public keys recorded today may still be attackable years from now if sufficiently powerful quantum computers arrive.

For crypto holders, the question is no longer whether to prepare, but how.

## How to Protect Cryptocurrency from Quantum Attack

### Shor's Algorithm and Your Public Key 

The most direct quantum threat to cryptocurrency comes from Shor’s algorithm. A sufficiently powerful quantum computer could use it to solve the elliptic curve discrete logarithm problem, which is the hard mathematical problem behind [ECDSA](https://www.nervos.org/knowledge-base/understanding_ECDSA_\(explainCKBot\)) and other elliptic-curve signature schemes used by Bitcoin, Ethereum, and many other blockchains.

In practical terms, the risk begins once your public key is visible. If a future quantum computer can derive your private key from your public key, an attacker could create a valid signature and move your funds.

So, the key question is simple: **Has your public key ever appeared on-chain?**

This usually happens in two ways:

* **Reused addresses:** On Bitcoin and similar [UTXO](https://www.nervos.org/knowledge-base/utxo_model_explained) chains, your public key is revealed when you spend your coins. If you later receive funds back to that same address, or leave remaining funds there, those funds are tied to a public key that has already been permanently recorded on-chain.  
* **Legacy P2PK outputs:** Early Pay-to-Public-Key outputs placed the public key directly in the locking script. These outputs expose the public key from the start, even before the funds are spent.

If either case applies, those funds are already in the quantum threat window. Not because a quantum attack is happening today, but because the public-key data a future attacker would need may already be permanently public and easy to archive.

### Harvest Now, Attack Later

The broader cybersecurity world often calls this problem “[Harvest Now, Decrypt Later](https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later)”: adversaries collect protected data today and wait until future quantum computers are powerful enough to break the cryptography protecting it. The Federal Reserve has also [examined](https://www.federalreserve.gov/econres/feds/files/2025093pap.pdf) this risk in the context of distributed ledger networks, using Bitcoin as an illustrative example.

For cryptocurrency holders, however, the wallet risk is better understood as “Harvest Now, Attack Later.” Attackers do not need to decrypt blockchain history. Public blockchains already reveal transaction data by design. The relevant risk is that exposed public keys, signatures, and transaction records can be collected today and used later to compromise wallets once cryptographically relevant quantum computers exist.

This is where blockchain immutability becomes a liability. A public key cannot be removed from history once it appears on-chain. Even if a network later upgrades to post-quantum cryptography, previously exposed keys may remain vulnerable unless users move their funds to quantum-safe addresses before a practical attack becomes possible.

In plain terms: if your public key is already on-chain, the clock has already started.

## How to Quantum Proof Your Crypto: A 5-Step Framework

No crypto custody setup can be made permanently “quantum proof.” Standards will evolve, wallets will change, and each blockchain will move toward post-quantum security on its own timeline.

What you can do today is reduce the exposure that matters most: keep unexposed public keys hidden, move funds away from reused or legacy addresses, and track which networks are actually preparing for post-quantum migration.

Because every blockchain has its own address formats, signature schemes, wallet tooling, and upgrade path, there is no single per-chain checklist that works for everyone. Instead, crypto holders need a general framework they can apply across their entire portfolio.

The goal is simple: identify where your public keys are already exposed, reduce avoidable exposure going forward, and move long-term holdings toward infrastructure that can support post-quantum cryptography.

### Step 1: Review Your Public Key Exposure

Your first task is to map every wallet address you control and determine whether its public key has already appeared on-chain.

For each address, ask three questions.

**Has this address ever sent funds?**   
On Bitcoin and similar UTXO chains, the public key is usually revealed when funds are spent. If you have spent from an address and still hold funds there, that address should be treated as exposed.

**Does the address format expose the public key by default?**   
Some early formats, most notably Bitcoin’s old Pay-to-Public-Key outputs, placed the public key directly in the locking script. These funds are exposed even if they have never moved.

**How large is the balance?**   
A large balance sitting at an exposed address should be treated as a high-priority migration case. The problem is not that a quantum attack is happening today. The problem is that the public-key data a future attacker would need may already be public and permanently archived.

In practice, addresses fall into three broad categories.

* **Already exposed:** The public key has appeared on-chain. This includes legacy P2PK outputs and addresses that have already been used to send funds. The exposure cannot be undone. The remedy is to move the funds.  
* **Not yet exposed:** The public key has not appeared on-chain yet. These addresses are safer for now, but exposure can occur the moment you spend from them.  
* **Post-quantum protected:** Funds are controlled by a wallet or address construction that uses a post-quantum signature scheme on a chain where that scheme is live and usable.

Once you identify exposed or reused addresses, stop using them. Move funds to a fresh address that has never been used to send funds, and avoid sending future deposits back to any address you have already spent from.

### Step 2: Prioritize Assets for Migration

After reviewing your addresses, rank your holdings by urgency.

* **High priority:** Large balances in formats where the public key is already visible on-chain.  
* **Medium priority:** Addresses that have been spent from before and still hold funds.  
* **Lower priority:** Fresh addresses whose public keys have not yet been revealed.

This is only the address-level assessment. You also need to evaluate the chain itself.

Ask:

* Does the chain have a published post-quantum migration plan?  
* Has it implemented any post-quantum signature scheme on mainnet?  
* Does the migration require user action?  
* Has the project communicated any deadlines, deprecation plans, or upgrade paths?

Good address hygiene can reduce your personal exposure, but it cannot solve the full chain-level problem. If a network has no clear path to post-quantum signatures, long-term holders remain dependent on future protocol upgrades, governance decisions, wallet support, and user migration.

### Step 3: Move Long-Term Holdings Toward Quantum-Resistant Infrastructure

Migration happens on two timescales.

In the short term, move large balances out of exposed addresses and into fresh, single-use addresses on the same chain. Treat every address as disposable: receive once, spend once, and do not reuse it afterward.

When moving funds from an unexposed address, keep in mind that spending reveals your public key. During normal conditions, this is not an immediate practical risk because today’s quantum computers cannot break blockchain signatures at scale. But as Q-Day gets closer, long mempool delays may become more relevant, since your public key is visible between broadcast and confirmation.

In the long term, consider whether assets you intend to hold for years should remain only on chains that still depend entirely on quantum-vulnerable signature schemes.

This is where chain selection matters. Some blockchains can support new cryptographic primitives more easily than others. On more rigid chains, adding a new signature scheme may require broad protocol-level coordination. On [crypto-agile chains](https://www.nervos.org/knowledge-base/blockchain_crypto_agility), new signature schemes can be deployed more directly, allowing multiple cryptographic options to coexist.

When evaluating quantum-resistant infrastructure, look for three things.

* **Mainnet deployment:** A post-quantum signature scheme is live on mainnet, not only proposed or tested.  
* **Wallet support:** Users can actually create and manage quantum-resistant addresses with available wallet software.  
* **Active maintenance:** The implementation is documented, maintained, and supported by developers.

[Nervos CKB](https://www.nervos.org/) is one example of this model. CKB’s [RISC-V-based virtual machine](https://docs.nervos.org/docs/ckb-features/vm-built-for-hackers) and [Cell model](https://docs.nervos.org/docs/tech-explanation/cell) allow transaction authorization logic to live in [Lock Scripts](https://docs.nervos.org/docs/tech-explanation/lock-script) rather than being fixed to one signature scheme at the base protocol level. That means new cryptographic primitives can be deployed as on-chain verification code and used by wallets without requiring every user to migrate at once.

CKB already has a [SPHINCS+](https://sphincs.org/) post-quantum Lock Script deployed on-chain, and Quantum Purse provides a self-custodial wallet built around that script. SPHINCS+ has since been standardized by NIST as SLH-DSA in [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final), making it one of the finalized post-quantum digital signature standards.

If you want to explore the quantum readiness of more chains, third-party databases such as [Quantum Tracker](https://quantumtracker.org/) are a great place to start.

### Step 4: Use a Quantum Resistant Wallet for Long-Term Holdings

A chain can support post-quantum cryptography, but users still need wallet software that can actually use it. Full protection requires both: quantum-resistant infrastructure and a wallet that signs transactions with a post-quantum scheme.

When evaluating any wallet that claims quantum resistance, look for:

* **NIST-standardized cryptography:** It should use a finalized post-quantum signature scheme, not an experimental or proprietary algorithm.  
* **Self-custody:** Private keys should remain under your control, ideally on your own device.  
* **Open implementation:** The code should be inspectable, documented, and maintained.  
* **Independent review:** Security audits or external review are important, especially for new wallet software.  
* **Clear upgrade path:** Post-quantum standards will continue to evolve. Wallets should be designed to adapt when better schemes or safer parameter sets become available.

[Quantum Purse](https://www.quantumpurse.org/) is one software example. It is a self-custodial desktop wallet for CKB built around the SPHINCS+ Lock Script. It allows users to manage CKB with post-quantum signatures and has undergone an independent audit by [ScaleBit](https://www.scalebit.xyz/).

Hardware wallets are a more complicated category. Some devices are beginning to add post-quantum protection to firmware verification, secure boot, or device authentication. That is useful, but it does not automatically make Bitcoin or Ethereum transactions quantum-resistant. If the chain itself still requires secp256k1 signatures, the transaction signature remains tied to the chain’s current cryptography.

Cold storage has the same limitation. A hardware wallet can protect your private key from internet attacks, phishing, and malware, but it cannot hide a public key that is already exposed on-chain. If funds sit at an address whose public key is already visible, cold storage alone does not remove the future quantum risk.

***Disclaimer:** The products named here are examples of available tooling, not endorsements or financial recommendations. Always conduct your own due diligence before using any wallet software or hardware. Crypto custody carries inherent risk, and you are responsible for securing your own assets.*

### Step 5: Track Quantum Migration Plans for Every Chain You Use

Quantum migration will not happen everywhere at once. Each chain will move on its own timeline, through its own governance process, with its own wallet requirements and user-action deadlines.

For every major asset you hold, bookmark the official developer blog, governance forum, improvement-proposal repository, and wallet documentation. Check them regularly for:

* **Address deprecation notices:** Warnings that older address types may become unsafe or unsupported.  
* **Signature-scheme upgrade proposals:** Plans to introduce post-quantum signatures or new address formats.  
* **Wallet migration guides:** Instructions for moving funds into safer address types.  
* **User-action deadlines:** Dates by which holders may need to move funds to preserve security or access.

Key timelines to monitor:

* **NIST** has [deprecated](https://csrc.nist.gov/projects/post-quantum-cryptography) quantum-vulnerable legacy algorithms from its standards by 2035, with higher-risk systems migrating earlier in 2030\.  
* **Google** [introduced](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) its internal PQC migration deadline in 2029\.  
* **Bitcoin** has merged [BIP-360](https://bip360.org/) (P2MR) into BIP repository in February 2026, but has no activation timeline. If it passes, migration would be voluntary and opt-in.  
* **Ethereum** has established a dedicated post-quantum research team; Vitalik Buterin and Justin Drake also laid out a multi-year [blueprint](https://x.com/VitalikButerin/status/2027075026378543132) "Lean Ethereum" roadmap targeting 2029 for full post-quantum protection, though long-term cryptographic upgrades are still being researched.

As these varied timelines demonstrate, the transition to quantum resistance will not be a single, synchronized event. Navigating it successfully requires shifting your focus from a one-time panic fix to a posture of continuous adaptation. Cybersecurity experts refer to this long-term strategy as crypto-agility: the adaptability to rapidly switch out deprecated algorithms for quantum-resistant ones as standards evolve. The same principle applies to individual holders: your goal is not a one-time fix, but a posture that lets you adapt as the landscape changes.

Taken together, the strongest protection stack is: cold storage, fresh unexposed addresses, disciplined address hygiene, post-quantum wallets, and long-term exposure to quantum-ready or crypto-agile chains.

The five steps above are how you get there.

## What You Don't Need to Do

You do not need to sell everything before Q-Day. No cryptographically relevant quantum computer capable of breaking ECDSA exists today, and current quantum hardware remains far below the scale required to attack blockchain signatures in practice. The threat is real, but it is not an immediate reason to panic-exit your holdings.

You also do not need to move everything at once. Rushed migrations create their own risks: sending funds to the wrong address, overpaying fees, using the wrong wallet format, or broadcasting transactions during periods of heavy network congestion. Move deliberately, in batches, and prioritize the addresses with the highest exposure first.

## FAQs

### Can quantum computers steal my Bitcoin?

Not today. No cryptographically relevant quantum computer currently exists that can break Bitcoin signatures in practice.

The future risk comes from Shor’s algorithm. If a sufficiently powerful quantum computer can derive a private key from an exposed public key, an attacker could create a valid signature and move the funds. The urgency comes from migration lead times: coordinating upgrades across decentralized networks may take years.

### Is cold storage quantum safe?

Partially.

Cold storage protects your private keys from internet-connected threats such as malware, phishing, and remote compromise. But it does not erase public-key exposure from the blockchain.

If your cold-storage address has already been used to send funds, its public key may be visible on-chain. That means the address could still be vulnerable to a future quantum attack, even if the private key is stored offline.

The safer setup is cold storage plus a fresh, unspent address. For full post-quantum protection, the chain and wallet also need to support quantum-resistant signatures.

### How do I make my crypto quantum proof?

You cannot make crypto permanently “quantum proof” in an absolute sense. Cryptographic standards evolve, and every chain has its own migration path.

What you can do is reduce quantum exposure:

* Avoid address reuse.  
* Move funds away from addresses whose public keys are already exposed.  
* Use fresh addresses for long-term storage.  
* Track the post-quantum migration plans of every chain you hold.  
* For stronger long-term protection, use infrastructure where post-quantum signature schemes are already live and usable.

### What is the safest way to store crypto against quantum risk?

The strongest protection stack is: cold storage \+ a fresh unexposed address \+ a chain that supports quantum-resistant cryptography.

For Bitcoin and Ethereum, post-quantum signatures are not currently available for ordinary mainnet users at the protocol level. The practical approach today is disciplined address hygiene: avoid reuse, move funds out of exposed legacy formats, and track official upgrade proposals.

For chains with mainnet post-quantum support, the protection stack can go further. For example, CKB supports post-quantum signatures through Lock Scripts, and Quantum Purse is a self-custodial wallet built around the SPHINCS+ Lock Script.

When evaluating any wallet or chain, look for NIST-standardized post-quantum cryptography, self-custodial key management, active maintenance, and a clear upgrade path as cryptographic standards evolve.

### Are hardware wallets quantum safe?

Not by themselves.

Hardware wallets are excellent for protecting private keys from conventional attacks, but they do not change the signature scheme required by the blockchain. If Bitcoin or Ethereum still require secp256k1 signatures, then a hardware wallet transaction still uses that cryptography.

Some newer hardware-wallet architectures may be designed to support future post-quantum firmware or device-security upgrades. That is useful, but it does not automatically make Bitcoin or Ethereum holdings quantum-resistant today.

### Should I sell my crypto before Q-Day?

No. Selling purely out of quantum fear is a disproportionate response based on today’s hardware reality.

The more practical response is preparation: improve address hygiene, prioritize exposed addresses, follow migration plans, and move deliberately rather than reactively.

### Should I move my Bitcoin before quantum computers arrive?

Yes, if your Bitcoin is sitting in a reused address or a legacy P2PK output.

In those cases, your public key may already be visible on-chain. Moving funds to a fresh address reduces future exposure, provided you do not reuse that new address afterward.

For Bitcoin holders today, address hygiene is the main practical defense. Proposed post-quantum upgrades such as BIP-360 may offer a longer-term migration path, but Bitcoin does not currently have an activated mainnet post-quantum signature scheme for ordinary users.
