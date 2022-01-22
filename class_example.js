import { ethers } from "ethers";
import Token from "./artifacts/contracts/Emir.sol/Token.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);

class User {
  constructor(props) {
    this.address = props.address !== undefined ? props.address : "";
  }

  async connect() {
    if (window.ethereum !== "undefined") {
      await provider.send("eth_requestAccounts", []);
      this.address = await provider.getSigner().getAddress();
    }
  }

  get address() {
    return this.address;
  }
}

class Contract {
  constructor(deployementAddress, tokenAbi) {
    this.deployementAddress = deployementAddress;
    this.tokenAbi = tokenAbi;
    this.contract = new ethers.Contract(deployementAddress, tokenAbi, provider);
  }

  async transfer_token_to(user_to, amount) {
    if (window.ethereum !== "undefined") {
      const eht_signer = this.contract.connect(provider.getSigner());
      const sent = await eht_signer.transfer(user_to.address, amount);
      await sent.wait();
    }
  }

  async transfer_token(user_from, user_to, amount) {
    if (window.ethereum !== "undefined") {
      const eht_signer = this.contract.connect(provider.getSigner());
      const sent = await eht_signer.transferFrom(
        user_from.address,
        user_to.address,
        amount
      );
      await sent.wait();
    }
  }

  get contract() {
    return this.contract;
  }
}

/*
 	If the frontend has the metamask end user addresses, then simply put those as the constructor to User class since they are already connected with: 
		window.ethereum
		.request({ method: "eth_requestAccounts" }, [])
		.then((res) => console.log(res[0]));
	If the frontend doesn't have the metamask end user addresses, then you can simply connect them using:
		const user = new User();
		user.connect(); 
*/
const wallets = []; // all wallets that the frontwend will provide.

// if the frontend does not provide any metamask addresses, then simply populate this array with:
// wallets.push(user.address);

// retrieve the contract deployed at address starting with 0x2a51... with its abi.
const contract = new Contract(
  "0x2a5192960fb908A8ee256CBF1CD89b363B401680",
  Token.abi
);

// for each address in wallets, send 0.001 EHT.
wallets.forEach((wallet) => {
  const user_from = new User("0xD98085f8e12c9F09A3211D03CE86714860e015C8"); // the account that holds pretty much the entirity of the token.
  const user_to = new User(wallet); // transfer acount
  contract
    .transfer_token(user_from, user_to, 10000000000000000)
    .then(() => console.log("Tokens sent."));
});
