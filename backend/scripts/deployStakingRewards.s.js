// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const stakingRewards = await hre.ethers.deployContract("StakingRewards");
  await stakingRewards.waitForDeployment();
  console.log(`StakingRewards contract deployed to ${stakingRewards.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
