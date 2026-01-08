import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import supabaseAuth from '../services/supabaseAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: loginError } = await supabaseAuth.signIn(email, password);

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    // Login successful
    navigate('/');
    window.location.reload(); // Refresh to update auth state
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#1a2332',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      <Paper sx={{
        p: 4,
        maxWidth: 400,
        width: '100%',
        background: 'linear-gradient(135deg, #2a3f5f 0%, #1a2332 100%)',
        border: '1px solid rgba(0,150,200,0.3)'
      }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#fff', textAlign: 'center' }}>
          🎰 Login to Casino
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 2,
              '& .MuiInputBase-root': { color: '#fff' },
              '& .MuiInputLabel-root': { color: '#b0b8c1' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,150,200,0.3)' }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              '& .MuiInputBase-root': { color: '#fff' },
              '& .MuiInputLabel-root': { color: '#b0b8c1' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,150,200,0.3)' }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #00aaff 0%, #0088dd 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0088dd 0%, #0066bb 100%)'
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
            Don't have an account?{' '}
            <Link
              onClick={() => navigate('/signup')}
              sx={{ color: '#00aaff', cursor: 'pointer', textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
            Or{' '}
            <Link
              onClick={() => navigate('/')}
              sx={{ color: '#00aaff', cursor: 'pointer', textDecoration: 'none' }}
            >
              Continue as guest
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
