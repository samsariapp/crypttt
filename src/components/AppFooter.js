import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const AppFooter = () => {
  return (
    <Box sx={{ mt: 6, py: 3, borderTop: '1px solid rgba(255,255,255,0.08)', bgcolor: '#1a2332' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#b0b8c1', mb: 1 }}>
              Trust & Fairness
            </Typography>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Provably Fair
            </Link>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Transparency
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#b0b8c1', mb: 1 }}>
              Legal & Compliance
            </Typography>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Terms & Conditions
            </Link>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Responsible Gambling
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#b0b8c1', mb: 1 }}>
              Support
            </Typography>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Help Center
            </Link>
            <Link href="#" underline="hover" sx={{ display: 'block', color: '#ffffff', mb: 0.5 }}>
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#6f7a88' }}>
          This is a decentralized crypto casino demo. Always gamble responsibly.
        </Typography>
      </Container>
    </Box>
  );
};

export default AppFooter;
