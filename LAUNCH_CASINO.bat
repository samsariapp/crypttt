@echo off
COLOR 0E
cls
echo ========================================
echo   🎰 CASINO QUICK LAUNCHER 🎰
echo ========================================
echo.
echo This will:
echo 1. Check if everything is installed
echo 2. Start the development server
echo 3. Open your browser automatically
echo.
echo ----------------------------------------
echo.

cd /d "%~dp0"

echo [1/3] Checking installation...
if not exist "node_modules" (
    echo ❌ Dependencies not installed!
    echo Running: npm install
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo Installation failed! Please check errors above.
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies installed
)

echo.
echo [2/3] Starting casino server...
echo.
echo 💡 TIP: Press Ctrl+C to stop the server
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak >nul

start "" "http://localhost:3000"
call npm start

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ❌ ERROR STARTING SERVER
    echo ========================================
    echo.
    echo Common fixes:
    echo 1. Make sure port 3000 is not in use
    echo 2. Try: npm install
    echo 3. Check terminal for error messages
    echo.
    pause
)
