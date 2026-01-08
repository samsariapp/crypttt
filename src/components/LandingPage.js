import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import supabaseAuth from '../services/supabaseAuth';

const VipOverviewPanel = ({ profile }) => {
  if (!profile) return null;

  const level = profile.vip_level ?? 0;
  const points = Number(profile.vip_points || 0);
  const nextThresholds = [0, 100, 1000, 10000, 50000];
  const currentIndex = Math.min(level, nextThresholds.length - 1);
  const currentMin = nextThresholds[currentIndex] || 0;
  const nextMin = nextThresholds[currentIndex + 1] || currentMin;
  const progress = nextMin > currentMin
    ? Math.max(0, Math.min(100, ((points - currentMin) / (nextMin - currentMin)) * 100))
    : 100;

  return (
    <Box sx={{
      mt: 4,
      mb: 6,
      p: 3,
      borderRadius: 2,
      background: 'linear-gradient(135deg, rgba(0,150,255,0.25) 0%, rgba(0,255,150,0.15) 100%)',
      border: '1px solid rgba(0,200,255,0.4)'
    }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
        VIP Progress
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, color: '#e0f7ff' }}>
        Level {level} · {profile.username}
      </Typography>
      <Box sx={{ position: 'relative', height: 12, borderRadius: 999, bgcolor: 'rgba(0,0,0,0.35)', overflow: 'hidden', mb: 1.5 }}>
        <Box sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${progress}%`,
          borderRadius: 999,
          background: 'linear-gradient(90deg, #00ff88, #00c3ff)'
        }} />
      </Box>
      <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
        Total VIP points: {points.toFixed ? points.toFixed(0) : points}
      </Typography>
    </Box>
  );
};

const LandingPage = ({ account, balance, price }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      const user = await supabaseAuth.getCurrentUser();
      if (!user?.id || !mounted) return;
      const { data } = await supabaseAuth.getUserProfile(user.id);
      if (mounted) setProfile(data || null);
    };
    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const trendingGames = [
    { id: 1, name: 'Roulette', image: '🎡', players: 900, route: '/games/Roulette' },
    { id: 2, name: 'Blackjack', image: '🃏', players: 897, route: '/games/Blackjack' },
    { id: 3, name: 'Slots', image: '🎰', players: 889, route: '/games/Slots' },
    { id: 4, name: 'Dice', image: '🎲', players: 260, route: '/games/Dice' },
    { id: 5, name: 'Coin Flip', image: '🪙', players: 347, route: '/games/CoinFlip' },
    { id: 6, name: 'Poker', image: '🎴', players: 403, route: '/games' },
    { id: 7, name: 'Baccarat', image: '🀄', players: 124, route: '/games' },
    { id: 8, name: 'Keno', image: '🎱', players: 313, route: '/games' },
  ];

  const moreGames = [
    { id: 9, name: 'Texas Holdem', image: '♠️', players: 512, route: '/games' },
    { id: 10, name: 'Craps', image: '🎲', players: 634, route: '/games' },
    { id: 11, name: 'Wheel of Fortune', image: '🎡', players: 445, route: '/games' },
    { id: 12, name: 'Scratch Cards', image: '🎫', players: 789, route: '/games' },
    { id: 13, name: 'Video Poker', image: '🎮', players: 923, route: '/games' },
    { id: 14, name: 'Bingo', image: '🔢', players: 567, route: '/games' },
    { id: 15, name: 'Sic Bo', image: '🀄', players: 678, route: '/games' },
    { id: 16, name: 'Plinko', image: '📍', players: 432, route: '/games' },
  ];

  const sports = [
    { name: 'Soccer', image: '⚽' },
    { name: 'Tennis', image: '🎾' },
    { name: 'Basketball', image: '🏀' },
    { name: 'Cricket', image: '🏏' },
    { name: 'American Football', image: '🏈' },
    { name: 'Ice Hockey', image: '🏒' },
    { name: 'Horse Racing', image: '🏇' },
    { name: 'League of Legends', image: '⚔️' },
  ];

  const recentBets = [
    { game: 'Lightning Roulette', user: 'Hidden', time: '7:47 PM', amount: 'TRY 88,000.00', multiplier: '0.00x', payout: '-TRY 88,000.00' },
    { game: 'Football Studio', user: 'Hidden', time: '7:47 PM', amount: '$2,216.82', multiplier: '0.00x', payout: '-$2,216.82' },
    { game: 'Keno', user: 'Nate77', time: '7:47 PM', amount: 'CA$2,001.62', multiplier: '0.00x', payout: '-CA$2,001.62' },
    { game: 'Korean Speed Baccarat', user: 'Hidden', time: '7:47 PM', amount: '$4,000.00', multiplier: '1.00x', payout: '$4,000.00' },
  ];

  const faqs = [
    { question: 'Who is Stake?', answer: 'Leading the online gambling industry since 2017, Stake.com offers a wide variety of online casino and sports betting options, operating globally in 15 different languages.' },
    { question: 'Is Stake Licensed?', answer: 'Yes, Stake operates under proper licensing and regulation.' },
    { question: 'Is Betting on Stake Safe?', answer: 'Stake provides a secure and safe betting platform with advanced security measures.' },
    { question: 'What Currencies Can I Bet With?', answer: 'Stake supports multiple currencies including crypto and fiat options.' },
    { question: 'What Types of Casino Games Can I Play?', answer: 'We offer a wide variety of slot games, live casino games, and more.' },
    { question: 'What Sports Can I Bet On?', answer: 'You can bet on all major sports including football, basketball, tennis, and more.' },
    { question: 'How Do I Watch Live Streams?', answer: 'Access live streams directly from the platform with our streaming feature.' },
  ];

  const handlePlayGame = (game) => {
    if (game.route) {
      navigate(game.route);
    } else {
      navigate('/games');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#1a2332', minHeight: '100vh', color: '#fff', pb: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{
          background: 'linear-gradient(135deg, rgba(0,100,200,0.3) 0%, rgba(0,200,100,0.3) 100%), url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          borderBottom: '2px solid rgba(0,150,200,0.3)',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' }
            }}
          >
            World's Largest Online Casino and Sportsbook
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              color: '#b0b8c1',
              fontSize: { xs: '1rem', md: '1.2rem' }
            }}
          >
            Play to earn with the most trusted platform
          </Typography>
          {!account ? (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                sx={{
                  background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': { background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }
                }}
              >
                Register Now
              </Button>
            </Box>
          ) : (
            <Typography sx={{ color: '#00ff00' }}>
              {`Welcome back! Your balance: ${balance} tokens`}
              {price && balance ? ` (~${(Number(balance) * Number(price)).toFixed(4)} BNB)` : ''}
            </Typography>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <VipOverviewPanel profile={profile} />
        {/* Trending Games Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            🎰 Trending Games
          </Typography>
          <Grid container spacing={2}>
            {trendingGames.map((game) => (
              <Grid item xs={6} sm={4} md={3} key={game.id}>
                <Card 
                  sx={{
                    background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
                    border: '1px solid rgba(0,150,200,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(0,200,255,0.8)',
                      boxShadow: '0 8px 24px rgba(0,150,200,0.3)'
                    }
                  }}
                  onClick={() => handlePlayGame(game)}
                >
                  <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>{game.image}</Box>
                    <Typography variant="subtitle2" sx={{ color: '#b0b8c1' }}>
                      {game.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#00ff00', display: 'block', mt: 1 }}>
                      🟢 {game.players} playing
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* More Games Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            More Games
          </Typography>
          <Grid container spacing={2}>
            {moreGames.map((game) => (
              <Grid item xs={6} sm={4} md={3} key={game.id}>
                <Card 
                  sx={{
                    background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
                    border: '1px solid rgba(0,150,200,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(0,200,255,0.8)',
                      boxShadow: '0 8px 24px rgba(0,150,200,0.3)'
                    }
                  }}
                  onClick={() => handlePlayGame(game)}
                >
                  <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>{game.image}</Box>
                    <Typography variant="subtitle2" sx={{ color: '#b0b8c1' }}>
                      {game.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#00ff00', display: 'block', mt: 1 }}>
                      🟢 {game.players} playing
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sports Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            ⚽ Sports Betting
          </Typography>
          <Grid container spacing={2}>
            {sports.map((sport, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card 
                  sx={{
                    background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
                    border: '1px solid rgba(0,200,100,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(0,255,100,0.8)',
                      boxShadow: '0 8px 24px rgba(0,200,100,0.3)'
                    }
                  }}
                  onClick={() => navigate('/games')}
                >
                  <CardContent sx={{ textAlign: 'center', pb: 2 }}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>{sport.image}</Box>
                    <Typography variant="subtitle2" sx={{ color: '#b0b8c1' }}>
                      {sport.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Bets Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            📊 Recent Bets
          </Typography>
          <TableContainer component={Paper} sx={{ background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)', border: '1px solid rgba(0,150,200,0.3)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: '2px solid rgba(0,150,200,0.5)' }}>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>Game</TableCell>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>Bet Amount</TableCell>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>Multiplier</TableCell>
                  <TableCell sx={{ color: '#00aaff', fontWeight: 'bold' }}>Payout</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentBets.map((bet, index) => (
                  <TableRow key={index} sx={{ borderBottom: '1px solid rgba(0,150,200,0.2)', '&:hover': { background: 'rgba(0,150,200,0.1)' } }}>
                    <TableCell sx={{ color: '#b0b8c1' }}>🎮 {bet.game}</TableCell>
                    <TableCell sx={{ color: '#b0b8c1' }}>👤 {bet.user}</TableCell>
                    <TableCell sx={{ color: '#b0b8c1' }}>{bet.time}</TableCell>
                    <TableCell sx={{ color: '#b0b8c1' }}>{bet.amount}</TableCell>
                    <TableCell sx={{ color: '#b0b8c1' }}>{bet.multiplier}</TableCell>
                    <TableCell sx={{ color: bet.payout.startsWith('-') ? '#ff4444' : '#00ff00', fontWeight: 'bold' }}>
                      {bet.payout}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            ❓ Frequently Asked Questions
          </Typography>
          <Box>
            {faqs.map((faq, index) => (
              <Accordion 
                key={index}
                sx={{
                  background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
                  border: '1px solid rgba(0,150,200,0.3)',
                  mb: 2,
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    borderColor: 'rgba(0,200,255,0.6)'
                  }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00aaff' }} />}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#00aaff' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ color: '#b0b8c1', borderTop: '1px solid rgba(0,150,200,0.3)' }}>
                  <Typography>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{
            background: 'linear-gradient(135deg, rgba(0,150,200,0.2) 0%, rgba(0,200,100,0.2) 100%)',
            border: '2px solid rgba(0,150,200,0.5)',
            borderRadius: '10px',
            p: 6,
            textAlign: 'center',
            mb: 4
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready to Play?
          </Typography>
          <Typography sx={{ mb: 4, color: '#b0b8c1', fontSize: '1.1rem' }}>
            Join thousands of players enjoying the best crypto casino experience
          </Typography>
          {!account && (
            <Button 
              variant="contained" 
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #00aaff 0%, #0088ff 100%)',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #0088ff 0%, #0066dd 100%)',
                  transform: 'scale(1.05)'
                }
              }}
            >
              Start Playing Now
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
