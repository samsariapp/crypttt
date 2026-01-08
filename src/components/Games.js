import React, { useState, useMemo } from 'react';
import { Avatar, Grid, Typography} from '@mui/material';
import rouleteIcon from "../images/Roulette.png";
import rouletteImage from "../images/Roulette.webp";
import GameButton from './GameButton';
import starImage from "../images/Gold-Star-PNG-Photos.png"
import GameDiscoveryBar from './GameDiscoveryBar';

const games = [
    {
        url: rouletteImage,
        name: 'Roulette',
        category: 'table',
        title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
            <Grid item display={{ xs: "none", md: "contents" }}>
                <Avatar alt="" src={rouleteIcon} sx={{ width: 40, height: 40 }} />
            </Grid>
            <Grid item>
                <Typography variant='h5' sx={{color:'#FFFFFF'}}>Roulette</Typography>
            </Grid>
        </Grid>,
        route: '/games/Roulette'
    },
    {
        url: 'https://via.placeholder.com/400x300/1a2332/00aaff?text=Blackjack',
        name: 'Blackjack',
        category: 'table',
        title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
            <Grid item>
                <Typography variant='h5' sx={{color:'#FFFFFF'}}>🃏 Blackjack</Typography>
            </Grid>
        </Grid>,
        route: '/games/Blackjack'
    },
    {
        url: 'https://via.placeholder.com/400x300/1a2332/ffaa00?text=Slots',
        name: 'Slot Machine',
        category: 'slots',
        title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
            <Grid item>
                <Typography variant='h5' sx={{color:'#FFFFFF'}}>🎰 Slot Machine</Typography>
            </Grid>
        </Grid>,
        route: '/games/Slots'
    },
    {
        url: 'https://via.placeholder.com/400x300/1a2332/00ff88?text=Dice',
        name: 'Dice Game',
        category: 'other',
        title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
            <Grid item>
                <Typography variant='h5' sx={{color:'#FFFFFF'}}>🎲 Dice Game</Typography>
            </Grid>
        </Grid>,
        route: '/games/Dice'
    },
    {
        url: 'https://via.placeholder.com/400x300/1a2332/FFD700?text=Coin+Flip',
        name: 'Coin Flip',
        category: 'other',
        title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
            <Grid item>
                <Typography variant='h5' sx={{color:'#FFFFFF'}}>🪙 Coin Flip</Typography>
            </Grid>
        </Grid>,
        route: '/games/CoinFlip'
    }
];

const GamesGrid = ({ list }) =>{
    return(
        <Grid item>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item>
                            <Avatar alt="" src={starImage} sx={{ width: 50, height: 50 }} />
                        </Grid>
                        <Grid item>
                            <Typography variant='h3' sx={{color:'#FFFFFF'}}>Casino Games</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {list.map((game, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Grid container alignItems="center" justifyContent="center">
                            <GameButton games={game}/>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

const Games = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const filteredGames = useMemo(() => {
        return games.filter((g) => {
            const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === 'all' ? true : g.category === category;
            return matchSearch && matchCategory;
        });
    }, [search, category]);

    return (
        <>
            <GameDiscoveryBar
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
            />
            <Grid container alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                <GamesGrid list={filteredGames} />
            </Grid>
        </>
    );
};
export default Games