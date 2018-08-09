import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {
  
  pendingTransactions() {
    const { web3Store } = this.props

    var subscription = web3Store.eventWeb3.eth.subscribe('pendingTransactions', function(error, result){
        if (!error)
          console.log("TX :: " + result);
      })
      .on("data", function(transaction){
        console.log(transaction);
      });
      
      // unsubscribes the subscription
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

  componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)

    this.pendingTransactions()
    this.newBlockHeaders()
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
