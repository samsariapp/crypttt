@echo off
COLOR 0B
cls
echo ========================================
echo   ACTIVATING LOGIN/SIGNUP SYSTEM
echo ========================================
echo.
echo Installing Supabase package...
echo This will take about 30 seconds.
echo.
cd /d "%~dp0"
echo Running: npm install @supabase/supabase-js
echo.
call npm install @supabase/supabase-js --legacy-peer-deps
echo.
if %errorlevel% == 0 (
    echo.
    echo ========================================
    echo   ✅ SUCCESS!
    echo ========================================
    echo.
    echo Supabase is now configured!
    echo.
    echo FINAL STEP: Create database tables
    echo 1. Go to: https://apnvtotnxpzbpdhjpxuf.supabase.co
    echo 2. Click "SQL Editor" 
    echo 3. Click "New Query"
    echo 4. Open: supabase-schema.sql
    echo 5. Copy all content
    echo 6. Paste and click "Run"
    echo.
    echo Then restart: npm start
    echo.
) else (
    echo.
    echo ========================================
    echo   ⚠️ Installation had issues
    echo ========================================
    echo.
    echo Try manually: npm install @supabase/supabase-js
    echo.
)
pause
