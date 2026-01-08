import React, { useState } from "react";
import { Grid, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loadBalance } from "../reducers/balanceReducer";
import SelectAmount from "./SelectAmount";

const SlotMachine = ({ balance, account }) => {
  const dispatch = useDispatch();
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);
  const betAmount = useField("");
  const [lastWin, setLastWin] = useState(0);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣', '🔔'];
  const payouts = {
    '💎💎💎': 100,
    '7️⃣7️⃣7️⃣': 50,
    '⭐⭐⭐': 25,
    '🔔🔔🔔': 20,
    '🍇🍇🍇': 15,
    '🍊🍊🍊': 10,
    '🍋🍋🍋': 8,
    '🍒🍒🍒': 5,
    '💎💎': 10,
    '7️⃣7️⃣': 8,
    '⭐⭐': 5,
    '🍒🍒': 2,
  };

  const spin = async () => {
    if (!betAmount.value || betAmount.value <= 0) {
      toast.error('Please enter a valid bet amount', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (parseFloat(betAmount.value) > parseFloat(balance)) {
      toast.error('Insufficient balance', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setSpinning(true);
    setLastWin(0);

    // Animate spinning
    const spinDuration = 2000;
    const spinInterval = 100;
    const iterations = spinDuration / spinInterval;
    
    let count = 0;
    const spinAnimation = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      count++;
      
      if (count >= iterations) {
        clearInterval(spinAnimation);
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);
        checkWin(finalReels);
        setSpinning(false);
      }
    }, spinInterval);
  };

  const checkWin = async (finalReels) => {
    const result = finalReels.join('');
    let multiplier = 0;

    // Check for exact matches
    for (const [pattern, payout] of Object.entries(payouts)) {
      if (result === pattern.replace(/\s/g, '')) {
        multiplier = payout;
        break;
      }
    }

    if (multiplier > 0) {
      const winAmount = parseFloat(betAmount.value) * multiplier;
      setLastWin(winAmount);
      
      toast.success(`🎰 WINNER! ${multiplier}x multiplier! Won ${winAmount.toFixed(2)} tokens!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } else {
      toast.info('Try again!', {
        position: "top-right",
        autoClose: 2000,
      });
    }

    await dispatch(loadBalance(account));
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ minHeight: '80vh', pt: 4 }}>
      <ToastContainer />
      
      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ color: '#ffaa00', fontWeight: 'bold', mb: 2 }}>
          🎰 Slot Machine
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#b0b8c1', mb: 4 }}>
          Balance: {balance} tokens
        </Typography>
      </Grid>

      {/* Slot Machine Display */}
      <Grid item xs={12} md={8}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', 
          border: '4px solid #ffaa00',
          boxShadow: '0 0 30px rgba(255,170,0,0.5)'
        }}>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              my: 4,
              py: 4,
              background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
              borderRadius: '12px',
              border: '3px solid #ffaa00'
            }}>
              {reels.map((symbol, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 120,
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                    background: spinning 
                      ? 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)' 
                      : 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
                    border: '3px solid #ffaa00',
                    borderRadius: '12px',
                    boxShadow: spinning ? '0 0 20px rgba(0,170,255,0.8)' : '0 4px 8px rgba(0,0,0,0.3)',
                    transition: 'all 0.1s ease',
                    animation: spinning ? 'pulse 0.3s ease-in-out infinite' : 'none',
                  }}
                >
                  {symbol}
                </Box>
              ))}
            </Box>

            {lastWin > 0 && (
              <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                  color: '#00ff88',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(0,255,136,0.8)',
                  mb: 2
                }}
              >
                🎉 Won {lastWin.toFixed(2)} tokens! 🎉
              </Typography>
            )}

            <Box sx={{ mt: 4 }}>
              <SelectAmount betAmount={betAmount} balance={balance} />
              <Button
                variant="contained"
                fullWidth
                onClick={spin}
                disabled={spinning}
                sx={{
                  mt: 2,
                  background: spinning 
                    ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                    : 'linear-gradient(135deg, #ffaa00 0%, #ff8800 100%)',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  py: 2,
                  '&:hover': {
                    background: spinning 
                      ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                      : 'linear-gradient(135deg, #ff8800 0%, #ff6600 100%)',
                  },
                  '&:disabled': {
                    color: '#999'
                  }
                }}
              >
                {spinning ? 'SPINNING...' : 'SPIN'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Payout Table */}
      <Grid item xs={12} md={8}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #ffaa00' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#ffaa00', mb: 2, fontWeight: 'bold' }}>
              💰 Payout Table
            </Typography>
            <Grid container spacing={1}>
              {Object.entries(payouts).map(([pattern, multiplier]) => (
                <Grid item xs={6} sm={4} key={pattern}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    background: 'rgba(0,170,255,0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,170,0,0.3)'
                  }}>
                    <Typography sx={{ fontSize: '1.5rem' }}>{pattern}</Typography>
                    <Typography sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                      {multiplier}x
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </Grid>
  );
};

export default SlotMachine;
