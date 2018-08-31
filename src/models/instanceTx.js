import { types, getRoot } from 'mobx-state-tree'
import { txStatus } from "../constants"

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
      if (self.status !== txStatus.FAILED && self.status !== txStatus.SUCCESS) {
        self.status = _status
      }
    },
    txStart() {
      getRoot(self).witness.emit(txStatus.NEW, self.hash)
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
            if (res.blockNumber !== null) {
              self.updateStatus(txStatus.MINED)
            }
          });
          break;

        case txStatus.MINED:
          getRoot(self).web3.eth.getTransactionReceipt(hash).then((res) => {
            if (res !== null) {
              self.emitMined(res)
              if (res.status === '0x0') {
                self.updateStatus(txStatus.FAILED)
              }
              if (res.status === '0x1') {
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
      getRoot(self).witness.emit(txStatus.PENDING + txData.hash, txData)
    },
    emitMined(txData) {
      getRoot(self).witness.emit(txStatus.MINED + txData.transactionHash, txData)
    },
    emitFailed(txData) {
      getRoot(self).witness.emit(txStatus.FAILED + txData.transactionHash, txData)
    },
    emitSuccess(txData) {
      getRoot(self).witness.emit(txStatus.SUCCESS + txData.transactionHash, txData)
    }
  }))