var Counter = artifacts.require("./Counter.sol");
var Ipfs = artifacts.require("./Ipfs.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Counter, 20)
  await deployer.deploy(Ipfs)
};
