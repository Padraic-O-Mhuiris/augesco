import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"

const contractCounter = require("../build/contracts/Counter.json")

@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {
  constructor(props) {
    super(props)

    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleClick3 = this.handleClick3.bind(this)
    this.handleClick4 = this.handleClick4.bind(this)
    this.handleClick5 = this.handleClick5.bind(this)
  }

  async handleClick1() {
    const { contractStore } = this.props
    console.log(await contractStore.call("Counter", "getCount", []))    
  }

  async handleClick2() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "incCount", [], {
      "from": web3Store.account
    })
  }

  async handleClick3() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "changeCount", [-1], {
      "from": web3Store.account
    })
  }

  async handleClick4() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "decCount", [], {
      "from": web3Store.account
    })
  }

  async handleClick5() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    await contractStore.exec("Counter", "changeCount", [20], {
      "from": web3Store.account
    })
  }

  render () {
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
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>
          <button className="uk-button uk-button-default" onClick={this.handleClick1}>Get Count</button>
          <br/>
          <button className="uk-button uk-button-default" onClick={this.handleClick2}>Increment Count</button>
          <br/>
          <button className="uk-button uk-button-default" onClick={this.handleClick3}>Change count to -1</button>
          <br/>
          <button className="uk-button uk-button-default" onClick={this.handleClick4}>Decrement Count</button>
          <br/>
          <button className="uk-button uk-button-default" onClick={this.handleClick5}>Reset Count</button>

          <br/>
        </div>
      </Web3Gate>
    )
  }
}

export default App;
