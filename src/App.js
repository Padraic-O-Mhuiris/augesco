import React, { Component } from 'react'
import Web3Gate from "./components/web3Components/web3Gate"
import { inject, observer } from "mobx-react"
import { netContext } from "./constants"

@inject("web3Store")
@observer class App extends Component {
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
        </div>
      </Web3Gate>
    )
  }
}

export default App;
