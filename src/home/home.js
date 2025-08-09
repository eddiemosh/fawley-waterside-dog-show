// src/components/Home.js
import React, { useEffect, useState } from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './home.css'; // Import the CSS file

const Home = () => {
    const navigate = useNavigate();
    const [testMode, setTestMode] = useState(false);

    useEffect(() => {
        fetch('https://api.fawleydogshow.com/test/')
            .then(res => res.json())
            .then(data => {
                if (data && data.test_mode) setTestMode(true);
            })
            .catch(() => {});
    }, []);

    const handleBuyTicketsClick = () => {
        navigate('/events');
    };

    return (
        <Container>
            {testMode && (
                <Box sx={{ background: '#ff9800', color: '#fff', p: 2, mb: 2, borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h6">The website is currently in testing mode. Please come back soon!</Typography>
                </Box>
            )}
            <Box className="hero-container">
                <Typography className="overlay-text">
                    Join us for a day of fun and games
                </Typography>
            </Box>
            <Box className="button-container">
                <Button
                    variant="contained"
                    className="buy-tickets-button"
                    onClick={handleBuyTicketsClick}
                >
                    Buy Tickets
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
