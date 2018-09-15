import React, { Component } from 'react';
import Web3Gate from './components/augesco/web3Components/web3Gate';
import './assets/less/index';
import { withRouter, Route } from 'react-router';
import { Layout, Menu } from 'antd';

import Landing from './components/appComponents/landing';
import Docs from './components/appComponents/docs';
import Reporter from './components/appComponents/reporter';

import SideNav from './components/appComponents/sideNav';
const { Header } = Layout;

const contractCounter = require('../build/contracts/Counter.json');
const contractIpfs = require('../build/contracts/Ipfs.json');

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Landing />
  },
  {
    path: '/docs',
    main: () => <Docs />,
    sider: () => <SideNav />
  },
  {
    path: '/reporter',
    main: () => <Reporter />
  }
];

class App extends Component {
  render() {
    return (
      <Web3Gate
        contracts={[contractCounter, contractIpfs]}
        event_providers={{
          main: 'wss://mainnet.infura.io/ws',
          rinkeby: 'wss://rinkeby.infura.io/ws',
          local: 'ws://127.0.0.1:8545'
        }}
        ipfs_provider={{
          host: 'ipfs.infura.io',
          port: '5001',
          protocol: 'https'
        }}
      >
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sider}
              />
            ))}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Layout>
        </Layout>
      </Web3Gate>
    );
  }
}

export default withRouter(App);
