// scripts/deploy.js
(async () => {
  try {
    const hre = require("hardhat");

    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
  
    const MeInPlaces = await hre.ethers.getContractFactory("MeInPlaces");
    const meInPlaces = await MeInPlaces.deploy();
  
    await meInPlaces.deployed();
  
    console.log("MeInPlaces contract deployed to:", meInPlaces.address);
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  }
}) ()