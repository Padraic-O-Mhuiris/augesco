import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { List, Row, Col, Divider, Icon, Card } from 'antd';

const etherscan = {
  1: "https://etherscan.io/block/",
  3: "https://ropesten.etherscan.io/block/",
  4: "https://rinkeby.etherscan.io/block/"
}

@inject("web3Store")
@inject("contractStore")
@observer class ChainLog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logs: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const { contractStore, web3Store } = this.props

    web3Store.chainEmitter.on("nbh", data => {
      const newLogs = [...this.state.logs]
      let obj = {}
      
      obj["hash"] = data.hash.substring(0, 12)
      obj["timestamp"] = new Date(data.timestamp*1000).toTimeString().split(' ')[0]
      obj["gas"] = Math.floor((data.gasUsed/data.gasLimit) * 100 ) + "%"
      obj["number"] = data.number

      newLogs.unshift(obj)
      this.setState({
        logs: newLogs,
        isLoading: false
      })
    })
  }

  render() {
    const weblink = etherscan[this.props.web3Store.network]
    return (
      <List
        header={
        <div>
        <Row gutter={8} justify={"center"} align={"middle"} type={"flex"} style={{textAlign: "center"}}>
          <Col span={6}><p>Block #</p><Icon type="appstore" style={{ fontSize: 20, color: '#08c' }} /></Col>
          <Col span={6}><p>Time</p><Icon type="calendar" style={{ fontSize: 20, color: '#08c' }} /></Col>
          <Col span={6}><p>Gas: Used/Limit</p><Icon type="line-chart" style={{ fontSize: 20, color: '#08c' }} /></Col>
          <Col span={6}><p>BlockHash</p><Icon type="environment" style={{ fontSize: 20, color: '#08c' }} /></Col>
        </Row>
        <Divider style={{ marginBottom: "7px" }}/>
        </div>
      }
        itemLayout="vertical"
        dataSource={this.state.logs}
        renderItem={item => (
          <List.Item style={{ 
              padding:"0px",
              margin: "0px",
              border: "none"
            }}>
            <div>
              <a target="_blank" rel="noopener noreferrer" href={weblink+item.number}>
                <Row gutter={8} justify={"center"} align={"middle"} type={"flex"} style={{textAlign: "center"}}>
                  <Col span={6}>{ item.number }</Col>
                  <Col span={6}>{ item.timestamp }</Col>
                  <Col span={6}>{ item.gas }</Col>
                  <Col span={6}>{ item.hash }</Col>
                </Row>
              </a>
            </div>
            <Divider />
          </List.Item>
        )}
      />
    )
  }
}

export default ChainLog;