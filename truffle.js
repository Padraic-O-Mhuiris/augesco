const HDWalletProvider = require("truffle-hdwallet-provider");
const config = require('./truffle-config')


module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(config.MNEMONIC, "https://ropsten.infura.io/" + config.INFURA_KEY)
      },
      network_id: 3,
      gas: 5786536
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(config.MNEMONIC, "https://rinkeby.infura.io/" + config.INFURA_KEY)
      },
      network_id: 4,
      gas: 4712356
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
