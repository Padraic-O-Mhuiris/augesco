import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { txStatus } from '../../constants';
import UIkit from 'uikit'

const etherscan = {
  1: "https://etherscan.io/tx/",
  3: "https://ropesten.etherscan.io/tx/",
  4: "https://rinkeby.etherscan.io/tx/"
}

const txMessage = (_msg, _link) => (
  "<a target=\"_blank\" rel=\"noopener noreferrer\" href=" + _link+ ">" + _msg + "</a>"
)

@inject("web3Store")
@inject("contractStore")
@observer class EventGate extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    txMessage("New TX",etherscan[3]+"0x0157c358b082069206648941e41509e8ae82359312aee134078babd0e37d47ae", "bottom-right", "secondary") 
  }

  componentDidMount() {
    const { contractStore, web3Store } = this.props
    console.log(contractStore)
    console.log(web3Store)
    const weblink = etherscan[web3Store.network]

    contractStore.txEmitter.on(txStatus.NEW, (hash) => {
      UIkit.notification({
        message: txMessage("TX: " + hash.substring(0, 6) + " started", weblink+hash),
        pos: 'bottom-right',
        status: 'primary',
        timeout: 10000,
      })

      contractStore.txEmitter.once(txStatus.PENDING+hash, (data) => {
        UIkit.notification({
          message: txMessage("TX: " + hash.substring(0, 6) + " pending", weblink+hash),
          pos: 'bottom-right',
          status: 'primary',
          timeout: 25000,
        })
      })

      contractStore.txEmitter.on(txStatus.MINED+hash, (data) => {
        UIkit.notification({
          message: txMessage("TX: " + hash.substring(0, 6) + " mined", weblink+hash),
          pos: 'bottom-right',
          status: 'warning',
          timeout: 10000,
        })
      })

      contractStore.txEmitter.on(txStatus.FAILED+hash, (data) => {
        UIkit.notification({
          message: txMessage("TX: " + hash.substring(0, 6) + " failed", weblink+hash),
          pos: 'bottom-right',
          status: 'danger',
          timeout: 10000,
        })
      })
  
      contractStore.txEmitter.on(txStatus.SUCCESS+hash, (data) => {
        UIkit.notification({
          message: txMessage("TX: " + hash.substring(0, 6) + " success", weblink+hash),
          pos: 'bottom-right',
          status: 'success',
          timeout: 10000,
        })
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
        <button className="uk-button uk-button-default" onClick={this.handleClick}>Event Test</button>
      </div>
    )
  }
}

export default EventGate;
