---
title: 'What Is Q-Day, and Can Crypto Survive It?'
coverImage: 'images/image1.png'
category: Popular 
subtitle: "Can crypto survive Q-Day? Learn what Q-Day means for Bitcoin, when quantum computers could become a threat, and how blockchains are preparing."
date: '2026-07-13T16:00:00.000Z'
author: 
- github:nervosnetwork
---

Q-Day is the moment a quantum computer becomes powerful enough to break the public-key cryptography used across modern digital systems.

For cryptocurrency, that means something very specific: a future quantum computer could derive a private key from an exposed public key, forge a valid transaction signature, and move funds without the owner’s consent.

That is not possible today. No cryptographically relevant quantum computer, or CRQC, currently exists. But the risk matters now because blockchain ledgers are public and permanent. Once a public key appears on-chain, it remains visible forever. A future attacker does not need to decrypt the blockchain. They can collect exposed public keys now and attempt key recovery later.

This article explains what Q-Day means for cryptocurrency, when quantum computers could threaten Bitcoin, which coins are most exposed, how Bitcoin and Ethereum are preparing, and why crypto-agile networks such as CKB are built differently.

## What Does Q-Day Mean for Cryptocurrency?

Q-Day is the hypothetical point when a cryptographically relevant quantum computer can break widely used public-key cryptography.

That single capability lets an attacker forge transaction signatures and spend other people's cryptocurrency, undermining the trust model every blockchain depends on.

The vulnerability lies in how blockchains prove ownership. Nearly every major chain authorizes transactions using public-key cryptography: a user holds a private key, the network verifies a corresponding public key, and a digital signature ties the two together. Security rests on one assumption: that no one can derive the private key from the public key. A sufficiently powerful quantum computer running Shor's algorithm would break that assumption.

## Why Does Q-Day Matter for Bitcoin?

Q-Day matters for Bitcoin because Bitcoin’s transaction authorization depends on [secp256k1](https://www.nervos.org/knowledge-base/secp256k1_a_key%20algorithm_\(explainCKBot\)), the elliptic curve used by Bitcoin’s signature schemes.

Older Bitcoin outputs use [ECDSA](https://www.nervos.org/knowledge-base/understanding_ECDSA_\(explainCKBot\)) over secp256k1. Taproot uses [Schnorr](https://www.nervos.org/knowledge-base/schnorr_signatures_\(explainCKBot\)) signatures over secp256k1. These are different signature schemes, but both rely on the same underlying hardness of the elliptic-curve discrete logarithm.

Classical computers cannot solve that problem at Bitcoin’s key size in any practical amount of time, but a sufficiently powerful quantum computer could.

That is why the real Q-Day Bitcoin risk is public-key exposure. If a Bitcoin public key is visible on-chain, a future CRQC could theoretically derive the private key and produce a valid signature.

Fresh hash-protected outputs are safer because the public key is hidden behind a hash until the coins are spent. But once the public key is revealed, the clock exposure becomes permanent, and the clock starts ticking.

## Estimating the Quantum Computing Timeline

Pinning down an exact Q-Day date is impossible because it depends on hardware breakthroughs no one can schedule.

The better way to think about the quantum computing timeline for cryptocurrency is as a risk window, not a countdown.

Several signals have made the timeline feel more urgent. NIST has published transition guidance ([NIST IR 8547](https://csrc.nist.gov/pubs/ir/8547/ipd)) for moving from quantum-vulnerable public-key cryptography to post-quantum standards. [Cloudflare](https://blog.cloudflare.com/post-quantum-roadmap/https://blog.cloudflare.com/post-quantum-roadmap/) now targets 2029 for full post-quantum security, including post-quantum authentication. IBM [plans](https://www.ibm.com/quantum/blog/large-scale-ftqc) its first fault-tolerant Starling system for 2029, with 200 logical qubits. Google Quantum AI’s 2026 work [estimated](https://arxiv.org/abs/2603.28846) that attacking a 256-bit elliptic-curve discrete-logarithm problem could require fewer than 500,000 physical qubits under specific assumptions about superconducting hardware.

These are important signals, but they are not the same thing as saying Bitcoin will be broken in 2029\.

IBM’s 2029 system, for example, would still be far below the logical-qubit scale described in Google’s estimate of the cryptocurrency attack. NIST’s 2030 and 2035 dates are migration deadlines, not Q-Day predictions. Cloudflare’s 2029 target is an internal security migration goal, not a forecast that a CRQC will exist by then.

The careful conclusion is this:

The earliest plausible risk window has moved toward the late 2020s and early 2030s, but the true date is unknowable. Some forecasts still place the serious risk later, deep into the 2030s or beyond.

The exact date matters less than the migration problem. Bitcoin and other blockchains need to upgrade before Q-Day, not after it.

### Why Predictions for a Quantum Break Vary

Q-Day predictions vary because they depend on hard engineering problems that no one can schedule precisely.

A CRQC needs enough logical [qubits](https://en.wikipedia.org/wiki/Qubit), low enough error rates, deep enough circuits, fast enough error correction, and reliable enough operation to finish a cryptographic attack before errors overwhelm the computation.

That is very different from simply having a large number of physical qubits.

Physical qubits are noisy hardware units. Logical qubits are error-corrected qubits built from many physical qubits. Cryptographic attacks need logical qubits, not just impressive raw qubit counts.

This is why public forecasts differ by years or even decades. Some researchers focus on rapid algorithmic progress. Others focus on the difficulty of scaling fault-tolerant hardware.

A few things, however, can be said with confidence:

**The attack is still theoretical.** No cryptographically relevant quantum computer now exists. Today's leading processors—from IBM’s [Heron](https://quantum.cloud.ibm.com/docs/en/guides/processor-types#heron) to QuEra’s [Libra](https://www.quera.com/press-releases/quera-announces-2028-fault-tolerant-quantum-computer-and-expanded-multi-year-strategic-collaboration-with-aws)—operate in the range of hundreds to low thousands of physical qubits, with error rates too high to run Shor's algorithm at scale.

**Recent gains came from software.** The sharp 2025–2026 drops in estimates of how many qubits an attack would require stemmed from improved algorithms and error correction, not from processors with more qubits. [Craig Gidney](https://arxiv.org/abs/2505.15917) cut the estimate for RSA-2048 from 20 million qubits to under one million, and Google’s March 2026 [paper](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) put the curve behind Bitcoin and Ethereum at fewer than 500,000 physical qubits. That makes the timeline volatile: a single algorithmic insight can erase years of assumed safety. At the same time, the remaining hardware engineering has historically moved more slowly than optimists predict.

**The forecast varies with the forecaster.** As the Nervos’ analysis of [crypto agility](https://www.nervos.org/knowledge-base/blockchain_crypto_agility) notes, quantum hardware companies have reasons to emphasize rapid progress, while some blockchain communities have reasons to downplay it, so public estimates range from Blockstream CEO Adam Back’s [claim](https://x.com/adam3us/status/1989721899991986374?ref_src=twsrc%5Etfw) of “20–40 years away” to Justin Drake's [coin-flip odds](https://x.com/drakefjustin/status/2061793725299224676?ref=bankless.ghost.io) by 2032\.

The bottom line: the *date* is unknowable, but the *direction* is not. Every major revision has moved Q-Day closer, never further away.

## What Does Q-Day Actually Break?

Q-Day primarily threatens asymmetric cryptography, also known as public-key cryptography. In blockchain systems, that usually means the signature schemes used to authorize transactions.

For Bitcoin, the vulnerable primitives are ECDSA and Schnorr signatures over the secp256k1 elliptic curve. For Ethereum, standard Externally Owned Accounts also rely on ECDSA over secp256k1. Ethereum has additional quantum-vulnerable components, including consensus-layer BLS signatures and KZG commitments, both of which rely on elliptic-curve pairings.

Hash functions are different. Shor’s algorithm does not break [SHA-256](https://www.nervos.org/knowledge-base/Unbreakable_SHA256_Why_Even_Quantum_Computers_Cannot_Do_It_\(explainCKBot\)), nor does it break Bitcoin’s proof-of-work in the same direct way. [Grover’s algorithm](https://en.wikipedia.org/wiki/Grover%27s_algorithm) can theoretically speed up brute-force search, but that is not the same kind of structural break that Shor’s algorithm creates for public-key cryptography.

The weak point is transaction authorization. If a public key is exposed and the signature scheme behind it is quantum-vulnerable, a cryptographically relevant quantum computer could derive the private key and turn that exposed key into spendable funds.

## How Long Do Cryptographic Migrations Take?

Assessing the quantum threat means watching not only the hardware timeline but how long cryptographic migrations actually take.

Cryptographic migrations are among the slowest transitions in computing history, spanning decades or more even under centralized control. Historically, the migration from the [Data Encryption Standard](https://en.wikipedia.org/wiki/Data_Encryption_Standard) (DES) to the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (AES) is an example. DES became a U.S. federal standard in [1977](https://csrc.nist.gov/pubs/fips/46/final); its 56-bit key was shown to be weak by the [late 1990s](https://grokipedia.com/page/56_bit_encryption); NIST ran the [replacement](https://www.nist.gov/news-events/news/1999/08/nist-announces-encryption-standard-finalists) competition from 1997 and standardized AES in [2001](https://csrc.nist.gov/pubs/fips/197/final). Yet DES was not formally withdrawn until [2005](https://www.nist.gov/news-events/news/2005/06/nist-withdraws-outdated-data-encryption-standard), and its hardened variant [3DES](https://en.wikipedia.org/wiki/Triple_DES) lingered well beyond. This replacement, from "known to be at risk" to "fully retired," took over two decades, with a central authority in charge.

The change above is far simpler than swapping a blockchain's signature scheme. For a decentralized blockchain with no central authority, no forced upgrades, and billions of dollars in legacy addresses, the cryptographic transition becomes a multi-year, possibly multi-decade, coordination problem. This is why the timeline debate matters: the migration must finish *before* Q-Day, not begin then.

## The Upgrade Challenge for Bitcoin and Ethereum

### Bitcoin: No Easy Path

Bitcoin's greatest strength—its resistance to change—may be its greatest vulnerability against Q-Day. The SegWit and Taproot upgrades each took years to activate. Both for far simpler changes than swapping the network's cryptography—a more complex and existential leap.

Bitcoin's post-quantum upgrade breaks into two distinct objectives: minimizing on-chain public key exposure and eventually replacing ECDSA.

The first is already underway. Bitcoin’s most concrete step so far, [BIP-360](https://bip360.org/), introduces a new output type, Pay-to-Merkle-Root (P2MR). It acts like Taproot but removes the quantum-vulnerable key-path spend, preventing the public key from being exposed directly in the output. This shrinks the attack surface and buys time against long-exposure attacks, but does not make the network fully quantum-resistant on its own.

The second objective, signature scheme replacement, is where the difficulty really lies. It faces two unresolved hurdles: deciding which PQ algorithm to choose and how to execute the migration.

When it comes to choosing the right PQ algorithm, there is no perfect plug-and-play successor to ECDSA, only an array of trade-offs:



<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Types</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Pros</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Cons</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Hash-based</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Conservative security</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Large and slow</td>
      <td style="border: 1px solid #ccc; padding: 8px;">SPHINCS+</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Stateful hash-based</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Strong</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Complex state management</td>
      <td style="border: 1px solid #ccc; padding: 8px;">XMSS, LMS</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Lattice-based</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Fast verification, moderate key sizes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Large signatures, newer assumptions</td>
      <td style="border: 1px solid #ccc; padding: 8px;">ML-DSA, Falcon</td>
    </tr>
  </tbody>
</table>



Even the lightest post-quantum signature is at least five times larger than Bitcoin's current signature, risking severe network congestion without a contentious block-size increase or complex aggregation.

When it comes to choosing the migration framework, three main contenders have been proposed so far:


<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.9em; border: 1px solid #ddd;">
  <thead>
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Framework</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Mechanism</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Fork required</th>
      <th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Key trade-off</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Commit-Delay-Reveal (CDR)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Staged, opt-in migration to a post-quantum key</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Two soft forks</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Voluntary and non-disruptive, but only protects coins whose keys are not already exposed</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Hourglass</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Rate-limits how many vulnerable coins can be spent per block</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Two soft forks</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Softens the market shock of a breach, but does not stop theft of exposed coins</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">QRAMP</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Mandatory deadline after which classically-secured coins become unspendable</td>
      <td style="border: 1px solid #ccc; padding: 8px;">One hard fork</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Forces full migration, but effectively burns unmigrated funds and violates property rights</td>
    </tr>
  </tbody>
</table>



Beyond migration execution, activation itself adds another layer: deploying any change depends on social alignment. In short, Bitcoin has a direction but no settled plan. There is early progress on limiting exposure, yet no consensus on which post-quantum algorithm to adopt, which migration framework to follow, or how to activate it.

### Ethereum: A Clearer But Unfinished Plan

Ethereum faces the same vulnerability as ECDSA on secp256k1, but has more room to maneuver and has written post-quantum preparation into its roadmap [Lean Ethereum](https://leanroadmap.org/).

Ethereum's exposure spans four areas: account signatures (ECDSA), consensus signatures (the BLS scheme that validators use to vote), the KZG commitments behind its data scaling, and the zero-knowledge proof systems used by rollups.

For accounts, the strategy centers on “signature agility*”*: letting each account choose its own signature verification method, so users can switch to quantum-safe signatures without waiting for a protocol-wide cutover.

This runs through account abstraction in two stages.

The first, [EIP-7702](https://eip7702.io/), shipped with the Pectra upgrade in May 2025, allows Externally Owned Accounts (EOAs) to behave as smart contracts temporarily during the transaction. This is a stepping stone that still leaves the account's ECDSA key valid, so the quantum exposure remains.

The second, [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141), introduces *native* account abstraction. Today a transaction is a single bundled action: one ECDSA signature proves who you are, pays the gas, and triggers the action all at once. EIP-8141 breaks that into distinct calls named “frames”. Frames are ordered in a sequence: verification frame runs first, execution frames follow.The key change is that the verification frame runs the account's own code to verify transactions, instead of the protocol checking a single fixed signature. Because each account now defines how it authenticates, users can adopt quantum-safe signatures before the full protocol transition is complete.

What matters is letting accounts use different signature schemes and allowing multiple schemes to coexist. This is, in NIST's terms, crypto-agility, the real foundation of post-quantum readiness.

The rest of the stack is being rebuilt in parallel. Validator signatures are set to move to leanXMSS, paired with a minimal zkVM (leanVM) that compresses the larger signatures to ensure the network stays fast. The data-availability and proof layers move on to the same NIST-standardized foundations (ML-KEM, ML-DSA, SLH-DSA). Ethereum’s road to quantum resistance is tracked publicly at [Post-QuantumEthereum](https://pq.ethereum.org/).

## Why Crypto Agility Matters

The hardest part of Q-Day is not finding a post-quantum algorithm.

NIST has already standardized post-quantum schemes, including ML-KEM for key establishment, ML-DSA for signatures, and SLH-DSA, the standardized version of SPHINCS+, for hash-based signatures.

The harder problem is whether a blockchain can cleanly switch cryptography.

Most blockchains have signature verification built into the protocol through opcodes, precompiles, native account rules, or fixed transaction formats. That makes cryptographic migration a complex and often contentious network-wide coordination event. The network has to coordinate around new protocol rules before users can rely on the new scheme.

Crypto agility means something different.

A crypto-agile blockchain can support new cryptographic primitives without redesigning the base protocol every time the cryptographic landscape changes.

That matters because Q-Day is not the only uncertainty. Post-quantum standards can also evolve. Algorithms can be weakened, deprecated, optimized, or replaced. A chain that hardcodes one “quantum-safe” answer may still face another disruptive migration later.

The more durable property is the ability to adapt.

## How CKB Approaches Q-Day Differently

Nervos CKB is one of the clearest examples of crypto agility in a live blockchain.

Most blockchains treat signature verification as part of the base protocol. The network has a defined set of cryptographic primitives it understands, and if developers want to add a new one, the chain usually needs a coordinated protocol upgrade. That is why post-quantum migration is so difficult for rigid chains: changing the cryptography means changing the rules everyone runs.

CKB takes a different approach. Instead of hardcoding a single signature scheme into the protocol, transaction authorization is handled by programmable [Lock Scripts](https://docs.nervos.org/docs/tech-explanation/lock-script). These scripts run inside [CKB-VM](https://docs.nervos.org/docs/ckb-fundamentals/ckb-vm), a RISC-V virtual machine that executes on-chain validation logic. In practice, that means an ECDSA verifier, a Schnorr verifier, a multisig policy, or a post-quantum verifier can all exist as different pieces of code on the same chain.

That is what makes CKB special. The base protocol does not need to know in advance which cryptographic scheme a wallet wants to use. It only needs to run the script and verify that the script returns the correct result. New cryptographic primitives can therefore be deployed as on-chain code, and users can create Cells controlled by those new Lock Scripts whenever they are ready.

For Q-Day, this completely changes the migration problem. On a rigid chain, adopting post-quantum cryptography is a network-wide coordination event. On CKB, it can begin as a script deployment. Developers can add new verification logic, wallets can integrate it, and users can migrate gradually without waiting for every participant in the ecosystem to move at the same time.

CKB already [demonstrates](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance) this with its [SPHINCS+](https://sphincs.org/) Lock Script, which was implemented in 2023, audited by ScaleBit, and deployed on mainnet beginning in 2025\. The script supports all 12 SPHINCS+ parameter sets, giving users a live path to post-quantum transaction authorization today.

This is the practical difference between being quantum-resistant at one moment and being crypto-agile over the long run. A quantum-resistant chain may support one post-quantum scheme. A crypto-agile chain can keep adding new schemes as the cryptographic landscape changes.

That matters because post-quantum cryptography will not stand still. Standards will evolve. Algorithms may be optimized, weakened, deprecated, or replaced. CKB’s advantage is that it does not have to make a single permanent bet. It can adapt as the field changes, without turning every cryptographic upgrade into a base-layer crisis.

## FAQs

### What is Q-Day?

Q-Day is the hypothetical moment when a cryptographically relevant quantum computer becomes powerful enough to break the public-key cryptography securing modern digital systems, including the ECDSA signatures that protect most cryptocurrency wallets. It is a capability threshold, not a fixed date.

### Is Q-Day a Real Threat?

Yes, both government agencies (like NIST, NSA) and major technology corporations (like Google, Cloudflare, and IBM) acknowledge Q-Day as a legitimate security threat. They all have set concrete post-quantum migration deadlines and are actively developing post-quantum cryptographic standards to preempt it.

The "harvest now, decrypt later" (HNDL) strategy adds urgency: adversaries are collecting exposed data and public keys today to attack once the hardware matures. For all public blockchains, whose ledgers are permanent and openly readable, early preparation is a rational response.

### How Close Are We To Q-Day?

No quantum computer can perform this attack today. Current machines lack sufficient qubits, and their error rates remain far too high. But the estimated resources required for such attacks are falling fast. Google’s Craig Gidney cut the estimated cost of breaking RSA-2048 from roughly 20 million physical qubits in 2019 to under one million in 2025\. A 2026 paper estimated that breaking the elliptic-curve cryptography behind Bitcoin and Ethereum would require fewer than 500,000 physical qubits. The direction of travel is clear: the bar quantum computers need to clear keeps getting lower.

### When Will Quantum Computers Break Bitcoin?

No one knows the exact year, because the machine capable of doing it does not yet exist. But the migration window is already taking shape. NIST sets 2030–2035 as the deadline to move away from the cryptography Bitcoin relies on today. Justin Drake, an Ethereum Foundation researcher who has studied quantum risk, estimates about a 10% chance of a cryptographically relevant quantum computer by 2030 and roughly a 50% chance by 2032\. The exact date is uncertain, but the trend is not: estimates have been moving earlier.

### When Will Quantum Computers Break Encryption?

For the public-key encryption and signatures that rely on RSA and elliptic curves, credible institutional estimates point to the 2029–2035 window, which is why NIST set 2030 for deprecation and 2035 for full disallowance. Symmetric encryption, such as AES-256, and hash functions like SHA-256 are more resilient and are not expected to be broken outright. In short, research believes that asymmetric encryption (like RSA and ECDSA) is likely to fall within the next decade.

### Will Bitcoin survive Q-Day?

Bitcoin can survive Q-Day, but only if the network coordinates a hard fork to implement PQC before a quantum computer becomes operational. Bitcoin's proof-of-work and hash-based protections are largely resistant to quantum attack, but its ECDSA signatures are not.

Bitcoin’s survival depends on the community agreeing on a post-quantum signature scheme and migrating funds before a cryptographically relevant quantum computer arrives. Coins in lost or inactive wallets with exposed public keys may stay permanently vulnerable.

---

This article is part of the Nervos knowledge base. For related background, see [*Quantum Resistance in Blockchains*](https://www.nervos.org/knowledge-base/quantum_resistance)*, [Blockchain Crypto Agility: CKB's Key to Quantum Safety](https://www.nervos.org/knowledge-base/blockchain_crypto_agility), and [How Bitcoin's Path to Quantum-Resistance Could Look](https://www.nervos.org/knowledge-base/how_bitcoins_path_to_quantum_resistance_could_look_like).* 
