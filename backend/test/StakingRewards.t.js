const { expect } = require("chai");
const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("StakingRewards", function() {

  let owner
  let users = []
  let stakingToken
  let rewardsToken
  let stakingRewards

  async function deployStakingToken(totalSupply) {
    return await ethers.deployContract("StakingToken", [totalSupply])
  }

  async function deployRewardsToken(totalSupply) {
    return await ethers.deployContract("RewardsToken", [totalSupply])
  }

  async function deployStakingRewards() {
    return await ethers.deployContract(
      "StakingRewards", [stakingToken.address, rewardsToken.address])
  }

  async function deployStakingRewardsWithTokens() {
    [owner, users[0], users[1], users[2]] = await ethers.getSigners();
    
    const totalSupply = 100e+9
    stakingToken = await deployStakingToken(totalSupply)
    rewardsToken = await deployRewardsToken(totalSupply)
    stakingRewards = await deployStakingRewards()

    return totalSupply
  }

  async function deployStakingRewardsWithRewardsParams() {
    const totalSupply = await deployStakingRewardsWithTokens()

    // Transfer reward token to stakingRewards contract address
    const amount = totalSupply - 10000
    await rewardsToken.connect(owner)
      .transfer(stakingRewards.address, amount)

    const durationInSec = 1000000000
    await stakingRewards.connect(owner).setRewardDuration(durationInSec)
    
    const RewardsAmount = durationInSec * 10
    await stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount)

    return {
      totalSupply,
      durationInSec,
      RewardsAmount
    }
  }

  async function deployStakingRewardsWithAllowances() {
    const { totalSupply } = await deployStakingRewardsWithRewardsParams()

    const userStakingTokenBalance = totalSupply/(users.length+1)
    await distributeStakingToken(owner, users, userStakingTokenBalance)

    const amountOfStakingTokenApprove = userStakingTokenBalance/2
    await approveStakingRewardsContract(users, amountOfStakingTokenApprove)
    
    return {
      userStakingTokenBalance,
      amountOfStakingTokenApprove
    }
  }

  async function distributeStakingToken(from, to, amount) {
    for (let i=0; i < users.length; i++)
      await stakingToken.connect(from).transfer(to[i].address, amount)
  }

  async function approveStakingRewardsContract(from, amount) {
    for (let i=0; i < users.length; i++)
      await stakingToken.connect(from[i]).approve(stakingRewards.address, amount)
  }  

  async function deployStakingRewardsWithStakes() {
    const { userStakingTokenBalance, amountOfStakingTokenApprove } =
          await deployStakingRewardsWithAllowances()

    const amountStakePerUser = amountOfStakingTokenApprove/2
    await stakeTokens(users, amountStakePerUser)

    return {
      userStakingTokenBalance,
      amountOfStakingTokenApprove,
      amountStakePerUser
    }
  }

  async function stakeTokens(from, amount) {
    for (let i = 0; i < users.length; i++)
      await stakingRewards.connect(from[i]).stakeTokens(amount)
  }

  describe("Adminisration", function () {
    describe("Set reward duration ", function () {

      it("should revert if not the owner", async () => {
        await loadFixture(deployStakingRewardsWithTokens)

        const durationInSec = 100000
        await expect(
          stakingRewards.connect(users[0]).setRewardDuration(durationInSec))
          .to.be.revertedWith("Ownable: caller is not the owner")
      })

      it("shoud update reward duration", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)

        const durationInSec = 100000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        expect(await stakingRewards.connect(owner).rewardDurationInSecond())
          .to.equal(durationInSec)
      })      

      it("should revert if last staking reward session is not finsh", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)

        // Transfer reward token to stakingRewards contract address
        const amount = totalSupply - 10000
        await rewardsToken.connect(owner)
          .transfer(stakingRewards.address, amount)

        const durationInSec = 1000000000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        const RewardsAmount = durationInSec * 10
        await stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount)
        
        await expect(
          stakingRewards.connect(owner).setRewardDuration(durationInSec))
          .to.be.revertedWithCustomError(
            stakingRewards, "RewardDurationNotFinished")
      })
    })

    describe("Notify the reward amount to be distributed ", function () {
      it("should revert if not the owner", async () => {
        await loadFixture(deployStakingRewardsWithTokens)
        const RewardsAmount = 0
        await expect(
          stakingRewards.connect(users[1]).notifyRewardAmount(RewardsAmount))
          .to.be.revertedWith("Ownable: caller is not the owner")
      })

      it("should revert if reward rate is null", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)

        // Transfer reward token to stakingRewards contract address
        const amount = totalSupply - 10000
        await rewardsToken.connect(owner)
          .transfer(stakingRewards.address, amount)

        const durationInSec = 1000000000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        const RewardsAmount = 0
        await expect(
          stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount))
          .to.be.revertedWithCustomError(
            stakingRewards, "RewardRateMustBeGreaterThanZero")
      })

      it("should revert if reward amount exceeds balance", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)

        const durationInSec = 1000000000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        const RewardsAmount = durationInSec * 10
        await expect(
          stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount))
          .to.be.revertedWithCustomError(
            stakingRewards, "RewardAmountExceedsBalance")
      })


      it("should initialize reward rate", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)

        // Transfer reward token to stakingRewards contract address
        const amount = totalSupply - 10000
        await rewardsToken.connect(owner)
          .transfer(stakingRewards.address, amount)

        const durationInSec = 1000000000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        const RewardsAmount = durationInSec * 10
        await stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount)
        
        expect(await stakingRewards.connect(owner).rewardRatePerSecond())
          .to.equal(RewardsAmount / durationInSec)
      })
      
      it("should update reward rate from the previous session", async () => {
        const totalSupply = await loadFixture(deployStakingRewardsWithTokens)
        
        // Transfer reward token to stakingRewards contract address
        const amount = totalSupply - 10000
        await rewardsToken.connect(owner)
          .transfer(stakingRewards.address, amount)

        const durationInSec = 1000000000
        await stakingRewards.connect(owner).setRewardDuration(durationInSec)
        
        const RewardsAmount = durationInSec * 10
        await stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount)

        const HOUR = 3600
        await helpers.time.increase(HOUR);

        await stakingRewards.connect(owner).notifyRewardAmount(RewardsAmount)

        const actual = await stakingRewards.connect(owner).rewardRatePerSecond()
        expect(actual).to.equal(actual)
      })
    })
  })

  describe("Stake tokens", function () {
    it("should revert if staking amount is not greater than zero", async () => {
      await loadFixture(deployStakingRewardsWithAllowances)

      await expect(
        stakingRewards.connect(users[0]).stakeTokens(0))
        .to.be.revertedWithCustomError(
          stakingRewards, "AmountMustBeGreaterThanZero")
    })

    it("should revert if staking amount is greater than the allowance", async () => {
      const { amountOfStakingTokenApprove } =
            await loadFixture(deployStakingRewardsWithAllowances)

      await expect(
        stakingRewards.connect(users[0]).stakeTokens(amountOfStakingTokenApprove+1))
        .to.be.revertedWith("ERC20: insufficient allowance")
    })

    it("should increase staking rewards contract balance", async () => {
      const { amountOfStakingTokenApprove } =
            await loadFixture(deployStakingRewardsWithAllowances)
      
      const amount = amountOfStakingTokenApprove/2
      await stakingRewards.connect(users[0]).stakeTokens(amount)
      
      const balanceOfStakingRewards = await stakingToken.balanceOf(stakingRewards.address)
      expect(balanceOfStakingRewards).to.equal(amount)
    })

    it("should increase user stake balance", async () => {
      const { amountOfStakingTokenApprove } =
            await loadFixture(deployStakingRewardsWithAllowances)

      const amount = amountOfStakingTokenApprove/2
      await stakingRewards.connect(users[0]).stakeTokens(amount)

      const userStakeBalance = await stakingRewards.stakeBalanceOf(users[0].address)
      expect(userStakeBalance).to.equal(amount)
    })

    it("should increase the total stake supply ", async () => {
      const { amountOfStakingTokenApprove } =
            await loadFixture(deployStakingRewardsWithAllowances)

      const amountStakePerUser = amountOfStakingTokenApprove/2
      let expectedTotalStaked = 0
      for (let i = 0; i < users.length; i++) {
        await stakingRewards.connect(users[i]).stakeTokens(amountStakePerUser)
        expectedTotalStaked += amountStakePerUser
      }
      
      const actualTotalStaked = await stakingRewards.totalStaked()
      expect(actualTotalStaked).to.equal(expectedTotalStaked)
    })

    it("should emit Staked event", async () => {
      const { amountOfStakingTokenApprove } =
            await loadFixture(deployStakingRewardsWithAllowances)
      
      await expect(
        stakingRewards.connect(users[0]).stakeTokens(amountOfStakingTokenApprove))
        .to.emit(stakingRewards, "Staked")
        .withArgs(users[0].address, amountOfStakingTokenApprove)
    })
  })

  describe("Withdraw staked tokens", function () {
    it('should revert if withdrawal amount is not greater than zero ', async () => {
      await loadFixture(deployStakingRewardsWithStakes)
      await expect(
        stakingRewards.connect(users[0]).withdrawTokens(0))
        .to.be.revertedWithCustomError(
          stakingRewards, "AmountMustBeGreaterThanZero")
    })

    it("should revert if user withdraw more than staked", async () => {
      const { amountStakePerUser } =
            await loadFixture(deployStakingRewardsWithStakes)

      await expect(
        stakingRewards.connect(users[0]).withdrawTokens(amountStakePerUser+1))
        .to.be.revertedWithCustomError(
          stakingRewards, "InsufficientFund")
    })

    it("should decrease user staking balance", async () => {
      const { amountStakePerUser } =
            await loadFixture(deployStakingRewardsWithStakes)

      const amountWithdraw = amountStakePerUser/2
      await stakingRewards.connect(users[0]).withdrawTokens(amountWithdraw)
      
      const userStakeBalance = await stakingRewards.stakeBalanceOf(users[0].address)
      expect(userStakeBalance).to.equal(amountStakePerUser - amountWithdraw)
    })

    it("should decrease the total stake supply ", async () => {
      const { amountStakePerUser } =
            await loadFixture(deployStakingRewardsWithStakes)

      const amountWithdrawPerUser = amountStakePerUser
      let expectedTotalStaked = amountStakePerUser*users.length
      for (let i = 0; i < users.length; i++) {
        await stakingRewards.connect(users[i]).withdrawTokens(amountWithdrawPerUser)
        expectedTotalStaked -= amountWithdrawPerUser
      }
      
      const actualTotalStaked = await stakingRewards.totalStaked()
      expect(actualTotalStaked).to.equal(expectedTotalStaked)
    })

    it("should increase user staking token balance", async () => {
      const { userStakingTokenBalance, amountStakePerUser } =
            await loadFixture(deployStakingRewardsWithStakes)

      const amountWithdraw = amountStakePerUser/2
      await stakingRewards.connect(users[0]).withdrawTokens(amountWithdraw)

      const balanceExpected =
            userStakingTokenBalance -
            amountStakePerUser +
            amountWithdraw

      const balanceOfStakingToken = await stakingToken.balanceOf(users[0].address)
      expect(balanceOfStakingToken).to.equal(balanceExpected)
    })

    it("should emit Withdrawn event", async () => {
      const { amountStakePerUser } =
            await loadFixture(deployStakingRewardsWithStakes)
      
      const amount = amountStakePerUser/2
      await expect(
        stakingRewards.connect(users[0]).withdrawTokens(amount))
        .to.emit(stakingRewards, "Withdrawn")
        .withArgs(users[0].address, amount)
    })
  })

  describe("Claim rewards tokens", function () {
    it("should emit RewardsClaimed event", async () => {
      await loadFixture(deployStakingRewardsWithStakes)
      
      const HOUR = 3600
      await helpers.time.increase(HOUR);
      const amount = await stakingRewards.connect(users[0]).earnedRewardsFor(users[0].address)
      await expect(
        stakingRewards.connect(users[0]).claimRewards())
        .to.emit(stakingRewards, "RewardsClaimed")
        .withArgs(users[0].address, amount.add(3))
      
    })

    it("should not transfer reward when rewards amount is null ", async () => {
      await loadFixture(deployStakingRewardsWithRewardsParams)
      await stakingRewards.connect(users[0]).claimRewards()

      const rewardsBalance = await stakingRewards.stakeBalanceOf(users[0].address)
      expect(rewardsBalance).to.equal(0)
    })
  })
})
