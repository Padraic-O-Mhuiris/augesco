import React, { Component } from "react";
import "./assets/less/index";
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

@inject("router")
class Routes extends Component {
  render() {
    console.log(this.props)
    return (
      
    );
  }
}

export default withRouter(App);
