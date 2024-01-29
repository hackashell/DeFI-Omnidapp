// SPDX-License-Identifier: MIT
// Cowri Labs Inc.

pragma solidity 0.8.20;

import "../adapters/UniswapV4Adapter.sol";
import "forge-std/Script.sol";

contract DeployUniswapV4Adapter is Script {
    UniswapV4Adapter _uniAdapter;
    address token1 = 0x3c725F9622779c4Aa225bED987056e32326f8094;
    address token2 = 0xa46F04F08Ea3AA4e1D22dFEe7f1C014C85Fc2EF9;

    address ocean = 0x5A5B14594f1BF93656a2B705ECdb873373A4eFe9;
    address pool = 0xeb4708989b42f0cd327A6Bd8f76a931429137fd7;
    uint160 sqrtPriceX96 = 79228162514264337593543950336;
    uint24 fee = 3000;
    function run() external {
        vm.startBroadcast();

        PoolKey memory key_ = PoolKey({
            currency0: Currency.wrap(token1),
            currency1: Currency.wrap(token2),
            fee: fee,
            tickSpacing: int24(fee / 100 * 2),
            hooks: IHooks(address(0))
        });

        _uniAdapter = new UniswapV4Adapter(ocean, pool, key_, sqrtPriceX96, new bytes(0)); // using mock values
        console.log(address(_uniAdapter));
    }
}