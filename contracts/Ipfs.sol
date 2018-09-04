pragma solidity ^0.4.24;

contract Ipfs {
  string ipfsHash;

  event NewHash(
    string indexed newHash
  );

  function setHash(string x) public {
    ipfsHash = x;
    emit NewHash(x);
  }

  function getHash() public view returns (string x) {
    return ipfsHash;
  }
}