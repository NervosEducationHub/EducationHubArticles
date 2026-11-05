---
title: 'Decentralized Identifiers (DIDs): ENS & .bit Compared'
coverImage: 'images/image1.png'
category: DID
subtitle: 'Decentralized identifiers (DIDs) are a revolutionary approach to digital identity management within blockchain technology.'
date: '2023-08-21T16:00:00.000Z'
author: 
- github:explainCKBot
---

DIDs enable decentralized applications (dApps) and services by providing unique, user-friendly, and secure identifiers. This article will explore two prominent DID solutions built on different blockchain platforms: the [Ethereum Name Service](https://ens.domains) (ENS), built on Ethereum, and [.bit](https://d.id/id-protocol/bit), built on Nervos’ Layer 1, [Common Knowledge Base](https://www.nervos.org/knowledge-base/nervos_overview_of_a_layered_blockchain) (CKB).


## What Are Decentralized Identifiers? The Foundation of Self-Sovereign Identity

Decentralized identifiers (DIDs) are a type of digital identifier that allows individuals, organizations, and even devices to create and manage their own unique, self-sovereign identities. Unlike traditional identifiers, such as usernames, email addresses, or social security numbers, DIDs are not controlled by a centralized authority or subject to a single point of failure. Instead, DIDs are generated, owned, and managed by the identity holder, who can use them to interact securely and privately with other parties in the digital world.

DIDs leverage the power of blockchain technology to create a decentralized, tamper-resistant, and highly secure infrastructure for identity management. A DID is a unique identifier registered on a blockchain or other [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger). It can be independently verified and updated by the identity holder without the need for an intermediary. This decentralized approach offers numerous benefits over centralized identity management systems, including secure logins, privacy, and user control.


### Ethereum Name Service (ENS)

[ENS](https://ens.domains) is a decentralized naming system built on the Ethereum blockchain that transforms complex machine-readable identifiers into more easily understandable human-readable names. By mapping names like 'alice.eth' to Ethereum addresses or other machine-readable data, ENS simplifies sharing and using blockchain-based identities.

The ENS architecture consists of two main components: the registry and resolvers. The registry is a smart contract that maintains a list of all domains and subdomains, storing information about their owner, resolver, and time-to-live for caching purposes. The resolver is responsible for translating names into addresses or other data, with different resolvers supporting various types of records.

ENS domains can be registered and managed through supported wallets or dedicated applications, providing users with a user-friendly interface for managing their digital identities. ENS also supports reverse resolution, allowing metadata to be associated with Ethereum addresses.


### .bit on Nervos CKB

[.bit](https://d.id/id-protocol/bit) is a cross-chain decentralized account system built on Nervos CKB, a Layer 1 blockchain. This system provides a unique naming system with a .bit suffix that can be used in various scenarios, such as cryptocurrency transfers, domain name resolution, and identity authentication. .bit accounts can be registered and managed with any public chain address or even an email.

The .bit system comprises five main components: core protocol, keeper, resolution service, client SDK, and Dapp UI. The core protocol consists of a series of smart contracts deployed on Nervos CKB that define the operational standards for .bit accounts. The keeper is a set of off-chain programs responsible for triggering transactions that conform to the core protocol. The resolution service, built on top of Nervos CKB transactions, provides account resolution services to the public. The client SDK simplifies the integration of .bit-related applications, while the Dapp UI allows users to interact with the system through various interfaces.

One unique feature of the .bit system is its broad compatibility, allowing users to manage their assets on Nervos CKB using private keys from other public chains like Bitcoin or Ethereum. This is made possible through the flexible signature algorithm support on the Nervos CKB platform.


## Differences Between ENS and .bit

ENS and .bit are both decentralized naming services that harness the power of blockchain technology to create a more user-centric internet. Despite their shared goal of mapping human-readable names to machine-readable identifiers, these two systems have a number of key differences.

First and foremost, ENS is built on the Ethereum blockchain, while .bit relies on Nervos CKB, a Layer 1 blockchain. This difference in underlying technology is important because it determines each system's compatibility and use cases. ENS is primarily tailored for Ethereum addresses and related resources but also offers support for other cryptocurrency addresses and content hashes. In contrast, .bit provides broader compatibility by allowing users to register and manage their accounts using any public chain address or even an email address.

Another notable difference is the domain suffix used by each system. ENS domains carry the '.eth' suffix, such as 'alice.eth', whereas .bit domains use the '.bit' suffix, like 'alice.bit'. This distinction is important for users to recognize which blockchain-based naming system they are interacting with.

The architecture of the two systems also differs. ENS comprises two main components: the registry and resolvers. The registry is essentially a smart contract that keeps track of all domains and subdomains, recording information about the owner, resolver, and caching time-to-live for each domain. Resolvers, on the other hand, are responsible for translating names into addresses. In comparison, .bit features five primary components: Core Protocol, Keeper, Resolution Service, Client SDK, and dApp UI. The Core Protocol includes a series of [Lock Scripts and Type Scripts](https://docs.nervos.org/docs/script/intro-to-script) deployed on Nervos CKB, which establish .bit accounts and set operational standards.

Furthermore, the way account ownership and management work in ENS and .bit is distinct. In ENS, a domain owner can be an external account (a user) or a smart contract. However, .bit permits the owner or manager of a domain to be any public chain private key or even an email address, offering greater flexibility to users.

Finally, the resolver mechanisms used by ENS and .bit are different. ENS employs a two-step process to resolve a name. Initially, it queries the registry to identify the responsible resolver and then queries that resolver for the answer. On the other hand, .bit utilizes a resolution service that resolves the global state of .bit based on transactions on Nervos CKB, providing an account resolution service to the public.


## Decentralized Identifiers (DIDs) vs. Domain Name System (DNS)

Decentralized Identifiers (DIDs) and the [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) (DNS) share a common goal: to map human-readable names to machine-readable identifiers. However, they differ significantly in their architecture, control mechanisms, and underlying technology.

When it comes to architecture, DNS is a centralized, hierarchical system overseen by trusted authorities like domain registrars and the [Internet Corporation for Assigned Names and Numbers](https://www.icann.org) (ICANN). In contrast, DIDs are built on decentralized, trustless architectures that harness blockchain technology. Ethereum Name Service (ENS) and .bit are just two examples of DIDs.

Control and ownership are other areas where these two systems diverge. With DNS, third parties like domain registrars often manage the control and ownership of domain names, which can sometimes lead to issues such as censorship, domain seizures, or disputes. DIDs, however, enable users to exercise direct control over their identifiers, which minimizes reliance on centralized authorities and grants users greater autonomy.

Security and trust models are also distinct between DNS and DIDs. DNS depends on certificate authorities and other centralized entities to establish secure connections, while DIDs leverage the inherent security of blockchain technology to create a trustless environment. This allows for secure, tamper-proof verification of digital identities without the need for central trusted parties.

Another notable difference is cross-platform compatibility. DIDs offer interoperability and compatibility across a variety of platforms and applications, making it possible for users to manage their identifiers across multiple blockchains and decentralized applications. In contrast, DNS is primarily concerned with mapping domain names to IP addresses.

User privacy and control are at the heart of the distinction between DIDs and DNS. DIDs give users more control over their digital identities, allowing them to manage their information and privacy without depending on third-party services. On the other hand, DNS relies on centralized services, which may not always prioritize user privacy and control to the same extent.


## Conclusion

Decentralized Identifiers represent a significant shift in how digital identities and the internet function. By leveraging the power of blockchain technology, DIDs offer enhanced security, privacy, and user control compared to the traditional DNS model. With solutions like ENS and .bit, users can benefit from decentralized naming systems that put them in the driver's seat, enabling greater autonomy and flexibility in managing their digital identities.
