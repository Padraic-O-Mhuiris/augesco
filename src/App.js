import React, { Component } from 'react'
import Web3Gate from "./components/web3Components/web3Gate"
import { inject } from "mobx-react"

@inject("web3Store")
class App extends Component {
  render () {
    return (
      <Web3Gate>
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>
          {JSON.stringify(this.props.web3Store.instance)}
        </div>
      </Web3Gate>
    )
  }
}

export default App;
