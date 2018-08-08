import { types, flow } from 'mobx-state-tree'

export const ContractInstance = types
  .model({
    name: types.identifier,
    abi: types.frozen(),
    txHash: types.frozen(),
    address: types.string,
    contract: types.optional(types.frozen(), {}),
    methods: types.optional(types.frozen(), {})
  })
  .actions(self => ({
    getMethod(_method) {
      return self.methods[_method]
    }
  }))

export const ContractStore = types
  .model({
    contracts: types.map(ContractInstance),
    loaded: types.boolean,
    eth: types.optional(types.frozen(), {})
  })
  .actions(self => ({
    add(_id, _abi, _txHash, _address, _contract, _methods) {
      self.contracts.set(_id, { 
          name: _id,
          abi: _abi,
          txHash: _txHash,
          address: _address,
          contract: _contract,
          methods:  _methods
        })
    },
    setEth(_eth) {
      self.eth = _eth
    },
    delete(_id) {
      self.contracts.delete(_id)
    },
    toggleLoaded() {
      self.loaded = !self.loaded
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
          const tx = yield self.getMethod(_id, _method)["func"](..._args).send(_params)
          console.log(tx)
          //return tx
          
        } catch (error){
          console.error(error)
        }
      } else {
        return undefined
      }
    })
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
