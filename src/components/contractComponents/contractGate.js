import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { web3Context } from "../../constants"

@inject("web3Store")
@inject("contractStore")
@observer class ContractGate extends Component {

  parseContractMethods(_methodsWeb3, _abi) {
    const methodObj = {}
    for(const method of Object.keys(_methodsWeb3)) {
      if(/([a-z]*[()])/.test(method)) {
        methodObj[method] = _methodsWeb3[method]
      }
    }
    return methodObj
  }

  parseContract(_contract) {
    const { web3Store } = this.props
    const { contractStore } = this.props

    web3Store.web3.eth.net.getId((err, _id) => {
      if(err) {
        console.log(err)
      } else {
        var check = true
        for(const network of Object.keys(_contract.networks)) {
          if(network != _id) {
            check = !check
            break
          }
        }

        if(check) {
          web3Store.updateStatus(web3Context.WEB3_CONTRACT_ERR)
        } else {

          const contractName = _contract.contractName
          const contractAbi = _contract.abi
          const contractTxHash = _contract.networks[_id].transactionHash
          const contractAddress = _contract.networks[_id].address
          const contractWeb3 = new web3Store.web3.eth.Contract(contractAbi, contractAddress)
          const contractMethods = this.parseContractMethods(contractWeb3.methods, contractAbi)
          
          contractStore.add(
            contractName,
            contractAbi,
            contractTxHash,
            contractAddress,
            contractWeb3,
            contractMethods
          )
        }
      }
    })

  }

  componentDidMount() {
    for(const contract of this.props.contracts) {
      this.parseContract(contract)
    }
  }
  
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default ContractGate;
