// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Registry {
    mapping(address => string) public stealthMetaAddress;
    string[] public deposits;

    function totalDeposits() public view returns (uint256) {
        return deposits.length;
    }

    function updateStealthMetaAddress(string memory _stealthMetaAddress) public {
        stealthMetaAddress[msg.sender] = _stealthMetaAddress;
    }

    function deposit(address stealthAddress, string memory stealthPublicKey) payable public {
        if(msg.value <= 0) revert("Amount must be greater than 0");
        (bool _sent, bytes memory _data) = address(stealthAddress).call{value: msg.value}("");
        require(_sent, "Failed to send ether");
        deposits.push(stealthPublicKey);
    }

    function getDeposits(uint _startIndex, uint _endIndex) public view returns (string[] memory) {
        require(deposits.length > 0, "No deposits made yet.");
        require(_endIndex <= deposits.length, "End index should be lesser than the no.of deposits.");
        require(_startIndex != _endIndex, "End index should be greater than start index.");
        uint endIndex = deposits.length;
        if(_endIndex != 0) {
            endIndex = _endIndex;
        }
        string[] memory _deposits = new string[](endIndex - _startIndex);
        uint j = 0;
        for(uint i = _startIndex; i < endIndex; i++) {
            _deposits[j] = (deposits[i]);
            j++;
        }
        return _deposits;
    }
}
