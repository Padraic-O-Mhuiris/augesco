import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { web3Context } from "../../constants"
import ContractLoading from "./contractLoading"
import EventGate from "../eventComponents/eventGate"

const EventEmitter = require('events')

@inject("web3Store")
@inject("contractStore")
@observer class ContractGate extends Component {
  
  parseContractAbi(key, _abi) {
    for(const method of _abi) {
      if(method.name === key) {
        return method
      }
    }
    return {}
  }

  parseContractEvents(_eventsWeb3) {
    const eventObj = {}
    for(const event of Object.keys(_eventsWeb3)) {
      if(/(^[a-zA-Z]+$)/.test(event)) {
        eventObj[event] = _eventsWeb3[event]
      }
    }
    return eventObj
  }

  parseContractMethods(_methodsWeb3, _abi) {
    const methodObj = {}
    for(const method of Object.keys(_methodsWeb3)) {
      if(/([a-z]*[()])/.test(method)) {
        const obj = {}
        const key = method.split('(')[0]
        obj["func"] = _methodsWeb3[method]
        const methodAbi = this.parseContractAbi(key, _abi)
        methodAbi["func"] = _methodsWeb3[method]
        methodObj[key] = methodAbi
      }
    }
    return methodObj
  }

  parseContract(_contract) {
    const { web3Store } = this.props
    const { contractStore } = this.props

    var check = true
    for(const network of Object.keys(_contract.networks)) {
      if(network === web3Store.network.toString()) {
        check = !check
        break
      }
    }

    if(check) {
      web3Store.updateStatus(web3Context.WEB3_CONTRACT_ERR)
    } else {
      
      const contractName = _contract.contractName
      const contractAbi = _contract.abi
      const contractTxHash = _contract.networks[web3Store.network].transactionHash
      const contractAddress = _contract.networks[web3Store.network].address
      
      const contractWeb3 = new web3Store.web3.eth.Contract(contractAbi, contractAddress)
      const contractMethods = this.parseContractMethods(contractWeb3.methods, contractAbi)

      const eventContract = new web3Store.eventWeb3.eth.Contract(contractAbi, contractAddress)
      const contractEvents = this.parseContractEvents(eventContract.events)

      contractStore.add(
        contractName,
        contractAbi,
        contractTxHash,
        contractAddress,
        contractWeb3,
        contractMethods,
        eventContract,
        contractEvents
      )
    }
  }

  componentDidMount() {
    const { contractStore } = this.props
    const { web3Store } = this.props

    for(const contract of this.props.contracts) {
      this.parseContract(contract)
    }

    if(web3Store.status !== web3Context.WEB3_CONTRACT_ERR) {
      const txEmitter = new EventEmitter()
      contractStore.setEmitter(txEmitter)
      contractStore.setWeb3(web3Store.web3)
      contractStore.toggleLoaded()
    }
  }
  
  render () {
    const { contractStore } = this.props
    if(contractStore.loaded) {
      return (
        <EventGate>
          {this.props.children}
        </EventGate>
      )
    } else {
      return (
        <ContractLoading/>
      )
    }
  }
}

export default ContractGate;
