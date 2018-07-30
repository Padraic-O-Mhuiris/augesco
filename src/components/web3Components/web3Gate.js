import React, { Component } from 'react'
import getWeb3 from '../../utils/getWeb3'

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

  render () {
    console.log(this.state.web3)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Web3Gate;
