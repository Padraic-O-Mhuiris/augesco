import React, { Component } from 'react'
import Web3Gate from "./components/web3Gate"
import { inject, observer } from "mobx-react"
import "./assets/less/index"
import Logo from "./assets/images/icons/ethereum.png"
import { Layout, Breadcrumb, Button, Row, Col, Card, notification, Icon } from 'antd';

import Count from "./components/appComponents/count"

const { Header, Content } = Layout;

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

  render() {
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
        <Layout style={{ background: '#fff' }}>
          <Header style={{ background: '#222' }}>
            <Row>
              <Col span={1}>
                <Icon
                  className="trigger"
                  type={this.props.contractStore.showChain ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.props.contractStore.toggleShowChain}
                  style={{ color: "white" }}
                />
              </Col>
              <Col span={1}>
                <div className="logo">
                  <img style={{
                    height: "40px"
                  }} alt="ethereum-logo" src={Logo} ></img>
                </div>
              </Col>
              <Col span={22}>
                <h1 style={{ color: "white" }}>Augesco - Begin To Develop</h1>
              </Col>
            </Row>
          </Header>

          <Content style={{ padding: '0 50px' }}>

            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>

            <div style={{ background: '#ECECEC', padding: '30px' }}>

              <Row gutter={16}>
                <Col span={8}>

                </Col>

                <Col span={8}>
                  <Count />
                </Col>

                <Col span={8}>

                </Col>
              </Row>
              <br /><br />
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Get Count" bordered={false}
                    extra={<Button onClick={this.handleClick1}>Get Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Increment Count" bordered={false}
                    extra={<Button onClick={this.handleClick2}>Increment Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Fail Count" bordered={false}
                    extra={<Button onClick={this.handleClick3}>Fail Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi</p>
                  </Card>
                </Col>
              </Row>

              <br /><br />

              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Decrement Count" bordered={false}
                    extra={<Button onClick={this.handleClick4}>Decrement Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip </p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Reset Count" bordered={false}
                    extra={<Button onClick={this.handleClick5}>Reset Count</Button>}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card title="Set Count" bordered={false}
                    extra={
                      <div>
                        INPUT
                      </div>
                    }>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>

        </Layout>
      </Web3Gate>
    )
  }
}

export default App;
