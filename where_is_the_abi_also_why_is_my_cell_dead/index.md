---
title: 'Where Is the ABI? Also, Why Is My Cell Dead?'
coverImage: 'images/cover.png'
category: Popular
subtitle: 'A CKBuilder reflection on Ethereum instincts, CKB Cells, Type Scripts, witnesses, and proof-bound state transitions.'
date: '2026-07-10T00:00:00.000Z'
author:
- github:wamimi
---

## Where Is the ABI? Also, Why Is My Cell Dead?

A notes app should not send you into an identity crisis.

You type something. You click save. Somewhere, some database politely updates itself. If you come from Ethereum, maybe that database is contract storage. You deploy a contract, verify it, grab the ABI, connect it to a frontend with `ethers` or `wagmi`, call `saveNote()`, and move on with your life.

CKB did not let me move on with my life.

I came in looking for the familiar object: the contract. The thing with an address, an ABI, callable functions, internal storage, and events my frontend could listen to. Instead, CKB kept pointing at a Cell. Then at a transaction. Then at an OutPoint. Then at a script that did not want to be called, only satisfied.

And then, to make things worse, it told me the old Cell was dead.

Not updated. Not modified. Dead.

The new state lived somewhere else now, in a new Cell, created by a transaction that had to carry the right data, the right scripts, the right dependencies, and enough evidence for every node to say: yes, this transition is valid.

This is the story of how CKB took my Ethereum-shaped brain, stole my ABI, killed my Cell, and somehow made me understand state transitions better than I did before.


## The Comfort of the Ethereum-shaped Brain

Ethereum gives you a very comfortable story as a developer.

You write a contract. You deploy it. You verify it on a block explorer. You get an ABI. You plug that ABI and contract address into `ethers`, `wagmi`, `viem`, or `web3.js`. Your frontend calls functions. Users sign transactions. The contract updates storage. Events fire. Indexers pick them up. The UI updates.

It is a beautiful developer loop because it gives your brain a center of gravity. There is a contract, the contract has storage, the contract exposes functions, and the frontend talks to it through a well-understood interface.

If I build an ERC-20, I know the shape before I start:

```solidity
balances[address] = amount
```

If I build an NFT, I know there will probably be:

```solidity
ownerOf[tokenId]
tokenURI[tokenId]
```

If I build a note app, a voting app, a vault, or a registry, the first instinct is similar:

```txt
deploy contract
store state in contract
call functions to mutate state
read state back through contract views or events
```

This mental model is not wrong. It is powerful. But it trains you to look for the same center of gravity every time: the contract.

Then I started learning CKB, and CKB kept refusing to hand me that center.

## I Kept Looking for the Contract

My first confusion was embarrassingly simple.

In Ethereum, I know what happens after deployment. I get a contract address. I get an ABI. My frontend imports the ABI, creates a contract instance, then calls:

```ts
await contract.mint(...)
await contract.transfer(...)
await contract.updateNote(...)
```

Even if the application is complex, the mental direction is straightforward:

```txt
frontend -> contract call -> EVM executes -> contract storage changes
```

When I started building on CKB, I kept trying to find the equivalent. I deployed a script, then immediately went looking for the thing I was supposed to call.

Where is the ABI? Where are the functions? Where is `mintCapsule()`? Where is the contract storage?

The answer was not "call the script." The answer was: build a transaction.

That transaction creates Cells. Those Cells reference scripts. The scripts run during validation. If they return `0`, the transition is valid. If they return non-zero, the transition fails.

This was not a small difference. It changed the direction of my thinking.

Ethereum taught me to ask:

```txt
What function do I call?
```

CKB started teaching me to ask:

```txt
What state transition am I proposing?
```

That sentence has haunted my entire CKBuilder journey so far.

## The Cell Is Not Just "Where Data Lives"

The first CKB concept that really fought back was the Cell.

The official docs describe CKB's Cell Model as a generalized UTXO model. All state is stored in Cells. Cells are immutable once added on-chain. To update data, you consume an existing Cell and create a new one with the updated data. A non-consumed Cell is live. A consumed Cell is dead.

That sounds clean when written in docs form.

In my head, it was chaos.

Because my Ethereum brain kept asking:

But where is the object that owns the state?

In CKB, the Cell is the state object.

A Cell can carry:

```txt
capacity
lock script
optional type script
data
```

At first, I translated that badly:

Capacity is balance.

Lock Script is ownership.

Type Script is contract logic.

Data is storage.

Close enough, right?

Yeah, close enough to get confused.

Capacity is not only balance. It is also storage right. If a Cell occupies space, it needs enough capacity to exist.

The Lock Script is not simply "the owner field." It is the condition that must be satisfied to consume the Cell.

The Type Script is not exactly "the contract." It is validation logic for how that Cell's state may be used or transformed.

Data is not automatically meaningful. It is just bytes until something interprets it or enforces rules around it.

That last part took me a while.

## The First Uncomfortable Lesson: Data Is Not Meaning

One of my early practical experiments was based on the Store Data on Cell tutorial.

The tutorial flow is simple and very effective:

1. Encode a message into hex.
2. Create a transaction with an output Cell.
3. Put the encoded message in `outputsData`.
4. Complete inputs and fees with CCC.
5. Send the transaction.
6. Read the Cell back by OutPoint.
7. Decode the bytes into text.

I used a custom message:

```txt
capsule-v0: zk-attestation-placeholder
```

It felt exciting. I had put my own data into a live CKB Cell.

Then I queried the Cell and saw the data come back as raw hex:

```txt
0x63617073756c652d76303a207a6b2d6174746573746174696f6e2d706c616365686f6c646572
```

When decoded, it became:

```txt
capsule-v0: zk-attestation-placeholder
```

And then the actual lesson landed:

CKB did not know that this was a "capsule."

CKB did not know that this was "ZK."

CKB did not know that this was an "attestation placeholder."

The chain stored bytes.

The meaning was mine.

That was uncomfortable in a good way.

Putting bytes on-chain is not the same thing as creating protocol state.

Without a Type Script, data is interpreted by convention.

With a Type Script, data can become application state with rules.

That became one of my first real CKB rules:

```txt
Data without constraints is stored bytes.
Data constrained by a Type Script becomes application state with rules.
```

This matters because in Ethereum I often think of contract storage as meaningful by default. If the contract has a mapping called `balances`, the values in that mapping are part of the contract's logic. The code and the storage live conceptually together.

In CKB, the bytes can live in a Cell, but their meaning depends on the scripts and conventions around them.

That is a very different kind of responsibility.

CKB gives you raw state containers.

Then it asks:

What do these bytes mean? Who is allowed to consume them? What transitions are valid? What evidence must be supplied?


## xUDT Made Typed State Click

The next click came from xUDT.

In Ethereum, my ERC-20 mental model is:

```solidity
balances[address] = amount
```

There is a contract.

The contract owns the ledger.

The ledger maps accounts to balances.

Transfers mutate that mapping.

In CKB, the xUDT model made me think differently.

A token balance can be represented by live Cells. The Cell's Lock Script controls who can consume it. The Cell's Type Script identifies and validates the token class. The Cell data carries the token amount.

The simplified model I formed was:

```txt
Cell.lock = who controls this token Cell
Cell.type = which token class/rules this Cell belongs to
Cell.data = how many tokens this Cell contains
```

When I transferred xUDT tokens, the token did not "move" by mutating a contract mapping.

The old token Cells were consumed. New token Cells were created. Some went to the receiver. Some came back as token change.

That was the first time I saw fungible token accounting through the Cell model instead of the account model.

And it made Type Scripts much less abstract.

Before xUDT, "Type Script" was a definition.

After xUDT, it was a role:

```txt
Make these bytes mean token amount.
Make this transition preserve the token rules.
```


## Then Scripts Stopped Looking Like Contracts

The next phase was Rust scripting.

This is where my Ethereum brain got properly humbled.

In Ethereum, when I write Solidity, the contract has its own persistent storage. I write functions that mutate that storage. The EVM executes those functions.

In CKB, when I started looking at Rust scripts, I kept waiting for the contract part.

Where is the storage?

Where are the functions users call?

Where is the state variable?

Where is the ABI?

The more I read and built, the clearer the answer became:

A CKB script is not the state.

A CKB script is a verifier.

It runs during transaction validation. It inspects the transaction context. It reads what it is allowed to read through syscalls and high-level APIs. It checks a rule. Then it returns:

```txt
0 = valid
non-zero = invalid
```

That sounds simple, but it is a huge mental shift.

The script is not an object users call.

The script is a condition the transaction must satisfy.

This is why `ckb-std` became interesting to me. It is not just a Rust helper library. It is the runtime surface that lets bare-metal Rust become CKB-aware verifier code.

A normal Rust application feels like:

```txt
main()
standard library
operating system
files/network/stdout
```

A CKB Rust script feels more like:

```txt
entry point
CKB-VM
syscalls
transaction context
return code
```


## RPC Outside, Syscalls Inside

Another distinction that helped me was this:

```txt
RPC = how I inspect chain data from outside validation
Syscalls = how a script inspects transaction data from inside validation
```

In my early experiments, I used RPC methods to query transactions and Cells.

After sending a transaction, I used `get_transaction` to check whether it was committed. After storing data in a Cell, I used `get_live_cell` to retrieve the Cell by OutPoint.

That was the outside view.

But a script does not use my browser console. It does not call my frontend state. It does not have arbitrary access to the node.

It reads the transaction through syscalls.

It can load script args. It can load Cell data. It can load witnesses. It can inspect inputs and outputs. It can look at the pieces of the transaction that the protocol makes available.

This is where the verifier model started becoming very real.

The transaction supplies:

```txt
input Cells
output Cells
outputsData
witnesses
cellDeps
headers when needed
```

The script reads selected pieces, checks a relation, accepts or rejects.

That felt strangely familiar.

Not identical to zero-knowledge proofs. But familiar.

Because in ZK, I also think in terms of:

```txt
public inputs
private witness
constraints
verifier
accept/reject
```

CKB is not a ZK proof system.

But the discipline of thinking like a verifier carries over.

## The Frontend Confusion: Where Is My ABI?

The frontend piece was where the difference became painfully practical.

In Ethereum, once I deploy and verify a contract, the frontend flow is almost muscle memory:

```txt
contract address
ABI
provider
signer
contract instance
function call
```

With `ethers`, it looks like:

```ts
const contract = new ethers.Contract(address, abi, signer);
await contract.mint(...);
```

With `wagmi`, the shape is different but the idea is the same:

```txt
prepare contract write
send transaction
wait for receipt
```

The ABI tells the frontend what functions exist and how to encode the call data.

That gives Ethereum frontends a very specific shape:

```txt
contract address + ABI + signer = function call
```

CKB made me build a different shape:

```txt
Cells + scripts + CellDeps + witnesses + outputsData = proposed transition
```

So when I deployed my first CKB script, my brain asked the obvious EVM question:

Where is the ABI?

How do I call the Type Script?

How does the frontend invoke `mint`?

The answer was another tiny humiliation:

You do not call the Type Script.

You construct a transaction whose output Cell uses that Type Script.

That is the frontend model.

In CKB, the frontend is not primarily an ABI caller. It is a transaction composer.

For my Capsule Notes dApp, the frontend had to build a transaction where the output Cell contained:

```txt
lock: my account Lock Script
type: the deployed capsule-transition-guard Type Script
data: encoded Capsule bytes
cellDep: the deployed script Cell
```

That `cellDep` part was especially important.

In Ethereum, the contract address points to the deployed contract code. When I call the contract, the EVM knows where the code is.

In CKB, the transaction must provide the code dependency needed for validation. The script code lives in a Cell. The transaction references it through `cellDeps`, so CKB-VM can load and execute the verifier.

That one detail made CKB deployment feel very different.

It also made me separate a few things I used to blur together:

```txt
script code = executable RISC-V binary stored in a Cell
code hash = hash identifying that code
script = code_hash + hash_type + args
script args = parameters that configure this script instance
cellDep = transaction dependency that makes the code Cell available
```

So when my frontend uses `capsule-transition-guard`, it is not importing an ABI and calling a method. It is constructing a Cell whose `type` field points to a configured script, then including the deployed script Cell as a dependency so validation can actually load the code.

Deployment did not mean:

```txt
Here is a contract address. Call its functions.
```

It meant:

```txt
Here is script code stored in a Cell.
Here is its code hash.
Here is the OutPoint you need as a CellDep.
Now build transactions that reference this code when they need validation.
```

So the CKB frontend flow became:

```txt
derive user Lock Script
load deployed Type Script info
encode output Cell data
construct a ccc.Transaction
set outputs and outputsData
include CellDeps
complete inputs by capacity
complete fee
sign and send
read created Cell by OutPoint
decode Cell data
```

That is not worse.

It is just a different center of gravity.

Ethereum frontends often feel like:

```txt
call contract functions
```

CKB frontends feel more like:

```txt
assemble valid state transitions
```

That difference is everything.

## Capsule Notes: My First Tiny Protocol Experiment

By Week 4, I wanted to build something small that forced me to use the model instead of only explaining it.

So I built Capsule Notes.

At first glance, Capsule Notes sounds like a note-taking dApp. But if I describe it that way, I undersell what I was actually learning. I was trying to build a tiny state-transition protocol.

The idea was simple:

A Capsule is a note represented as a typed CKB Cell.

The Cell's data follows a binary layout:

```txt
[0..10]   magic: CAPSULE_V1
[10..14]  version: u32 little-endian
[14..46]  capsule_id: 32 bytes
[46..]    note body bytes
```

Capsule Notes became my first tiny protocol experiment because the frontend was not merely saving a note. It was assembling a transaction.

My account Lock Script owned the output Cell. My deployed `capsule-transition-guard` Type Script defined the Capsule validity rules. The encoded Capsule bytes lived in `outputsData`. The transaction carried the deployed script Cell as a `cellDep`. When the transaction succeeded, I could read the new live Cell by OutPoint and decode the Capsule back into `magic`, `version`, `capsule_id`, and `body`.

Each part took work:

```txt
write Rust Type Script
compile into CKB-VM binary
deploy to devnet
copy codeHash, hashType, and CellDeps
connect deployment metadata to frontend
construct transaction with typed output Cell
mint live Capsule Cell
read Cell back by OutPoint
decode raw Cell data
test invalid data rejection
```


## The Binary Layout Was Not an Accident

I could have used JSON.

Honestly, the frontend developer in me wanted to use JSON.

JSON is friendly. JSON is readable. JSON lets you feel productive before the hard questions arrive.

You throw together:

```json
{
  "version": 1,
  "capsule_id": "...",
  "body": "..."
}
```

and move on with your life.

But CKB scripts validate bytes.

If I want the Type Script to enforce rules, I need a stable byte structure the script can parse deterministically.

So Capsule Notes used a hand-rolled binary layout. I do not think this is the final best format. Molecule should come next. But for this stage, the hand-rolled format was useful because it forced me to confront the actual question:

What exactly is the script checking?

For a valid mint, the script should see:

```txt
magic = CAPSULE_V1
version = 1
capsule_id = 32 bytes
body = non-empty bytes
```

For an update, the rule becomes more interesting:

```txt
old capsule_id == new capsule_id
new version == old version + 1
```

For an archive/burn:

```txt
old Capsule Cell consumed
no replacement output required
```

This is a state machine and  the Type Script is the verifier for that state machine.

## The First Invalid Capsule

One of the most satisfying moments was testing invalid data.

I added an invalid mint path that intentionally used:

```txt
BAD_MAGIC1
```

instead of:

```txt
CAPSULE_V1
```

If the transaction succeeded, my Type Script was not enforcing the rule.

If the transaction failed, it meant the deployed script was actually executing and rejecting malformed Capsule data.

Technically, this also gave me a clean sanity check:

```txt
valid Capsule bytes -> transaction accepted
invalid magic bytes -> Type Script rejects
```

That is the smallest possible version of protocol enforcement, but it is still protocol enforcement.

This is the part that made me respect CKB more.

You cannot just say "this is valid state" and hope everyone agrees.

You encode the state. You reference the verifier. You provide the dependencies. You submit the transition. Finally, every node checks.

## The Transaction Inspector: Because I Do Not Trust Magic

After Capsule Notes worked, I still did not feel satisfied.

The frontend minted a Cell. Great.

But I wanted to see the transaction shape.

I wanted to see:

```txt
Which Lock Script is controlling ownership?
Which Type Script is enforcing Capsule rules?
Which CellDep points to the deployed script?
What output data did I actually encode?
What OutPoint identifies the minted Cell?
Is the Cell live?
What does the raw live Cell look like?
```

So the next step became Capsule Transaction Inspector. 

This is not meant to be a full CKB Tenderly.

Not yet.

The bigger dream would be a Cell transaction debugger: load any transaction, render consumed Cells and created Cells, show capacity flow, run scripts through `ckb-debugger`, show cycle counts, and surface exactly why a script failed.

My version is much smaller and more honest:

Inspect Capsule Notes transactions.

Make the invisible protocol pieces visible.

A good Capsule transaction inspector should show:

```txt
Account Lock Script
Capsule Type Script
CellDeps
CCC transaction skeleton
inputs after funding
outputs and change output
output data hex
decoded Capsule data
transaction hash
OutPoint
live/dead status
raw live Cell
local Capsule rule checks
```

This matters because CKB debugging is transaction-shape debugging.

The inspector is supposed to answer questions like:

```txt
Did the output Cell actually carry the Capsule Type Script?
Did the transaction include the script CellDep?
Did CCC select live input Cells for capacity?
Did fee completion create a change Cell?
Does the output data decode into the Capsule format?
Does the minted OutPoint resolve to a live Cell?
Do local Capsule checks agree with the script rules?
```

That is why I started thinking of it as a tiny, domain-specific version of a larger CKB transaction debugger.

If an Ethereum call fails, I often ask:

```txt
Did the function revert?
Was the caller authorized?
Was the input wrong?
```

If a CKB transaction fails, I have to ask a different set of questions:

```txt
Can the node resolve the input Cells?
Can it resolve the CellDeps?
Is the Type Script attached where I think it is?
Is the output data encoded correctly?
Is the witness available to the script?
Is the capacity sufficient?
Did the script run and return non-zero?
```


## Debugging Taught Me Where Failure Lives

CKB also taught me that not all failures are the same.

Earlier in my journey, I hit a simple-lock error:

```txt
TransactionFailedToResolve: Resolve failed Unknown(OutPoint(...))
```

At first, I wanted to debug the script logic.

Was the preimage wrong?

Was the witness malformed?

Did the hash check fail?

But when I queried the OutPoint, the node returned:

```txt
status: unknown
```

That changed the entire diagnosis.

The script had not rejected the witness.

The script had not even run.

The transaction failed earlier because the node could not resolve the referenced Cell.

That gave me a layered failure model:

```txt
Resolve phase:
Can the node find the referenced Cells and dependencies?

Script phase:
Can the scripts execute successfully?

Commit phase:
Can the valid transaction be accepted and committed?
```

That sounds obvious now.

It was not obvious when I was staring at the error.

And it maps beautifully to verifier thinking.

Before a verifier can reject a proof, it needs a well-formed statement and proof object.

Before a CKB script can reject witness data, the transaction needs to resolve.

Malformed object and failed verification are not the same class of failure.

That distinction is the kind of thing I want to get better at noticing.

## The ZK Brain Wakes Up

Somewhere between Cells, witnesses, Type Scripts, and Capsule Notes, my ZK brain started waking up.

What caught my attention is that the cell model keeps making me ask verifier-shaped questions.

A CKB transaction started to feel less like a function call and more like a proof object:

```txt
old state
new state
dependencies
witness
verifier
```

Every node checks whether the transition is valid.

That is not the same as a zero-knowledge proof, but the rhythm is familiar.

The overlap is not that a CKB transaction is a zero-knowledge proof. The overlap is that both force you to define a statement, decide what evidence is allowed, and write a verifier that rejects everything outside the rule.

In ZK, I think about:

```txt
statement
public inputs
private witness
constraints
proof
verifier
```

In CKB, I started thinking about:

```txt
input Cells
output Cells
outputsData
witnesses
cellDeps
Lock Scripts
Type Scripts
```

The overlap is not literal. It is architectural. Both force you to answer the same uncomfortable questions:

```txt
What is public?
What is private?
What is being checked?
What evidence is supplied?
What does acceptance mean?
```

Those are the questions I care about.

## CKB Witness Is Not ZK Witness

One thing I had to be careful about early:

CKB uses the word "witness."

ZK also uses the word "witness."

These are not the same thing.

In CKB, witness data is transaction evidence available to scripts. It can include signatures, unlocking data, serialized proof bytes, Merkle paths, or other public material needed during validation.

In ZK, the witness is private input used by the prover to generate a proof.

If I put a private ZK witness directly into a CKB transaction witness, I have probably ruined the privacy story.

So the model I carry now is:

```txt
private data stays off-chain
proof is generated off-chain
proof bytes / public inputs may go into CKB witness
commitments or state roots may go into Cell data
Type Script verifies the transition
```

This is where Capsule Notes starts feeling like a tiny primitive for something larger.

Today, a Capsule Cell stores note data.

Tomorrow, maybe a Capsule Cell stores:

```txt
commitment
nullifier
metadata hash
state root
issuer id
expiry epoch
```

The Type Script would not just check:

```txt
magic == CAPSULE_V1
```

It might check:

```txt
the proof is bound to this old Cell
the proof is bound to this new Cell
the nullifier has not been reused
the state root transition is valid
the issuer is authorized
```

That is the direction I cannot stop thinking about:

proof-carrying Cell transitions.

## Proof-Bound Capsules

The phrase in my notebook right now is:

```txt
Proof-Bound Capsule
```

The idea is not a finished design. It is a question.

Can a CKB Type Script enforce a valid state transition where the public Cell data is only a commitment to private state?

For example:

```txt
Old Capsule Cell:
  data = old commitment / state root

New Capsule Cell:
  data = new commitment / state root

Witness:
  proof bytes
  public inputs
  authorization evidence

Type Script:
  verifies that the proof is about this exact old Cell -> new Cell transition
```

That last line matters.

It is not enough to verify a proof in isolation.

The proof must be bound to the CKB transition.

Otherwise, the script might accept a valid proof for the wrong state, wrong Cell, wrong user, or wrong transition.

This is where I think CKB becomes very interesting for ZK builders.

The hard part is not just:

Can we verify a proof on-chain?

The hard part is:

What does the proof mean in relation to Cell state?

That is a better question.

And CKB keeps forcing me toward better questions.

## What I Think CKB Is Teaching Me

Four weeks in, I do not feel like I have mastered CKB.

I feel like CKB has started correcting my instincts.

Ethereum made me fluent in one very powerful pattern:

```txt
contract owns storage
frontend calls contract
contract mutates state
```

CKB is teaching me another pattern:

```txt
Cell carries state
transaction proposes transition
scripts verify rules
new Cells become live
old Cells become dead
```

Ethereum taught me to ask what function I should call. CKB taught me to ask what transition I am proving.

Ethereum taught me to look for the contract. CKB taught me to inspect the transaction.

Ethereum taught me to wire frontends through ABIs. CKB taught me to wire frontends through transaction construction, CellDeps, scripts, and OutPoints.

Ethereum made me comfortable.

CKB made me slow down.

And honestly, I think I needed that.

## Who This Is For

If you are coming from Ethereum, CKB may feel strange at first because it refuses to center the contract in the way you expect.

That strangeness is the point.

Do not ask only:

```txt
Where is the contract?
```

Ask:

```txt
Where is the state?
Who can consume it?
What makes the data meaningful?
What transition is being proposed?
What evidence is supplied?
Which scripts verify it?
Where does the code come from?
What CellDeps are required?
What OutPoint identifies the result?
```

Those questions are harder.

They are also more interesting.

If you are interested in ZK, privacy, or protocol engineering, CKB is worth studying for more than the possibility of cryptographic verification. Its base model already trains you to think in verification terms.

Cells become state objects. Witnesses become evidence. Scripts become verifiers. Transactions become proposed transitions.

That is a very good mental gym.

## The Question I Am Carrying Forward

I came to CKB looking for smart contracts.

I found Cells, witnesses, Type Scripts, CellDeps, and Rust scripts that do not own state but verify transitions.

Somewhere in that confusion, CKB stopped feeling like "another chain" and started feeling like a place where my ZK/protocol-engineering instincts might have room to grow.

The question I am carrying forward is:

> Can a CKB Type Script enforce a valid state transition where the public Cell data is only a commitment to private state?

I do not know the full answer yet.

But I know this:

I am no longer looking for the contract.

I am looking at the transition.

Old state. New state. Witness. Verifier.

Somewhere in that shape, my ZK brain looked up from the corner and said: wait, I know this language.

Annoying, honestly.

But useful.

I came looking for the contract.

CKB taught me to prove the transition.

## Further Reading

- [Nervos CKB Cell Model](https://docs.nervos.org/docs/tech-explanation/cell-model)
- [Store Data on Cell tutorial](https://docs.nervos.org/docs/dapp/store-data-on-cell)
- [CCC JavaScript/TypeScript SDK docs](https://docs.nervos.org/docs/sdk-and-devtool/ccc)
- [Rust Script Quick Start](https://docs.nervos.org/docs/script/rust/rust-quick-start)
