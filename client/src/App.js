import React from 'react';
import TransferForm from './components/TransferForm';
import TransactionDetails from './components/TransactionDetails';

function App() {
  return (
    <div>
      <h1>Transfer Tokens</h1>
      <TransferForm />
      <TransactionDetails />
    </div>
  );
}

export default App;
