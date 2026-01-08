import React, { useState } from "react";
import { Grid, Button, Card, CardContent, Typography, Box, Paper } from "@mui/material";
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "./CustomButton";
import contractsService from '../services/contractsService';
import { loadBalance } from "../reducers/balanceReducer";
import SelectAmount from "./SelectAmount";

const BlackjackGame = ({ balance, account }) => {
  const dispatch = useDispatch();
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); // betting, playing, ended
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const betAmount = useField("");
  const [gameResult, setGameResult] = useState("");

  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const getCardValue = (card) => {
    if (card.value === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    return parseInt(card.value);
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;
    hand.forEach(card => {
      const value = getCardValue(card);
      score += value;
      if (card.value === 'A') aces++;
    });
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  };

  const drawCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  };

  const startGame = async () => {
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

    const newPlayerHand = [drawCard(), drawCard()];
    const newDealerHand = [drawCard(), drawCard()];
    
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayerScore(calculateScore(newPlayerHand));
    setDealerScore(calculateScore(newDealerHand));
    setGameState('playing');
    setGameResult("");

    if (calculateScore(newPlayerHand) === 21) {
      endGame(newPlayerHand, newDealerHand, 'blackjack');
    }
  };

  const hit = () => {
    const newCard = drawCard();
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    const newScore = calculateScore(newHand);
    setPlayerScore(newScore);

    if (newScore > 21) {
      endGame(newHand, dealerHand, 'bust');
    } else if (newScore === 21) {
      stand(newHand);
    }
  };

  const stand = (currentPlayerHand = playerHand) => {
    let newDealerHand = [...dealerHand];
    let newDealerScore = calculateScore(newDealerHand);

    while (newDealerScore < 17) {
      newDealerHand.push(drawCard());
      newDealerScore = calculateScore(newDealerHand);
    }

    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    endGame(currentPlayerHand, newDealerHand, 'stand');
  };

  const endGame = async (finalPlayerHand, finalDealerHand, action) => {
    const finalPlayerScore = calculateScore(finalPlayerHand);
    const finalDealerScore = calculateScore(finalDealerHand);
    
    let result = '';
    let won = false;
    let multiplier = 0;

    if (action === 'blackjack') {
      result = 'Blackjack! You Win!';
      won = true;
      multiplier = 2.5;
    } else if (action === 'bust') {
      result = 'Bust! Dealer Wins';
      won = false;
    } else {
      if (finalDealerScore > 21) {
        result = 'Dealer Busts! You Win!';
        won = true;
        multiplier = 2;
      } else if (finalPlayerScore > finalDealerScore) {
        result = 'You Win!';
        won = true;
        multiplier = 2;
      } else if (finalPlayerScore < finalDealerScore) {
        result = 'Dealer Wins';
        won = false;
      } else {
        result = 'Push - Tie Game';
        multiplier = 1;
      }
    }

    setGameResult(result);
    setGameState('ended');

    if (won) {
      const winAmount = parseFloat(betAmount.value) * multiplier;
      toast.success(`${result} Won ${winAmount.toFixed(2)} tokens!`, {
        position: "top-right",
        autoClose: 5000,
      });
    } else if (multiplier === 1) {
      toast.info(result, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(result, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    await dispatch(loadBalance(account));
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameState('betting');
    setGameResult("");
    betAmount.onChange({ target: { value: "" } });
  };

  const CardComponent = ({ card, hidden }) => (
    <Paper
      sx={{
        width: 80,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        background: hidden ? 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)' : '#fff',
        color: hidden ? '#fff' : (card.suit === '♥' || card.suit === '♦' ? '#d32f2f' : '#000'),
        border: '2px solid #00aaff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        margin: '0 4px',
      }}
    >
      {hidden ? '?' : (
        <Box>
          <div>{card.value}</div>
          <div>{card.suit}</div>
        </Box>
      )}
    </Paper>
  );

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ minHeight: '80vh', pt: 4 }}>
      <ToastContainer />
      
      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ color: '#00aaff', fontWeight: 'bold', mb: 2 }}>
          🃏 Blackjack
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#b0b8c1', mb: 4 }}>
          Balance: {balance} tokens
        </Typography>
      </Grid>

      {/* Dealer's Hand */}
      <Grid item xs={12}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #00aaff' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#00aaff', mb: 2 }}>
              Dealer's Hand {gameState !== 'betting' && `(${gameState === 'ended' ? dealerScore : '?'})`}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
              {dealerHand.map((card, index) => (
                <CardComponent 
                  key={index} 
                  card={card} 
                  hidden={gameState === 'playing' && index === 1}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Player's Hand */}
      <Grid item xs={12}>
        <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #00ff88' }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#00ff88', mb: 2 }}>
              Your Hand {gameState !== 'betting' && `(${playerScore})`}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
              {playerHand.map((card, index) => (
                <CardComponent key={index} card={card} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Game Result */}
      {gameResult && (
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              color: gameResult.includes('Win') ? '#00ff88' : gameResult.includes('Push') ? '#ffaa00' : '#ff4444',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,255,136,0.5)'
            }}
          >
            {gameResult}
          </Typography>
        </Grid>
      )}

      {/* Betting Controls */}
      {gameState === 'betting' && (
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '2px solid #00aaff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#00aaff', mb: 2 }}>
                Place Your Bet
              </Typography>
              <SelectAmount betAmount={betAmount} balance={balance} />
              <Button
                variant="contained"
                fullWidth
                onClick={startGame}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00cc66 0%, #00aa44 100%)',
                  }
                }}
              >
                Deal Cards
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Playing Controls */}
      {gameState === 'playing' && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={hit}
              sx={{
                background: 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)',
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0088dd 0%, #0066bb 100%)',
                }
              }}
            >
              Hit
            </Button>
            <Button
              variant="contained"
              onClick={() => stand()}
              sx={{
                background: 'linear-gradient(135deg, #ff6600 0%, #dd4400 100%)',
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #dd4400 0%, #bb2200 100%)',
                }
              }}
            >
              Stand
            </Button>
          </Box>
        </Grid>
      )}

      {/* New Game Button */}
      {gameState === 'ended' && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={resetGame}
              sx={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                color: '#000',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00cc66 0%, #00aa44 100%)',
                }
              }}
            >
              New Game
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BlackjackGame;
