@echo off
echo ========================================
echo   WITHDRAW CASINO PROFITS
echo ========================================
echo.
echo This will withdraw all ETH/BNB from the casino
echo contract to your owner wallet.
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
    echo Withdrawing from Polygon Mumbai...
    npx hardhat run owner-withdraw.js --network polygon
)

if "%choice%"=="2" (
    echo.
    echo Withdrawing from BSC Testnet...
    npx hardhat run owner-withdraw.js --network testnet
)

if "%choice%"=="3" (
    echo.
    echo Withdrawing from BSC Mainnet...
    npx hardhat run owner-withdraw.js --network bsc
)

if "%choice%"=="4" (
    echo Cancelled.
    pause
    exit
)

echo.
echo ========================================
pause
