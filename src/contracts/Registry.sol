// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Registry {
    mapping(address => string) public stealthMetaAddress;
    address[] public deposits;

    function updateStealthMetaAddress(string memory _stealthMetaAddress) public {
        stealthMetaAddress[msg.sender] = _stealthMetaAddress;
    }

    function deposit(address stealthAddress) payable public {
        if(msg.value <= 0) revert("Amount must be greater than 0");
        (bool _sent, bytes memory _data) = address(stealthAddress).call{value: msg.value}("");
        require(_sent, "Failed to send ether");
        deposits.push(stealthAddress);
    }

    function getDeposits(uint _startIndex, uint _endIndex) public view returns (address[] memory) {
        require(deposits.length > 0, "No deposits made yet.");
        require(_endIndex <= deposits.length, "End index should be lesser than the no.of deposits.");
        require(_startIndex != _endIndex, "End index should be greater than start index.");
        uint endIndex = deposits.length;
        if(_endIndex != 0) {
            endIndex = _endIndex;
        }
        address[] memory _deposits = new address[](endIndex - _startIndex);
        uint j = 0;
        for(uint i = _startIndex; i < endIndex; i++) {
            _deposits[j] = (deposits[i]);
            j++;
        }
        return _deposits;
    }
}
