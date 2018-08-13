import React, { Component } from 'react'
import { Layout, Spin, Row, Col, Icon } from 'antd';

class Web3Loading extends Component {
  render () {
    return (
      <Layout>
        <Row type="flex" align="middle">
  <Col>
    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
      <Icon type="play-circle-o" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
    </div>
  </Col>
</Row>
      </Layout>
    )
  }
}

export default Web3Loading;
