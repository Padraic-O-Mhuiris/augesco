import React, { Component } from 'react'

class Web3NoNetwork extends Component {
  render () {
    return (
      <div uk-height-viewport="expand: true">
        <div className="uk-section-small"></div>
        <div className="uk-section-xlarge">
          <div className="uk-container">
            <h1 className="uk-heading-line uk-text-center"><span>Wrong Network</span></h1>
            <p className="uk-text-center">Your contract was not found</p>
            <div className="uk-flex uk-flex-center">
              <span uk-icon="icon: file-edit; ratio: 10"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Web3NoNetwork