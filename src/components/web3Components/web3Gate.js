import React, { Component } from 'react'
import getWeb3 from '../../utils/getWeb3'
import { inject, observer } from "mobx-react"
import { web3Context } from "../../constants"

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
          if(accounts[0] !== web3Store.account) {
            web3Store.setAccount(accounts[0])
          }
        }
      }
    })
  }

  fetchBalance() {
    const { web3Store } = this.props
    if(web3Store.status !== web3Context.WEB3_LOCKED && web3Store.status !== web3Context.WEB3_LOADING) {
      web3Store.web3.eth.getBalance(web3Store.account, (err, _balance) => {
        if(err) {
          console.log(err)
        }
        else {
          if(_balance !== web3Store.balance) {
            web3Store.updateBalance(Number(_balance))
          }
        }
      })
    }
  }

  fetchNetwork() {
    const { web3Store } = this.props
    web3Store.web3.eth.net.getId((err, _id) => {
      if(err) {
        web3Store.updateStatus(web3Context.WEB3_NET_ERR) 
      }
      else {
        if(_id !== web3Store.network) {
          web3Store.updateNetwork(_id)
        }
      }
    })
  }
  
  instatiateWeb3() {
    const { web3Store } = this.props
    this.fetchAccounts()
    this.fetchNetwork()
    this.BalanceInterval = setInterval(() => this.fetchBalance(), 1000);
    
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
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })      
  }
  
  componentDidUpdate() {
    if(this.state.web3 !== null) {
      this.props.web3Store.setWeb3(this.state.web3)
      this.instatiateWeb3()
    } else {
      this.props.web3Store.updateStatus(web3Context.WEB3_LOAD_ERR)
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

export default Web3Gate;
