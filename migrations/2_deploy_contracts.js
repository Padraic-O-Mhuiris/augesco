var Counter = artifacts.require("./Counter.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Counter, 20)
};
