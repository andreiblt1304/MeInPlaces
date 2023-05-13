// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MeInPlaces = await hre.ethers.getContractFactory("MeInPlaces");
  const meInPlaces = await MeInPlaces.deploy();

  await meInPlaces.deployed();

  console.log("MeInPlaces contract deployed to:", meInPlaces.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
