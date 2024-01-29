// // SPDX-License-Identifier: MIT
// // Cowri Labs Inc.

// pragma solidity 0.8.20;

// import "../ocean/Interactions.sol";
// import "./OceanAdapter.sol";
// import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import {Hooks} from "v4-core/src/libraries/Hooks.sol";
// import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
// import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
// import { PoolKey, IPoolManager } from 'v4-core/src/interfaces/IPoolManager.sol';

// contract OceanHook is IHooks {

//     OceanAdapter immutable adapter;
//     IPoolManager immutable poolManager;

//     constructor(OceanAdapter adapter_, IPoolManager poolManager_) {
//         adapter = adapter_;
//         poolManager = poolManager_;
//         validateHookAddress(this);
//     }

//     function validateHookAddress(IHooks _this) internal pure {
//     Hooks.validateHookAddress(_this, getHooksCalls());
//     }

// function getHooksCalls() public pure returns (Hooks.Calls memory) {
//     return Hooks.Calls({
//         beforeInitialize: false,
//         afterInitialize: false,
//         beforeModifyPosition: false,
//         afterModifyPosition: false,
//         beforeSwap: true,
//         afterSwap: true,
//         beforeDonate: false,
//         afterDonate: false
//     });
// }

//     function beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata params, bytes calldata)
//         external
//         override
//         returns (bytes4)
//     {
//         uint256 inputAmount = uint(params.amountSpecified);
//         adapter.unwrapToken(calculateOceanId(adapter.convertType(params.zeroForOne ? key.currency1 : key.currency0), 0), inputAmount);

//         // handle the unwrap fee scenario
//         uint256 unwrapFee = inputAmount / IOceanInteractions(adapter.ocean()).unwrapFeeDivisor();
//         uint256 unwrappedAmount = inputAmount - unwrapFee;

//         return IHooks.beforeSwap.selector;
//     }

//     function afterSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata, BalanceDelta delta, bytes calldata)
//         external
//         override
//         returns (bytes4)
//     {
//         // PoolId poolId = key.toId();

//         // if (!poolInfo[poolId].hasAccruedFees) {
//         //     PoolInfo storage pool = poolInfo[poolId];
//         //     pool.hasAccruedFees = true;
//         // }

//         return IHooks.afterSwap.selector;
//     }

//         function beforeInitialize(address, PoolKey calldata, uint160, bytes calldata) external virtual returns (bytes4) {
//         revert();
//     }

//     function afterInitialize(address, PoolKey calldata, uint160, int24, bytes calldata)
//         external
//         virtual
//         returns (bytes4)
//     {
//         revert();
//     }

//     function beforeModifyPosition(address, PoolKey calldata, IPoolManager.ModifyPositionParams calldata, bytes calldata)
//         external
//         virtual
//         returns (bytes4)
//     {
//         revert();
//     }

//     function afterModifyPosition(
//         address,
//         PoolKey calldata,
//         IPoolManager.ModifyPositionParams calldata,
//         BalanceDelta,
//         bytes calldata
//     ) external virtual returns (bytes4) {
//         revert();
//     }

//     function beforeDonate(address, PoolKey calldata, uint256, uint256, bytes calldata)
//         external
//         virtual
//         returns (bytes4)
//     {
//         revert();
//     }

//     function afterDonate(address, PoolKey calldata, uint256, uint256, bytes calldata)
//         external
//         virtual
//         returns (bytes4)
//     {
//         revert();
//     }
// }

