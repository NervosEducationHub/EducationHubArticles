---
title: 'What is a Partially Signed Bitcoin Transaction (PSBT)?'
coverImage: 'images/image1.png'
category:
subtitle: ' A Partially Signed Bitcoin Transaction (PSBT) is a standardized format that facilitates the creation, signing, and transmission of Bitcoin transactions involving multiple parties or devices.'
date: '2024-07-12 T23:00:00.000Z'
author:
- github:explainCKBot
---
Introduced by [Bitcoin Improvement Proposal (BIP) 174](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki), PSBTs enhance interoperability between different wallets and software, making managing complex transactions such as multi-signature setups, [CoinJoin](https://en.bitcoin.it/wiki/CoinJoin), and offline transactions easier.


## What is BIP 174 (Bitcoin Improvement Proposal 174)?

BIP 174 was developed to address the complexities and security issues involved in Bitcoin transactions, especially in scenarios requiring multiple signatures or collaborative inputs. By separating the roles of transaction creation and signing, PSBT ensures that private keys can remain offline, significantly enhancing security for [cold storage solutions](https://www.nervos.org/knowledge-base/what_is_a_cold_wallet_(explainCKBot)) and hardware wallets.

The PSBT format includes several key elements. First, it introduces a standardized way to communicate unsigned or partially signed transactions, making it easier for different parties to contribute to a transaction without compromising security. For example, a PSBT can be created with all necessary transaction details, such as inputs and outputs, but without any signatures. This unsigned transaction can be shared with other parties or devices responsible for adding their signatures.

The process involves multiple roles: the creator, the updater, and the signer. The creator initializes the PSBT with an unsigned transaction, specifying the inputs and outputs. The updater adds additional information, such as UTXOs, redeem scripts, and [BIP 32](https://river.com/learn/terms/b/bip-32/) derivation paths. The signer then provides the necessary signatures for the transaction inputs, ensuring all required data is present and correct before signing.


## How do PSBTs Work in Bitcoin Transactions?

To understand how a PSBT works, it’s best to use a practical example, like one that demonstrates how multiple parties can collaboratively create, sign, and broadcast a Bitcoin transaction without ever exposing their private keys.

Let’s assume that Alice, Bob, and Charlie have decided to create a [multi-signature wallet](https://www.nervos.org/knowledge-base/what_is_a_multisig_wallet_(explainCKBot)) with a 2-of-3 signing requirement. This means that at least two of them must approve any spending transaction from their shared wallet. 

Alice needs to send 1 BTC from her multi-sig wallet to a vendor. She starts by using her Bitcoin wallet to create the transaction. She selects the UTXOs from her multi-sig wallet that will be used as inputs for the transaction and specifies the vendor’s Bitcoin address as the output, with the amount set to 1 BTC.

Next, Alice’s wallet adds additional information to the PSBT. This step involves including any relevant metadata, such as the UTXO details, redeem scripts and BIP 32 derivation paths. Once this is done, the PSBT is ready to be signed by the required parties. 

Alice then sends the PSBT to Bob, as they need at least one more signature to meet the 2-of-3 requirement to send the transaction to the vendor. Bob receives the PSBT and imports it into his Bitcoin wallet, which verifies the transaction details and then prompts him to sign it. After reviewing and confirming the transaction, Bob’s wallet adds his signature to the PSBT.

The partially signed PSBT, now containing Bob’s signature, is sent back to Alice. Alice’s wallet combines the PSBT with Bob’s signature and adds her own signature, meeting the 2-of-3 signing requirement. The PSBT now contains all the necessary signatures to authorize the transaction. With the PSBT fully signed, Alice’s wallet converts it back into a standard Bitcoin transaction format. The fully signed transaction is then broadcast to the Bitcoin network, where it is validated and eventually included in a block on the blockchain.


## Proprietary Data in PSBTs

BIP 174 also specifies how proprietary data can be included in PSBTs, allowing organizations to attach additional information necessary for their internal processes without affecting the overall standardization. This feature is particularly useful for businesses or services needing to include custom metadata in their transactions.

Consider a Bitcoin exchange that needs to include transaction metadata for internal auditing purposes. The exchange might need to track which customer initiated a transaction, the purpose of the transaction, and other relevant information for compliance and record-keeping. 

To do this, an exchange can create a PSBT for a withdrawal request which, along with the standard transaction details, contains proprietary data fields that include the customer’s ID, the withdrawal request ID, and other relevant audit information. These fields are tagged with a proprietary key type (0xFC) specified in BIP 174, which might look like this within the PSBT: 0xFC &lt;length of identifier> &lt;identifier> &lt;subtype> &lt;key data>. For instance, the customer ID might be added as a proprietary key, enabling the exchange to track this specific withdrawal in its internal systems.

The PSBT, with the proprietary data included, is then sent to a cold storage wallet for signing. The cold wallet verifies the transaction details and adds the necessary signatures without needing to understand or process the proprietary data. Once the transaction is fully signed and broadcast, the proprietary data helps the exchange reconcile its internal records with on-chain transactions, ensuring that every withdrawal is correctly logged and traceable within its system.

This ability to include proprietary data ensures that organizations can maintain operational requirements while using the standardized PSBT format, enhancing interoperability and functionality.


## Benefits of PSBTs


### Enhanced Security

One of the primary benefits of PSBTs is the enhancement of security. By separating the transaction creation and signing processes, PSBTs allow private keys to remain offline during the transaction creation phase. This is particularly beneficial when using hardware wallets or cold storage solutions. Users can create a transaction on an internet-connected device and sign it using an offline device, minimizing the risk of exposing private keys to potential online threats​.


### Improved Interoperability

PSBTs standardize how unsigned and partially signed transactions are handled, promoting greater interoperability between Bitcoin wallet software and hardware. This standardization ensures that transactions can be created by one wallet, signed on another, and broadcast from yet another without compatibility issues. This interoperability is crucial for integrating various Bitcoin services and tools, making it easier for users to switch between different wallets and platforms​​.


### Facilitating Complex Transactions

PSBTs simplify the execution of complex transactions, such as multi-signature (multi-sig) transactions and CoinJoin transactions. In a multi-sig setup, where multiple signatures are required to authorize a transaction, PSBTs allow each party to add their signature independently. This streamlines the process and reduces the need for all parties to be present simultaneously. Similarly, in CoinJoin transactions, where multiple users combine their transactions to enhance privacy, PSBTs enable seamless collaboration without exposing individual private keys​.


### Offline Signing and Flexibility

PSBTs support offline signing, which is essential for maintaining high-security standards. Users can create a transaction on an online device and then sign it offline using a hardware wallet. This flexibility also extends to multi-party transactions, where different signers can be in different locations, each signing the transaction independently and securely. This feature makes PSBTs highly adaptable to various use cases, including those involving stringent security requirements​​.


### Better User Experience

PSBTs improve the overall user experience by simplifying the process of creating, signing, and broadcasting transactions. Users can confidently create transactions, knowing that their private keys remain secure. The standardized format of PSBTs also means that users can rely on consistent processes and interfaces across different wallets and services, reducing confusion and potential errors​​.

## Conclusion

Partially Signed Bitcoin Transactions (PSBTs) significantly enhance the management and security of Bitcoin transactions by introducing a standardized format that supports complex transaction types like multi-signature and CoinJoin.

By separating transaction creation and signing, PSBTs ensure that private keys remain offline, boosting security for hardware wallets and cold storage. This standardization also promotes better interoperability across different wallets and platforms, simplifying user experience and reducing compatibility issues. 

Overall, PSBTs are a powerful tool that enhances Bitcoin transactions' flexibility, security, and efficiency.
