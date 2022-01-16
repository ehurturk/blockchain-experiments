# Blockchain Experiemnts

This repo contains my experiments for blockchain development. I am using ethers.js for web3 control and hardhat for my development suite. There are currently 2 contracts, which are:
`Token` and `Greeter`. `Token` is an ERC20 smart contract that is imported using open zeppelin.`Greeter` is just here to test smart contract connection. In `App.js`, you can find an example of connection to MetaMask and `Greeter`.

In this experiment, I aimed to understand the interaction between the blockchain and front-end (which I used React). Currently, you can connect with MetaMask and call a function inside `Greeter` smart contract, which is entirely made possible by ethers.js.

In case you are wondering, I am using the BSC Testnet network here since its gas fee his relatively low compared to ETH smartchain (i.e. Ropsten).

- `Greeter` smart contract is currently deployed to the address: 0x5322f0AA79e7e7d5Bb23F9A53E4656C4D880Ad15.
- `Token` ERC20 smart contract is currently deployed to the address: 0x2a5192960fb908A8ee256CBF1CD89b363B401680

You can see the activity of these contracts by entering these addresses into [this address](testnet.bscscan.com).
