// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StakingRewards
 * @dev A contract for staking and earning rewards.
 */
contract StakingRewards is Ownable {

    // Custom error messages
    error AmountMustBeGreaterThanZero();
    error InsufficientFund();
    error RewardRateMustBeGreaterThanZero();
    error RewardAmountExceedsBalance();
    error RewardDurationNotFinished();

    // Events
    event Staked(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);
    event RewardsClaimed(address indexed account, uint256 amount);    

    // Contracts
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    // Reward Parameters
    uint public rewardDurationInSecond;
    uint public rewardFinishTimeInSecond;
    uint public lastUpdateTime;
    uint public rewardRatePerSecond;
    uint public rewardPerTokenStored;
    mapping(address => uint) public rewardPerTokenPaidOf;
    mapping(address => uint) public rewardBalanceOf;

    // Staking Information
    uint public totalStaked;
    mapping(address => uint) public stakeBalanceOf;

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardToken);
    }

    /**
     * @dev Set the duration of rewards.
     * @param _duration The duration of rewards to be set.
     */
    function setRewardDuration(uint _duration) external onlyOwner {
        if (block.timestamp < rewardFinishTimeInSecond) {
            revert RewardDurationNotFinished();
        }
        rewardDurationInSecond = _duration;
    }
    
    /**
     * @dev Notify the contract of the reward amount to be distributed.
     * @param _amount The amount of rewards to be distributed.
     */
    function notifyRewardAmount(uint _amount) external onlyOwner {
        updateRewardFor(address(0));
        
        if (block.timestamp >= rewardFinishTimeInSecond) {
            rewardRatePerSecond = _amount / rewardDurationInSecond;
        } else {
            uint remainingRewards = (rewardFinishTimeInSecond - block.timestamp) * rewardRatePerSecond;
            rewardRatePerSecond = (_amount + remainingRewards) / rewardDurationInSecond;
        }

        if (rewardRatePerSecond <= 0) {
            revert RewardRateMustBeGreaterThanZero();
        }
        if (rewardRatePerSecond * rewardDurationInSecond >
            rewardsToken.balanceOf(address(this))) {
            revert RewardAmountExceedsBalance();
        }
        rewardFinishTimeInSecond = block.timestamp + rewardDurationInSecond;
        lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Stake tokens into the contract.
     * @param _amount The amount of tokens to stake.
     */
    function stakeTokens(uint _amount) external {
        if (_amount <= 0) {
            revert AmountMustBeGreaterThanZero();
        }

        updateRewardFor(msg.sender);
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakeBalanceOf[msg.sender] += _amount;
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    /**
     * @dev Withdraw staked tokens from the contract.
     * @param _amount The amount of tokens to withdraw.
     */
    function withdrawTokens(uint _amount) external {
        if (_amount <= 0) {
            revert AmountMustBeGreaterThanZero();
        }

        if (_amount > stakeBalanceOf[msg.sender]) {
            revert InsufficientFund();
        }
        
        updateRewardFor(msg.sender);
        stakeBalanceOf[msg.sender] -= _amount;
        totalStaked -= _amount;
        stakingToken.transfer(msg.sender, _amount);
        emit Withdrawn(msg.sender, _amount);
    }

    /**
     * @dev Claim available rewards for an account.
     */
    function claimRewards() external {
        updateRewardFor(msg.sender);
        uint rewards = rewardBalanceOf[msg.sender];
        if (rewards > 0) {
            rewardBalanceOf[msg.sender] = 0;
            rewardsToken.transfer(msg.sender, rewards);
            emit RewardsClaimed(msg.sender, rewards);
        }
    }

    /**
     * @dev Update the reward information for an account.
     * @param _account The account for which to update rewards.
     */
    function updateRewardFor(address _account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastApplicableTime();

        if (_account != address(0)) {
            rewardBalanceOf[_account] = earnedRewardsFor(_account);
            rewardPerTokenPaidOf[_account] = rewardPerTokenStored;
        }
    }

    /**
     * @dev Calculate and return the rewards per token.
     * @return The rewards per token.
     */
    function rewardPerToken() public view returns (uint) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }

        uint timeDifference = lastApplicableTime() - lastUpdateTime;
        uint rewardPerTokenIncrement = (rewardRatePerSecond * timeDifference * 1e18) / totalStaked;

        return rewardPerTokenStored + rewardPerTokenIncrement;
    }

    /**
     * @dev Return the last time the reward was applicable.
     * @return The last applicable time.
     */
    function lastApplicableTime() public view returns (uint) {
        return _min(rewardFinishTimeInSecond, block.timestamp);
    }

    /**
     * @dev Calculate the amount of rewards earned by an account.
     * @param _account The account for which to calculate the rewards.
     * @return The amount of rewards earned.
     */
    function earnedRewardsFor(address _account) public view returns (uint) {
        uint rewardPerTokenDifference = rewardPerToken() - rewardPerTokenPaidOf[_account];
        uint earnedIncrement = (stakeBalanceOf[_account] * rewardPerTokenDifference) / 1e18;

        uint totalEarned = earnedIncrement + rewardBalanceOf[_account];
        return totalEarned;
    }

    /**
     * @dev Return the minimum of two numbers.
     * @param x The first number.
     * @param y The second number.
     * @return The minimum of the two numbers.
     */
    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }
}
