// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const stakingTokenTotalSupply = hre.ethers.parseEther("100_000_000_000")
  const stakingToken = await hre.ethers.deployContract(
    "StakingToken", [stakingTokenTotalSupply])
  await stakingToken.waitForDeployment()
  console.log(`StakingToken contract deployed to ${stakingToken.target}`)

  const rewardsTokenTotalSupply = hre.ethers.parseEther("100_000_000_000")
  const rewardsToken = await hre.ethers.deployContract(
    "StakingToken", [rewardsTokenTotalSupply])
  await rewardsToken.waitForDeployment()
  console.log(`StakingToken contract deployed to ${rewardsToken.target}`)

  const stakingRewards = await hre.ethers.deployContract(
    "StakingRewards", [stakingToken.target, rewardsToken.target])
  await stakingRewards.waitForDeployment()
  console.log(`StakingRewards contract deployed to ${stakingRewards.target}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
