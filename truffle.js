const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "";
const INFURA_Access_Token = ""


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
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + INFURA_Access_Token)
      },
      network_id: 3,
      gas: 5786536
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + INFURA_Access_Token)
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
