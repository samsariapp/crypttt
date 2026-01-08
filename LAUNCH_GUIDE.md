# 🎰 Decentralized Crypto Casino - Enhanced Edition

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Polygon testnet account with test tokens

### Installation & Launch

1. **Install Dependencies** (if not already installed):
```bash
npm install --force
```

2. **Fix Landing Page** (one-time setup):
```bash
node fix-landing.js
```

3. **Start the Application**:
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## 🎮 Available Games

### Fully Functional Games
1. **🎡 Roulette** - Classic roulette with blockchain integration
2. **🃏 Blackjack** - Hit or stand, beat the dealer
3. **🎰 Slot Machine** - Spin to win with various multipliers
4. **🎲 Dice Game** - Roll over or under with customizable odds
5. **🪙 Coin Flip** - Simple 50/50 heads or tails

### Coming Soon
- Poker
- Baccarat  
- Keno
- Texas Hold'em
- Craps
- Wheel of Fortune
- Bingo
- And more...

## 🌐 Features

✅ **Web3 Integration**
- MetaMask wallet connection
- Blockchain-based transactions
- ERC20 token support

✅ **Modern UI/UX**
- Responsive design
- Beautiful gradients and animations
- Mobile-friendly interface
- Real-time game statistics

✅ **Casino Features**
- Buy/Withdraw tokens
- Game history tracking
- Recent bets display
- FAQ section
- Sports betting (coming soon)

## 📱 Navigation

- **/** - Landing page with all games
- **/games** - Games selection page
- **/games/Roulette** - Roulette game
- **/games/Blackjack** - Blackjack game
- **/games/Slots** - Slot machine
- **/games/Dice** - Dice game
- **/games/CoinFlip** - Coin flip game
- **/Wallet** - Wallet management
- **/Wallet/buyTokens** - Buy tokens
- **/Wallet/withdrawTokens** - Withdraw tokens

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── LandingPage.js   # Main landing page
│   ├── Games.js         # Games selection
│   ├── RouletteGame.js  # Roulette game
│   ├── BlackjackGame.js # Blackjack game
│   ├── SlotMachine.js   # Slot machine game
│   ├── DiceGame.js      # Dice game
│   ├── CoinFlip.js      # Coin flip game
│   ├── Header.js        # Navigation header
│   └── Wallet.js        # Wallet management
├── backend/             # Smart contracts
│   ├── contracts/       # Solidity contracts
│   └── scripts/         # Deployment scripts
├── services/            # Contract services
└── reducers/            # Redux reducers
```

### Smart Contracts

The project uses two main smart contracts:

1. **Token.sol** - ERC20 token contract
2. **Casino.sol** - Main casino logic contract

To deploy contracts:
```bash
npx hardhat run src/backend/scripts/deploy.js --network <network-name>
```

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## 🎨 Customization

### Changing Game Parameters

Each game component has configurable parameters:

- **Blackjack**: Card values, payouts
- **Slots**: Symbols, payout multipliers
- **Dice**: Roll ranges, multipliers
- **Coin Flip**: Payout ratios

### Adding New Games

1. Create new component in `src/components/`
2. Add route in `src/App.js`
3. Add game card in `src/components/Games.js`
4. Update landing page in `src/components/LandingPage.js`

## 🔐 Security

- All transactions are blockchain-verified
- Smart contracts handle game logic
- No server-side manipulation possible
- Provably fair gaming

## 📊 Game Statistics

- Real-time player counts
- Recent bets feed
- Win/loss history
- Balance tracking

## 🌟 New Features in This Version

1. **5 Fully Playable Games** - All with beautiful animations
2. **Enhanced Landing Page** - Modern design with game previews
3. **Improved Navigation** - Easy access to all games
4. **Better UX** - Smooth transitions and feedback
5. **Mobile Responsive** - Works perfectly on all devices

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use a different port
PORT=3001 npm start
```

### MetaMask Connection Issues
1. Make sure MetaMask is installed
2. Switch to Polygon testnet
3. Refresh the page
4. Click "Connect Wallet"

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --force
```

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new games
- Improve existing games
- Enhance UI/UX
- Fix bugs
- Add features

## 📞 Support

For issues and questions:
- Check the FAQ section in the app
- Review this documentation
- Check browser console for errors

---

**🎲 Good Luck and Have Fun! 🎰**
