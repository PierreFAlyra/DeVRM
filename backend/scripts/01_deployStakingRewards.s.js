// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const path = require('path');
const fs = require("fs");

const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const stakingTokenTotalSupply = 100_000_000_000
  const stakingToken = await hre.ethers.deployContract(
    "StakingToken", [stakingTokenTotalSupply])
  console.log(`StakingToken contract deployed to ${stakingToken.address}`)

  const rewardsTokenTotalSupply = 100_000_000_000
  const rewardsToken = await hre.ethers.deployContract(
    "RewardsToken", [rewardsTokenTotalSupply])
  console.log(`RewardsToken contract deployed to ${rewardsToken.address}`)

  const stakingRewards = await hre.ethers.deployContract(
    "StakingRewards", [stakingToken.address, rewardsToken.address])
  console.log(`StakingRewards contract deployed to ${stakingRewards.address}`)

  const outDir = path.resolve('../frontend/src/constants/addresses.js')
  const data = `export const addresses = {
  StakingToken: "${stakingToken.address}",
  RewardsToken: "${rewardsToken.address}",
  StakingRewards: "${stakingRewards.address}"
}
`
  fs.writeFileSync(outDir, data);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
