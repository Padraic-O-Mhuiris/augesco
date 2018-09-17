import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';

const { Header } = Layout;

class HeaderSection extends Component {
  render() {
    return (
      <Header className="header">
        <Row>
          <Col span={5} offset={3}>
            <h1>Augesco</h1>
          </Col>
          <Col span={8} offset={8}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['home']}
              theme={"light"}
            >
              <Menu.Item
                key="home"
              >
                HOME
              </Menu.Item>
              <Menu.Item
                key="docs"
              >
                DOCS
              </Menu.Item>
              <Menu.Item
                key="reports"
              >
                REPORTS
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderSection;
