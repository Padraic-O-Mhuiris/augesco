import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { txStatus } from '../../constants';

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intervalObj: {}
    }
  }

  pendingTransactions() {
    const { web3Store } = this.props

    var subscription = web3Store.eventWeb3.eth.subscribe('pendingTransactions', function(error, result){
        if (!error)
          console.log("TX :: " + result);
      })
      .on("data", function(transaction){
        console.log(transaction);
      });
    
    console.log(subscription)
    
    subscription.unsubscribe(function(error, success){
      if(success)
          console.log('Successfully unsubscribed!');
    })
  }
  
  newBlockHeaders() {
    const { web3Store } = this.props

    var subscription = web3Store.eventWeb3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error)
          console.log("NEW BLOCK", result);
      })
      .on("data", function(blockHeader){
        console.log(blockHeader)
      });
      
      // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
      if(success)
        console.log('Successfully unsubscribed!');
    });
  }

  async componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)

    // this.pendingTransactions()
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
