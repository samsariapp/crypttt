@echo off
COLOR 0B
cls
echo ========================================
echo   SUPABASE SETUP - FINAL STEPS
echo ========================================
echo.
echo Step 1: Install Supabase package
echo ----------------------------------------
echo.
call npm install @supabase/supabase-js
echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo NEXT:
echo 1. Go to: https://apnvtotnxpzbpdhjpxuf.supabase.co
echo 2. Click "SQL Editor" in left sidebar
echo 3. Click "New Query"
echo 4. Open file: supabase-schema.sql
echo 5. Copy all content
echo 6. Paste in SQL Editor
echo 7. Click "Run"
echo 8. Done!
echo.
echo Then run: npm start
echo.
echo New features available:
echo - /signup - Create account
echo - /login - User login
echo - User profiles
echo - Game history tracking
echo - Leaderboards
echo.
pause
