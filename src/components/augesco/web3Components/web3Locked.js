import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd';

const antIcon = <Icon type="lock" style={
  {
    fontSize: 150,
    height: "150px",
    width: "150px",
    color: "red"
  }} />;

class Web3Locked extends Component {
  render() {
    return (
      <div >
        <Row type="flex" justify="center" align="middle">
          <Col className="barrier-col" span={6}></Col>
          <Col className="" span={12}>
            <Row type="flex" justify="center" align="middle">
              <Col span={2}></Col>
              <Col className="barrier-content" span={20}>

                <h1>MetaMask is locked, unlock to continue</h1>
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

export default Web3Locked;
