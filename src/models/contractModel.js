import { types, getRoot, flow } from 'mobx-state-tree'
import { txStatus } from "../constants"

export const ContractInstance = types
  .model({
    name: types.identifier,
    abi: types.frozen(),
    txHash: types.frozen(),
    address: types.string,
    contract: types.optional(types.frozen(), {}),
    methods: types.optional(types.frozen(), {}),
    eventContract: types.optional(types.frozen(), {}),
    events: types.optional(types.frozen(), {})
  })
  .actions(self => ({
    getMethod(_method) {
      return self.methods[_method]
    }
  }))

export const transactionInstance = types
  .model({
    hash: types.identifier,
    receipt: types.optional(types.frozen(), {}),
    interval: types.optional(types.frozen(), {}),
    status: types.enumeration(
      [
        txStatus.PENDING,
        txStatus.MINED,
        txStatus.FAILED,
        txStatus.SUCCESS
      ]
    )
  })
  .actions(self => ({
    addReceipt(_receipt) {
      self.receipt = _receipt
    },
    updateStatus(_status) {
      if(self.status !== txStatus.FAILED && self.status !== txStatus.SUCCESS) {
        self.status = _status
      }
    },
    txStart() {
      getRoot(self).txEmitter.emit(txStatus.NEW, self.hash)
      self.interval = setInterval(() => self.monitorTx(self.hash), 1000)
    },
    txEnd() {
      clearInterval(self.interval)
    },
    monitorTx(hash) {
      switch (self.status) {
        case txStatus.PENDING:
          getRoot(self).web3.eth.getTransaction(hash).then((res) => {
            self.emitPending(res)
            if(res.blockNumber !== null) {
              self.updateStatus(txStatus.MINED)
            }
          });
          break;
        
        case txStatus.MINED:
          getRoot(self).web3.eth.getTransactionReceipt(hash).then((res) => {
            if(res !== null) {
              self.emitMined(res)
              if(res.status === '0x0') {
                self.updateStatus(txStatus.FAILED)
              }
              if(res.status === '0x1') {
                self.updateStatus(txStatus.SUCCESS)
              }
            }
          });
          break;
        
        case txStatus.FAILED:
          getRoot(self).web3.eth.getTransactionReceipt(hash).then((res) => {
            self.addReceipt(res)
            self.emitFailed(res)
            self.txEnd()
          });
          break;
        
        case txStatus.SUCCESS:
          getRoot(self).web3.eth.getTransactionReceipt(hash).then((res) => {
            self.addReceipt(res)
            self.emitSuccess(res)
            self.txEnd()
          });
          break;

        default:
          self.txEnd()
          break;
      }
    },
    emitPending(txData) {
      getRoot(self).txEmitter.emit(txStatus.PENDING+txData.hash, txData)
    },
    emitMined(txData) {
      getRoot(self).txEmitter.emit(txStatus.MINED+txData.transactionHash, txData)
    },
    emitFailed(txData) {
      getRoot(self).txEmitter.emit(txStatus.FAILED+txData.transactionHash, txData)
    },
    emitSuccess(txData) {
      getRoot(self).txEmitter.emit(txStatus.SUCCESS+txData.transactionHash, txData)
    }
  }))

export const ContractStore = types
  .model({
    contracts: types.map(ContractInstance),
    transactions: types.map(transactionInstance),
    txEmitter: types.optional(types.frozen(), {}),
    web3: types.optional(types.frozen(), {}),
    loaded: types.boolean
  })
  .actions(self => ({
    add(_id, _abi, _txHash, _address, _contract, _methods, _eventContract, _events) {
      self.contracts.set(_id, { 
          name: _id,
          abi: _abi,
          txHash: _txHash,
          address: _address,
          contract: _contract,
          methods:  _methods,
          eventContract: _eventContract,
          events: _events
        })
    },
    delete(_id) {
      self.contracts.delete(_id)
    },
    toggleLoaded() {
      self.loaded = !self.loaded
    },
    setEmitter(_emitter) {
      self.txEmitter = _emitter
    },
    setWeb3(_web3) {
      self.web3 = _web3
    },
    use(_id) {
      if(self.loaded && self.contracts.has(_id)) {
        return self.contracts.get(_id)
      } else {
        return {}
      }      
    },
    getMethod(_id, _method) {
      if(self.loaded && self.contracts.has(_id)) {
        return self.use(_id).getMethod(_method)
      } else {
        return {}
      }      
    },
    getMethodArgs(_id, _method) {
      if(self.loaded && self.contracts.has(_id)) {
        return self.use(_id).getMethod(_method).inputs
      } else {
        return {}
      }      
    },
    createTx(_id) {
      self.transactions.set(_id, {
        hash: _id,
        receipt: {},
        status: txStatus.PENDING
      })
    },
    useTx(_id) {
      if(self.loaded && self.transactions.has(_id)) {
        return self.transactions.get(_id)
      } else {
        return {}
      } 
    },
    startTx(_id) {
      self.useTx(_id).txStart()
    },
    call: flow(function* call(_id, _method, _args) {
      if(self.loaded && self.contracts.has(_id)) {
        try {
          return yield self.getMethod(_id, _method)["func"](..._args).call()   
        } catch (error){
          console.error(error)
        }
      } else {
        return undefined
      }
    }),
    exec: flow(function* exec(_id, _method, _args, _params) {
      if(self.loaded && self.contracts.has(_id)) {
        try {
          yield self.getMethod(_id, _method)["func"](..._args)
          .send(_params)
          .on('transactionHash', function(hash){
            self.createTx(hash)
            self.startTx(hash)
          })
        } catch (error){
          console.error(error)
        }
      } else {
        console.error("Not ready")
      }
    }),
    listen(_id, _event, args, cb) {
      if(self.loaded && self.contracts.has(_id)) {
        self.use(_id).events[_event](...args, cb)
      } else {
        console.error("Not ready")
      }}
    }
  ))
  .views(self => ({
    get keys() {
      return Array.from(self.contracts.keys())
    },
    get values() {
      return Array.from(self.contracts.values())
    },
    get json() {
      return self.contracts.toJSON()
    }    
  }))
