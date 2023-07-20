# Smart Contract - StakingRewards.sol

The smart contract "StakingRewards.sol" is implemented in Solidity and provides the functionality for staking and earning rewards. It includes the following features:

- Staking: Users can stake their tokens into the contract by calling the `stakeTokens` function, which locks their tokens in the contract until they decide to withdraw.

- Unstaking: Users can withdraw their staked tokens from the contract by calling the `withdrawTokens` function. They can only withdraw an amount up to their current staked balance.

- Reward Distribution: The contract owner can notify the contract of the reward amount to be distributed by calling the `notifyRewardAmount` function. Rewards are distributed over a specified reward duration.

- Reward Claiming: Users can claim their available rewards by calling the `claimRewards` function.

## Contract Variables

- `stakingToken`: The ERC20 token contract address used for staking.
- `rewardsToken`: The ERC20 token contract address used for rewards distribution.
- `rewardDurationInSecond`: The duration of rewards distribution in seconds.
- `rewardFinishTimeInSecond`: The timestamp when the reward distribution will end.
- `lastUpdateTime`: The timestamp of the last update of the reward data.
- `rewardRatePerSecond`: The rate at which rewards are distributed per second.
- `rewardPerTokenStored`: The total rewards earned per token staked.
- `rewardPerTokenPaidOf`: A mapping to keep track of rewards per token paid to each staker.
- `rewardBalanceOf`: A mapping to store the rewards earned by each staker.
- `totalStaked`: The total amount of tokens staked in the contract.
- `stakeBalanceOf`: A mapping to keep track of the staked balance of each staker.

## Contract Functions

- `setRewardDuration(uint _duration)`: Allows the contract owner to set the duration of rewards distribution.

- `notifyRewardAmount(uint _amount)`: Allows the contract owner to notify the contract of the reward amount to be distributed.

- `stakeTokens(uint _amount)`: Allows users to stake tokens into the contract.

- `withdrawTokens(uint _amount)`: Allows users to withdraw their staked tokens from the contract.

- `claimRewards()`: Allows users to claim their available rewards.

- `updateRewardFor(address _account)`: Internal function to update the reward information for an account.

- `rewardPerToken()`: Public function to calculate and return the rewards per token.

- `lastApplicableTime()`: Public function to return the last time the reward was applicable.

- `earnedRewardsFor(address _account)`: Public function to calculate the amount of rewards earned by an account.

- `_min(uint x, uint y)`: Private function to return the minimum of two numbers.

## Usage

To use the dApp, follow these steps:

1. Deploy the "StakingRewards" smart contract by providing the addresses of the staking token and reward token.

2. The contract owner should set the reward duration using the `setRewardDuration` function.

3. The contract owner should notify the contract of the reward amount using the `notifyRewardAmount` function.

4. Users can stake their tokens using the `stakeTokens` function.

5. Users can check their earned rewards using the `earnedRewardsFor` function.

6. Once the reward duration is complete, users can claim their available rewards using the `claimRewards` function.

7. Users can also withdraw their staked tokens using the `withdrawTokens` function.

Happy staking and earning rewards! 🚀
