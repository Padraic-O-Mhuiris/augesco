import { netContext } from "../constants"

export default function getWeb3Network(id) {
  switch (id) {
    case netContext.MAIN:
      return "Main"
    case netContext.MORDEN:
      return "Morden"
    case netContext.ROPESTEN:
      return "Ropesten"
    case netContext.RINKEBY:
      return "Rinkeby"
    case netContext.KOVAN:
      return "Kovan"
    default:
      return "Private"
  }
}