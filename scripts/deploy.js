const hre = require("hardhat");

async function main() {
  // Retrieve the contract factory using the Hardhat artifacts
  const MyContract = await hre.ethers.getContractFactory("MyContract");

  // Deploy the contract
  const contract = await MyContract.deploy();

  // Wait for the contract to be mined and get the deployed address
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
