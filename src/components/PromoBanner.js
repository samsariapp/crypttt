import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from '../services/supabaseAuth';

const PromoBanner = () => {
  const [promo, setPromo] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data } = await supabase
        .from('promotions')
        .select('*')
        .eq('active', true)
        .order('starts_at', { ascending: false })
        .limit(1);
      if (mounted) setPromo(data?.[0] || null);
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (!promo || hidden) return null;

  return (
    <Box sx={{
      px: 2,
      py: 1.5,
      bgcolor: 'linear-gradient(90deg, #00c3ff, #00ff88)',
      color: '#001822',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 1,
      mb: 2,
    }}>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {promo.title}
        </Typography>
        <Typography variant="body2">
          {promo.description}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {promo.cta_text && promo.cta_url && (
          <Button
            size="small"
            variant="contained"
            color="inherit"
            onClick={() => window.open(promo.cta_url, '_blank')}
          >
            {promo.cta_text}
          </Button>
        )}
        <Button size="small" color="inherit" onClick={() => setHidden(true)}>
          Dismiss
        </Button>
      </Box>
    </Box>
  );
};

export default PromoBanner;
