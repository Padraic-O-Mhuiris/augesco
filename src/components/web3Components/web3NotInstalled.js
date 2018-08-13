import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd';

const antIcon = <Icon type="dislike-o" style={
  { 
    fontSize: 150, 
    height: "150px",
    width: "150px",
    color: "orange"
}}/>;

class Web3NotInstalled extends Component {
  render () {
    return (
      <div >
        <Row type="flex" justify="center" align="middle">
          <Col className="barrier-col" span={6}></Col>
          <Col className="" span={12}>
            <Row type="flex" justify="center" align="middle">
              <Col span={2}></Col>
              <Col className="barrier-content" span={20}>

                <h1>No Metamask plugin detected</h1>
                <p>Please <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">install</a> 
              &nbsp;to continue</p>
                <br /><br />
                {antIcon}
                
                
              </Col>
              <Col span={2}></Col>
            </Row>
          </Col>
          <Col className="barrier-col" span={6}></Col>
        </Row>
      </div>
    )
  }
}

export default Web3NotInstalled;



