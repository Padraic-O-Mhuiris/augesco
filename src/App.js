import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import "./assets/less/index"

import AppContent from "./components/appComponents/appContent"

/**
 * Declare your application specific contracts here
 */
const contractCounter = require("../build/contracts/Counter.json")

class App extends Component {
  render() {
    return (
      <Web3Gate
      
        contracts={[
          contractCounter
        ]}

        event_providers={{
          main: "wss://mainnet.infura.io/ws",
          rinkeby: "wss://rinkeby.infura.io/ws",
          local: "ws://127.0.0.1:8545"
        }}
      >
        <AppContent /> 
      </Web3Gate>
    )
  }
}

export default App;
