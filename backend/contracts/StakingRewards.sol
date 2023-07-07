// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error InsufficientAmount(uint256 _amount);
error TransferFailed(string _desc);
error InsufficientLockTime(uint256 _remainingTime);

/**
 * @title Staking Contract
 * @dev A contract that allows users to stake ERC20 tokens and earn rewards 
 * based on the staked amount and staking duration.
 */

contract Staking is Ownable {
    event TokenStaked(address _from, uint256 _amount, uint256 _lockTime);
    event TokenUnstaked(address _from, uint256 _amount);
    event RewardClaimed(address _from, uint256 _amount);


    struct Reward {
        uint256 balance;
        uint256 timestamp;
    }

    struct Stake {
        uint256 balance;
        uint256 lockTime;
    }
        
    mapping(address => Reward) private rewards;
    mapping(address => Stake) public stakes;

    IERC20 public immutable stakeToken;
    IERC20 public immutable rewardToken;

    uint8 public interestRate = 5; // 5%
    uint256 public lockPeriod = 30 days; // 1 months

    modifier onlyPositiveAmount(uint256 _amount) {
        if (_amount <= 0) {
            revert InsufficientAmount(_amount);
        }
        _;
    }

    modifier updateReward(address _addr) {
        uint256 rewardBalance = rewards[_addr].balance + _calculateReward(_addr);
        rewards[_addr] = Reward(rewardBalance, block.timestamp);
        _;
    }

    constructor(address _stakeToken, address _rewardToken) {
        stakeToken = IERC20(_stakeToken);
        rewardToken = IERC20(_rewardToken);
    }

    /**
     * @dev Sets the interest rate for rewards.
     * @param _interestRate The new interest rate to be set.
     */    
    function setInterestRate(uint8 _interestRate) external onlyOwner {
        interestRate = _interestRate;
    }

    /**
     * @dev Sets the lock period until staker can unstake.
     * @param _lockPeriod The new lock period to be set.
     */        
    function setLockPeriod(uint8 _lockPeriod) external onlyOwner {
        lockPeriod = _lockPeriod;
    }

    /**
     * @dev Stakes ERC20 tokens into the contract.
     * @param _amount The amount of tokens to stake.
     */
    function stake(uint256 _amount) external
        onlyPositiveAmount(_amount)
        updateReward(msg.sender) {
        
        stakes[msg.sender].balance += _amount;
        if (!(stakeToken.transferFrom(msg.sender, address(this), _amount)))
            revert TransferFailed("Stake");

        stakes[msg.sender].lockTime = block.timestamp + lockPeriod;        
        
        emit TokenStaked(msg.sender,
                         stakes[msg.sender].balance,
                         stakes[msg.sender].lockTime);
    }

    /**
     * @dev Unstakes previously staked tokens from the contract.
     * @param _amount The amount of tokens to unstake.
     */    
    function unstake(uint256 _amount) external
        onlyPositiveAmount(_amount)
        updateReward(msg.sender) {
        if (block.timestamp < stakes[msg.sender].lockTime)
            revert InsufficientLockTime(stakes[msg.sender].lockTime -
                                        block.timestamp);

        stakes[msg.sender].balance -= _amount;
        if(!(stakeToken.transfer(msg.sender, _amount)))
            revert TransferFailed("unstake");
        
        emit TokenUnstaked(msg.sender, _amount);
    }

    /**
     * @dev Claims the available rewards for the caller.
     */    
    function claimReward() external
        updateReward(msg.sender)
        onlyPositiveAmount(rewards[msg.sender].balance) {

        uint256 rewardedAmount = rewards[msg.sender].balance;
        delete rewards[msg.sender];

        if (!(rewardToken.transfer(msg.sender, rewardedAmount)))
            revert TransferFailed("claimReward");
        
        emit RewardClaimed(msg.sender, rewardedAmount);
    }

    /**
     * @dev Calculates the rewards for a given address based on their staked
     * amount and duration.
     * @param _addr The address for which to calculate the rewards.
     * @return The calculated rewards amount.
     */    
    function _calculateReward(address _addr) private view returns (uint256) {
        uint256 stakedAmount = stakes[_addr].balance;
        uint256 stakingDuration = block.timestamp - rewards[_addr].timestamp;
        
        return (stakedAmount * stakingDuration * interestRate) / (365 days * 100);
    }
}
