import React, { Component } from 'react'
import getWeb3Network from "../../utils/getWeb3Network"

class Web3NoNetwork extends Component {
  render () {
    console.log(this.props)
    return (
      <div uk-height-viewport="expand: true">
        <div className="uk-section-small"></div>
        <div className="uk-section-xlarge">
          <div className="uk-container">
            <h1 className="uk-heading-line uk-text-center"><span>Wrong Network</span></h1>
            <div className="uk-flex uk-flex-center">
              <div>
              <table className="uk-table uk-table-striped uk-table-small">
                <thead>
                  <tr>
                      <th>Available networks</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.map((item, idx) => 
                    (
                      <tr key={idx}>
                        <td className="uk-text-left">{getWeb3Network(item)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              </div>
            </div>
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