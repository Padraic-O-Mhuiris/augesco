import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { Layout, List } from 'antd';
const { Header, Content } = Layout;

@inject("web3Store")
@inject("contractStore")
@observer class ChainLog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    const { contractStore, web3Store } = this.props

    web3Store.chainEmitter.on("nbh", data => {
      console.log(data)
      const newLogs = [...this.state.logs]
      newLogs.unshift(data.timestamp)
      console.log(newLogs)
      this.setState({
        logs: newLogs
      })
    })
  }

  render() {
    return (
      <Layout>
        <Header style={{ background: "#222", borderRight: "5px solid #aaa" }}>
          <h3 style={{ color: "white" }}>Chain Log</h3>
        </Header>
        <Content style={{
          background: "#fff",
          height: "100%"
        }}>
          <List
            itemLayout="vertical"
            dataSource={this.state.logs}
            renderItem={item => (
              <List.Item style={{padding:"10px"}}>
                <List.Item.Meta
                  title={<a href="">{item}</a>}
                  description="New Block"
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    )
  }
}

export default ChainLog;
