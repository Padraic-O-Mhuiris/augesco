import React, { Component } from 'react'
import { Spin, Row, Col, Icon } from 'antd';

const antIcon = <Icon type="loading" style={
  {
    fontSize: 150,
    height: "150px",
    width: "150px"
  }} spin />;

class ContractLoading extends Component {
  render() {
    return (
      <div >
        <Row type="flex" justify="center" align="middle">
          <Col className="barrier-col" span={6}></Col>
          <Col className="" span={12}>
            <Row type="flex" justify="center" align="middle">
              <Col span={2}></Col>
              <Col className="barrier-content" span={20}>

                <h1>Loading Contracts</h1>
                <p>Searching the blockchain!</p>
                <br /><br />
                <Spin indicator={antIcon} />

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

export default ContractLoading;
