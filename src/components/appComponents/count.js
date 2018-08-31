import React, { Component } from "react";
import { Card, notification, Icon } from "antd";
import { inject, observer } from "mobx-react";

@inject("augesco")
@observer
class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  async componentDidMount() {
    const { augesco } = this.props;

    const _count = await augesco.call("Counter", "getCount", []);
    this.setState({
      count: _count
    });

    augesco.listen("Counter", "Increment", {}, async (err, event) => {
      this.setState({
        count: await augesco.call("Counter", "getCount", [])
      });

      notification.open({
        key: "event-increment",
        message: event.event,
        description: "Contract event fired : Count has incremented",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="plus" style={{ color: "black" }} />
      });
    });

    augesco.listen("Counter", "Decrement", {}, async (err, event) => {
      this.setState({
        count: await augesco.call("Counter", "getCount", [])
      });

      notification.open({
        key: "event-decrement",
        message: event.event,
        description: "Contract event fired : Count has decremented",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="minus" style={{ color: "black" }} />
      });
    });

    augesco.listen("Counter", "CountChange", {}, async (err, event) => {
      this.setState({
        count: await augesco.call("Counter", "getCount", [])
      });

      notification.open({
        key: "event-changecount",
        message: event.event,
        description: "Contract event fired : Count has changed",
        duration: 5,
        placement: "bottomLeft",
        icon: <Icon type="reload" style={{ color: "black" }} />
      });
    });
  }

  render() {
    return (
      <Card title="Count" style={{ textAlign: "center" }} bordered={false}>
        <h1 style={{ fontSize: "120px" }}>{this.state.count}</h1>
      </Card>
    );
  }
}

export default Count;
