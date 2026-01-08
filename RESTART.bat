@echo off
echo ========================================
echo   RESTARTING CASINO SERVER
echo ========================================
echo.

echo [1/3] Stopping any running servers on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo    Stopping process %%a...
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 2 >nul

echo [2/3] Fixing landing page...
node fix-landing.js

echo.
echo [3/3] Starting fresh server...
echo ========================================
echo  Server will start in a moment...
echo  Browser will open automatically
echo ========================================
echo.

npm start
