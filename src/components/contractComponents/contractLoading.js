import React, { Component } from 'react'

class ContractLoading extends Component {
  render () {
    return (
      <div uk-height-viewport="expand: true">
        <div className="uk-section-small"></div>
        <div className="uk-section-xlarge">
          <div className="uk-container">
            <h1 className="uk-heading-line uk-text-center"><span>Loading contracts</span></h1>
            <br/>
            <div className="uk-flex uk-flex-center">
              <div uk-spinner="ratio: 8"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContractLoading;