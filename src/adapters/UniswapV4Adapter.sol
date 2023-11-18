// SPDX-License-Identifier: MIT
// Cowri Labs Inc.

pragma solidity 0.8.20;

import "./OceanAdapter.sol";
import {IPoolManager, BalanceDelta, PoolKey} from 'v4-core/src/interfaces/IPoolManager.sol';
import {IHooks} from 'v4-core/src/interfaces/IHooks.sol';
import {ILockCallback} from 'v4-core/src/interfaces/callback/ILockCallback.sol';
import {Currency, CurrencyLibrary} from "v4-core/src/types/Currency.sol";
import { PoolId } from "v4-core/src/types/PoolId.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract UniswapV4Adapter is OceanAdapter, ILockCallback {
    /////////////////////////////////////////////////////////////////////
    //                             Errors                              //
    /////////////////////////////////////////////////////////////////////
    error INVALID_COMPUTE_TYPE();
    error SLIPPAGE_LIMIT_EXCEEDED();

    enum ComputeType {
      Swap
    }

    /////////////////////////////////////////////////////////////////////
    //                             Events                              //
    /////////////////////////////////////////////////////////////////////
    event Swap(
        uint256 inputToken,
        uint256 inputAmount,
        uint256 outputAmount,
        bytes32 slippageProtection,
        address user,
        bool computeOutput
    );
    event Deposit(
        uint256 inputToken,
        uint256 inputAmount,
        uint256 outputAmount,
        bytes32 slippageProtection,
        address user,
        bool computeOutput
    );
    event Withdraw(
        uint256 outputToken,
        uint256 inputAmount,
        uint256 outputAmount,
        bytes32 slippageProtection,
        address user,
        bool computeOutput
    );

    using SafeERC20 for IERC20Metadata;
    using CurrencyLibrary for Currency;

    PoolId public immutable poolId;

    uint24 public immutable fee;

    IHooks public immutable hook;

    int24 public immutable tickSpacing;

    /// @notice x token Ocean ID.
    uint256 public immutable xToken;

    /// @notice y token Ocean ID.
    uint256 public immutable yToken;

    /// @notice map token Ocean IDs to corresponding Curve pool indices
    mapping(uint256 => int128) indexOf;

    /// @notice The underlying token decimals wrt to the Ocean ID
    mapping(uint256 => uint8) decimals;

    //*********************************************************************//
    // ---------------------------- constructor -------------------------- //
    //*********************************************************************//

    /**
     * @notice only initializing the immutables, mappings & approves tokens
     */
    constructor(address ocean_, address primitive_, PoolKey memory key_, uint160 sqrtPriceX96_, bytes memory hookData_) OceanAdapter(ocean_, primitive_) {
        address xTokenAddress = convertType(key_.currency0);
        xToken = _calculateOceanId(xTokenAddress, 0);
        underlying[xToken] = xTokenAddress;
        decimals[xToken] = IERC20Metadata(xTokenAddress).decimals();
        _approveToken(xTokenAddress);

        address yTokenAddress = convertType(key_.currency1);
        yToken = _calculateOceanId(yTokenAddress, 0);
        indexOf[yToken] = int128(1);
        underlying[yToken] = yTokenAddress;
        decimals[yToken] = IERC20Metadata(yTokenAddress).decimals();
        _approveToken(yTokenAddress);

        fee = key_.fee;
        hook = key_.hooks;
        tickSpacing = key_.tickSpacing;

        poolId = PoolId.wrap(keccak256(abi.encode(key_)));
     
        IPoolManager(primitive_).initialize(key_, sqrtPriceX96_, hookData_);
    }

    function convertType(Currency currency_) internal view returns(address underlyingToken) {
      assembly {
          underlyingToken := currency_
      }
    }

    /**
     * @dev wraps the underlying token into the Ocean
     * @param tokenId Ocean ID of token to wrap
     * @param amount wrap amount
     */
    function wrapToken(uint256 tokenId, uint256 amount) internal override {
        address tokenAddress = underlying[tokenId];

        Interaction memory interaction = Interaction({
            interactionTypeAndAddress: _fetchInteractionId(tokenAddress, uint256(InteractionType.WrapErc20)),
            inputToken: 0,
            outputToken: 0,
            specifiedAmount: amount,
            metadata: bytes32(0)
        });

        IOceanInteractions(ocean).doInteraction(interaction);
    }

    /**
     * @dev unwraps the underlying token from the Ocean
     * @param tokenId Ocean ID of token to unwrap
     * @param amount unwrap amount
     */
    function unwrapToken(uint256 tokenId, uint256 amount) internal override {
        address tokenAddress = underlying[tokenId];

        Interaction memory interaction = Interaction({
            interactionTypeAndAddress: _fetchInteractionId(tokenAddress, uint256(InteractionType.UnwrapErc20)),
            inputToken: 0,
            outputToken: 0,
            specifiedAmount: amount,
            metadata: bytes32(0)
        });

        IOceanInteractions(ocean).doInteraction(interaction);
    }

    /**
     * @dev swaps/add liquidity/remove liquidity from Curve 2pool
     * @param inputToken The user is giving this token to the pool
     * @param outputToken The pool is giving this token to the user
     * @param inputAmount The amount of the inputToken the user is giving to the pool
     * @param minimumOutputAmount The minimum amount of tokens expected back after the exchange
     */
    function primitiveOutputAmount(
        uint256 inputToken,
        uint256 outputToken,
        uint256 inputAmount,
        bytes32 minimumOutputAmount
    )
        internal
        override
        returns (uint256 outputAmount)
    {
        uint256 rawInputAmount = _convertDecimals(NORMALIZED_DECIMALS, decimals[inputToken], inputAmount);

        ComputeType action = _determineComputeType(inputToken, outputToken);

        uint256 rawOutputAmount;

        (uint160 sqrtPriceX96, , , ) = IPoolManager(primitive).getSlot0(poolId);

        PoolKey memory poolKey = PoolKey({
            currency0: Currency.wrap(underlying[xToken]),
            currency1: Currency.wrap(underlying[yToken]),
            fee: fee,
            tickSpacing: tickSpacing,
            hooks: hook
        });

        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: true,
            amountSpecified: int(inputAmount),
            sqrtPriceLimitX96: sqrtPriceX96
        });

        // avoid multiple SLOADS
        int128 indexOfInputAmount = indexOf[inputToken];
        int128 indexOfOutputAmount = indexOf[outputToken];

        if (action == ComputeType.Swap) {
            IPoolManager(primitive).lock(abi.encode(poolKey, params, block.timestamp + 100));
        }

        // outputAmount = _convertDecimals(decimals[outputToken], NORMALIZED_DECIMALS, rawOutputAmount);

        // if (uint256(minimumOutputAmount) > outputAmount) revert SLIPPAGE_LIMIT_EXCEEDED();

        // if (action == ComputeType.Swap) {
        //     emit Swap(inputToken, inputAmount, outputAmount, minimumOutputAmount, primitive, true);
        // }
    }

    function lockAcquired(bytes calldata data) external returns (bytes memory) {
        if (msg.sender != primitive) {
            revert();
        }

        (
            PoolKey memory poolKey,
            IPoolManager.SwapParams memory swapParams,
            uint256 deadline
        ) = abi.decode(data, (PoolKey, IPoolManager.SwapParams, uint256));

        if (block.timestamp > deadline) {
            revert();
        }

        BalanceDelta delta = IPoolManager(primitive).swap(poolKey, swapParams, new bytes(0));

        _settleCurrencyBalance(poolKey.currency0, delta.amount0());
        _settleCurrencyBalance(poolKey.currency1, delta.amount1());

        return new bytes(0);
    }

    function _settleCurrencyBalance(
        Currency currency,
        int128 deltaAmount
    ) private {
        if (deltaAmount < 0) {
            IPoolManager(primitive).take(currency, msg.sender, uint128(-deltaAmount));
            return;
        }

        if (currency.isNative()) {
            IPoolManager(primitive).settle{value: uint128(deltaAmount)}(currency);
            return;
        }

        IERC20Metadata(Currency.unwrap(currency)).safeTransferFrom(
            msg.sender,
            primitive,
            uint128(deltaAmount)
        );
        IPoolManager(primitive).settle(currency);
    }

    /**
     * @dev Approves token to be spent by the Ocean and the Curve pool
     */
    function _approveToken(address tokenAddress) internal {
        IERC20Metadata(tokenAddress).approve(ocean, type(uint256).max);
        IERC20Metadata(tokenAddress).approve(primitive, type(uint256).max);
    }

    /**
     * @dev Uses the inputToken and outputToken to determine the ComputeType
     *  (input: xToken, output: yToken) | (input: yToken, output: xToken) => SWAP
     *  base := xToken | yToken
     *  (input: base, output: lpToken) => DEPOSIT
     *  (input: lpToken, output: base) => WITHDRAW
     */
    function _determineComputeType(
        uint256 inputToken,
        uint256 outputToken
    )
        private
        view
        returns (ComputeType computeType)
    {
        if (((inputToken == xToken) && (outputToken == yToken)) || ((inputToken == yToken) && (outputToken == xToken)))
        {
            return ComputeType.Swap;
        } else {
            revert INVALID_COMPUTE_TYPE();
        }
    } 
}