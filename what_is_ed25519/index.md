---
hub: blockchain-cryptography
description: "Learn what Ed25519 does, why its compact keys and deterministic signing matter in blockchains, and how it creates and verifies digital signatures."
title: "What Is Ed25519?"
coverImage: 'images/image1.png'
category: Digital Signatures & Elliptic Curves, cryptography, digital signatures, ed25519
subtitle: 'Ed25519 is a fast, deterministic digital signature algorithm with compact keys, used in systems like OpenSSH and blockchains like Solana.'
date: '2026-11-25T16:00:00.000Z'
author: 
- github:explainCKBot
---

Ed25519 is a [digital signature](https://www.nervos.org/knowledge-base/what_is_a_digital_signature_in_blockchain?utm_source=chatgpt.com) algorithm that lets someone sign data with a private key and lets others check the signature with the matching public key. It helps establish that the signed data came from the holder of that key and has not been altered.

Ed25519 belongs to the Edwards-curve Digital Signature Algorithm (EdDSA) family and operates on the twisted Edwards curve edwards25519. Today, Ed25519 is used in systems such as OpenSSH for user and server authentication, and in blockchains such as Solana for authorizing transactions. Its appeal comes from a combination of fast signing and verification, compact keys and signatures, and a signing process that avoids needing fresh randomness for every signature.

## What does an Ed25519 signature do?

Imagine Alice wants to send Bob 10 tokens on a blockchain that uses Ed25519. Her wallet prepares the transaction details and signs the data required by that blockchain’s rules.

Two keys serve different purposes:

- The private key lets Alice’s wallet create the signature. It must stay secret.
- The public key lets other participants check the signature. It can be shared.

The signature binds Alice’s signing key to the particular data being signed, known as the message, which can be transaction data, a document, or another sequence of bytes.

If someone changes a covered detail, such as the amount or recipient, the original signature will no longer verify against the altered data. This lets the network check Alice’s signature without learning her private key. 

Note that digital signatures provide authenticity and integrity. They do not hide the transaction’s content, which remains visible on-chain. Hiding data (confidentiality) requires a separate encryption.

## Why is Ed25519 used?

Ed25519 brings together three useful properties that make it well suited for high-throughput networks and everyday software.

### Fast signing and verification

Ed25519 was designed to make both creating and checking signatures efficient. In a blockchain network, a single transaction must be verified by many nodes. Faster verification directly reduces the computational load across the network.

### Small public keys and signatures

An Ed25519 public key is 32 bytes, and a signature is 64 bytes. Together, they add 96 bytes of fixed overhead alongside the message being checked. These compact, fixed sizes reduce storage and bandwidth costs. The signature remains 64 bytes regardless of how large the message is, though the full message must still be available and processed during verification.

### Deterministic signing

Standard Ed25519 signing is deterministic, meaning signing the same exact message with the same private key produces the same signature. 

Instead of relying on a random number generator to create a fresh per-message secret [nonce](https://www.nervos.org/knowledge-base/what_are_cryptographic_nonces?utm_source=chatgpt.com) per signature, Ed25519 derives that nonce from private information and the message itself. This removes the need to generate fresh randomness per signature, while keeping the nonce unpredictable to outsiders because the calculation depends on private information.

### How does Ed25519 work?

The process has three stages: creating a key pair, signing a message, and verifying the signature.

### 1. Create the key pair

Key generation starts with a 32-byte secret seed, generated using cryptographically secure randomness. Ed25519 processes it with the SHA-512 cryptographic hash function to derive private values used for signing.

It then uses elliptic-curve arithmetic to calculate the public key from one of those secret values. Calculating the public key is efficient, whereas recovering the secret value from the public key is computationally impractical with conventional computers.

The public key can therefore be distributed freely while the seed and derived signing secrets remain private. Some software stores additional information alongside the seed, so a saved private-key file can be larger than 32 bytes. 

### 2. Sign the message

The signer derives a message-specific secret nonce from the message and private material. It uses that nonce to calculate a public value that becomes the first part of the signature.

It then hashes that public value together with the public key and the message. The result ties these inputs together. The signer combines it with the nonce and the long-term signing secret to produce the second part. These two parts form the 64-byte signature. The signing secrets are not included. 

For Alice’s transfer, this process ties her signature to the transaction details covered by the blockchain’s signing rules.

### 3. Verify the signature

A verifier needs three public inputs: the message, the public key, and the signature.

The software checks that the inputs have valid encodings and values, then tests the mathematical relationship established during signing. Elliptic-curve arithmetic lets it check that relationship using public values, without reconstructing the secret ones. 

If someone changes Alice’s signed transfer from 10 tokens to 100, the verifier uses that altered message in its calculations. The original signature no longer passes the check.

## Frequently asked questions

### Does Ed25519 encrypt the message?

No. Ed25519 only provides digital signatures to verify who authorized the message and confirm it was not altered. It does not hide the contents. Applications that need confidentiality must use a separate encryption algorithm.

### Are Ed25519 and X25519 interchangeable?

No. Ed25519 is used for digital signatures (authenticity and integrity), while [X25519](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/x25519/) is used for [Diffie-Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) key exchange, allowing two parties to agree on a shared secret for encrypting communications.

### How does Ed25519 differ from ECDSA?

Both are digital signature algorithms, but they differ in two practical ways:

- **Fixed package vs. flexible framework:** Ed25519 strictly mandates the edwards25519 curve and SHA-512. [ECDSA](https://www.nervos.org/knowledge-base/understanding_ecdsa) is a general framework where developers must separately choose a curve (such as [secp256k1](https://www.nervos.org/knowledge-base/secp256k1_a_key_algorithm)) and a hash function.
- **Deterministic vs. random nonces:** Ed25519 deterministically derives the signing nonce from the private prefix and message. Standard ECDSA requires a fresh random nonce for every signature; if the random number generator is flawed or predictable, the private key can be recovered.
