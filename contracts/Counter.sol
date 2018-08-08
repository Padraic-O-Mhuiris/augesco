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
        count += 1;
        emit Increment(count, msg.sender);
    }
    
    function decCount() public {
        require(count > 0);
        count -= 1;
        emit Decrement(count, msg.sender);
    }
    
    function changeCount(uint newCount) public {
        require(newCount > 0);
        require(newCount < (2**256 - 1));
        uint oldCount = count;
        count = newCount;
        emit CountChange(oldCount, newCount, msg.sender);
    }
    
    function getCount() public view returns (uint){
        return count;
    }
}
