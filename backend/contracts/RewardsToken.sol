// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardsToken is ERC20 {
    
    constructor(uint initialSupply) ERC20("DeVRM", "VRM") {
        _mint(msg.sender, initialSupply);
    }
    
}
