import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { txStatus } from '../../constants';

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {

  componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)

    // this.newBlockHeaders()

    contractStore.txEmitter.on(txStatus.NEW, (hash) => {
      console.log("Transaction Hash", hash)
    })

    contractStore.txEmitter.on(txStatus.PENDING, (data) => {
      console.log("Transaction Pending", data)
    })

    contractStore.txEmitter.on(txStatus.MINED, (data) => {
      console.log("Transaction Mined", data)
    })

    contractStore.txEmitter.on(txStatus.FAILED, (data) => {
      console.log("Transaction Failed", data)
    })

    contractStore.txEmitter.on(txStatus.SUCCESS, (data) => {
      console.log("Transaction Success", data)
    })
    
    contractStore.listen("Counter", "Increment", {}, ((err, event) => {
      console.log(event)
    }))
  }
    
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default EventGate;
