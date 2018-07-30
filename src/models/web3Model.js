import { types } from 'mobx-state-tree'

export const Web3Store = types
  .model({
    name: types.string,
    web3: types.frozen()
  })
  .actions(self => ({
    setWeb3(web3) {
      self.web3 = web3
    }
  }))
  .views(self => ({
    get instance() {
      return self.web3.version
    }
  }))
  