const MeInPlaces = artifacts.require("MeInPlaces");
const truffleAssert = require("truffle-assertions");

contract("MeInPlaces", (accounts) => {
    it("Should credit a NFT to a specific account", async() => {
        const meInstance = await MeInPlaces.deployed();
        let txResult = await meInstance.safeMint(accounts[1], "700.json");

        truffleAssert.eventEmitted(
            txResult, 
            "Transfer", 
            { 
                from: "0x0000000000000000000000000000000000000000", 
                to: accounts[1], 
                tokenId: web3.utils.toBN("0")
            }
        );

        assert.equal(
            await meInstance.ownerOf(0), 
            accounts[1], 
            "Owner of Token 1 is not equal to account 2"
        );

        
    })
})