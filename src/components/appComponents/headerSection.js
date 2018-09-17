import React, { Component } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

const { Header } = Layout;

@inject('router')
@observer
class HeaderSection extends Component {
  render() {
    const { router } = this.props;
    console.log(router)
    return (
      <Header className="header">
        <Row type="flex" justify="start" align="middle">
          <Col span={4} />
          <Col span={5}>
            <h1>AUGESCO</h1>
          </Col>
          <Col span={13}>
            <Button onClick={() => router.push("/")}>Home</Button>
            <Button onClick={() => router.push("/docs")}>Docs</Button>
            <Button onClick={() => router.push("/reporter")}>Reporting</Button>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderSection;
