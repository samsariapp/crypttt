@echo off
COLOR 0E
cls
echo ========================================
echo   INSTALLING SUPABASE PACKAGE
echo ========================================
echo.
echo This will fix the error...
echo.
cd /d "%~dp0"
call npm install @supabase/supabase-js
echo.
if %errorlevel% == 0 (
    echo ========================================
    echo   ✅ SUCCESS! Package Installed!
    echo ========================================
    echo.
    echo Now starting the casino...
    echo.
    timeout /t 2 >nul
    call npm start
) else (
    echo ========================================
    echo   ❌ Installation Failed
    echo ========================================
    echo.
    echo Please run manually: npm install @supabase/supabase-js
    echo.
    pause
)
