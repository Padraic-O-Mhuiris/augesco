import React, { Component } from "react";
import Web3Gate from "./components/web3Gate";
import "./assets/less/index";

import AppContent from "./components/appComponents/appContent";

const contractCounter = require("../build/contracts/Counter.json");
const contractIpfs = require("../build/contracts/Ipfs.json");

class App extends Component {
  render() {
    return (
      <Web3Gate
        contracts={[contractCounter, contractIpfs]}
        event_providers={{
          main: "wss://mainnet.infura.io/ws",
          rinkeby: "wss://rinkeby.infura.io/ws",
          local: "ws://127.0.0.1:8545"
        }}
        ipfs_provider={{
          host: "ipfs.infura.io",
          port: "5001",
          protocol: "https"
        }}
      >
        <AppContent />
      </Web3Gate>
    );
  }
}

export default App;
