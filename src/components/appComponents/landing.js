import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Logo from "../../assets/images/icons/ethereum.png";
import {
  Layout,
  Breadcrumb,
  Button,
  Row,
  Col,
  Card,
  notification,
  Icon,
  InputNumber
} from "antd";
import Count from "./count";
import Ipfs from "./ipfs"

const { Header, Content, Footer } = Layout;

@inject("augesco")
@observer
class landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNumber: 1,
      cat: ""
    };
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
  }

  async handleClick1() {
    const { augesco } = this.props;
    const res = await augesco.call("Counter", "getCount", []);
    notification.open({
      key: "contractcount",
      message: res,
      description: "The contract count",
      duration: 5,
      placement: "topLeft",
      icon: <Icon type="file" style={{ color: "blue" }} />
    });
  }

  handleClick2() {
    const { augesco } = this.props;

    augesco.exec("Counter", "incCount", [], {
      from: augesco.account
    });
  }

  handleClick3() {
    const { augesco } = this.props;

    augesco.exec("Counter", "changeCount", [-1], {
      from: augesco.account
    });
  }

  handleClick4() {
    const { augesco } = this.props;

    augesco.exec("Counter", "decCount", [], {
      from: augesco.account
    });
  }

  handleClick5() {
    const { augesco } = this.props;
    augesco.exec("Counter", "changeCount", [this.state.newNumber], {
      from: augesco.account
    });
  }

  render() {
    const { augesco } = this.props;
    return (
      <Layout style={{ background: "#fff" }}>
        <Header style={{ background: "#fff" }}>
          <Row>
            <Col span={1}>
              <Icon
                className="trigger"
                type={augesco.info ? "menu-unfold" : "menu-fold"}
                onClick={augesco.toggleInfo}
                style={{ color: "#333" }}
              />
            </Col>
            <Col span={1}>
              <div className="logo">
                <img
                  style={{
                    height: "40px"
                  }}
                  alt="ethereum-logo"
                  src={Logo}
                />
              </div>
            </Col>
            <Col span={20}>
              <div style={{ display: "flex" }}>
                <h1 className="navbar-pagetitle">AUGESCO</h1>
              </div>
            </Col>
          </Row>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />

          <div style={{ padding: "30px" }}>
            <Row gutter={16}>
              <Col span={8}>
                <h2 className="content-title">What is Augesco?</h2>
                <p className="content">
                  Augesco is an ethereum dapp development environment that is
                  intended to extend the truffle development suite and provide
                  more out-of-the-box support necessary to begin developing a
                  dapp. The difficulty with developing a dapp is the excessive
                  amount of boiler-plate code necessary to setup metamask, load
                  your contracts and watch for on-chain events when contract
                  events are executed. Augesco uses a client state-management
                  system called mobx-state-tree to simplify these actions Below
                  is a display of functionality for a counter contract. This
                  contract simply holds an integer value 'count' and different
                  actions can be performed to change this count.
                </p>
                <br />
              </Col>
              <Col span={2} />
              <Col span={14}>
                <Count />
              </Col>
            </Row>
            <br />
            <br />

            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Get Count"
                  bordered={true}
                  hoverable={true}
                  extra={<Button onClick={this.handleClick1}>Get Count</Button>}
                >
                  <p className="card-content">
                    The deployed contract "Counter.sol" has a private count
                    variable which corresponds to the count rendered here. The
                    value is found by calling the getter function{" "}
                    <code>getCount()</code>.<br />
                    Utilising the contract store, we can get the count value by
                    executing an asynchronous call: <br />
                    <code>augesco.call("Counter", "getCount", [])</code>
                    <br />
                    The first string references the contract name, the second
                    the function we wish to call, the empty brackets is the
                    potential arguments we wish to pass to the smart-contract
                    function which in this case is 0.
                  </p>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title="Exec Count"
                  bordered={true}
                  hoverable={true}
                  extra={
                    <div>
                      <Button onClick={this.handleClick2}>
                        Increment Count
                      </Button>
                      &nbsp;
                      <Button onClick={this.handleClick3}>Fail Count</Button>
                      &nbsp;
                      <Button onClick={this.handleClick4}>
                        Decrement Count
                      </Button>
                    </div>
                  }
                >
                  <p className="card-content">
                    The counter contract contains three functions to alter the
                    count. <code>incCount()</code> which increments the count by
                    one, <code>decCount()</code> which decrements the count by
                    one and finally <code>changeCount()</code> which takes an
                    unsigned integer which replaces the current count.
                    <br />
                    Each of these functions are called setters which means that
                    they alter the state of the contract and cost the sender to
                    execute. With getters, their is no cost as they are only
                    reading the state. With these, a transaction must be
                    performed. We can execute these transactions similarily to
                    getters.
                    <br />
                    <code
                    >{`augesco.exec("Counter", "incCount", [], {"from": augesco.account})`}</code>
                    <br />
                    Again, the first two string args are the contract we are
                    using and the function within that contract we wish to
                    execute. The empty square brackets are the arguments, and
                    the last object argument is the options. These can be
                    manually changed to alter sender address and gas
                    functionality. See the web3 docs for more info.
                  </p>
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title="New Count"
                  bordered={true}
                  hoverable={true}
                  extra={
                    <div>
                      <InputNumber
                        min={1}
                        max={100000}
                        defaultValue={this.state.newNumber}
                        onChange={value => this.setState({ newNumber: value })}
                      />
                      &nbsp;
                      <Button onClick={this.handleClick5}>Update</Button>
                    </div>
                  }
                >
                  <p className="card-content">
                    The new count input above executes the setter function{" "}
                    <code>changeCount()</code> and when executed a metamask
                    popup opens which asks for transaction validation.
                    <br />
                    When a transaction is initially sent to the blockchain, a
                    transaction hash is returned. We can find this hash and the
                    current status of the transaction using eventListeners which
                    "listen" for on events. Events are caught using <br />
                    <code>augesco.txEmitter.on(event, callback())</code>
                    <br />
                    The notifications displayed when a setter function is
                    executed is located in the eventGate.js.
                    <br />
                    The counter contract also emits events when the setter
                    functions are executed. Using the functionality below, we
                    can detect contract changes and render our application
                    accordingly.
                    <br />
                    <code
                    >{`augesco.listen("Counter", "Decrement", {}, callback()`}</code>
                  </p>
                </Card>
              </Col>
            </Row>

            <br />
            <br />
            
            <Ipfs/>
            <br />
            <br />
          </div>
        </Content>
        <Footer>
          <Row style={{ textAlign: "center" }}>
            <Col span={8}>
              <p>Augesco - Begin To Develop</p>
            </Col>
            <Col span={8}>
              <a href="https://www.linkedin.com/in/patrick-h-morris-437aa4109/">
                <Icon type="linkedin" style={{ fontSize: 20, color: "#08c" }} />
              </a>
              &nbsp; &nbsp; &nbsp;
              <a href="https://github.com/sirromdev">
                <Icon type="github" style={{ fontSize: 20, color: "#000" }} />
              </a>
              &nbsp; &nbsp; &nbsp;
              <a href="https://twitter.com/DevSirrom">
                <Icon type="twitter" style={{ fontSize: 20, color: "#08c" }} />
              </a>
            </Col>
            <Col span={8}>
              <p>sirromDev</p>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default landing;
