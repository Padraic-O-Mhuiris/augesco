import React, { Component } from 'react';
import { Layout } from 'antd';
import SideNav from './sideNav';

const { Content } = Layout;

class Docs extends Component {
  render() {
    return (
      <Layout>
        <SideNav />
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            Docs
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Docs;
