const { ethers } = require("hardhat");

async function deployMeInPlacesInstanceAndMint () {
    const MeInPlaces = await ethers.getContractFactory("MeInPlaces");
    const deployedInstance = await MeInPlaces.deploy();
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    await deployedInstance.deployed();
    const connectedInstance = await deployedInstance.connect(owner);
    callOwnerToMint = async () => { return await connectedInstance.safeMint(owner.address) };

    return {
        deployedInstance,
        connectedInstance,
        callOwnerToMint,
        owner,
        addr1,
        addr2,
        addr3
    };
}

module.exports = {
    deployMeInPlacesInstanceAndMint,
}