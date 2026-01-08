import React, { useState } from "react";
import { Grid, Button, Card, CardContent, Typography, Box, ButtonGroup } from "@mui/material";
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loadBalance } from "../reducers/balanceReducer";
import SelectAmount from "./SelectAmount";

const CoinFlip = ({ balance, account }) => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState('heads');
  const [flipping, setFlipping] = useState(false);
  const [choice, setChoice] = useState('heads');
  const betAmount = useField("");
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);

  const flipCoin = async () => {
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

    setFlipping(true);
    setLastResult(null);

    // Animate flipping
    const flipDuration = 2000;
    const flipInterval = 100;
    const iterations = flipDuration / flipInterval;
    
    let count = 0;
    const flipAnimation = setInterval(() => {
      setCoin(Math.random() > 0.5 ? 'heads' : 'tails');
      count++;
      
      if (count >= iterations) {
        clearInterval(flipAnimation);
        const finalResult = Math.random() > 0.5 ? 'heads' : 'tails';
        setCoin(finalResult);
        checkWin(finalResult);
        setFlipping(false);
      }
    }, flipInterval);
  };

  const checkWin = async (result) => {
    const won = result === choice;
    
    const gameResult = {
      result,
      choice,
      won,
      amount: parseFloat(betAmount.value)
    };
    setLastResult(gameResult);
    setHistory([gameResult, ...history.slice(0, 9)]);

    if (won) {
      const winAmount = parseFloat(betAmount.value) * 2;
      
      toast.success(`🪙 Winner! Coin landed on ${result}! Won ${winAmount.toFixed(2)} tokens!`, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(`🪙 Lost! Coin landed on ${result}. Try again!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    await dispatch(loadBalance(account));
  };

  const getCoinColor = () => {
    if (!lastResult) return '#FFD700';
    return lastResult.won ? '#00ff88' : '#ff4444';
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ minHeight: '80vh', pt: 4 }}>
      <ToastContainer />
      
      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 2 }}>
          🪙 Coin Flip
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#b0b8c1', mb: 4 }}>
          Balance: {balance} tokens
        </Typography>
      </Grid>

      {/* Coin Display */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', 
          border: `4px solid ${getCoinColor()}`,
          boxShadow: `0 0 30px ${getCoinColor()}80`
        }}>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              py: 4
            }}>
              <Box
                sx={{
                  width: 250,
                  height: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: flipping 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                    : `linear-gradient(135deg, ${getCoinColor()} 0%, ${getCoinColor()}cc 100%)`,
                  border: `6px solid ${getCoinColor()}`,
                  borderRadius: '50%',
                  boxShadow: flipping ? '0 0 40px rgba(255,215,0,0.8)' : `0 0 30px ${getCoinColor()}80`,
                  transition: 'all 0.3s ease',
                  animation: flipping ? 'flip 0.2s ease-in-out infinite' : 'none',
                  color: '#000'
                }}
              >
                <div style={{ fontSize: '6rem' }}>
                  {coin === 'heads' ? '👑' : '⭐'}
                </div>
                <Typography variant="h5" sx={{ color: '#000', fontWeight: 'bold', mt: 1 }}>
                  {coin.toUpperCase()}
                </Typography>
              </Box>

              {lastResult && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: lastResult.won ? '#00ff88' : '#ff4444',
                      fontWeight: 'bold',
                      textShadow: `0 0 10px ${lastResult.won ? 'rgba(0,255,136,0.8)' : 'rgba(255,68,68,0.8)'}`,
                      mb: 1
                    }}
                  >
                    {lastResult.won ? '🎉 YOU WIN! 🎉' : '😢 YOU LOSE 😢'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#b0b8c1' }}>
                    You chose: {lastResult.choice}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#b0b8c1' }}>
                    Result: {lastResult.result}
                  </Typography>
                  {lastResult.won && (
                    <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 'bold', mt: 1 }}>
                      Won: {(lastResult.amount * 2).toFixed(2)} tokens
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Game Controls */}
      <Grid item xs={12} md={6}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #FFD700' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 'bold' }}>
              🎯 Make Your Choice
            </Typography>

            {/* Choice Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#b0b8c1', mb: 2 }}>Choose Side:</Typography>
              <ButtonGroup fullWidth>
                <Button
                  variant={choice === 'heads' ? 'contained' : 'outlined'}
                  onClick={() => setChoice('heads')}
                  disabled={flipping}
                  sx={{
                    background: choice === 'heads' 
                      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                      : 'transparent',
                    color: choice === 'heads' ? '#000' : '#FFD700',
                    borderColor: '#FFD700',
                    fontWeight: 'bold',
                    py: 2,
                    fontSize: '1.2rem',
                    '&:hover': {
                      background: choice === 'heads'
                        ? 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)'
                        : 'rgba(255,215,0,0.1)',
                      borderColor: '#FFD700'
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                >
                  👑 HEADS
                </Button>
                <Button
                  variant={choice === 'tails' ? 'contained' : 'outlined'}
                  onClick={() => setChoice('tails')}
                  disabled={flipping}
                  sx={{
                    background: choice === 'tails' 
                      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                      : 'transparent',
                    color: choice === 'tails' ? '#000' : '#FFD700',
                    borderColor: '#FFD700',
                    fontWeight: 'bold',
                    py: 2,
                    fontSize: '1.2rem',
                    '&:hover': {
                      background: choice === 'tails'
                        ? 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)'
                        : 'rgba(255,215,0,0.1)',
                      borderColor: '#FFD700'
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                >
                  ⭐ TAILS
                </Button>
              </ButtonGroup>
            </Box>

            {/* Game Stats */}
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              background: 'rgba(255,215,0,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255,215,0,0.3)'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#b0b8c1' }}>
                    Win Chance
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                    50%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#b0b8c1' }}>
                    Multiplier
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                    2.00x
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Bet Amount */}
            <SelectAmount betAmount={betAmount} balance={balance} />

            {/* Flip Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={flipCoin}
              disabled={flipping}
              sx={{
                mt: 2,
                background: flipping 
                  ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                  : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                py: 2,
                '&:hover': {
                  background: flipping 
                    ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                    : 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                },
                '&:disabled': {
                  color: '#999'
                }
              }}
            >
              {flipping ? '🪙 FLIPPING...' : '🪙 FLIP COIN'}
            </Button>
          </CardContent>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card sx={{ 
            mt: 3,
            background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', 
            border: '2px solid #FFD700' 
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, fontWeight: 'bold' }}>
                📊 Recent Flips
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {history.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: item.won 
                        ? 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)'
                        : 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                      borderRadius: '50%',
                      fontSize: '1.5rem',
                      border: '2px solid #FFD700'
                    }}
                  >
                    {item.result === 'heads' ? '👑' : '⭐'}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>

      <style>
        {`
          @keyframes flip {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
        `}
      </style>
    </Grid>
  );
};

export default CoinFlip;
