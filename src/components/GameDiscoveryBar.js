import React from 'react';
import { Box, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';

const GameDiscoveryBar = ({ search, onSearchChange, category, onCategoryChange }) => {
  return (
    <Box sx={{
      px: 2,
      py: 2,
      bgcolor: '#1a2332',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={(_e, val) => val && onCategoryChange(val)}
        size="small"
      >
        <ToggleButton value="all" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>All</ToggleButton>
        <ToggleButton value="table" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>Table</ToggleButton>
        <ToggleButton value="slots" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>Slots</ToggleButton>
        <ToggleButton value="other" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>Other</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search your game"
        size="small"
        sx={{
          minWidth: 220,
          '& .MuiInputBase-root': { bgcolor: '#26333b', color: '#fff' },
          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }
        }}
      />
    </Box>
  );
};

export default GameDiscoveryBar;
