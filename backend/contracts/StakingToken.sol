// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingToken is ERC20 {
    
    constructor(uint initialSupply) ERC20("wrappedBTC", "wBTC") {
        _mint(msg.sender, initialSupply);
    }
    
}
