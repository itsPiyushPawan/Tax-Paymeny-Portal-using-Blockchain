import React, { useState, useEffect } from 'react';
import getWeb3 from '../getWeb3';
import { db } from '../firebaseConfig'; // Adjust the path as necessary


function TaxPaymentForm() {
  const [web3, setWeb3] = useState(null);
  
  useEffect(() => {
    const initWeb3 = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
    };
    initWeb3();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    const taxPayerName = data.get('taxPayerName');
    const amount = data.get('amount');
    // Further data extraction...

    // Example transaction - replace with your contract methods
    const accounts = await web3.eth.getAccounts();
    // Assume contractMethod is the method you'd call
    // await contract.methods.contractMethod(arg1, arg2, ...).send({ from: accounts[0] });

    // Save to Firebase
    db.collection('taxPayments').add({
      taxPayerName,
      amount,
      // Further data...
    }).then(() => {
      console.log('Payment data saved to Firebase');
    }).catch((error) => {
      console.error('Error saving data to Firebase:', error);
    });
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="taxPayerName" placeholder="Tax Payer Name" required />
      <input name="amount" placeholder="Amount" required />
      {/* Additional fields... */}
      <button type="submit">Submit Payment</button>
    </form>
  );
}

export default TaxPaymentForm;
