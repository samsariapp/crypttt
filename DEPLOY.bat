@echo off
COLOR 0E
cls
echo ========================================
echo   DEPLOYING CASINO TO BLOCKCHAIN
echo ========================================
echo.
echo This will deploy your casino smart contract
echo and set you as the owner to receive all profits.
echo.
echo Choose your network:
echo.
echo 1. Polygon Mumbai Testnet (FREE - Recommended for testing)
echo 2. BSC Testnet (FREE - Good for testing)
echo 3. BSC Mainnet (REAL MONEY - Use carefully!)
echo 4. Local Ganache (For local testing)
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo ========================================
    echo  Deploying to Polygon Mumbai Testnet
    echo ========================================
    echo.
    echo Make sure you have:
    echo - MATIC tokens in your wallet for gas fees
    echo - Get free testnet MATIC from: https://faucet.polygon.technology/
    echo.
    pause
    npx hardhat run src/backend/scripts/deploy.js --network polygon
    goto :done
)

if "%choice%"=="2" (
    echo.
    echo ========================================
    echo  Deploying to BSC Testnet
    echo ========================================
    echo.
    echo Make sure you have:
    echo - BNB testnet tokens for gas fees
    echo - Get free testnet BNB from: https://testnet.binance.org/faucet-smart
    echo.
    pause
    npx hardhat run src/backend/scripts/deploy.js --network testnet
    goto :done
)

if "%choice%"=="3" (
    echo.
    echo ========================================
    echo  ⚠️  WARNING: BSC MAINNET - REAL MONEY
    echo ========================================
    echo.
    echo This will use REAL BNB and deploy to mainnet!
    echo Make sure you:
    echo - Have real BNB in your wallet
    echo - Understand gas costs
    echo - Are ready for production
    echo.
    set /p confirm="Type YES to continue: "
    if not "%confirm%"=="YES" (
        echo Deployment cancelled.
        pause
        exit
    )
    npx hardhat run src/backend/scripts/deploy.js --network bsc
    goto :done
)

if "%choice%"=="4" (
    echo.
    echo ========================================
    echo  Deploying to Local Ganache
    echo ========================================
    echo.
    echo Make sure Ganache is running on port 7545
    echo.
    pause
    npx hardhat run src/backend/scripts/deploy.js --network ganache
    goto :done
)

echo Invalid choice!
pause
exit

:done
echo.
echo ========================================
echo  ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo IMPORTANT: Save the addresses shown above!
echo.
echo Next steps:
echo 1. Copy the Casino contract address
echo 2. Copy the Token contract address
echo 3. Start the casino: npm start
echo 4. Connect MetaMask to the deployed network
echo 5. Users can now buy tokens and play!
echo.
echo To withdraw your earnings:
echo - Use the Withdraw page in the UI
echo - Or call retirarEth() on the contract
echo.
pause
