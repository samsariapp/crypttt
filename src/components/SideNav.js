import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Casino', icon: <SportsEsportsIcon />, path: '/games' },
  { label: 'Sports', icon: <SportsSoccerIcon />, path: '/sports' },
  { label: 'VIP', icon: <EmojiEventsIcon />, path: '/vip' },
  { label: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  { label: 'Support', icon: <SupportAgentIcon />, path: '/support' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        pr: 2,
        minWidth: 64,
      }}
    >
      <List sx={{ width: '100%' }}>
        {navItems.map((item) => {
          const selected = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Tooltip key={item.label} title={item.label} placement="right">
              <ListItemButton
                selected={selected}
                onClick={() => navigate(item.path)}
                sx={{ justifyContent: 'center', mb: 0.5, borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: selected ? '#00ff88' : '#ffffff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ ml: 1.5, display: { lg: 'block', md: 'none' } }}
                />
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default SideNav;
