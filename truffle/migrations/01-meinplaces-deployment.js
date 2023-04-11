const MeInPlaces = artifacts.require("MeInPlaces");

module.exports = function(deployer) {
    deployer.deploy(MeInPlaces);        //{replace: network == 'develop'}; args1, 2, 3 if constructor arguments
}