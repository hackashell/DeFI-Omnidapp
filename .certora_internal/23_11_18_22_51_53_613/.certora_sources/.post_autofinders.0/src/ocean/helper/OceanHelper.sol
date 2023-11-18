// SPDX-License-Identifier: MIT
// Cowri Labs Inc.

// All solidity behavior related comments are in reference to this version of
// the solc compiler.
pragma solidity 0.8.20;

import "../Ocean.sol";

contract OceanHelper is Ocean {

    constructor() Ocean("") {}

    function fetchInteractionId(address token, uint256 interactionType) public pure returns (bytes32) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003e0000, 1037618708542) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003e0001, 2) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003e0003, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003e6001, interactionType) }
        uint256 packedValue = uint256(uint160(token));
        packedValue |= interactionType << 248;
        return bytes32(abi.encode(packedValue));
    }

    /**
     * @notice calculates Ocean ID for a underlying token
     */
    function calculateOceanId(address tokenAddress, uint256 tokenId) public pure returns (uint256) {assembly { mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003f0000, 1037618708543) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003f0001, 2) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003f0003, 5) mstore(0xffffff6e4604afefe123321beef1b01fffffffffffffffffffffffff003f6001, tokenId) }
        return uint256(keccak256(abi.encodePacked(tokenAddress, tokenId)));
    }
}