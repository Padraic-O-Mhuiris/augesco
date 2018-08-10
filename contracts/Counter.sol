pragma solidity ^0.4.24;

contract Counter {
    
    uint private count;
    address public owner;
    
    event Increment(
        uint count,
        address indexed sender
        );
        
    event Decrement(
        uint count,
        address indexed sender
        );
    
    event CountChange(
        uint oldCount,
        uint newCount,
        address indexed sender
        );
        
    constructor(uint _count) public {
        owner = msg.sender;
        count = _count;
    }
    
    function incCount() public {
        require(count < (2**256 - 1));
        count = count + 1;
        emit Increment(count, msg.sender);
    }
    
    function decCount() public {
        require(count > 0);
        count = count - 1;
        emit Decrement(count, msg.sender);
    }
    
    function changeCount(uint newCount) public {
        require(newCount > 0);
        require(newCount < (2**256 - 1));
        emit CountChange(count, newCount, msg.sender);
        count = newCount;
        
    }
    
    function getCount() public view returns (uint){
        return count;
    }
}
