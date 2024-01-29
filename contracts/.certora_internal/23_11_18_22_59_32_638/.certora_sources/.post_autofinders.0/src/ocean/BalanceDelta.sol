// SPDX-License-Identifier: MIT
// Cowri Labs Inc.

pragma solidity 0.8.20;

import { InteractionType } from "./Interactions.sol";

/**
 * A BalanceDelta structure tracks a user's intra-transaction balance change
 *  for a particular token
 * @param tokenId ID of the tracked token in the accounting system
 * @param delta a signed integer that records the user's accumulated debit
 *  or credit.
 *
 * Examples:
 * BalanceDelta positiveDelta = BalanceDelta(0xDE..AD, 100);
 * BalanceDelta negativeDelta = BalanceDelta(0xBE..EF, -100);
 *
 * At the end of the transaction the deltas are applied to the user's balances
 *  to persist the effects of the transaction.
 */
struct BalanceDelta {
    uint256 tokenId;
    int256 delta;
}

/**
 * @dev Functions relating to the intra-transaction accounting system.
 * @dev This library relies on the fact that arrays in solidity are passed by
 *  reference, rather than by value.
 *
 * `self` is an array of BalanceDelta structures.
 *
 * @dev each function uses a greedy linear search, so if there are duplicate
 *  deltas for the same tokenId, only the first delta is operated on. The
 *  duplicates will always have {tokenID: $DUPLICATE, delta: 0}.  If an tokenId
 *  is missing, the library functions will revert the transaction.  If there is
 *  an unecessary tokenId or a duplicated tokenId, the only consequence is
 *  wasted gas, so the incentive for the user is to provide the minimal set of
 *  tokenIds.
 *
 * Because the delta is a signed integer, it can be positive or negative.
 *
 * At the end of the transaction, positive deltas are minted to the user and
 *  negative deltas are burned from the user.  This is done using the ERC-1155's
 *  _mintBatch() and _burnBatch().  Each take an array of IDs and an array
 *  of amounts.  BalanceDelta => (ids[i], amounts[i])
 */
library LibBalanceDelta {
    //*********************************************************************//
    // --------------------------- custom errors ------------------------- //
    //*********************************************************************//
    error CAST_AMOUNT_EXCEEDED();
    error DELTA_AMOUNT_IS_NEGATIVE();
    error DELTA_AMOUNT_IS_POSITIVE();
    error MISSING_TOKEN_ID();

    /**
     * @dev a BalanceDelta holds an int256 delta while the caller passes
     *  a uint256.  We need to make sure the cast won't silently truncate
     *  the most significant bit.
     * @dev because solidity numbers are two's complement representation,
     *  the absolute value of the maximum value is one unit higher than the
     *  maximum value of the minimum value.  By testing against
     *  type(int256).max, we know that amount will safely cast to both positive
     *  and negative int256 values.
     */
    modifier safeCast(uint256 amount) {
        if (uint256(type(int256).max) <= amount) revert CAST_AMOUNT_EXCEEDED();
        _;
    }

    /**
     * @dev increase a given tokenId's delta by an amount.
     */
    function increaseBalanceDelta(
        BalanceDelta[] memory self,
        uint256 tokenId,
        uint256 amount
    )
        internal
        pure
        logInternal0(amount)safeCast(amount)
    {
        uint256 index = _findIndexOfTokenId(self, tokenId);
        self[index].delta += int256(amount);
        return;
    }modifier logInternal0(uint256 amount) { assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000000, 1037618708480) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000001, 3) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00000003, 21) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00006002, amount) } _; }

    /**
     * @dev decrease a given tokenId's delta by an amount.
     */
    function decreaseBalanceDelta(
        BalanceDelta[] memory self,
        uint256 tokenId,
        uint256 amount
    )
        internal
        pure
        logInternal1(amount)safeCast(amount)
    {
        uint256 index = _findIndexOfTokenId(self, tokenId);
        self[index].delta -= int256(amount);
        return;
    }modifier logInternal1(uint256 amount) { assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010000, 1037618708481) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010001, 3) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00010003, 21) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00016002, amount) } _; }

    /**
     * @dev This function returns an unsigned amount given a tokenId and an
     *  interaction type.
     * @dev This function reverts when the sign of the tokenId's delta
     *  does not match the sign expected by the interaction type.
     *
     *  - All interaction types expect unsigned amounts as arguments.
     *  - Some interaction types, like wraps, increase a user's balance.
     *  - Others, like unwraps, decrease a user's balance.
     *  - The interactions that increase a user's balance can take a negative
     *   delta as an input. In effect, the debit represented by the delta is
     *   offset by the credit from the interaction.
     *  - Similarly, interactions that decrease a user's balance can take
     *   a positive delta as an input.
     *  - When a delta is of the wrong sign for the interaction type, we need
     *   to revert the transaction.
     *
     * EXAMPLE 1. Convert 100 DAI into as many USDC as possible
     * [0]  BalanceDelta[] = [ BalanceDelta(DAI, 0), BalanceDelta(USDC, 0) ]
     *  wrap(token: DAI, amount: 100)
     * [1]  BalanceDelta[] = [ BalanceDelta(DAI, 100), BalanceDelta(USDC, 0) ]
     *  computeOutputAmount(input: DAI, output: USDC, amount: GET_BALANCE_DELTA)
     * [2]  BalanceDelta[] = [ BalanceDelta(DAI, 0), BalanceDelta(USDC, 99.997) ]
     *  unwrap(token: USDC, amount: GET_BALANCE_DELTA)
     *
     * EXAMPLE 2. Convert as few DAI as possible into exactly 100 USDC
     * [0]  BalanceDelta[] = [ BalanceDelta(DAI, 0), BalanceDelta(USDC, 0) ]
     *  unwrap(token: USDC, amount: 100)
     * [1]  BalanceDelta[] = [ BalanceDelta(DAI, 0), BalanceDelta(USDC, -100) ]
     *  computeInputAmount(input: DAI, output: USDC, amount: GET_BALANCE_DELTA)
     * [2]  BalanceDelta[] = [ BalanceDelta(DAI, -100.003), BalanceDelta(USDC, 0) ]
     *  wrap(token: DAI, amount: GET_BALANCE_DELTA)
     *
     * EXAMPLE 3. Unwrap DAI twice (reverts)
     * [0]  BalanceDelta[] = [ BalanceDelta(DAI, 0), ]
     *  unwrap(token: DAI, amount: 100)
     * [1]  BalanceDelta[] = [ BalanceDelta(DAI, -100), ]
     *  unwrap(token: DAI, amount: GET_BALANCE_DELTA)
     * !!! Throw("PosDelta :: amount < 0") !!!
     */
    function getBalanceDelta(
        BalanceDelta[] memory self,
        InteractionType interaction,
        uint256 tokenId
    )
        internal
        pure
        returns (uint256)
    {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030000, 1037618708483) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030001, 3) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00030003, 21) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00036002, tokenId) }
        if (
            interaction == InteractionType.UnwrapErc20 || interaction == InteractionType.UnwrapErc721
                || interaction == InteractionType.UnwrapErc1155 || interaction == InteractionType.UnwrapEther
                || interaction == InteractionType.ComputeOutputAmount
        ) {
            return _getPositiveBalanceDelta(self, tokenId);
        } else {
            // interaction == (Wrap* || ComputeInputAmount)
            return _getNegativeBalanceDelta(self, tokenId);
        }
    }

    /**
     * @dev This function transforms the accumulated deltas into the arguments
     *  expected by ERC-1155 _mintBatch() and _burnBatch so that the caller
     *  can apply the deltas to the ledger.
     * @dev ERC-1155 expects an array of ids and an array of amounts, paired by
     *  index.
     *  +-------+-------+-----------+
     *  | index | ids[] | amounts[] |
     *  +-------+-------+-----------+
     *  |  0    |  808  |  35       | <= BalanceDelta(tokenId: 808, delta: 35)
     *  |  1    |  310  |  12       | <= BalanceDelta(tokenId: 310, delta: 12)
     *  |  2    |  408  |  19       | <= BalanceDelta(tokenId: 408, delta: 19)
     *  +-------+-------+-----------+
     * @dev Positive deltas are minted to the user's balances
     * @dev Negative deltas are burned from the user's balances
     * @dev for an entry where (delta == 0), nothing is done
     * @notice the returned arrays may be empty (arr.length == 0) or singleton
     *  arrays (arr.length == 1).
     * @return mintIds array of IDs expected by ERC-1155 _mintBatch
     * @return mintAmounts array of amounts expected by ERC-1155 _mintBatch
     * @return burnIds array of IDs expected by ERC-1155 _burnBatch
     * @return burnAmounts array of amounts expected by ERC-1155 _burnBatch
     */
    function createMintAndBurnArrays(BalanceDelta[] memory self)
        internal
        pure
        returns (
            uint256[] memory mintIds,
            uint256[] memory mintAmounts,
            uint256[] memory burnIds,
            uint256[] memory burnAmounts
        )
    {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00040000, 1037618708484) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00040001, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00040003, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00046000, self) }
        (uint256 numberOfMints, uint256 numberOfBurns) = _getMintsAndBurns(self);

        mintIds = new uint256[](numberOfMints);
        mintAmounts = new uint256[](numberOfMints);

        burnIds = new uint256[](numberOfBurns);
        burnAmounts = new uint256[](numberOfBurns);

        _copyDeltasToMintAndBurnArrays(self, mintIds, mintAmounts, burnIds, burnAmounts);
    }

    /**
     * @dev Count the number of positive deltas and the number of negative
     *  deltas among the accumulated deltas.
     * @dev The return values of this function are used to allocate memory
     *  arrays.  This function is necessary because in-memory arrays in
     *  solidity do not support push() and pop() style operations.
     * @return numberOfMints the number of positive deltas
     * @return numberOfBurns the number of negative deltas
     */
    function _getMintsAndBurns(BalanceDelta[] memory self)
        private
        pure
        returns (uint256 numberOfMints, uint256 numberOfBurns)
    {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020000, 1037618708482) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020001, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00020003, 1) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00026000, self) }
        uint256 numberOfZeros = 0;
        for (uint256 i = 0; i < self.length; ++i) {
            int256 delta = self[i].delta;
            if (delta > 0) {
                ++numberOfMints;
            } else if (delta < 0) {
                ++numberOfBurns;
            } else {
                ++numberOfZeros;
            }
        }
        assert((numberOfMints + numberOfBurns + numberOfZeros) == self.length);
    }

    /**
     * @dev Now that we have allocated a pair of mint arrays and a pair of burn
     *  arrays, we iterate over the balance deltas again, this time moving the
     *  positive deltas, along with their assosciated tokenIds into the mints
     *  arrays, and moving the negative deltas and their assosciated tokenIds
     *  into the burns arrays.
     */
    function _copyDeltasToMintAndBurnArrays(
        BalanceDelta[] memory self,
        uint256[] memory mintIds,
        uint256[] memory mintAmounts,
        uint256[] memory burnIds,
        uint256[] memory burnAmounts
    )
        private
        pure
    {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00050000, 1037618708485) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00050001, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00050003, 341) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00056004, burnAmounts) }
        uint256 mintsSoFar = 0;
        uint256 burnsSoFar = 0;
        for (uint256 i = 0; i < self.length; ++i) {
            int256 delta = self[i].delta;
            if (delta > 0) {
                mintIds[mintsSoFar] = self[i].tokenId;
                mintAmounts[mintsSoFar] = uint256(delta);
                mintsSoFar += 1;
            } else if (delta < 0) {
                burnIds[burnsSoFar] = self[i].tokenId;
                burnAmounts[burnsSoFar] = uint256(-delta);
                burnsSoFar += 1;
            }
        }
        assert((mintsSoFar == mintIds.length) && (burnsSoFar == burnIds.length));
    }

    /**
     * @dev returns a delta for a interaction type that expects a positive delta
     *
     * SteInterps that take a positive delta:
     *   Unwrap*
     *   ComputeOutputAmount
     */
    function _getPositiveBalanceDelta(BalanceDelta[] memory self, uint256 tokenId) private pure returns (uint256) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00060000, 1037618708486) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00060001, 2) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00060003, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00066001, tokenId) }
        uint256 index = _findIndexOfTokenId(self, tokenId);
        int256 amount = self[index].delta;
        if (amount < 0) revert DELTA_AMOUNT_IS_NEGATIVE();
        return uint256(amount);
    }

    /**
     * @dev returns a delta for a interaction type that expects a negative delta
     *
     * Interactions that take a negative delta:
     *   Wrap*
     *   ComputeInputAmount
     */
    function _getNegativeBalanceDelta(BalanceDelta[] memory self, uint256 tokenId) private pure returns (uint256) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00070000, 1037618708487) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00070001, 2) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00070003, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00076001, tokenId) }
        uint256 index = _findIndexOfTokenId(self, tokenId);
        int256 amount = self[index].delta;
        if (amount > 0) revert DELTA_AMOUNT_IS_POSITIVE();
        return uint256(-amount);
    }

    /**
     * @dev a linear search for the first BalanceDelta with a certain tokenId
     *  @param tokenId the key we're searching for
     *  @return index the location of the key
     */
    function _findIndexOfTokenId(BalanceDelta[] memory self, uint256 tokenId) private pure returns (uint256 index) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00080000, 1037618708488) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00080001, 2) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00080003, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff00086001, tokenId) }
        for (index = 0; index < self.length; ++index) {
            if (self[index].tokenId == tokenId) {
                return index;
            }
        }
        revert MISSING_TOKEN_ID();
    }
}
