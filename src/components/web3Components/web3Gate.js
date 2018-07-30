import React, { Component } from 'react'
import getWeb3 from '../../utils/getWeb3'
import { inject } from "mobx-react"

@inject("web3Store")
class Web3Gate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
    }
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
