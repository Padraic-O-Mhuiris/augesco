import React, { Component } from 'react';
import Web3Gate from './components/web3Components/web3Gate';
import './assets/less/index';
import { withRouter, Route } from 'react-router';

import Landing from './components/appComponents/landing';
import Docs from './components/appComponents/docs'
import Reporter from './components/appComponents/reporter'

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
    main: () => <Docs/>
  },
  {
    path: '/reporter',
    main: () => <Reporter/>
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
