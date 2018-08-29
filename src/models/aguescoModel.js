import { types } from "mobx-state-tree";
import { web3Context } from "../constants"

const web3Contexts = [
  web3Context.WEB3_LOAD_ERR,
  web3Context.WEB3_NET_ERR,
  web3Context.WEB3_LOADED,
  web3Context.WEB3_LOADING,
  web3Context.WEB3_LOCKED,
  web3Context.WEB3_CONTRACT_ERR
]

const contractInstance ={}
const txInstance ={}

export const AugescoStore = types.model({
  account: types.optional(types.string, ""),
  balance: types.string,
  network: types.number,
  status: types.enumeration(web3Contexts),
  web3: types.optional(types.frozen()),
  eventWeb3: types.optional(types.frozen()),
  contracts: types.map(contractInstance),
  transactions: types.map(txInstance),
  loaded: false,
  ethData: false
})
