import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";
import { inject, observer } from "mobx-react";
import { web3Context } from "../constants";
import Web3Loading from "./web3Components/web3Loading";
import Web3Locked from "./web3Components/web3Locked";
import Web3NotInstalled from "./web3Components/web3NotInstalled";
import Web3NoNetwork from "./web3Components/web3NoNetwork";
import Web3NoContract from "./web3Components/web3NoContract";
import ContractGate from "./contractComponents/contractGate";

@inject("augesco")
@observer
class Web3Gate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null
    };
  }

  instantiateWeb3() {
    const { augesco, event_providers } = this.props;
    augesco.updateAccountStatus(event_providers)

    augesco.web3.currentProvider.publicConfigStore.on("update", () => {
      augesco.updateAccountStatus(event_providers)
    });

    window.addEventListener("offline", function(e) {
      augesco.updateStatus(web3Context.WEB3_NET_ERR);
    });
    window.addEventListener("online", function(e) {
      augesco.updateStatus(web3Context.WEB3_LOADING);
      window.location.reload();
    });
  }

  componentWillMount() {
    const online = navigator.onLine;
    if (online) {
      getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          });
        })
        .catch(() => {
          console.log("Error finding web3.");
        });
    } else {
      this.props.augesco.updateStatus(web3Context.WEB3_NET_ERR);
    }
  }

  componentDidUpdate() {
    const { augesco } = this.props;
    if (this.state.web3 !== null) {
      augesco.setWeb3(this.state.web3);
      this.instantiateWeb3();
    } else {
      this.props.augesco.updateStatus(web3Context.WEB3_LOAD_ERR);
    }
  }

  render() {
    const { augesco } = this.props;
    switch (augesco.status) {
      case web3Context.WEB3_LOADED:
        /* 
        **  The main application content is rendered here,
        **  inherited through parent component and passed as
        **  props.children below
        */
        return (
          <ContractGate
            contracts={this.props.contracts}
            event_providers={this.props.event_providers}
          >
            {this.props.children}
          </ContractGate>
        );
      case web3Context.WEB3_LOADING:
        /* 
        **  When web3 is loading, it is simply trying to discover
        **  its status and ought to quickly change status to another
        **  context
        */
        return <Web3Loading />;
      case web3Context.WEB3_LOCKED:
        /* 
        **  Render a view to the user to unlock their metamask account
        */
        return <Web3Locked />;
      case web3Context.WEB3_LOAD_ERR:
        /* 
        **  Metamask is not installed so render a view to guide user to
        **  install
        */
        return <Web3NotInstalled />;
      case web3Context.WEB3_NET_ERR:
        /* 
        **  Application has disconnected from the internet or cannot find
        **  current network
        */
        return <Web3NoNetwork />;
      case web3Context.WEB3_CONTRACT_ERR:
        /* 
        **  Current network should contain instance of smart contract. The instance
        **  network and location should be instantiated in App.js
        */
        return <Web3NoContract data={this.props.networks} />;
      default:
        return <Web3Loading />;
    }
  }
}

export default Web3Gate;
