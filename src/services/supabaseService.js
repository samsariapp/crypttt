import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://apnvtotnxpzbpdhjpxuf.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbnZ0b3RueHB6YnBkaGpweHVmIiwicm9zZSI6ImFub24iLCJpYXQiOjE3Njc3Mjk3MjIsImV4cCI6MjA4MzMwNTcyMn0.E_O-Mab-bF1X2FXoqcWK6UlsskXfSgji43BLajxOX7I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbnZ0b3RueHB6YnBkaGpweHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3Mjk3MjIsImV4cCI6MjA4MzMwNTcyMn0.E_O-Mab-bF1X2FXoqcWK6UlsskXfSgji43BLajxOX7I';

// Auth helpers
const signUp = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username
      }
    }
  });
  return { data, error };
};

const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Database helpers
const createUserProfile = async (userId, username, walletAddress = null) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        username,
        wallet_address: walletAddress,
        total_wagered: 0,
        total_won: 0,
        games_played: 0
      }
    ])
    .select();
  return { data, error };
};

const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();
  return { data, error };
};

const addGameHistory = async (userId, gameName, betAmount, payout, result) => {
  const { data, error } = await supabase
    .from('game_history')
    .insert([
      {
        user_id: userId,
        game_name: gameName,
        bet_amount: betAmount,
        payout,
        result
      }
    ])
    .select();
  return { data, error };
};

const getGameHistory = async (userId, limit = 50) => {
  const { data, error } = await supabase
    .from('game_history')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);
  return { data, error };
};

const getLeaderboard = async (limit = 10) => {
  const { data, error } = await supabase
    .from('users')
    .select('username, total_wagered, total_won, games_played')
    .order('total_won', { ascending: false })
    .limit(limit);
  return { data, error };
};

const addDeposit = async (userId, amount, txHash) => {
  const { data, error } = await supabase
    .from('deposits')
    .insert([
      {
        user_id: userId,
        amount,
        tx_hash: txHash
      }
    ])
    .select();
  return { data, error };
};

const addWithdrawal = async (userId, amount, txHash) => {
  const { data, error } = await supabase
    .from('withdrawals')
    .insert([
      {
        user_id: userId,
        amount,
        tx_hash: txHash
      }
    ])
    .select();
  return { data, error };
};

const supabaseService = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  addGameHistory,
  getGameHistory,
  getLeaderboard,
  addDeposit,
  addWithdrawal
};

export default supabaseService;
