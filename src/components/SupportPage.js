import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const SupportPage = () => {
  return (
    <Box sx={{ backgroundColor: '#1a2332', minHeight: '100vh', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Support
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b8c1' }}>
          Need help? Live chat and help center will be integrated here.
        </Typography>
      </Container>
    </Box>
  );
};

export default SupportPage;
