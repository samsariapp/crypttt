@echo off
COLOR 0C
cls
echo ========================================
echo   FIXING SUPABASE ERROR
echo ========================================
echo.
echo Installing @supabase/supabase-js...
echo.
call npm install
echo.
echo ========================================
echo   ✅ FIXED!
echo ========================================
echo.
echo Now run: npm start
echo.
pause
