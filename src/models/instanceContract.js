import { types } from 'mobx-state-tree'

export const contractInstance = types
.model({
  name: types.identifier,
  abi: types.frozen(),
  txHash: types.frozen(),
  address: types.string,
  contract: types.optional(types.frozen(), {}),
  methods: types.optional(types.frozen(), {}),
  eventContract: types.optional(types.frozen(), {}),
  events: types.optional(types.frozen(), {}),
})
.actions(self => ({
  getMethod(_method) {
    return self.methods[_method]
  }
}))