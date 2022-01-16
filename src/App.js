import "./App.css";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Greeter from "./contracts/Greeter.sol/Greeter.json";
function App() {
  const [accountAddress, setAccountAddress] = useState("default_account");

  async function connect_metamask() {
    if (window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccountAddress(address);
    }
  }

  async function connect_contract() {
    if (window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0x5322f0AA79e7e7d5Bb23F9A53E4656C4D880Ad15",
        Greeter.abi,
        provider
      );

      const contractSigner = contract.connect(signer);
      const greet = await contractSigner.greet();
      console.log(greet);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button
          onClick={() => {
            connect_metamask();
          }}
        >
          Connect with MetaMask!
        </button>

        <p>Connected with: {accountAddress}</p>

        <button
          onClick={() => {
            connect_contract();
          }}
        >
          Check greeting!
        </button>
      </header>
    </div>
  );
}

export default App;
