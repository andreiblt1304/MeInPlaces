const { ethers } = require("hardhat");
const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("MeInPlaces", function () {
    let accounts;

    beforeEach(async () => {
        MeInPlaces = await ethers.getContractFactory("MeInPlaces");
        [owner, addr1] = await ethers.getSigners();
        meInPlaces = await MeInPlaces.deploy();
        await meInPlaces.deployed();
    });

    it("Should credit a NFT to a specific account", async function () {
        let txResult = await meInPlaces.safeMint(owner.address); 

        await expect(txResult)
            .to.emit(meInPlaces, "Transfer")
            .withArgs(
                "0x0000000000000000000000000000000000000000", 
                owner.address, 
                BigNumber.from("0")
            );
    });

    it("Should deploy the contract with correct name and symbol", async () => {
        const name = await meInPlaces.name();
        const symbol = await meInPlaces.symbol();
    
        expect(name).to.equal("MeInPlaces");
        expect(symbol).to.equal("BLT");
    });
    
    it("Should mint a new NFT to a specific account", async () => {
        await meInPlaces.connect(owner).safeMint(addr1.address);
        const ownerOfToken = await meInPlaces.ownerOf(0);
    
        expect(ownerOfToken).to.equal(addr1.address);
    });
    
    it("Should have correct base URI", async () => {
        const baseURI = await meInPlaces.getBaseURI();
    
        expect(baseURI.startsWith("https://andreiblt1304.github.io/MeInPlaces-metadata/"));
    });
    
    it("Should return correct token URI", async () => {
        await meInPlaces.connect(owner).safeMint(addr1.address);
        const tokenURI = await meInPlaces.tokenURI(0);
    
        expect(tokenURI).to.include("https://andreiblt1304.github.io/MeInPlaces-metadata/");
        expect(tokenURI).to.match(/(\d+)\.json$/);
    });
});