import React from 'react'
import ReactDOM from 'react-dom'
import './assets/index.css'
import App from './App'
import { web3Context } from "./constants"


// ********- CSS FRAMEWORK -********
// import '../node_modules/uikit/dist/css/uikit.min.css'
// import '../node_modules/uikit/dist/css/uikit-core.min.css'
// import '../node_modules/uikit/dist/js/uikit.min.js'
// import '../node_modules/uikit/dist/js/uikit-icons.min.js'
// import '../node_modules/uikit/dist/js/uikit-core.min.js'
// ********- ************* -********

import { Web3Store } from "./models/web3Model"
import { Provider } from "mobx-react"

const web3Store = Web3Store.create({
  name: "",
  web3: {},
  status: web3Context.WEB3_LOADING,
  balance: 0,
  network: 0
})

const app = (
  <Provider web3Store={web3Store}>
    <App/>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
)
