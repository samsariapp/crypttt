import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import supabaseAuth from '../services/supabaseAuth';
import { useNavigate } from 'react-router-dom';

const OnboardingBanner = ({ account }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const u = await supabaseAuth.getCurrentUser();
      if (!mounted) return;
      setUser(u);
      if (u?.id) {
        const { data } = await supabaseAuth.getUserProfile(u.id);
        if (!mounted) return;
        setProfile(data || null);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  let message = '';
  let ctas = [];

  if (!user && !account) {
    message = 'You are browsing as a guest. Sign up or connect your wallet to unlock VIP rewards and save your progress.';
    ctas = [
      { label: 'Sign Up', action: () => navigate('/signup') },
      { label: 'Login', action: () => navigate('/login') },
    ];
  } else if (user && !user.email_confirmed_at) {
    message = 'Please confirm your email to enable full account features. Check your inbox for the confirmation link.';
  } else if (user && !account) {
    message = 'Connect your wallet to start playing on-chain games and earning VIP points.';
  } else {
    return null;
  }

  return (
    <Box sx={{
      px: 2,
      py: 1.5,
      bgcolor: '#26333b',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 1,
      mb: 2,
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <Typography variant="body2">{message}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {ctas.map((c) => (
          <Button key={c.label} size="small" variant="outlined" color="inherit" onClick={c.action}>
            {c.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default OnboardingBanner;
