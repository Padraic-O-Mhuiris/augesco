import React, { Component } from 'react'
import SampleModelView from "./components/SampleModelView"
import Web3Gate from "./components/web3Components/web3Gate"

class App extends Component {
  render () {
    return (
      <Web3Gate>
        <div className='uk-container'> 
          <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>

          <SampleModelView sampleModel={this.props.sampleModel}/>
        </div>
      </Web3Gate>
    )
  }
}

export default App;
