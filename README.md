# Blockchain Experiemnts

This repo contains my experiments for blockchain development. I am using ethers.js for web3 control and hardhat for my development suite. There are currently 2 contracts, which are:
`Token` and `Greeter`. `Token` is an ERC20 smart contract that is imported using open zeppelin.`Greeter` is just here to test smart contract connection. In `App.js`, you can find an example of connection to MetaMask and `Greeter`.

In this experiment, I aimed to understand the interaction between the blockchain and front-end (which I used React). Currently, you can connect with MetaMask and call a function inside `Greeter` smart contract, which is entirely made possible by ethers.js.
