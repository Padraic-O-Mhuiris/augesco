import React, { Component } from 'react'

class Web3NotInstalled extends Component {
  render () {
    return (
      <div uk-height-viewport="expand: true">
        <div className="uk-section-small"></div>
        <div className="uk-section-xlarge">
          <div className="uk-container">
            <h1 className="uk-heading-line uk-text-center"><span>MetaMask is not Installed</span></h1>
            <p className="uk-text-center">Please&nbsp;
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">install</a> 
              &nbsp;to continue
            </p>
            <br/>
            <div className="uk-flex uk-flex-center">
              <span uk-icon="icon: download; ratio: 10"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Web3NotInstalled