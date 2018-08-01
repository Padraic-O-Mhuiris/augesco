import React, { Component } from 'react'

class Web3Locked extends Component {
  render () {
    return (
      <div uk-height-viewport="expand: true">
        <div className="uk-section-small"></div>
        <div className="uk-section-xlarge">
          <div className="uk-container">
            <h1 className="uk-heading-line uk-text-center"><span>MetaMask is Locked</span></h1>
            <p className="uk-text-center">Please unlock to continue</p>
            <br/>
            <div className="uk-flex uk-flex-center">
              <span uk-icon="icon: lock; ratio: 10"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Web3Locked;
