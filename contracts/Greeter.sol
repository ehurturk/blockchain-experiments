// contracts/Greeter.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract Greeter {
    /* Define variable greeting of the type string */
    string greeting;

    /* This runs when the contract is executed */
    constructor() public {
        greeting = "Hello World!";
    }

    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}