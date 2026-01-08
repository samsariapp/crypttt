import React, { useState } from "react";
import { Grid, Button, Card, CardContent, Typography, Box, Slider } from "@mui/material";
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loadBalance } from "../reducers/balanceReducer";
import SelectAmount from "./SelectAmount";

const DiceGame = ({ balance, account }) => {
  const dispatch = useDispatch();
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [prediction, setPrediction] = useState(50);
  const [rollType, setRollType] = useState('over'); // 'over' or 'under'
  const betAmount = useField("");
  const [lastResult, setLastResult] = useState(null);

  const calculateMultiplier = () => {
    if (rollType === 'over') {
      return (100 / (100 - prediction)).toFixed(2);
    } else {
      return (100 / prediction).toFixed(2);
    }
  };

  const rollDice = async () => {
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

    setRolling(true);
    setLastResult(null);

    // Animate rolling
    const rollDuration = 1500;
    const rollInterval = 50;
    const iterations = rollDuration / rollInterval;
    
    let count = 0;
    const rollAnimation = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 100) + 1);
      count++;
      
      if (count >= iterations) {
        clearInterval(rollAnimation);
        const finalValue = Math.floor(Math.random() * 100) + 1;
        setDiceValue(finalValue);
        checkWin(finalValue);
        setRolling(false);
      }
    }, rollInterval);
  };

  const checkWin = async (value) => {
    let won = false;
    
    if (rollType === 'over') {
      won = value > prediction;
    } else {
      won = value < prediction;
    }

    const result = {
      value,
      won,
      prediction,
      rollType
    };
    setLastResult(result);

    if (won) {
      const multiplier = parseFloat(calculateMultiplier());
      const winAmount = parseFloat(betAmount.value) * multiplier;
      
      toast.success(`🎲 Winner! Rolled ${value}! Won ${winAmount.toFixed(2)} tokens!`, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(`🎲 Lost! Rolled ${value}. Try again!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    await dispatch(loadBalance(account));
  };

  const getDiceColor = () => {
    if (!lastResult) return '#00aaff';
    return lastResult.won ? '#00ff88' : '#ff4444';
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ minHeight: '80vh', pt: 4 }}>
      <ToastContainer />
      
      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ color: '#00aaff', fontWeight: 'bold', mb: 2 }}>
          🎲 Dice Game
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#b0b8c1', mb: 4 }}>
          Balance: {balance} tokens
        </Typography>
      </Grid>

      {/* Dice Display */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', 
          border: `4px solid ${getDiceColor()}`,
          boxShadow: `0 0 30px ${getDiceColor()}80`
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
                  width: 200,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  background: rolling 
                    ? 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)' 
                    : `linear-gradient(135deg, ${getDiceColor()} 0%, ${getDiceColor()}cc 100%)`,
                  border: `4px solid ${getDiceColor()}`,
                  borderRadius: '20px',
                  boxShadow: rolling ? '0 0 30px rgba(0,170,255,0.8)' : `0 0 20px ${getDiceColor()}80`,
                  transition: 'all 0.3s ease',
                  animation: rolling ? 'spin 0.3s ease-in-out infinite' : 'none',
                  color: '#fff'
                }}
              >
                {diceValue}
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
                    You needed {lastResult.rollType === 'over' ? 'over' : 'under'} {lastResult.prediction}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#b0b8c1' }}>
                    Rolled: {lastResult.value}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Game Controls */}
      <Grid item xs={12} md={6}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #00aaff' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#00aaff', mb: 3, fontWeight: 'bold' }}>
              🎯 Game Settings
            </Typography>

            {/* Roll Type Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#b0b8c1', mb: 2 }}>Roll Type:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={rollType === 'over' ? 'contained' : 'outlined'}
                    onClick={() => setRollType('over')}
                    sx={{
                      background: rollType === 'over' 
                        ? 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)'
                        : 'transparent',
                      color: rollType === 'over' ? '#000' : '#00ff88',
                      borderColor: '#00ff88',
                      fontWeight: 'bold',
                      py: 1.5,
                      '&:hover': {
                        background: rollType === 'over'
                          ? 'linear-gradient(135deg, #00cc66 0%, #00aa44 100%)'
                          : 'rgba(0,255,136,0.1)',
                        borderColor: '#00ff88'
                      }
                    }}
                  >
                    Roll Over
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={rollType === 'under' ? 'contained' : 'outlined'}
                    onClick={() => setRollType('under')}
                    sx={{
                      background: rollType === 'under' 
                        ? 'linear-gradient(135deg, #ff6600 0%, #dd4400 100%)'
                        : 'transparent',
                      color: rollType === 'under' ? '#fff' : '#ff6600',
                      borderColor: '#ff6600',
                      fontWeight: 'bold',
                      py: 1.5,
                      '&:hover': {
                        background: rollType === 'under'
                          ? 'linear-gradient(135deg, #dd4400 0%, #bb2200 100%)'
                          : 'rgba(255,102,0,0.1)',
                        borderColor: '#ff6600'
                      }
                    }}
                  >
                    Roll Under
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Prediction Slider */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: '#b0b8c1', mb: 1 }}>
                Target Number: <span style={{ color: '#00aaff', fontWeight: 'bold', fontSize: '1.2rem' }}>{prediction}</span>
              </Typography>
              <Slider
                value={prediction}
                onChange={(e, newValue) => setPrediction(newValue)}
                min={rollType === 'over' ? 1 : 2}
                max={rollType === 'over' ? 98 : 99}
                valueLabelDisplay="auto"
                sx={{
                  color: '#00aaff',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00aaff',
                    width: 20,
                    height: 20,
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#00aaff',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#555',
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {rollType === 'over' ? 1 : 2}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {rollType === 'over' ? 98 : 99}
                </Typography>
              </Box>
            </Box>

            {/* Win Chance and Multiplier */}
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              background: 'rgba(0,170,255,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(0,170,255,0.3)'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#b0b8c1' }}>
                    Win Chance
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
                    {rollType === 'over' ? (100 - prediction) : prediction}%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#b0b8c1' }}>
                    Multiplier
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#ffaa00', fontWeight: 'bold' }}>
                    {calculateMultiplier()}x
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Bet Amount */}
            <SelectAmount betAmount={betAmount} balance={balance} />

            {/* Roll Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={rollDice}
              disabled={rolling}
              sx={{
                mt: 2,
                background: rolling 
                  ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                  : 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                py: 2,
                '&:hover': {
                  background: rolling 
                    ? 'linear-gradient(135deg, #666 0%, #444 100%)'
                    : 'linear-gradient(135deg, #0088dd 0%, #0066bb 100%)',
                },
                '&:disabled': {
                  color: '#999'
                }
              }}
            >
              {rolling ? '🎲 ROLLING...' : '🎲 ROLL DICE'}
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Grid>
  );
};

export default DiceGame;
