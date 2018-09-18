import React, { Component } from 'react';
import { Layout } from 'antd';
import SideNav from './sideNav';

const { Content } = Layout;

class Docs extends Component {
  render() {
    return (
      <Layout>
        <SideNav />
        <Layout>
          <Content>Docs</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Docs;
