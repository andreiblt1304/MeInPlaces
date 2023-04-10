const MeInPlaces = artifacts.require("MeInPlaces");

module.exports = function(deployer) {
    deployer.deploy(MeInPlaces);        //{replace: network == 'develop'}
}