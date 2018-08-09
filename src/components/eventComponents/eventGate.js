import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {


  componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)
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
