const hre = require("hardhat");

const addresses = require("../../frontend/src/constants/index.js")

async function main() {
  const signers = await ethers.getSigners();
  const stakingToken = await hre.ethers.getContractAt("StakingToken", addresses.StakingToken);

  for (let i=1; i < signers.length; i++)
    await stakingToken.connect(signers[0]).transfer(signers[i].address, 100_000)
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
