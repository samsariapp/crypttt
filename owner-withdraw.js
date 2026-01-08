// Owner Withdraw Script
// Run with: npx hardhat run owner-withdraw.js --network polygon

const hre = require("hardhat");
const CasinoAddress = require("./src/backend/contractsData/Casino-address.json");

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("========================================");
  console.log("  CASINO OWNER WITHDRAWAL");
  console.log("========================================");
  console.log("Owner address:", owner.address);
  console.log("");

  // Get casino contract
  const casino = await ethers.getContractAt("Casino", CasinoAddress.address);

  // Check casino balance
  const casinoBalance = await casino.balanceEthersSC();
  console.log("Casino contract balance:", casinoBalance.toString(), "ETH");

  if (casinoBalance.toNumber() === 0) {
    console.log("❌ No funds to withdraw!");
    return;
  }

  // Withdraw all funds
  console.log("");
  console.log("Withdrawing funds to owner wallet...");
  
  const tx = await casino.retirarEth(ethers.utils.parseEther(casinoBalance.toString()));
  await tx.wait();

  console.log("✅ Withdrawal successful!");
  console.log("Transaction hash:", tx.hash);
  
  // Check new balance
  const newBalance = await casino.balanceEthersSC();
  console.log("New casino balance:", newBalance.toString(), "ETH");
  
  const ownerBalance = await ethers.provider.getBalance(owner.address);
  console.log("Your wallet balance:", ethers.utils.formatEther(ownerBalance), "ETH");
  console.log("");
  console.log("========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
