require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

const PK = process.env.PK || ""
const URL_RPC = process.env.URL_RPC || ""
const ETHERSCAN = process.env.ETHERSCAN || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
defaultNetwork: "hardhat",
  network: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    sepolia: {
      url: URL_RPC,
      accounts: [`0x${PK}`],
      chainId: 11155111
    }
  },  

  solidity: "0.8.18",

  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN
    }
  }  
};
