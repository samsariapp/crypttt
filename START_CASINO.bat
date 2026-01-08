@echo off
echo ========================================
echo    CRYPTO CASINO LAUNCHER
echo ========================================
echo.

echo [1/3] Fixing landing page handlers...
node fix-landing.js

echo.
echo [2/3] Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies... This may take a few minutes...
    call npm install --force
) else (
    echo Dependencies already installed!
)

echo.
echo [3/3] Starting the casino...
echo.
echo ========================================
echo  The casino will open in your browser
echo  URL: http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
