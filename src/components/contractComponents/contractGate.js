import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { web3Context } from "../../constants";
import ContractLoading from "./contractLoading";
import EventGate from "../eventComponents/eventGate";

const EventEmitter = require("events");

@inject("augesco")
@observer
class ContractGate extends Component {
  parseContractAbi(key, _abi) {
    for (const method of _abi) {
      if (method.name === key) {
        return method;
      }
    }
    return {};
  }

  parseContractEvents(_eventsWeb3) {
    const eventObj = {};
    for (const event of Object.keys(_eventsWeb3)) {
      if (/(^[a-zA-Z]+$)/.test(event)) {
        eventObj[event] = _eventsWeb3[event];
      }
    }
    return eventObj;
  }

  parseContractMethods(_methodsWeb3, _abi) {
    const methodObj = {};
    for (const method of Object.keys(_methodsWeb3)) {
      if (/([a-z]*[()])/.test(method)) {
        const obj = {};
        const key = method.split("(")[0];
        obj["func"] = _methodsWeb3[method];
        const methodAbi = this.parseContractAbi(key, _abi);
        methodAbi["func"] = _methodsWeb3[method];
        methodObj[key] = methodAbi;
      }
    }
    return methodObj;
  }

  parseContract(_contract) {
    const { augesco } = this.props;

    var check = true;
    for (const network of Object.keys(_contract.networks)) {
      if (network === augesco.network.toString()) {
        check = !check;
        break;
      }
    }

    if (check) {
      augesco.updateStatus(web3Context.WEB3_CONTRACT_ERR);
    } else {
      const contractName = _contract.contractName;
      const contractAbi = _contract.abi;
      const contractTxHash =
        _contract.networks[augesco.network].transactionHash;
      const contractAddress = _contract.networks[augesco.network].address;

      const contractWeb3 = new augesco.web3.eth.Contract(
        contractAbi,
        contractAddress
      );
      const contractMethods = this.parseContractMethods(
        contractWeb3.methods,
        contractAbi
      );

      const eventContract = new augesco.web3_ws.eth.Contract(
        contractAbi,
        contractAddress
      );
      const contractEvents = this.parseContractEvents(eventContract.events);

      augesco.add(
        contractName,
        contractAbi,
        contractTxHash,
        contractAddress,
        contractWeb3,
        contractMethods,
        eventContract,
        contractEvents
      );
    }
  }

  componentDidMount() {
    const { augesco } = this.props;
    if (!augesco.loaded) {
      for (const contract of this.props.contracts) {
        this.parseContract(contract);
      }

      if (augesco.status !== web3Context.WEB3_CONTRACT_ERR) {
        const emitter = new EventEmitter();
        emitter.setMaxListeners(100);
        augesco.setWitness(emitter);
        augesco.toggleLoaded();
      }
    }

    augesco.startNewBlocks();
  }

  render() {
    const { augesco } = this.props;
    if (augesco.loaded) {
      return <EventGate>{this.props.children}</EventGate>;
    } else {
      return <ContractLoading />;
    }
  }
}

export default ContractGate;
