Create a smart contract and deploy it on thirdweb/ or somewhere else that smart contract must have option to:
Transfer erc20 token
SignMessage,
VerifySign
VerifyHash
GetTransactionReceiptByHash
GetBalanceByAddress

Create a NodeJS backend with API to get transaction hash in request and response back the all transaction Data (using transaction receipt function from smart contract)

Create Frontend where user transfer/send token to address
Pass that transactionHash to backend
