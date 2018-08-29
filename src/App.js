import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import "./assets/less/index"

import AppContent from "./components/appComponents/appContent"

/**
 * Declare your application specific contracts here
 */
const contractCounter = require("../build/contracts/Counter.json")

@inject("augesco")
@observer class App extends Component {
  render() {
    console.log(this.props)
    return (
      <Web3Gate
        /**
         * pass the declared contract objects as props here
         */
        contracts={[
          contractCounter
        ]}

        /**
         * declare websocket endpoints for event management here
         */
        event_providers={{
          main: "wss://mainnet.infura.io/ws",
          rinkeby: "wss://rinkeby.infura.io/ws",
          local: "ws://127.0.0.1:8545"
        }}
      >
        {
          // AppContent can be deleted
        }
        <AppContent />
        
      </Web3Gate>
    )
  }
}

export default App;
