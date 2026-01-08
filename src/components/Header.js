import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Popover,
  TextField,
  Badge,
  Link,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "tss-react/mui";
import { Box } from "@mui/system";
import CustomButton from "./CustomButton";
import bnbIcon from "../images/Binance-Coin-BNB-icon.png";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router";
import supabaseAuth, { supabase } from "../services/supabaseAuth";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SavingsIcon from "@mui/icons-material/Savings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

const headersData = [
  {
    label: "Games",
    href: "/games",
  }
];

const useStyles = makeStyles()(() => ({
  header: {
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#222c31",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header({ login, account, balance, price }) {
  const { header, menuButton, toolbar, drawerContainer } = useStyles();

  const bnbBalance = price && balance
    ? (Number(balance) * Number(price)).toFixed(4)
    : balance;

  const navigate = useNavigate();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [authUser, setAuthUser] = useState(null);
  const [authProfile, setAuthProfile] = useState(null);
  const [balanceMenuEl, setBalanceMenuEl] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState('BNB');
  const currencies = ['BNB', 'USD', 'EUR', 'BTC'];
  const balanceMenuOpen = Boolean(balanceMenuEl);
  const handleBalanceOpen = (event) => setBalanceMenuEl(event.currentTarget);
  const handleBalanceClose = () => setBalanceMenuEl(null);

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  // Supabase auth wiring for header reactivity
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const user = await supabaseAuth.getCurrentUser();
      if (mounted) setAuthUser(user);
      if (mounted && user?.id) {
        try {
          const { data } = await supabaseAuth.getUserProfile(user.id);
          setAuthProfile(data || null);
          if (data?.preferred_currency) {
            setDisplayCurrency(data.preferred_currency);
          }
        } catch {}
      }
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user?.id) {
        supabaseAuth.getUserProfile(session.user.id).then(({ data }) => {
          setAuthProfile(data || null);
          if (data?.preferred_currency) {
            setDisplayCurrency(data.preferred_currency);
          }
        });
      } else {
        setAuthProfile(null);
        setDisplayCurrency('BNB');
      }
    });
    return () => {
      mounted = false;
      try { sub?.subscription?.unsubscribe(); } catch { /* noop */ }
    };
  }, []);

  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const handleCurrencySelect = async (symbol) => {
    setDisplayCurrency(symbol);
    setAuthProfile((prev) => (prev ? { ...prev, preferred_currency: symbol } : prev));
    if (authUser?.id) {
      try {
        await supabaseAuth.updateUserProfile(authUser.id, { preferred_currency: symbol });
      } catch {
        // ignore
      }
    }
    handleBalanceClose();
  };

  const NotificationsBell = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [items, setItems] = useState([]);
    const open = Boolean(anchorEl);

    useEffect(() => {
      if (!authUser?.id) return;
      const load = async () => {
        const { data } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(10);
        setItems(data || []);
      };
      load();
    }, [authUser?.id]);

    const unread = items.filter((n) => !n.read_at).length;

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    if (!authUser) return null;

    return (
      <>
        <IconButton color="inherit" onClick={handleOpen} size="small">
          <Badge badgeContent={unread} color="error" max={9}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{ sx: { width: 320, bgcolor: '#2f3d45', color: '#fff', borderRadius: 2 } }}
        >
          <Box sx={{ p: 1 }}>
            <Typography sx={{ px: 1, py: 0.5, fontWeight: 600 }}>Notifications</Typography>
            <Divider sx={{ mb: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
            <List dense>
              {items.length === 0 && (
                <ListItemText primary="No notifications yet" sx={{ px: 2, py: 1 }} />
              )}
              {items.map((n) => (
                <ListItemButton key={n.id} sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={n.title}
                    secondary={n.body}
                    secondaryTypographyProps={{ sx: { color: '#b0b8c1' } }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Popover>
      </>
    );
  };

  const LoginButton = () => {
    const isEmailLoggedIn = !!authUser && !!authProfile?.username;
    if (!isEmailLoggedIn && account === "") {
      return (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button 
            variant="text"
            sx={{
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }
            }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#00ff88',
              color: '#000',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
              px: 2.5,
              '&:hover': {
                backgroundColor: '#00dd77',
              }
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      );
    } else if (account !== "") {
      return (
        <CustomButton
          backGround={"#222c31"}
          text={"#fff"}
          display={`${account.slice(0, 5)}...`}
        />
      );
    } else if (authProfile?.username) {
      // Email logged in with username but no wallet connected
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Avatar sx={{ bgcolor: '#00ff88', width: 32, height: 32 }}>
            {authProfile.username[0].toUpperCase()}
          </Avatar>
          <Typography sx={{ maxWidth: 160 }} noWrap>{authProfile.username}</Typography>
        </Box>
      );
    }
    return null;
  };

  const displayDesktop = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const renderDrawerContent = () => (
      <Box sx={{ width: 320 }} role="presentation">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5 }}>
          <Typography sx={{ fontWeight: 700 }}>Menu</Typography>
          <IconButton size="small" onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#00ff88', width: 40, height: 40 }}>
            {(authProfile?.username?.[0] || authUser?.email?.[0] || (account ? account.slice(2,3) : '?')).toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#b0b8c1' }}>
              {account ? 'Wallet Connected' : (authUser ? 'Signed In' : 'Guest')}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {account ? `${account.slice(0,6)}...${account.slice(-4)}` : (authProfile?.username || authUser?.email || 'Not signed in')}
            </Typography>
          </Box>
        </Box>

        {account && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              p: 1.25,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={bnbIcon} sx={{ width: 20, height: 20 }} />
                <Typography sx={{ color: '#b0b8c1', fontSize: '0.85rem' }}>BNB</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700 }}>{bnbBalance}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1.25 }}>
              <Button fullWidth variant="contained" color="success" startIcon={<SavingsIcon />} onClick={() => { navigate('/Wallet/buyTokens'); handleDrawerClose(); }}>Deposit</Button>
              <Button fullWidth variant="outlined" color="inherit" onClick={() => { navigate('/Wallet/withdrawTokens'); handleDrawerClose(); }}>Withdraw</Button>
            </Box>
          </Box>
        )}

        {!account && !authUser && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button fullWidth variant="outlined" startIcon={<LoginIcon />} onClick={() => { navigate('/login'); handleDrawerClose(); }}>Sign In</Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: '#00ff88', color: '#000', '&:hover': { bgcolor: '#00dd77' }}} startIcon={<PersonAddAltIcon />} onClick={() => { navigate('/signup'); handleDrawerClose(); }}>Sign Up</Button>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 1.25, borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          <ListItemButton onClick={() => { navigate('/games'); handleDrawerClose(); }}>
            <ListItemIcon>
              <SportsEsportsIcon sx={{ color: '#00ff88' }} />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItemButton>
          {account && (
            <ListItemButton onClick={() => { navigate('/Wallet'); handleDrawerClose(); }}>
              <ListItemIcon>
                <WalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItemButton>
          )}
        </List>

        {(account || authUser) && (
          <>
            <Divider sx={{ my: 1.25, borderColor: 'rgba(255,255,255,0.1)' }} />
            <List>
              <ListItemButton onClick={async () => { await supabaseAuth.signOut(); handleDrawerClose(); }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </>
        )}
      </Box>
    );
    return (
<Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={6}>
            <Grid item xs={1}>
              <IconButton
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                {...{
                  anchor: "left",
                  open: drawerOpen,
                  onClose: handleDrawerClose,
                }}
                PaperProps={{
                  sx: {
                    background: 'linear-gradient(135deg, rgba(32, 41, 46, 0.95) 0%, rgba(32,41,46,0.88) 100%)',
                    color: "white",
                    backdropFilter: 'blur(6px)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    width: 340,
                  },
                }}
                ModalProps={{
                  keepMounted: true,
                  BackdropProps: { sx: { backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' } }
                }}
              >
                {renderDrawerContent()}
              </Drawer>
            </Grid>
            <Grid item xs={account === "" ? 3 : 4}>
              <Grid container alignItems="center" justifyContent="center">
                {account !== "" && <BalanceButton />}
              </Grid>
            </Grid>
            <Grid item xs={account === "" ? 2 : 1}>
              <Grid container alignItems="center" justifyContent="right" sx={{ gap: 1 }}>
                <NotificationsBell />
                <LoginButton />
              </Grid>
            </Grid>
            {account !== "" && (
              <Grid item xs={1}>
                <Grid container alignItems="center" justifyContent="right">
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WalletIcon sx={{ color: "#1f1f1f", fontSize: "1rem" }} />}
                    onClick={() => navigate("/Wallet/buyTokens")}
                    sx={{ height: "40px" }}
                  >
                    <Typography display={{ xs: "none", md: "contents" }}>
                      Wallet
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const renderDrawerContent = () => (
      <Box sx={{ width: 300 }} role="presentation">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.25 }}>
          <Typography sx={{ fontWeight: 700 }}>Menu</Typography>
          <IconButton size="small" onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Avatar sx={{ bgcolor: '#00ff88', width: 38, height: 38 }}>
            {(authProfile?.username?.[0] || authUser?.email?.[0] || (account ? account.slice(2,3) : '?')).toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: '0.85rem', color: '#b0b8c1' }}>
              {account ? 'Wallet Connected' : (authUser ? 'Signed In' : 'Guest')}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
              {account ? `${account.slice(0,6)}...${account.slice(-4)}` : (authProfile?.username || authUser?.email || 'Not signed in')}
            </Typography>
          </Box>
        </Box>

        {account && (
          <Box sx={{ px: 1.5, pb: 1 }}>
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              p: 1,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={bnbIcon} sx={{ width: 18, height: 18 }} />
                <Typography sx={{ color: '#b0b8c1', fontSize: '0.8rem' }}>BNB</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{bnbBalance}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button fullWidth variant="contained" color="success" startIcon={<SavingsIcon />} onClick={() => { navigate('/Wallet/buyTokens'); handleDrawerClose(); }}>Deposit</Button>
              <Button fullWidth variant="outlined" color="inherit" onClick={() => { navigate('/Wallet/withdrawTokens'); handleDrawerClose(); }}>Withdraw</Button>
            </Box>
          </Box>
        )}

        {!account && (
          <Box sx={{ px: 1.5, pb: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button fullWidth variant="outlined" startIcon={<LoginIcon />} onClick={() => { navigate('/login'); handleDrawerClose(); }}>Sign In</Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: '#00ff88', color: '#000', '&:hover': { bgcolor: '#00dd77' }}} startIcon={<PersonAddAltIcon />} onClick={() => { navigate('/signup'); handleDrawerClose(); }}>Sign Up</Button>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          <ListItemButton onClick={() => { navigate('/games'); handleDrawerClose(); }}>
            <ListItemIcon>
              <SportsEsportsIcon sx={{ color: '#00ff88' }} />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItemButton>
          {account && (
            <ListItemButton onClick={() => { navigate('/Wallet'); handleDrawerClose(); }}>
              <ListItemIcon>
                <WalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItemButton>
          )}
        </List>
      </Box>
    );
    return (
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={6}>
            <Grid item xs={1}>
              <IconButton
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                  onClick: handleDrawerOpen,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                {...{
                  anchor: "left",
                  open: drawerOpen,
                  onClose: handleDrawerClose,
                }}
                PaperProps={{
                  sx: {
                    background: 'linear-gradient(135deg, rgba(32, 41, 46, 0.95) 0%, rgba(32,41,46,0.88) 100%)',
                    color: "white",
                    backdropFilter: 'blur(6px)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    width: 320,
                  },
                }}
                ModalProps={{
                  keepMounted: true,
                  BackdropProps: { sx: { backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' } }
                }}
              >
                {renderDrawerContent()}
              </Drawer>
            </Grid>
            <Grid item xs={account === "" ? 3 : 4}>
              <Grid container alignItems="center" justifyContent="center">
                {account !== "" && <BalanceButton />}
              </Grid>
            </Grid>
            <Grid item xs={account === "" ? 2 : 1}>
              <Grid container alignItems="center" justifyContent="right" sx={{ gap: 1 }}>
                <LoginButton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const BalanceButton = () => (
    <>
      <Button
        variant="contained"
        onClick={handleBalanceOpen}
        sx={{
          backgroundColor: '#26333b',
          color: '#fff',
          borderRadius: 2,
          px: 2,
          py: 0.75,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          {(bnbBalance || 0) + ' ' + displayCurrency}
        </Typography>
        <Avatar
          src={displayCurrency === 'BNB' ? bnbIcon : undefined}
          sx={{ width: 20, height: 20 }}
        >
          {displayCurrency !== 'BNB' ? displayCurrency[0] : null}
        </Avatar>
      </Button>
      <Popover
        open={balanceMenuOpen}
        anchorEl={balanceMenuEl}
        onClose={handleBalanceClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { width: 320, bgcolor: '#2f3d45', color: '#fff', borderRadius: 2 } }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search Currencies"
            size="small"
            sx={{
              mb: 1.5,
              '& .MuiInputBase-root': { bgcolor: '#26333b', color: '#fff' },
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }
            }}
          />
          <List sx={{ py: 0 }}>
            {currencies.map((symbol) => (
              <ListItemButton
                key={symbol}
                selected={symbol === displayCurrency}
                onClick={() => handleCurrencySelect(symbol)}
              >
                <ListItemText
                  primary={symbol}
                  secondary={bnbBalance ? `${bnbBalance} BNB` : '0'}
                />
                <Avatar
                  src={symbol === 'BNB' ? bnbIcon : undefined}
                  sx={{ width: 20, height: 20, ml: 1 }}
                >
                  {symbol !== 'BNB' ? symbol[0] : null}
                </Avatar>
              </ListItemButton>
            ))}
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <ListItemButton onClick={() => { navigate('/Wallet'); handleBalanceClose(); }}>
              <ListItemText primary="Wallet Settings" />
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </>
  );

  const femmecubatorLogo = (width) => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: "12px",
        width: "60%",
        height: "40px",
        backdropFilter: 'blur(10px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="div"
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        columnSpacing={0.5}
        sx={{ height: "100%", width: "100%" }}
      >
        <Grid item xs={6}>
          <Box alignItems="start" justifyContent="left" sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <Grid container columnSpacing={{ xs: 0.25, md: 0.5 }} alignItems="center" sx={{ height: "100%" }}>
              <Grid item xs={9} sm={9}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 1,
                    py: 0.25,
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.6rem',
                      color: '#b0b8c1',
                      textTransform: 'uppercase',
                      letterSpacing: 0.3,
                      lineHeight: 1,
                    }}
                  >
                    BNB Balance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      lineHeight: 1.1,
                    }}
                  >
                    {bnbBalance}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
                  <Avatar
                    alt="BNB"
                    src={bnbIcon}
                    sx={{ width: 20, height: 20, boxShadow: 2 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            columnSpacing={1}
            alignItems="center"
            justifyContent="right"
            sx={{ height: "100%" }}
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<WalletIcon sx={{ color: "#1f1f1f", fontSize: "1rem" }} />}
              onClick={() => navigate("/Wallet/buyTokens")}
              sx={{ height: "100%" }}
            >
              <Typography display={{ xs: "none", md: "contents" }}>
                Wallet
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar sx={{ bgcolor: "#2f3d45" }} className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
