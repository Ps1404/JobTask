const express = require('express');
const app = express();
const Web3 = require('web3');
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/AZqF5N4wZ3bF55w3CbeOYUuZIPJT0Ook'); // Replace with the Sepolia test network endpoint

const contractAddress = '0xCd61a1c8e058eA33baCfFA2f13f7191405e0243F'; // Replace with your deployed contract address on Sepolia
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(abi, contractAddress);

app.get('/transaction/:hash', async (req, res) => {
  const hash = req.params.hash;

  try {
    const receipt = await web3.eth.getTransactionReceipt(hash);

    if (receipt) {
      const transactionData = await contract.methods.getTransactionDataByHash(hash).call(); // Call the contract function to get transaction data

      res.json({
        receipt: receipt,
        transactionData: transactionData
      });
    } else {
      res.status(404).json({ error: 'Transaction receipt not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
