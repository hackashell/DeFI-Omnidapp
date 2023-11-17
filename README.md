# Shell v3
Shell v3 improves upon the fundamentals developed in Shell v2, which you can learn more about [here](https://wiki.shellprotocol.io/how-shell-works/the-ocean-accounting-hub) & [here](https://github.com/Shell-Protocol/Shell-Protocol#the-ocean), we highly recommmend to go through these resources before diving into the v3 improvements.

The goal of Shell v3 is to make the Ocean compatible with external protocols through the use of adapter primitives.

## V3 Updates
### The Ocean
- Removed reentrancy guards for `doInteraction` and `doMultipleInteraction` methods so that adapter primitives may wrap/unwrap tokens to be used with external protocols.

- `doInteraction` has been updated to enable wrapping Ether.

- Refactored the order in which a primitive's balances are updated. Previously, both mints and burns would occur after the primitive had performed its computation in `computeOutputAmount` or `computeInputAmount`. Now, the primitive's balances will be minted the input token or burned the output token before performing the computation step, and then will burn the output token or mint the input token based on the result.

### Liquidity Pools
- [LiquidityPoolProxy.sol](/src/proteus/LiquidityPoolProxy.sol) was refactored to account for the changes in the Ocean updates the primitive's balances. After calling `_getBalances()`, the pool will adjust the values appropriately.

### Adapter Primitives
- Introducing [OceanAdapter.sol](/src/adapters/OceanAdapter.sol), a generalized adapter interface for adapter primitives.
- Demonstrated implementation in two examples, [Curve2PoolAdapter.sol](/src/adapters/Curve2PoolAdapter.sol) and [CurveTricryptoAdapter.sol](/src/adapters/CurveTricryptoAdapter.sol).

## Invariants

The following Ocean invariants should never be violated under any circumstances:
* A user's balances should only move with their permission
    - they are `msg.sender`
    - they've set approval for `msg.sender`
    - they are a contract that was the target of a ComputeInput/Output, and they did not revert the transaction
* Fees should be credited to the Ocean owner's ERC-1155 balance
* Calls to the Ocean cannot cause the Ocean to make external transfers unless a
`doInteraction`/`doMultipleInteractions` function is called and a `wrap` or `unwrap` interaction is provided.
* The way the Ocean calculates wrapped token IDs is correct
* Calls to the Ocean cannot cause it to mint a token without first calling the contract used to calculate its token ID.
* The Ocean should conform to all standards that its code claims to (ERC-1155, ERC-165)
    - EXCEPTION: The Ocean omits the safeTransfer callback during the mint that occurs after a ComputeInput/ComputeOutput.  The contract receiving the transfer was called just before the mint, and should revert the transaction if it does not want to receive the token.
* The Ocean does not support rebasing tokens, fee on transfer tokens
* The Ocean ERC-1155 transfer functions are secure and protected with reentrancy checks
* During any do* call, the Ocean accurately tracks balances of the tokens involved throughout the transaction.
* The Ocean does not provide any guarantees against the underlying token blacklisting the Ocean or any sort of other non-standard behavior


## Security

Currently, we use [Slither](https://github.com/crytic/slither) to help identify well-known issues via static analysis. Other tools may be added in the near future as part of the continuous improvement process, make sure you use the latest slither version.

### Static Analysis

To run the analysis
```shell
slither . --filter-path "mock|openzeppelin|auth|test|lib|scripts|abdk-libraries-solidity|proteus" --foundry-compile-all
```

### Unit Tests and Fuzzing
Hardhat tests are located [here](https://github.com/cowri/shell-protocol-v3-contracts/tree/main/test), which include tests for the Ocean, Shell native primitives, and code coverage analysis. Foundry tests for the adapter are located [here](https://github.com/cowri/shell-protocol-v3-contracts/tree/main/src/test/fork), which include fuzz tests for the Curve adapters.

To compile the contracts
```shell
forge build
```

To run Hardhat tests
```shell
npx hardhat test
```

To run Foundry tests
```shell
forge test
```

To run coverage for Hardhat tests
```shell
yarn coverage
```

To run coverage for Foundry tests you can follow the instructions [here](https://mirror.xyz/devanon.eth/RrDvKPnlD-pmpuW7hQeR5wWdVjklrpOgPCOA-PJkWFU)
```shell
forge coverage
```

For coverage for the [Ocean Contract](/src/Ocean/Ocean.sol), run `yarn coverage`
For coverage for the [Adapter Contracts](/src/adapters/OceanAdapter.sol), run `forge coverage`


### Known behaviors (automated findings / out of scope issues)

* Deploying an adapter with invalid parameters
* Integrating with a malicious primitive may result in harmful behavior, but is only limited to the scope of the user and primitive's balances
