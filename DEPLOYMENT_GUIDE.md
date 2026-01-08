# 🚀 COMPLETE DEPLOYMENT & USAGE GUIDE

## ✅ Current Status
- ✅ Private key saved in `.secret`
- ✅ Smart contracts ready
- ✅ UI components ready
- ✅ Deposit/Withdraw system functional

## 📋 STEP-BY-STEP DEPLOYMENT

### Step 1: Get Testnet Tokens

Before deploying, you need testnet cryptocurrency for gas fees:

**For Polygon Mumbai (Recommended):**
1. Go to: https://faucet.polygon.technology/
2. Enter your wallet address: 0x40da4...ca594
3. Request free MATIC tokens
4. Wait 1-2 minutes

**For BSC Testnet:**
1. Go to: https://testnet.binance.org/faucet-smart
2. Enter your wallet address
3. Request free testnet BNB

### Step 2: Deploy the Contract

**Option A: Use the deployment script (Easiest)**
```bash
# Double-click this file:
DEPLOY.bat

# Or run in terminal:
npx hardhat run src/backend/scripts/deploy.js --network polygon
```

**Option B: Manual deployment**
```bash
# Polygon Mumbai testnet
npx hardhat run src/backend/scripts/deploy.js --network polygon

# BSC testnet
npx hardhat run src/backend/scripts/deploy.js --network testnet

# BSC mainnet (real money!)
npx hardhat run src/backend/scripts/deploy.js --network bsc
```

### Step 3: Save Contract Addresses

After deployment, you'll see:
```
Deploying contracts with the account: 0x40da4...ca594
Account balance: 1.5 MATIC
Casino deployed to: 0xABCD...1234
Token address: 0xEFGH...5678
```

**Save both addresses!** They're automatically saved to:
- `src/backend/contractsData/Casino-address.json`
- `src/backend/contractsData/Casino.json`

### Step 4: Start the Casino

```bash
npm start
```

Browser will open to: `http://localhost:3000`

---

## 💰 HOW TO USE DEPOSIT/WITHDRAW

### For Players (Deposit):

1. **Connect MetaMask**
   - Click "Connect Wallet" button
   - Approve connection
   - Make sure you're on the correct network (Polygon/BSC)

2. **Buy Tokens**
   - Navigate to `/Wallet/buyTokens`
   - Enter amount of tokens to buy
   - Current price: **1 token = 0.001 ETH/BNB**
   - Click "Buy Tokens"
   - Approve transaction in MetaMask
   - Tokens appear in your balance

3. **Play Games**
   - Use tokens to play any game
   - Winnings are added to token balance

4. **Withdraw Tokens (Cash Out)**
   - Navigate to `/Wallet/withdrawTokens`
   - Enter amount of tokens to withdraw
   - Click "Withdraw"
   - Approve transaction
   - Receive ETH/BNB back to your wallet

### For You (Casino Owner):

1. **Check Casino Earnings**
   - All player deposits accumulate in the contract
   - Players pay 0.001 ETH per token
   - You can withdraw anytime

2. **Withdraw Profits**
   - Use Hardhat console or write a script:

```javascript
// In Hardhat console
const casino = await ethers.getContractAt("Casino", "YOUR_CASINO_ADDRESS");
const balance = await casino.balanceEthersSC();
console.log("Casino has:", balance.toString(), "ETH");

// Withdraw (only owner can do this)
await casino.retirarEth(ethers.utils.parseEther("1")); // Withdraw 1 ETH
```

Or create a withdraw script:

```bash
# Create withdraw script
npx hardhat run scripts/withdraw.js --network polygon
```

---

## 📊 Current Configuration

**Token Economics:**
- Price: 1 token = 0.001 ETH/BNB
- Initial supply: 1,000,000 tokens
- Auto-mints more if supply runs low

**Contract Owner:**
- Address: 0x40da4...ca594 (from your .secret)
- Can withdraw all ETH from contract
- Cannot be changed (unless you redeploy)

**Supported Networks:**
- ✅ Polygon Mumbai (testnet)
- ✅ BSC Testnet
- ✅ BSC Mainnet
- ✅ Ganache (local)

---

## 🔐 Security Checklist

- [x] Private key in `.secret` (not in code)
- [x] `.secret` in `.gitignore`
- [x] Contract ownership locked to your address
- [ ] For production: Create new wallet with fresh private key
- [ ] For production: Never share private key
- [ ] For production: Test thoroughly on testnet first

---

## 🎮 Complete User Flow

```
Player Journey:
1. Visit casino → Connect MetaMask
2. Go to Wallet → Buy Tokens (send ETH)
3. Play games → Win or lose tokens
4. Go to Wallet → Withdraw Tokens (get ETH back)

Owner Journey:
1. Deploy contract → Become owner
2. Players deposit → ETH accumulates
3. Check balance → See total earnings
4. Withdraw ETH → Profits to your wallet
5. Transfer to Binance → Cash out if desired
```

---

## 🆘 Troubleshooting

**"Insufficient funds" error:**
- Get testnet tokens from faucets
- Make sure you're on the right network

**"Contract not deployed" error:**
- Run deployment script first
- Check contract addresses are saved

**"Transaction failed" error:**
- Increase gas limit in MetaMask
- Make sure you have enough for gas fees

**White page in browser:**
- Run `RESTART.bat`
- Check browser console (F12) for errors
- Make sure contracts are deployed

---

## 📝 Quick Commands Reference

```bash
# Deploy to testnet
npx hardhat run src/backend/scripts/deploy.js --network polygon

# Start casino UI
npm start

# Check Hardhat accounts
npx hardhat accounts

# Open Hardhat console
npx hardhat console --network polygon

# Compile contracts
npx hardhat compile

# Run tests (if any)
npx hardhat test
```

---

## 🎯 Next Steps

1. ✅ Get testnet tokens from faucet
2. ✅ Run `DEPLOY.bat` or deploy command
3. ✅ Save contract addresses
4. ✅ Run `npm start`
5. ✅ Test deposit/withdraw
6. ✅ Play games with tokens
7. ✅ Practice withdrawing profits

---

## 💡 Production Deployment Tips

When ready for mainnet (real money):

1. Create a NEW wallet (don't use test wallet)
2. Fund it with real BNB/ETH
3. Update `.secret` with new private key
4. Deploy to mainnet network
5. Test with small amounts first
6. Add liquidity gradually
7. Monitor contract regularly

---

**You're all set! Deploy and start earning! 🎰💰**
