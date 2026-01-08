import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a2332', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      <Typography variant="h2" sx={{ mb: 4, color: '#00aaff' }}>
        ✅ React App is Working!
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 4, color: '#b0b8c1' }}>
        If you can see this page, the basic setup is correct.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ 
            background: 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)',
            px: 4,
            py: 2
          }}
        >
          Go to Landing Page
        </Button>
        
        <Button 
          variant="contained" 
          onClick={() => navigate('/games')}
          sx={{ 
            background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
            color: '#000',
            px: 4,
            py: 2
          }}
        >
          Go to Games
        </Button>

        <Button 
          variant="contained" 
          onClick={() => navigate('/games/Roulette')}
          sx={{ 
            background: 'linear-gradient(135deg, #ff6600 0%, #dd4400 100%)',
            px: 4,
            py: 2
          }}
        >
          Go to Roulette
        </Button>
      </Box>

      <Box sx={{ mt: 6, p: 3, backgroundColor: '#0a1628', borderRadius: 2, maxWidth: 600 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#00aaff' }}>
          Troubleshooting Tips:
        </Typography>
        <Typography component="div" sx={{ color: '#b0b8c1' }}>
          <ul>
            <li>If landing page is white: Check browser console (F12) for errors</li>
            <li>Make sure you ran: node fix-landing.js</li>
            <li>Try hard refresh: Ctrl + Shift + R</li>
            <li>Clear browser cache and reload</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default TestPage;
