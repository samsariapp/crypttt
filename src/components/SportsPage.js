import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const SportsPage = () => {
  return (
    <Box sx={{ backgroundColor: '#1a2332', minHeight: '100vh', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Sports
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b8c1' }}>
          Sports betting section coming soon.
        </Typography>
      </Container>
    </Box>
  );
};

export default SportsPage;
