import { types } from 'mobx-state-tree'

export const ContractInstance = types
  .model({
    abi: types.frozen(),
    address: types.string,
    contract: types.frozen(),
    methods: types.optional(types.frozen(), {})
  })

export const ContractStore = types
  .model({
    contracts: types.map(ContractInstance)
  })
  .actions(self => ({
    add(_id, _abi, _address, _contract, _methods) {
      self.contracts.set(_id, ContractInstance.create({ 
          abi: _abi,
          address: _address,
          contract: _contract,
          methods:  _methods
        }))
    },
    delete(_id) {
      self.contracts.delete(_id)
    }
  }))
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