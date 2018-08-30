import { types, flow } from "mobx-state-tree";
import { web3Context } from "../constants";
import { BigNumber } from 'bignumber.js';
import getWeb3Network from "../utils/getWeb3Network"

const web3Contexts = [
  web3Context.WEB3_LOAD_ERR,
  web3Context.WEB3_NET_ERR,
  web3Context.WEB3_LOADED,
  web3Context.WEB3_LOADING,
  web3Context.WEB3_LOCKED,
  web3Context.WEB3_CONTRACT_ERR
];

let ptx = null;
let nbh = null;

const contractInstance = {};
const txInstance = {};

export const AugescoStore = types
  .model({
    account: types.optional(types.string, ""),
    balance: types.string,
    network: types.number,
    status: types.enumeration(web3Contexts),
    web3: types.optional(types.frozen()),
    web3_ws: types.optional(types.frozen()),
    witness: types.optional(types.frozen(), {}),
    contracts: types.map(contractInstance),
    transactions: types.map(txInstance),
    loaded: false,
    ethData: false
  })
  .actions(self => ({
    setWeb3(web3) {
      self.web3 = web3;
    },
    setWeb3Websocket(web3_ws) {
      self.web3_ws = web3_ws;
    },
    setAccount(account) {
      self.account = account;
      self.updateStatus(web3Context.WEB3_LOADED);
    },
    setEmitter(emitter) {
      self.witness = emitter;
    },
    updateStatus(status) {
      self.status = status;
    },
    updateBalance(balance) {
      self.balance = balance;
    },
    updateNetwork(network) {
      self.network = network;
    },
    determineNetwork: flow(function* determineNetwork() {
      try {
        return yield self.web3.eth.net.getId();
      } catch (error) {
        self.updateStatus(web3Context.WEB3_NET_ERR);
      }
    }),
    startPendingTxs() {
      if (self.status === web3Context.WEB3_LOADED) {
        ptx = self.eventWeb3.eth.subscribe(
          "pendingTransactions",
          (err, result) => {
            self.witness.emit("ptx", result);
          }
        );
      }
    },
    stopPendingTxs() {
      ptx.unsubscribe((err, result) => {
        self.witness.emit("ptx-stopped", result);
      });
    },
    startNewBlocks(_cb) {
      if (self.status === web3Context.WEB3_LOADED) {
        nbh = self.eventWeb3.eth.subscribe("newBlockHeaders", (err, result) => {
          self.witness.emit("nbh", result);
        });
      }
    },
    stopNewBlocks() {
      nbh.unsubscribe((err, result) => {
        self.witness.emit("nbh-stopped", result);
      });
    }
  }))
  .views(self => ({
    get balanceEth() {
      const bal = new BigNumber(self.balance);
      return {
        balance: bal.shiftedBy(-18).toString(),
        denom: "eth"
      };
    },
    get balanceGwei() {
      const bal = new BigNumber(self.balance);
      return {
        balance: bal.shiftedBy(-9).toString(),
        denom: "gwei"
      };
    },
    get balanceWei() {
      const bal = new BigNumber(self.balance);
      return {
        balance: bal.toString(),
        denom: "wei"
      };
    },
    get netName() {
      return getWeb3Network(self.network);
    }
  }));
