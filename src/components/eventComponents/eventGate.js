import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { txStatus } from '../../constants';
import UIkit from 'uikit'

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
      UIkit.notification({
        message: 'New Transaction',
        pos: 'bottom-right',
        status: 'secondary'
      })

    })

    contractStore.txEmitter.on(txStatus.PENDING, (data) => {
      console.log("Transaction Pending", data)
      UIkit.notification({
        message: 'Transaction Pending',
        pos: 'bottom-right',
        status: 'secondary'
      })
    })

    contractStore.txEmitter.on(txStatus.MINED, (data) => {
      console.log("Transaction Mined", data)
      UIkit.notification({
        message: 'Transaction Mined',
        pos: 'bottom-right',
        status: 'primary'
      })
    })

    contractStore.txEmitter.on(txStatus.FAILED, (data) => {
      console.log("Transaction Failed", data)
      UIkit.notification({
        message: 'Transaction Failed',
        pos: 'bottom-right',
        status: 'danger'
      })
    })

    contractStore.txEmitter.on(txStatus.SUCCESS, (data) => {
      console.log("Transaction Success", data)
      UIkit.notification({
        message: 'Transaction Success',
        pos: 'bottom-right',
        status: 'success'
      })
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
