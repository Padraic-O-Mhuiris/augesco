import React, { Component } from 'react';
import Web3Gate from './components/augesco/web3Components/web3Gate';
import './assets/less/index';
import { withRouter, Route } from 'react-router';
import { Layout } from 'antd';

import Landing from './components/appComponents/landing';
import Docs from './components/appComponents/docs';
import Reporter from './components/appComponents/reporter';
import HeaderSection from './components/appComponents/headerSection';
import FooterSection from './components/appComponents/footerSection';

const contractCounter = require('../build/contracts/Counter.json');
const contractIpfs = require('../build/contracts/Ipfs.json');

const routes = [
  {
    path: '/',
    exact: true,
    header: () => <HeaderSection />,
    main: () => <Landing />,
    footer: () => <FooterSection />
  },
  {
    path: '/docs',
    header: () => <HeaderSection />,
    main: () => <Docs />,
  },
  {
    path: '/reporter',
    header: () => <HeaderSection />,
    main: () => <Reporter />,
    footer: () => <FooterSection />
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
          <Layout>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.header}
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
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.footer}
              />
            ))}
          </Layout>
        </Layout>
      </Web3Gate>
    );
  }
}

export default withRouter(App);
