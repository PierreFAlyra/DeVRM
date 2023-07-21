const hre = require("hardhat");

const addresses = require("../../frontend/src/constants/index.js")

async function main() {

  function daysToSeconds(days) {
    const secondsInDay = 86400; 
    return days * secondsInDay 
  }

  const signers = await ethers.getSigners();
  const stakingRewards = await hre.ethers.getContractAt("StakingRewards", addresses.StakingRewards);

  const durationInSec = daysToSeconds(10)
  await stakingRewards.connect(signers[0]).setRewardDuration(durationInSec)

  const RewardsAmount = 1000 * durationInSec
  await stakingRewards.connect(signers[0]).notifyRewardAmount(RewardsAmount)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
