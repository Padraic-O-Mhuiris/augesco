import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

const antIcon = <Icon type="file-add" />;

class Web3NoContract extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col className="barrier-col" span={6} />
          <Col className="" span={12}>
            <Row type="flex" justify="center" align="middle">
              <Col span={2} />
              <Col className="barrier-content" span={20}>
                <h1>No contract detected on this network</h1>
                <p>Please switch to appropriate network</p>
                <br />
                <br />
                {antIcon}
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

export default Web3NoContract;
