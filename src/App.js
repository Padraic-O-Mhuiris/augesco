import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import "./assets/less/index"
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, notification, Icon } from 'antd';

import Count from "./components/appComponents/count"

const { Header, Footer, Content } = Layout;

const contractCounter = require("../build/contracts/Counter.json")

@inject("web3Store")
@inject("contractStore")
@observer class App extends Component {
  constructor(props) {
    super(props)

    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleClick3 = this.handleClick3.bind(this)
    this.handleClick4 = this.handleClick4.bind(this)
    this.handleClick5 = this.handleClick5.bind(this)
    this.handleClick6 = this.handleClick6.bind(this)
    this.handleClick7 = this.handleClick7.bind(this)
    this.handleClick8 = this.handleClick8.bind(this)
    this.handleClick9 = this.handleClick9.bind(this)
  }

  async handleClick1() {
    const { contractStore } = this.props
    const res = await contractStore.call("Counter", "getCount", [])
    notification.open({
      key: "contractcount",
      message: res,
      description: "The contract count",
      duration: 5,
      placement: "topLeft",
      icon: <Icon type="file" style={{ color: 'blue' }} />
    });
  }

  async handleClick2() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "incCount", [], {
      "from": web3Store.account
    })
  }

  async handleClick3() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "changeCount", [-1], {
      "from": web3Store.account
    })
  }

  async handleClick4() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    
    await contractStore.exec("Counter", "decCount", [], {
      "from": web3Store.account
    })
  }

  async handleClick5() {
    const { contractStore } = this.props
    const { web3Store } = this.props
    await contractStore.exec("Counter", "changeCount", [20], {
      "from": web3Store.account
    })
  }

  async handleClick6() {
    const { web3Store } = this.props
    web3Store.startPendingTxs((err, result) => {
      console.log(result)
    })
  }

  async handleClick7() {
    const { web3Store } = this.props
    web3Store.stopPendingTxs((err, result) => {
      console.log(result)
    })
  }

  async handleClick8() {
    const { web3Store } = this.props
    web3Store.startNewBlocks((err, result) => {
      console.log(result)
    })
  }

  async handleClick9() {
    const { web3Store } = this.props
    web3Store.stopNewBlocks((err, result) => {
      console.log(result)
    })
  }

  render () {
    return (
      <Web3Gate 
        contracts={[
          contractCounter
        ]}
        event_providers={{
          main: "wss://mainnet.infura.io/ws",
          rinkeby: "wss://rinkeby.infura.io/ws",
          local: "ws://127.0.0.1:8545"
        }}
      >
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <h1>Augesco</h1>
              <Row gutter={16}>
                <Col span={8}>
                  
                </Col>

                <Col span={8}>
                  <Count/>
                </Col>  
                
                <Col span={8}>
                  
                </Col>               
              </Row>
              <br/><br/>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Get Count" bordered={false}
                  extra={ <Button onClick={this.handleClick1}>Get Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Increment Count" bordered={false}
                  extra={ <Button onClick={this.handleClick2}>Increment Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Fail Count" bordered={false}
                  extra={ <Button onClick={this.handleClick3}>Fail Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi</p>
                  </Card>
                </Col>               
              </Row>

              <br /><br />
              
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Decrement Count" bordered={false}
                  extra={ <Button onClick={this.handleClick4}>Decrement Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip </p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Reset Count" bordered={false}
                  extra={ <Button onClick={this.handleClick5}>Reset Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Pending Transactions" bordered={false}
                  extra={ 
                    <div>
                      <Button onClick={this.handleClick6}>Start</Button>&nbsp;
                      <Button onClick={this.handleClick7}>Stop</Button>
                    </div>
                  }>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>               
              </Row>

              <br /><br />
              
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="New Blocks" bordered={false}
                  extra={
                    <div>
                      <Button onClick={this.handleClick8}>Start</Button>&nbsp;
                      <Button onClick={this.handleClick9}>Stop</Button>
                    </div>
                  }>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                  </Card>
                </Col>    
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Web3Gate>
    )
  }
}

export default App;
