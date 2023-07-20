// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const path = require('path');
const fs = require("fs");

const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const stakingTokenTotalSupply = ethers.utils.parseUnits("1000000","ether")
  const stakingToken = await hre.ethers.deployContract(
    "StakingToken", [stakingTokenTotalSupply])
  console.log(`StakingToken contract deployed to ${stakingToken.address}`)

  const rewardsTokenTotalSupply = ethers.utils.parseUnits("1000000","ether")
  const rewardsToken = await hre.ethers.deployContract(
    "RewardsToken", [rewardsTokenTotalSupply])
  console.log(`RewardsToken contract deployed to ${rewardsToken.address}`)

  const stakingRewards = await hre.ethers.deployContract(
    "StakingRewards", [stakingToken.address, rewardsToken.address])
  console.log(`StakingRewards contract deployed to ${stakingRewards.address}`)

  const outDir0 = path.resolve('../frontend/src/constants/addresses.js')
  
  const data0 = `export const addresses = {
  StakingToken: "${stakingToken.address}",
  RewardsToken: "${rewardsToken.address}",
  StakingRewards: "${stakingRewards.address}"
}
`
  fs.writeFileSync(outDir0, data0);

  const outDir1 = path.resolve('../frontend/src/constants/index.js')
  const data1 = `module.exports = {
  StakingToken: "${stakingToken.address}",
  RewardsToken: "${rewardsToken.address}",
  StakingRewards: "${stakingRewards.address}"
}
`
  fs.writeFileSync(outDir1, data1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
