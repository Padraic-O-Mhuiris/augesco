import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import { netContext } from "./constants"

const contractCounter = require("../build/contracts/Counter.json")

@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {
  constructor(props) {
    super(props)

    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
  }

  async handleClick1() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    console.log(await contractStore.call("Counter", "getCount", []))
  }

  async handleClick2() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    const x = await contractStore.exec("Counter", "incCount", [], {
      "from": web3Store.account
    })
    try {
      if(await x.status) {
        console.log("Transaction mined")
        await this.handleClick1()
      }
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    contractStore.call("Counter", "getCount", []).then(res => {
      console.log(res)
    })
    
    // console.log(contractStore.use("Counter").exec("method", [params], {
    //   from: "",
    //   gasPrice: "",
    //   gas: "",
    //   value: ""
    // }))
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
          <button className="uk-button uk-button-default" onClick={this.handleClick1}>Click Me [1]</button>
          <button className="uk-button uk-button-default" onClick={this.handleClick2}>Click Me [2]</button>

          <br/>
        </div>
      </Web3Gate>
    )
  }
}

export default App;
