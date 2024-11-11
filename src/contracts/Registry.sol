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
}
