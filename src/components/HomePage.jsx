import "../App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Token from "../contracts/Emir.sol/Token.json";

// Emir ERC-20 token smart contract deployement address
const TOKEN_DEPLOYED_ADDRESS = "0x2a5192960fb908A8ee256CBF1CD89b363B401680";

const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
// create a new contract
const eht_contract = new ethers.Contract(
  TOKEN_DEPLOYED_ADDRESS,
  Token.abi,
  provider
);

function HomePage() {
  const [accountAddress, setAccountAddress] = useState("default_account");
  const [clicked, setClicked] = useState(false);
  const [transferAmount, setTransferAmount] = useState();
  const [transferTo, setTransferTo] = useState();

  async function connect_metamask() {
    if (window.ethereum !== "undefined") {
      await provider.send("eth_requestAccounts", []);
      const address = await signer.getAddress();
      setAccountAddress(address);
      const network_id = await provider.getNetwork();
      console.log(network_id.chainId);
    }
  }

  async function connect_eht_contract() {
    if (window.ethereum !== "undefined") {
      const eth_signer = eht_contract.connect(signer);
      const supply = await eth_signer.totalSupply();
      alert("Total supply of EHT: " + supply.toString());
    }
  }

  async function transfer_eht_to(to, amount) {
    if (window.ethereum !== "undefined") {
      const eht_signer = eht_contract.connect(signer);
      const sent = await eht_signer.transfer(to, amount);
      await sent.wait();
      alert("Tokens sent!");
    }
  }

  // get eth from the whale of EHT (account that starts with 0xD98...)
  async function get_eht(amount) {
    if (window.ethereum !== "undefined") {
      const eht_signer = eht_contract.connect(signer);
      const sent = await eht_signer.transferFrom(
        "0xD98085f8e12c9F09A3211D03CE86714860e015C8",
        accountAddress,
        amount
      );
      await sent.wait();
      alert("Tokens sent!");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!clicked ? (
          <button
            onClick={() => {
              connect_metamask();
              setClicked(true);
            }}
          >
            Connect with MetaMask!
          </button>
        ) : (
          <p>Connected with: {accountAddress}</p>
        )}

        <button
          onClick={() => {
            connect_eht_contract();
          }}
        >
          Get Total Supply of EHT!
        </button>
        <p>Transfer To:</p>
        <input onChange={(event) => setTransferTo(event.target.value)}></input>
        <p>Transfer Amount (EHT):</p>
        <input
          onChange={(event) => setTransferAmount(event.target.value)}
        ></input>
        <button onClick={() => transfer_eht_to(transferTo, transferAmount)}>
          submit
        </button>
      </header>
    </div>
  );
}

export default HomePage;
