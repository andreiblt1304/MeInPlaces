require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");
require("chai");

const fs = require("fs");
const infuraProjectId = fs.readFileSync(".infura").toString().trim();
const privateKey = fs.readFileSync(".env").toString().trim();
const etherscanKey = fs.readFileSync(".etherscan").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      // settings for the Hardhat Network (local development)
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey],
      gasPrice: "auto", // 15 Gwei
      ovm: true
    }
  },
  etherscan: {
    apiKey: etherscanKey
  }
};
