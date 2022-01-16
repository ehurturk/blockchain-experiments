// const ethers = require("ethers");

// scripts/deploy.js
async function main() {
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Box = await ethers.getContractFactory("Greeter");
  console.log("Deploying Emir Token...");
  const box = await Box.deploy();
  await box.deployed();
  console.log("Emir Token deployed to:", box.address);
  console.log("================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
