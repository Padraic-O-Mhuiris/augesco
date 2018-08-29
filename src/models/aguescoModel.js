import { types } from "mobx-state-tree";

export const AugescoStore = types.model({
  account: types.optional(types.string, ""),
  balance: types.string
})
