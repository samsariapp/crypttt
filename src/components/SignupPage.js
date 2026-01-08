import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import supabaseAuth from '../services/supabaseAuth';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate username
    if (!username || username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      setLoading(false);
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { data, error: signupError } = await supabaseAuth.signUp(email, password, username);

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabaseAuth.createUserProfile(
        data.user.id,
        username
      );

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
          🎰 Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Account created! Check your email to confirm. Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            helperText="At least 6 characters"
            sx={{
              mb: 3,
              '& .MuiInputBase-root': { color: '#fff' },
              '& .MuiInputLabel-root': { color: '#b0b8c1' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,150,200,0.3)' },
              '& .MuiFormHelperText-root': { color: '#b0b8c1' }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || success}
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
              color: '#000',
              '&:hover': {
                background: 'linear-gradient(135deg, #00cc66 0%, #00aa44 100%)'
              }
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              sx={{ color: '#00aaff', cursor: 'pointer', textDecoration: 'none' }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;
