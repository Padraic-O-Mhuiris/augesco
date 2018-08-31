import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { web3Context } from "./constants"
import { Web3Store } from "./models/web3Model"
import { ContractStore } from "./models/contractModel"
import { AugescoStore } from "./models/aguescoModel"
import { Provider } from "mobx-react"
import { onPatch } from "mobx-state-tree"

const web3Store = Web3Store.create({
  name: "",
  web3: {},
  status: web3Context.WEB3_LOADING,
  balance: "0",
  network: 0
})

const contractStore = ContractStore.create({
  contracts: {},
  loaded: false,
})

const augesco = AugescoStore.create({
  account: "",
  balance: "",
  network: 0,
  status: web3Context.WEB3_LOADING,
  web3_http: {}  
})

onPatch(augesco, patch => {
  console.log(patch)
})
const app = (
  <Provider
    web3Store={web3Store}
    contractStore={contractStore}
    augesco={augesco}
  >
    <App />
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
)
