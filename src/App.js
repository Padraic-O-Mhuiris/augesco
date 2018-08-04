import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import { netContext } from "./constants"

const contractCounter = require("../build/contracts/Counter.json")

@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {

  render () {
    const { contractStore } = this.props
    const { web3Store } = this.props
    console.log(contractStore.use("Counter"))
    return (
      <Web3Gate 
        networks={[
          netContext.LOCAL,
          netContext.MAIN,
          netContext.ROPESTEN
        ]}
        contracts={[
          contractCounter
        ]}
      >
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>
          {web3Store.account}
          <br/>
          {web3Store.status}
          <br/>
          {web3Store.balance}
          <br/>
          {web3Store.network}
          <br/>
          {web3Store.balanceEth.balance} {web3Store.balanceEth.denom}
          <br/>
          {web3Store.balanceGwei.balance} {web3Store.balanceGwei.denom}
          <br/>
          {web3Store.balanceWei.balance} {web3Store.balanceWei.denom}
          <br/>
          {contractStore.loaded.toString()}
          <br/>
          {contractStore.use("Counter").address} contract address
          <br/>
        </div>
      </Web3Gate>
    )
  }
}

export default App;
