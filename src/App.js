import './App.css';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { Grid } from '@mui/material';
import contractsService from './services/contractsService';
import {useDispatch, useSelector } from "react-redux";
import { loadAccounts } from './reducers/accountReducer';
import { loadBalance } from './reducers/balanceReducer';
import { loadPrice } from './reducers/priceReducer';
import { loadHistorial } from './reducers/historialReducer';
import BuyTokens from './components/BuyTokens';
import WithdrawTokens from './components/Withdraw';
import Header from './components/Header';
import {
  Routes,
  Route,
} from "react-router-dom"

import RouletteGame from './components/RouletteGame';
import Wallet from './components/Wallet';
import Games from './components/Games';
import LandingPage from './components/LandingPage';
import BlackjackGame from './components/BlackjackGame';
import SlotMachine from './components/SlotMachine';
import DiceGame from './components/DiceGame';
import CoinFlip from './components/CoinFlip';
import TestPage from './components/TestPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import SideNav from './components/SideNav';
import AppFooter from './components/AppFooter';
import UserProfilePage from './components/UserProfilePage';
import PromoBanner from './components/PromoBanner';
import OnboardingBanner from './components/OnboardingBanner';
import SportsPage from './components/SportsPage';
import VipPage from './components/VipPage';
import SupportPage from './components/SupportPage';
import SettingsPage from './components/SettingsPage';

const App = () => {
  const dispatch = useDispatch()
  const balance = useSelector(({ balance }) => {
    return balance;
  });
  const account = useSelector(({ account }) => {
    return (
      account
    )
  })

  const price = useSelector(({ price }) => {
    return price;
  });

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    dispatch(loadAccounts(accounts[0]));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      dispatch(loadAccounts(accounts[0]));
      await web3Handler();
    })
    await contractsService.loadContracts(signer);
  }

  const loadInfo = async () => {
    if (account !==""){
      await dispatch(loadBalance(account));
      await dispatch(loadPrice(account));
      await dispatch(loadHistorial(account))
    }
  }

  useEffect(() => {
    loadInfo()
}, [account])


  return (
    <Grid container rowSpacing={{ xs: 8, sm: 9 }} sx={{ width: 1, backgroundColor: '#222c31'}}>
      <Grid item xs={12}>
        <Header login={web3Handler} balance={balance} account={account} price={price}/>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item md={1.5} lg={1} sx={{ display: { xs: 'none', md: 'block' } }}>
            <SideNav />
          </Grid>
          <Grid item xs={12} md={10.5} lg={11}>
            <OnboardingBanner account={account} />
            <PromoBanner />
            <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage account={account} balance={balance} price={price}/>}/>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/vip" element={<VipPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/Wallet" element={<Wallet/>} > 
          <Route path="buyTokens" element={<BuyTokens account={account} price={price} />} />
          <Route path="withdrawTokens" element={<WithdrawTokens balance={balance} account={account} price={price}/>} />
        </Route>
        <Route path="/games" element={<Games/>}/>
        <Route path="/games/Roulette" element={<RouletteGame balance={balance} account={account} />} />
        <Route path="/games/Blackjack" element={<BlackjackGame balance={balance} account={account} />} />
        <Route path="/games/Slots" element={<SlotMachine balance={balance} account={account} />} />
        <Route path="/games/Dice" element={<DiceGame balance={balance} account={account} />} />
        <Route path="/games/CoinFlip" element={<CoinFlip balance={balance} account={account} />} />
      </Routes>
            <AppFooter />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
