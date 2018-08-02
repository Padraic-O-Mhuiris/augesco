import React, { Component } from 'react'
import Web3Gate from "./components/web3Components/web3Gate"
import { inject, observer } from "mobx-react"
import { netContext } from "./constants"


@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {

  componentDidMount() {
    this.props.contractStore.add("s", "Hello my name is patrick")
    this.props.contractStore.add("e", "Hello my name is eli")


    console.log(this.props.contractStore.contracts.get("s").abi)
    console.log(this.props.contractStore.contracts.get("e").abi)
    console.log(this.props.contractStore.json)
    this.props.contractStore.delete("e")
    console.log(this.props.contractStore.values.length)
  }

  render () {
    
    return (
      <Web3Gate 
        networks={[
          netContext.LOCAL,
          netContext.MAIN,
          netContext.ROPESTEN
        ]}
      >
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>
          {this.props.web3Store.account}
          <br/>
          {this.props.web3Store.status}
          <br/>
          {this.props.web3Store.balance}
          <br/>
          {this.props.web3Store.network}
          <br/>
          {this.props.web3Store.balanceEth.balance} {this.props.web3Store.balanceEth.denom}
          <br/>
          {this.props.web3Store.balanceGwei.balance} {this.props.web3Store.balanceGwei.denom}
          <br/>
          {this.props.web3Store.balanceWei.balance} {this.props.web3Store.balanceWei.denom}
        </div>
      </Web3Gate>
    )
  }
}

export default App;
