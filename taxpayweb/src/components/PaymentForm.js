import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';
// import bannerImage from '../banner.png'; // Import your banner image

//       // {/* Add the banner image below the navbar */}
//       <img src={bannerImage} className="banner" alt="banner" />
const SendEth = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amountInEth, setAmountInEth] = useState('');
  const [senderName, setSenderName] = useState('');
  const [panCard, setPanCard] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [paymentMode, setPaymentMode] = useState('Ethereum'); // Defaulting to Ethereum
  const [selectedCity, setSelectedCity] = useState('');
  const [showBlockchainAddress, setShowBlockchainAddress] = useState(false);
  const [blockchainAddress, setBlockchainAddress] = useState('');

  const cityToBlockchainAddress = {
    Gov_ID_1: '0xFBC630204146268b7dA455a4F886B62Ec2aE1cB7',
    Gov_ID_2: '0x6144B187a7fEE9fdEEE48A27b02Ebc31188d7BE1',
    Gov_ID_3: '0x522773220d200fe96281C0FC168f1F33824081CB',
  };



  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccounts(accounts);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const sendEther = async (event) => {
    event.preventDefault();
    if (!web3) {
      alert('Web3 is not initialized');
      return;
    }
    if (accounts.length === 0) {
      alert("No account is available.");
      return;
    }

    const amountInWei = web3.utils.toWei(amountInEth, 'ether');
    try {
      const receipt = await web3.eth.sendTransaction({
        from: accounts[0],
        to: recipientAddress,
        value: amountInWei
      });
      console.log("Transaction successful:", receipt);
      alert("Transaction successful!");

      // Save transaction data to Firestore
      await addDoc(collection(db, "transactions"), {
        senderName: senderName,
        panCard: panCard,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        amountInEth: amountInEth,
        paymentMode: paymentMode, // Assuming you want to save this as well
        timestamp: new Date()
      });
      console.log("Transaction data saved to Firestore");

    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed! See console for details.");
    }
};


return (
    <div className="App-header">
        <h2>Choose Your State To Pay Tax</h2>
        <div id="selectCity">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select Gov ID TO Pay</option>
        <option value="Gov_ID_1">Gov_ID_1</option>
        <option value="Gov_ID_2">Gov_ID_2</option>
        <option value="Gov_ID_3">Gov_ID_3</option>

      </select>
      <button onClick={() => {
        setShowBlockchainAddress(true);
        setBlockchainAddress(cityToBlockchainAddress[selectedCity]);
      }}>Submit</button>
    </div>
    {showBlockchainAddress && selectedCity && (
      <div>
        <p>Pay your tax on this government blockchain id:</p>
        <p>{blockchainAddress}</p>
      </div>
    )}
      <h2 className="App-form-title">Pay Your Tax Using Blockchain</h2>
      <div className="App-form">
      <form onSubmit={sendEther}>
<label htmlFor="senderName">Sender Name:</label>
  <input
    id="senderName"
    type="text"
    value={senderName}
    onChange={(e) => setSenderName(e.target.value)}
    placeholder="Sender Name"
    required
  />
<label htmlFor="panCard">PAN Card:</label>
  <input
    type="text"
    value={panCard}
    onChange={(e) => setPanCard(e.target.value)}
    placeholder="PAN Card"
    required
  />
 <label htmlFor="recipientName">Recipient Name:</label>
  <input
    type="text"
    value={recipientName}
    onChange={(e) => setRecipientName(e.target.value)}
    placeholder="Recipient Name"
    required
  />
<label htmlFor="recipientAddress">Recipient Address:</label>
  <input
    type="text"
    value={recipientAddress}
    onChange={(e) => setRecipientAddress(e.target.value)}
    placeholder="Recipient Address"
    required
  />
<label htmlFor="amountInEth">Amount in ETH:</label>
  <input
    type="text"
    value={amountInEth}
    onChange={(e) => setAmountInEth(e.target.value)}
    placeholder="Amount in ETH"
    required
  />
<label htmlFor="paymentMode">Mode of Payment:</label>
  <select
    value={paymentMode}
    onChange={(e) => setPaymentMode(e.target.value)}
  >
    <option value="Ethereum">Ethereum</option>
    {/* Add other payment modes as <option> tags if needed */}
  </select>
  <button type="submit">Send ETH</button>
</form>

      </div>
    </div>
  );
};

export default SendEth;