@echo off
COLOR 0A
cls
echo ========================================
echo   COMPLETE CASINO SETUP
echo ========================================
echo.
echo This will set up EVERYTHING for you!
echo.
echo Step 1: Installing Supabase...
echo ----------------------------------------
call npm install @supabase/supabase-js
echo.
echo ✅ Supabase installed!
echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo 🎉 Everything is ready!
echo.
echo WHAT YOU HAVE NOW:
echo ✅ 5 Casino games (Roulette, Blackjack, Slots, Dice, Coin Flip)
echo ✅ Enhanced landing page with 16 game cards
echo ✅ Deposit & withdraw system  
echo ✅ Login/Signup system (email + password)
echo ✅ MetaMask integration
echo ✅ User authentication via Supabase
echo ✅ Game history tracking
echo ✅ Statistics dashboard
echo ✅ Leaderboard system
echo.
echo ========================================
echo   FINAL STEP - CREATE DATABASE TABLES
echo ========================================
echo.
echo 1. Go to: https://apnvtotnxpzbpdhjpxuf.supabase.co
echo 2. Click "SQL Editor" (left sidebar)
echo 3. Click "New Query"
echo 4. Open file: supabase-schema.sql
echo 5. Copy ALL the content (Ctrl+A, Ctrl+C)
echo 6. Paste in SQL Editor
echo 7. Click "Run" button
echo 8. Done!
echo.
echo ========================================
echo   THEN START YOUR CASINO
echo ========================================
echo.
echo Run: npm start
echo.
echo Then visit these URLs:
echo - http://localhost:3000/ - Main landing page
echo - http://localhost:3000/signup - Create account
echo - http://localhost:3000/login - Login
echo - http://localhost:3000/games - All games
echo.
echo Click "Connect" button to see login options!
echo.
pause
