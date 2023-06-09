import React, { useState } from 'react';
import axios from 'axios';

const TransferForm = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const handleTransfer = async () => {
    try {
      const response = await axios.post('http://localhost:3000/transaction', {
        recipient: recipient,
        amount: amount,
      });

      const { transactionHash } = response.data;
      setTransactionHash(transactionHash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Transfer Tokens</h1>
      <div>
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleTransfer}>Transfer</button>
      {transactionHash && (
        <div>
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
};

export default TransferForm;
