const hre = require("hardhat");

const addresses = require("../../frontend/src/constants/index.js")

async function main() {

  const signers = await ethers.getSigners();
  const rewardsToken = await hre.ethers.getContractAt("RewardsToken", addresses.RewardsToken);

  await rewardsToken.connect(signers[0]).transfer(addresses.StakingRewards, ethers.utils.parseUnits("10000","ether"))

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
