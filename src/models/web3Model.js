import { types } from 'mobx-state-tree'
import { web3Context } from "../constants"

export const Web3Store = types
  .model({
    account: types.optional(types.string, ""),
    web3: types.frozen(),
    balance: types.number,
    network: types.number,
    status: types.enumeration(
      [
        web3Context.WEB3_LOAD_ERR,
        web3Context.WEB3_NET_ERR,
        web3Context.WEB3_LOADED,
        web3Context.WEB3_LOADING,
        web3Context.WEB3_LOCKED
      ]
    )
  })
  .actions(self => ({
    setWeb3(_web3) {
      self.web3 = _web3
    },
    setAccount(_account) {
      self.account = _account
      self.updateStatus("LOADED")
    },
    updateStatus(_status) {
      self.status = _status
    },
    updateBalance(_balance) {
      self.balance = _balance
    },
    updateNetwork(_network) {
      self.network = _network
    } 
  }))
  .views(self => ({
    get instance() {
      return self.web3
    }
  }))
  