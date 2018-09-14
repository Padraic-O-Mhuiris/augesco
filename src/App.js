import React, { Component } from 'react';
import Web3Gate from './components/web3Gate';
import './assets/less/index';
import { withRouter, Route } from 'react-router';

import { inject, observer } from 'mobx-react';
import AppContent from './components/appComponents/appContent';

const contractCounter = require('../build/contracts/Counter.json');
const contractIpfs = require('../build/contracts/Ipfs.json');

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <AppContent />
  },
  {
    path: '/bubblegum',
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: '/shoelaces',
    main: () => <h2>Shoelaces</h2>
  }
];

@inject('router')
class App extends Component {
  render() {
    console.log(this.props);
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
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </Web3Gate>
    );
  }
}

export default withRouter(App);
