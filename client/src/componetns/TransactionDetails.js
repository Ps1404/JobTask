import React from 'react';

const TransactionDetails = ({ transactionHash }) => {
  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction Hash: {transactionHash}</p>
    </div>
  );
};

export default TransactionDetails;
