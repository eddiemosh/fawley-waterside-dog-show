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

    const handleDonateClick = () => {
        navigate('/donations');
    };

    return (
        <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {testMode && (
                <Box sx={{ background: '#ff9800', color: '#fff', p: 2, mb: 2, borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h6">The website is currently in testing mode. Please come back soon!</Typography>
                </Box>
            )}
            <Box className="hero-container" style={{ borderRadius: 24, marginTop: 32, marginBottom: 32, boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
                <Typography className="overlay-text" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#222', background: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: 24, margin: 0 }}>
                    Join us for a day of fun and games
                </Typography>
            </Box>
            <Box className="button-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
                <Button
                    variant="contained"
                    className="buy-tickets-button"
                    onClick={handleBuyTicketsClick}
                    style={{
                        fontSize: '1.2rem',
                        padding: '12px 32px',
                        borderRadius: 18,
                        background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
                        letterSpacing: 1,
                        border: 'none',
                        minWidth: 140
                    }}
                >
                    Buy Tickets
                </Button>
                <Button
                    variant="outlined"
                    className="donate-button"
                    onClick={handleDonateClick}
                    style={{
                        fontSize: '1.2rem',
                        padding: '12px 32px',
                        borderRadius: 18,
                        background: '#fff',
                        color: '#2d7a5f',
                        fontWeight: 600,
                        border: '2px solid #2d7a5f',
                        minWidth: 140
                    }}
                >
                    Donate
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
