import { netContext } from "../constants"

export default function getWeb3Network(id) {
  switch (id) {
    case netContext.MAIN:
      return "main"
    case netContext.MORDEN:
      return "morden"
    case netContext.ROPESTEN:
      return "ropesten"
    case netContext.RINKEBY:
      return "rinkeby"
    case netContext.KOVAN:
      return "kovan"
    default:
      return "local"
  }
}