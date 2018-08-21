import React, { Component } from 'react'
import { Card, notification, Icon } from 'antd'
import { inject } from "mobx-react"

@inject("contractStore")
class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  async componentDidMount() {
    const { contractStore } = this.props

    const _count = await contractStore.call("Counter", "getCount", [])
    this.setState({
      count: _count
    })

    contractStore.listen("Counter", "Increment", {}, (async (err, event) => {
      this.setState({
        count: await contractStore.call("Counter", "getCount", [])
      })

      notification.open({
        key: "event-increment",
        message: event.event,
        description: "Contract event fired : Count has incremented",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="plus" style={{ color: 'black' }} />
      });
    }))

    contractStore.listen("Counter", "Decrement", {}, (async (err, event) => {
      this.setState({
        count: await contractStore.call("Counter", "getCount", [])
      })

      notification.open({
        key: "event-decrement",
        message: event.event,
        description: "Contract event fired : Count has decremented",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="minus" style={{ color: 'black' }} />
      });
    }))

    contractStore.listen("Counter", "CountChange", {}, ( async (err, event) => {
      this.setState({
        count: await contractStore.call("Counter", "getCount", [])
      })

      notification.open({
        key: "event-changecount",
        message: event.event,
        description: "Contract event fired : Count has changed",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="reload" style={{ color: 'black' }} />
      });
    }))
  }

  render() {
    return (
      <Card title="Count" style={{ textAlign: "center" }} bordered={false}>
        <h1 style={{ fontSize: "120px" }}>{this.state.count}</h1>
      </Card>

    )
  }
}

export default Count;
