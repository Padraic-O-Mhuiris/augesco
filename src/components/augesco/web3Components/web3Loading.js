import React, { Component } from 'react';
import { Spin, Row, Col, Icon } from 'antd';

const antIcon = <Icon type="loading" spin />;

class Web3Loading extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col className="barrier-col" span={6} />
          <Col className="" span={12}>
            <Row type="flex" justify="center" align="middle">
              <Col span={2} />
              <Col className="barrier-content" span={20}>
                <h1>MetaMask is attempting to find network</h1>
                <p>Ensure websocket provider is present!</p>
                <br />
                <br />
                <Spin indicator={antIcon} />
              </Col>
              <Col span={2} />
            </Row>
          </Col>
          <Col className="barrier-col" span={6} />
        </Row>
      </div>
    );
  }
}

export default Web3Loading;
