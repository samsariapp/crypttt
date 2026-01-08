@echo off
COLOR 0C
cls
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                                                            ║
echo  ║           🔧 TROUBLESHOOTING WHITE PAGE ISSUE 🔧          ║
echo  ║                                                            ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.
echo  This script will fix common issues causing white/blank pages
echo.
echo  ⏳ Step 1/5: Stopping any running servers...
echo.

REM Kill any process on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo    Killing process %%a on port 3000...
    taskkill /F /PID %%a 2>nul
)

echo  ✅ Port 3000 cleared
echo.
echo  ⏳ Step 2/5: Fixing landing page handlers...
echo.

node fix-landing.js

echo.
echo  ⏳ Step 3/5: Clearing React cache...
echo.

if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo  ✅ Cache cleared
) else (
    echo  ℹ️  No cache to clear
)

echo.
echo  ⏳ Step 4/5: Checking dependencies...
echo.

if not exist "node_modules\" (
    echo  ⚠️  Dependencies missing! Installing...
    call npm install --force
) else (
    echo  ✅ Dependencies already installed
)

echo.
echo  ⏳ Step 5/5: Starting development server...
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                                                            ║
echo  ║   🌐 Server starting... Browser will open shortly         ║
echo  ║                                                            ║
echo  ║   If you see a white page:                                ║
echo  ║   1. Open browser console (F12)                           ║
echo  ║   2. Look for red error messages                          ║
echo  ║   3. Refresh page (F5 or Ctrl+R)                          ║
echo  ║                                                            ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.
echo  Press Ctrl+C to stop the server
echo.

call npm start
