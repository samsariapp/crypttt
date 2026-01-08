// Owner Mint Tokens Script
// This gives the owner free tokens without paying
// Run with: npx hardhat run owner-mint-tokens.js --network polygon

const hre = require("hardhat");
const CasinoAddress = require("./src/backend/contractsData/Casino-address.json");

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("========================================");
  console.log("  OWNER TOKEN MINT");
  console.log("========================================");
  console.log("Owner address:", owner.address);
  console.log("");

  // Get casino contract
  const casino = await ethers.getContractAt("Casino", CasinoAddress.address);
  
  // Get token contract address
  const tokenAddress = await casino.getAdress();
  console.log("Token contract:", tokenAddress);
  
  // Get token contract
  const Token = await ethers.getContractFactory("Token");
  const token = Token.attach(tokenAddress);

  // Check current balance
  const currentBalance = await casino.tokenBalance(owner.address);
  console.log("Current balance:", currentBalance.toString(), "tokens");
  console.log("");

  // Amount to mint (change this number as needed)
  const amountToMint = 10000; // 10,000 tokens
  
  console.log("Minting", amountToMint, "tokens to owner...");
  
  // Transfer tokens from contract to owner
  // The contract already has 1,000,000 tokens minted
  const tx = await token.transfer(owner.address, amountToMint);
  await tx.wait();

  console.log("✅ Tokens minted successfully!");
  console.log("Transaction hash:", tx.hash);
  
  // Check new balance
  const newBalance = await casino.tokenBalance(owner.address);
  console.log("New balance:", newBalance.toString(), "tokens");
  console.log("");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
