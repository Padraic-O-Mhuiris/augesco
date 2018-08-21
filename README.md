# Augesco

Augesco is a new ethereum dapp development framework that is intended to provide more out-of-the-box functionality for truffle-based projects. The project is similar to [drizzle](https://truffleframework.com/boxes/drizzle) which is provided by truffle. A large problem I found with drizzle and generally developing web dapps is the large amount of boilerplate code that is necessary to interact with contracts. 

Augesco uses [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) as it's state management system as an alternative to redux, the reasoning is best outlined [here](https://codeburst.io/the-curious-case-of-mobx-state-tree-7b4e22d461f). With it, Augesco injects two stores, **web3store** which controls blockchain interactivity and **contractstore** which handles contract logic. The project also comes with out-of-the-box dapp components like metamask lockscreens and transaction notifiers. Included in this project is a sample contract which shows how the project works. 

## Requirements

- [MetaMask plugin](https://metamask.io/) 

- An infura api-key, which can be requested [here](https://infura.io/register)

- An ethereum account with testnet ether [(rinkeby)](https://faucet.rinkeby.io/) 

- This project is best fitted for public blockchains but [ganache](https://github.com/trufflesuite/ganache-cli) can still be used. Use the latest beta as it has a websocket implementation. Please note that some event functionality does not work with ganache as well as public chain

  ``` npm install -g ganache-cli@7.0.0-beta.0 ```

Alternatively, a local node can be used. 

## Setup

- Clone this project
  
  ```git clone git@github.com:sirromdev/augesco.git```

- Install dependencies

  ```cd augesco && npm install```

- Once all dependencies are installed, truffle should be used to build and migrate the contracts to the blockchain. I found that the [rinkeby](https://faucet.rinkeby.io/) test network works best. Once you have test ether, edit the account-config.js file and include your account mnemonic and infura key. 

- Compile your contract(s)
  
  ``` truffle compile --all ```

- Migrate the smart contracts to the blockchain. There should be a build folder present which holds the deployment in

  ``` truffle migrate --network rinkeby ```

- Start the local server and the page should auto render on localhost:3000

  ``` npm start ```

## How it works

The project is built around mobx-state-tree which is a state-management system similar to redux which has been traditionally used in blockchain dapps. Mobx-state-tree enables developers to model their data in a more object-orientated style.

Aguesco abstracts away blockchain interactivity by wrapping the folder in 3 layers called **gates**. They are found in our components folder:

- *web3gate* interacts with the web3store model and determines user and network status. Should the user, change account, change network, lock their metamask or lose connection. The dapp automatically can detect this and renders the correct ux in this case.

- *contractgate* is utilised to parse the contract logic. In our *App.js* file, we pass our contract json data from the build folder as an array *contracts* into props. When web3gate has loaded without issue, the contracts are automatically parsed and are contained within a map object in the contract store.

- *eventgate* is not totally required by the project but is quite useful. The eventgate component detects all transactions executed by the user and displays the returned status. Also present is a drawer object which can subscribe to all new blockchain events from the application loads. Currently the optimal way to do this without utilising the blockchain load is to use the websocket endpoints provided by infura. These are declared in *App.js* similarly to how contracts are declared. 

---

When accessing the two stores when building a dapp, I would advise using es6 syntax as below to save writing `this.props` everywhere.
```javascript
const { web3Store, contractStore } = this.props  
```
In order to be able reference any model stores with mobx, we must inject the stores into our react components like so:

```javascript
import { inject, observer } from "mobx-react"

@inject("web3Store")
@inject("contractStore")
@observer class AppContent extends Component {
```

## ContractStore

#### `contractStore.call(<contractName>, <function>, <args>)` 
- `<contractName>` - string, name of the contract from which you wish to call
- `<function>` - string, name of function within contract
- `<args>` - array, arguments required, leave empty array if none needed

Using `call()`, we take an asynchronous read of the contract state which returns a promise. Below is a snippet of Counter.sol and its getter function `getCount` and an example of its execution.
```solidity
function getCount() public view returns (uint){
  return count;
}
```
Using our contractStore we can do something like this:
```javascript
let count = await contractStore.call("Counter", "getCount", [])
```

#### `contractStore.exec(<contractName>, <function>, <args>, <options>)` 
- `<contractName>` - string, name of the contract from which you wish to call
- `<function>` - string, name of function within contract
- `<args>` - array, arguments required, leave empty array if none needed
- `<options>` - object, manipulates transaction details. See web3 [docs](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id19) for more.

`exec()` is to be used for any contract function that alters the state of the contract by a transaction. These functions are called *setters*. When used in this application, a popup will appear from metamask to confirm or reject the transaction. When setters are executed it usually takes 10-15 seconds until they are mined and resolved which lends itself to bad Ux. However, augesco provides a meaningful solution to this through transaction and event notifiers. Example:

```solidity
function incCount() public {
  require(count < (2**256 - 1));
  count = count + 1;
  emit Increment(count, msg.sender);
}
```
This is then executed
```javascript
contractStore.exec("Counter", "incCount", [], {
  "from": web3Store.account
})
```

#### `contractStore.listen(<contractName>, <event>, <options>, <callback>)` 
- `<contractName>` - string, name of the contract from which you wish to call
- `<event>` - string, name of event within contract
- `<options>` - object, filtering options. See web3 [docs](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events)
- `<callback>` - function, returns two arguments, err and event, event returns the event log data.

Solidity contracts have implemented events which can be used to track the state of a contract over time. Augesco has a `listen()` function which can be used to wait on changes to such functions. Looking at the `incCount()` function in the previous section, an `Increment()` event is emitted. By listening for emitted events, we can update our frontend representation in accordance with the changes through the callback. Example:

```soldity
event Increment(
  uint count,
  address indexed sender
);
```

``` javascript
contractStore.listen("Counter", "Increment", {}, (err, event) => {...})
```
Using this, in tandem with an `exec()` function which emits a corresponding event can lead to a more reactive design. 


#### `contractStore.txEmitter.on(<eventName>, <data>)`

For handling transaction logic, Aguesco implements a listener object which emits the status of a sent transaction. When we a new transaction is executed, from our `exec()` function, Aguesco keeps track of the transaction until it succeeds or fails. This involves a number of stages which is represented in *constants.js* The eventgate component uses the emitter extensively to provide popup notifications for the ui. 

```javascript
contractStore.txEmitter.on(txStatus.NEW, (hash) => {

  contractStore.txEmitter.once(txStatus.PENDING + hash, (data) => {})
  contractStore.txEmitter.on(txStatus.MINED + hash, (data) => {})
  contractStore.txEmitter.on(txStatus.SUCCESS + hash, (data) => {})
  contractStore.txEmitter.on(txStatus.FAILED + hash, (data) => {})

}
```

By nesting the *on-events* to be inside the new transaction, we can concatenate the status with its unique hash to provide more fine control for each event. This makes it easier when dealing with notifications. 

## Web3Store

`web3Store.account` - returns the current users account and should correspond directly with metamask

`web3Store.balanceEth` - returns the current users balance in standard ether

`web3Store.balanceGwei` - returns the current users balance in 1x10^9 eth (gwei)

`web3Store.balanceWei` - returns the current users balance in 1x10^18 eth (wei). Wei is the smallest denomination of ether possible.

`web3Store.netName` - returns the current network name

#### `web3Store.chainEmitter`
The chainEmitter object works similarly to the txEmitter and is used to monitor blockchain subscriptions. As of now, subscriptions to the pending transactions and new block headers are available to be used. As of now, logs have not been implemented. The utility of being able to observe live data from the blockchain may improve user experience and possibly enable less-trusting users learn as to how the blockchain works. 

Pending transactions are started and stopped: 
- `web3Store.startPendingTxs()`
- `web3Store.stopPendingTxs()`

Once started, event result objects are emitted by the chainEmitter and can be caught anywhere within the application. We use the shorthand *"ptx"* as the eventname

```javascript
web3Store.chainEmitter.on("ptx", data => {
  // do something with incoming transaction data
})
```

Similarly, new blocks are started and stopped
- `web3Store.startNewBlocks()`
- `web3Store.stopNewBlocks()`

We use *"nbh"* as the eventname
```javascript
web3Store.chainEmitter.on("nbh", data => {
  // do something with incoming block headers
})
```

When both subscriptions are stopped, a single unsubscribe event is fired with the eventname + *"stopped"* appended.


## Design

The application uses [antd](https://ant.design/docs/react/introduce) as a css framework. Edits and overrides can be made using less in the assets folder. Ant makes it quite easy to generate a good looking ui but it can be easily removed using npm if material/semantic-ui etc are preferable.

---

> AGUESCO - BEGIN TO DEVELOP