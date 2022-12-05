import React, { useEffect, useState } from "react";
import ProgressBar from './progress-bar.component.jsx'
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json"


const getEthereumObject = () => window.ethereum;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xc9e14Bb89A8Fe1Ee52CF1728C0E1ec08b5356832"

  const contractABI = abi.abi;

  const findMetaMaskAccount = async () => {
    try {
      const { ethereum } = window;
  
      if (!ethereum) {
        console.error("Make sure you have MetaMask!");
        return null;
      }
  
      console.log("We have the Ethereum object", ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        return account;
      } else {
        console.error("No authorized account found");
        return null;
      }  
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(error) {
      console.error(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count:", count.toNumber());

       

        const waveTxn = await wavePortalContract.wave("hello");
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  }, []);


  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I'm Adam, I'm new to this space but I'm enjoying my time so far!
          You can connect your Ethereum wallet and wave at me if you're feeling friendly.
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className = "waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
  
  

