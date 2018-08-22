import { types, flow } from 'mobx-state-tree'
import { web3Context } from "../constants"
import { BigNumber } from 'bignumber.js';
import getWeb3Network from "../utils/getWeb3Network"

let ptx = null
let nbh = null

export const Web3Store = types
  .model({
    account: types.optional(types.string, ""),
    web3: types.frozen(),
    eventWeb3: types.frozen(),
    chainEmitter: types.optional(types.frozen(), {}),
    balance: types.string,
    network: types.number,
    status: types.enumeration(
      [
        web3Context.WEB3_LOAD_ERR,
        web3Context.WEB3_NET_ERR,
        web3Context.WEB3_LOADED,
        web3Context.WEB3_LOADING,
        web3Context.WEB3_LOCKED,
        web3Context.WEB3_CONTRACT_ERR
      ]
    )
  })
  .actions(self => ({
    setWeb3(_web3) {
      self.web3 = _web3
    },
    setEventWeb3(_event_web3) {
      self.eventWeb3 = _event_web3
    },
    setAccount(_account) {
      self.account = _account
      self.updateStatus(web3Context.WEB3_LOADED)
    },
    setEmitter(_emitter) {
      self.chainEmitter = _emitter
    },
    updateStatus(_status) {
      self.status = _status
    },
    updateBalance(_balance) {
      self.balance = _balance
    },
    updateNetwork(_network) {
      self.network = _network
    },
    determineNetwork: flow(function* determineNetwork() {
      try {
        return yield self.web3.eth.net.getId()
      } catch (error) {
        self.updateStatus(web3Context.WEB3_NET_ERR)
      }
    }),
    startPendingTxs() {
      if (self.status === web3Context.WEB3_LOADED) {
        ptx = self.eventWeb3.eth.subscribe('pendingTransactions', (err, result) => {
          self.chainEmitter.emit("ptx", result)
        })
      }
    },
    stopPendingTxs() {
      ptx.unsubscribe((err, result) => {
        self.chainEmitter.emit("ptx-stopped", result)
      })
    },
    startNewBlocks(_cb) {
      if (self.status === web3Context.WEB3_LOADED) {
        nbh = self.eventWeb3.eth.subscribe('newBlockHeaders', (err, result) => {
          self.chainEmitter.emit("nbh", result)
        })
      }
    },
    stopNewBlocks() {
      nbh.unsubscribe((err, result) => {
        self.chainEmitter.emit("nbh-stopped", result)
      })
    },
  }))
  .views(self => ({
    get instance() {
      return self.web3
    },
    get balanceEth() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.shiftedBy(-18).toString(),
        denom: "eth"
      }
    },
    get balanceGwei() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.shiftedBy(-9).toString(),
        denom: "gwei"
      }
    },
    get balanceWei() {
      const _bal = new BigNumber(self.balance)
      return {
        balance: _bal.toString(),
        denom: "wei"
      }
    },
    get netName() {
      return getWeb3Network(self.network)
    }
  }))
