const { ethers } = require("hardhat");
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { deployMeInPlacesInstanceAndMint } = require('./fixtures');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("MeInPlaces", function () {
    let deployedInstance, connectedInstance, callOwnerToMint;
    let owner, addr1, addr2, addr3;

    beforeEach(async () => {
        ({ deployedInstance, connectedInstance, callOwnerToMint, owner, addr1, addr2, addr3}
            =  await deployMeInPlacesInstanceAndMint());
    });

    it("Should credit a NFT to a specific account", async function () {
        let txResult = await callOwnerToMint(); 

        await expect(txResult)
            .to.emit(deployedInstance, "Transfer")
            .withArgs(
                "0x0000000000000000000000000000000000000000", 
                owner.address, 
                BigNumber.from("0")
            );
    });

    it("Should deploy the contract with correct name and symbol", async () => {
        const name = await deployedInstance.name();
        const symbol = await deployedInstance.symbol();
    
        expect(name).to.equal("MeInPlaces");
        expect(symbol).to.equal("BLT");
    });
    
    it("Should mint a new NFT to a specific account", async () => {
        await connectedInstance.safeMint(addr1.address);
        const ownerOfToken = await deployedInstance.ownerOf(0);
    
        expect(ownerOfToken).to.equal(addr1.address);
    });
    
    it("Should have correct base URI", async () => {
        const baseURI = await deployedInstance.getBaseURI();
    
        expect(baseURI.startsWith("https://andreiblt1304.github.io/MeInPlaces-metadata/"));
    });
    
    it("Should return correct token URI", async () => {
        await connectedInstance.safeMint(addr1.address);
        const tokenURI = await deployedInstance.tokenURI(0);
    
        expect(tokenURI).to.include("https://andreiblt1304.github.io/MeInPlaces-metadata/");
        expect(tokenURI).to.match(/(\d+)\.json$/);
    });

    describe("Burning process", function () {
        it("Should allow the token owner to burn their tokens", async function () {
            await callOwnerToMint();
            await connectedInstance.burn(0);

            await expect(deployedInstance.ownerOf(0)).to.be.revertedWith("ERC721: invalid token ID");
        });
    
        it("Should not allow non-owners to burn tokens", async function () {
            await callOwnerToMint();
            await expect(deployedInstance.connect(addr1).burn(0)).to.be.revertedWith("ERC721: caller is not owner nor approved");
        });
    });

    describe("Minting process", function () {
        it("Should allow the contract owner to mint tokens", async function () {
            await connectedInstance.safeMint(addr1.address);
            expect(await deployedInstance.ownerOf(0)).to.equal(addr1.address);
        });
    
        it("Should not allow non-owners to mint tokens", async function () {
            await expect(deployedInstance.connect(addr1).safeMint(addr2.address)).to.be.revertedWith("Ownable: caller is not the owner");
        });
    
        it("Should increment token ID correctly after each minting", async function () {
            await connectedInstance.safeMint(addr1.address);
            await connectedInstance.safeMint(addr2.address);
            await connectedInstance.safeMint(addr3.address);
    
            expect(await deployedInstance.ownerOf(0)).to.equal(addr1.address);
            expect(await deployedInstance.ownerOf(1)).to.equal(addr2.address);
            expect(await deployedInstance.ownerOf(2)).to.equal(addr3.address);
        });
    
        it("Should assign the correct number of tokens to the recipient's address after minting", async function () {
            await connectedInstance.safeMint(addr1.address);
            await connectedInstance.safeMint(addr1.address);
    
            expect(await deployedInstance.balanceOf(addr1.address)).to.equal(2);
        });
    });
});