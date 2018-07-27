# mobx metamask trufflebox

The goal for this project is to extend the easy to use dapp development environment truffle has to offer. The finished product will be similar to that of the react truffle box but will include a state management system which will enable developers to create much more dynamic applications. 

Also, as the metamask plugin is somewhat ubiquitous in the dapp ecosystem, a metamask handle procedure will be integrated into the state management system to automatically facilitate user authentication via the plugin with correct rendering procedures.

Another extension would be to provide an endpoint for event logging and an ipfs fetcher. Infura provides a websocket for event logging and can also handle IPFS requests.

---

Much of what is intended by this project is somewhat "available" through [drizzle](https://truffleframework.com/boxes/drizzle) and [vortex](https://github.com/Horyus/vortex). I found both of these quite difficult to use and both are utilising a redux store implementation. Mobx ought to provide a simpler avenue for achieving the project goals.
