@echo off
echo ========================================
echo   GIVE YOURSELF FREE TOKENS
echo ========================================
echo.
echo This will mint free tokens to your wallet
echo (Owner privilege - no payment required!)
echo.
echo Choose network:
echo 1. Polygon Mumbai Testnet
echo 2. BSC Testnet
echo 3. BSC Mainnet
echo 4. Cancel
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Minting tokens on Polygon Mumbai...
    npx hardhat run owner-mint-tokens.js --network polygon
)

if "%choice%"=="2" (
    echo.
    echo Minting tokens on BSC Testnet...
    npx hardhat run owner-mint-tokens.js --network testnet
)

if "%choice%"=="3" (
    echo.
    echo Minting tokens on BSC Mainnet...
    npx hardhat run owner-mint-tokens.js --network bsc
)

if "%choice%"=="4" (
    echo Cancelled.
    pause
    exit
)

echo.
echo ========================================
pause
