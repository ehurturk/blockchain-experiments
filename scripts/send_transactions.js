import { ethers } from "Ethers";
// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Sending transactions with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Box = await ethers.getContractFactory("Token");
  const box = await Box.attach("0x93ee8852d52E83390411684518E678884cb81bb9"); // emir token deployement adress
  await box.deployed();
  const supply = await box.totalSupply();
  console.log("Emir Token deployed to:", box.address);
  console.log("================");
  console.log("Total supply: " + supply);
  console.log("Now trying to send 0.001 EmirToken(EHT)...");
  const sent = await box.transfer(
    "0x6B270d8cd3696Ccac63f762d8E25959235a5D069",
    1000000000000000
  );

  await sent.wait();
  console.log("Token sent...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
