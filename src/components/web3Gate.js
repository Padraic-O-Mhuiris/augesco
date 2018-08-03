import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import { inject, observer } from "mobx-react"
import { web3Context, netContext } from "../constants"
import Web3Loading from "./web3Components/web3Loading"
import Web3Locked from "./web3Components/web3Locked"
import Web3NotInstalled from "./web3Components/web3NotInstalled"
import Web3NoNetwork from "./web3Components/web3NoNetwork"
import Web3NoContract from "./web3Components/web3NoContract"
import ContractGate from "./contractComponents/contractGate"

@inject("web3Store")
@observer class Web3Gate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
    }
  }

  fetchAccounts() {
    const { web3Store } = this.props

    if(web3Store.status !== web3Context.WEB3_CONTRACT_ERR && web3Store.status !== web3Context.WEB3_NET_ERR) {
      web3Store.web3.eth.getAccounts((err, accounts) => {
        if(err) {
          console.log(err)
          web3Store.updateStatus(web3Context.WEB3_LOAD_ERR)
        } 
        else {
          if(accounts.length === 0) {
            web3Store.updateStatus(web3Context.WEB3_LOCKED)
          } 
          else {
            web3Store.updateStatus(web3Context.WEB3_LOADED)
            if(accounts[0] !== web3Store.account) {
              web3Store.setAccount(accounts[0])
            }
            this.fetchBalance()
          }
        }
      })
    }
  }

  fetchBalance() {
    const { web3Store } = this.props
    if(web3Store.status === web3Context.WEB3_LOADED) {
      web3Store.web3.eth.getBalance(web3Store.account, (err, _balance) => {
        if(err) {
          console.log(err)
        }
        else {
          if(_balance !== web3Store.balance) {
            web3Store.updateBalance(_balance)
          }
        }
      })
    }
  }

  fetchNetwork() {
    const { web3Store } = this.props
    const { networks } = this.props

    if(web3Store.status !== web3Context.WEB3_CONTRACT_ERR && web3Store.status !== web3Context.WEB3_NET_ERR) { 
      web3Store.web3.eth.net.getId((err, _id) => {
        if(err) {
          web3Store.updateStatus(web3Context.WEB3_NET_ERR) 
        }
        else {
          switch (_id) {
            case netContext.MAIN:
              web3Store.updateNetwork(netContext.MAIN)
              break
            case netContext.MORDEN:
              web3Store.updateNetwork(netContext.MORDEN)
              break
            case netContext.ROPESTEN:
              web3Store.updateNetwork(netContext.ROPESTEN)
              break
            case netContext.RINKEBY:
              web3Store.updateNetwork(netContext.RINKEBY)
              break
            case netContext.KOVAN:
              web3Store.updateNetwork(netContext.KOVAN)
              break
            default:
              web3Store.updateNetwork(netContext.LOCAL)
          }
          
          let check = false
          for(const network of networks) {
            if(network === web3Store.network) {
              check = true
              break
            }
          }

          if(!check) {
            web3Store.updateStatus(web3Context.WEB3_CONTRACT_ERR)
          }
        }
      })
    }
  }
  
  instantiateWeb3() {
    const { web3Store } = this.props
    this.fetchAccounts()
    this.fetchNetwork()
    //this.BalanceInterval = setInterval(() => this.fetchBalance(), 1000);
    
    web3Store.web3.currentProvider.publicConfigStore.on('update', (res) => {
      this.fetchAccounts()
      this.fetchNetwork()
    });

    window.addEventListener('offline', function(e) { 
      web3Store.updateStatus(web3Context.WEB3_NET_ERR) 
    });
    window.addEventListener('online', function(e) { 
      web3Store.updateStatus(web3Context.WEB3_LOADING)
      window.location.reload()
    });
  }

  componentWillMount() {
    const online = navigator.onLine;
    if(online) {
      getWeb3.then(results => {
        this.setState({
          web3: results.web3
        })
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    } else {
      this.props.web3Store.updateStatus(web3Context.WEB3_NET_ERR)
    }
  }
  
  componentDidUpdate() {
    
    if(this.state.web3 !== null) {
      this.props.web3Store.setWeb3(this.state.web3)
      this.instantiateWeb3()
    } else {
      this.props.web3Store.updateStatus(web3Context.WEB3_LOAD_ERR)
    }
  }

  render () {
    const { web3Store } = this.props
    
    switch(web3Store.status) {
      case web3Context.WEB3_LOADED:
        /* 
        **  The main application content is rendered here,
        **  inherited through parent component and passed as
        **  props.children below
        */
        return (
          <ContractGate
            contracts={this.props.contracts}
          >
            {this.props.children}
          </ContractGate>
        )
      case web3Context.WEB3_LOADING:
        /* 
        **  When web3 is loading, it is simply trying to discover
        **  its status and ought to quickly change status to another
        **  context
        */
        return (
          <Web3Loading/>
        )
      case web3Context.WEB3_LOCKED:
        /* 
        **  Render a view to the user to unlock their metamask account
        */
        return (
          <Web3Locked/>
        )
      case web3Context.WEB3_LOAD_ERR:
        /* 
        **  Metamask is not installed so render a view to guide user to
        **  install
        */
        return (
          <Web3NotInstalled/>
        )
      case web3Context.WEB3_NET_ERR:
        /* 
        **  Application has disconnected from the internet or cannot find
        **  current network
        */
        return (
          <Web3NoNetwork/>
        )
      case web3Context.WEB3_CONTRACT_ERR:
        /* 
        **  Current network should contain instance of smart contract. The instance
        **  network and location should be instantiated in App.js
        */
        return(
          <Web3NoContract data={this.props.networks}/>
        )
      default:
        return (
          <div>
            SHOULD NOT REACH THIS CASE
          </div>
        )
    }
    
  }
}

export default Web3Gate;
