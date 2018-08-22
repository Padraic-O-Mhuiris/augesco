const HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('./account-config')

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      skipDryRun: true
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(config.MNEMONIC, "https://ropsten.infura.io/" + config.INFURA_KEY)
      },
      network_id: 3,
      gas: 5786536,
      skipDryRun: true

    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(config.MNEMONIC, "https://rinkeby.infura.io/" + config.INFURA_KEY)
      },
      network_id: 4,
      gas: 4712356,
      skipDryRun: true
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
