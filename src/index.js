import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { web3Context } from "./constants";
import { AugescoStore } from "./models/aguescoModel";
import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router";
import { RouterModel, syncHistoryWithStore } from "mst-react-router";
import { types } from "mobx-state-tree";
import { Provider } from "mobx-react";
import { onPatch } from "mobx-state-tree";

const routerModel = RouterModel.create();
 
// Define root model type
const Model = types.model({
  router: RouterModel
});
 
export const store = Model.create({ router: routerModel });
 
// Hook up router model to browser history object
const history = syncHistoryWithStore(createBrowserHistory(), routerModel);
 

const augesco = AugescoStore.create({
  account: "",
  balance: "",
  network: 0,
  status: web3Context.WEB3_LOADING,
  web3_http: {},
});

onPatch(augesco, patch => {
  console.log(patch);
});

const app = (
  <Provider augesco={augesco} router={routerModel}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
