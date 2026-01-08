import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import supabaseAuth, { supabase } from '../services/supabaseAuth';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [history, setHistory] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const u = await supabaseAuth.getCurrentUser();
      if (!u?.id || !mounted) return;
      setUser(u);
      const [{ data: p }, { data: h }, { data: d }, { data: w }] = await Promise.all([
        supabaseAuth.getUserProfile(u.id),
        supabaseAuth.getGameHistory(u.id, 20),
        supabase
          .from('deposits')
          .select('*')
          .eq('user_id', u.id)
          .order('timestamp', { ascending: false })
          .limit(20),
        supabase
          .from('withdrawals')
          .select('*')
          .eq('user_id', u.id)
          .order('timestamp', { ascending: false })
          .limit(20),
      ]);
      if (!mounted) return;
      setProfile(p || null);
      setHistory(h || []);
      setDeposits(d || []);
      setWithdrawals(w || []);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleTabChange = (_e, value) => setTab(value);

  const renderTable = (rows, columns) => (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((c) => (
            <TableCell key={c.key} sx={{ color: '#b0b8c1' }}>{c.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((c) => (
              <TableCell key={c.key}>{row[c.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Box sx={{ backgroundColor: '#1a2332', minHeight: '100vh', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Account Overview
        </Typography>
        {profile && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#26333b' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>{profile.username}</Typography>
                  <Typography variant="body2" sx={{ color: '#b0b8c1', mb: 1 }}>{user?.email}</Typography>
                  <Typography variant="body2">VIP Level: {profile.vip_level ?? 0}</Typography>
                  <Typography variant="body2">VIP Points: {profile.vip_points ?? 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ bgcolor: '#26333b' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Stats</Typography>
                  <Typography variant="body2">Total Wagered: {profile.total_wagered}</Typography>
                  <Typography variant="body2">Total Won: {profile.total_won}</Typography>
                  <Typography variant="body2">Games Played: {profile.games_played}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Card sx={{ bgcolor: '#26333b' }}>
          <CardContent>
            <Tabs value={tab} onChange={handleTabChange} textColor="inherit" indicatorColor="primary" sx={{ mb: 2 }}>
              <Tab label="Game History" />
              <Tab label="Deposits" />
              <Tab label="Withdrawals" />
            </Tabs>
            {tab === 0 && renderTable(history, [
              { key: 'game_name', label: 'Game' },
              { key: 'bet_amount', label: 'Bet' },
              { key: 'payout', label: 'Payout' },
              { key: 'result', label: 'Result' },
              { key: 'timestamp', label: 'Time' },
            ])}
            {tab === 1 && renderTable(deposits, [
              { key: 'amount', label: 'Amount' },
              { key: 'tx_hash', label: 'Tx Hash' },
              { key: 'timestamp', label: 'Time' },
            ])}
            {tab === 2 && renderTable(withdrawals, [
              { key: 'amount', label: 'Amount' },
              { key: 'tx_hash', label: 'Tx Hash' },
              { key: 'timestamp', label: 'Time' },
            ])}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserProfilePage;
