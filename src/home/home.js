// src/components/Home.js
import React, {useEffect, useState} from 'react';
import {Box, Button, Container, IconButton, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Facebook, Instagram, X as Twitter} from '@mui/icons-material';
import './home.css'; // Import the CSS file

const Home = () => {
    const navigate = useNavigate();
    const [testMode, setTestMode] = useState(false);

    useEffect(() => {
        fetch('https://api.fawleydogshow.com/test')
            .then(res => res.json())
            .then(data => {
                if (data && data.test_mode) setTestMode(true);
            })
            .catch(() => {
            });
    }, []);

    const handleBuyTicketsClick = () => {
        navigate('/events');
    };

    const handleDonateClick = () => {
        navigate('/donations');
    };

    return (
        <Container maxWidth="sm" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingBottom: 0
        }}>
            {testMode && (
                <Box sx={{background: '#ff9800', color: '#fff', p: 2, mb: 2, borderRadius: 1, textAlign: 'center'}}>
                    <Typography variant="h6">The website is currently in testing mode. Please come back
                        soon!</Typography>
                </Box>
            )}
            {/* Hero image at top */}
            <Box className="hero-container"
                 style={{borderRadius: 24, marginTop: 16, marginBottom: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.08)'}}/>
            {/* Info section */}
            <Box style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 2px 8px rgba(45,122,95,0.06)',
                padding: 20,
                marginBottom: 16,
                textAlign: 'center'
            }}>
                <Typography variant="h5" style={{color: '#2d7a5f', fontWeight: 700, marginBottom: 8}}>
                    Fawley & The Waterside Dog Show 2025
                </Typography>
                <Typography variant="body1" style={{color: '#444', marginBottom: 6}}>
                    Sunday 7th December 2025 · Fawley Recreation Ground
                </Typography>
                <Typography variant="body2" style={{color: '#666'}}>
                    Join us for a fun-filled day for all the family! Enjoy pedigree and novelty classes, stalls, food,
                    games, and help us raise funds for cancer research. All dogs and people welcome!
                </Typography>
            </Box>
            {/* Quick links section */}
            <Box style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(45,122,95,0.06)',
                padding: 10,
                marginBottom: 18,
                minHeight: 36,
                display: 'flex',
                justifyContent: 'center',
                gap: 18
            }}>
                <Button variant="text" size="small" style={{color: '#2d7a5f', fontWeight: 600}}
                        onClick={() => navigate('/about')}>About Us</Button>
                <Button variant="text" size="small" style={{color: '#2d7a5f', fontWeight: 600}}
                        onClick={() => navigate('/what-to-expect')}>What To Expect</Button>
                <Button variant="text" size="small" style={{color: '#2d7a5f', fontWeight: 600}}
                        onClick={() => navigate('/contact')}>Contact Us</Button>
            </Box>
            {/* Action buttons */}
            <Box className="button-container"
                 style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 32}}>
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
            {/* Social media bar */}
            <Box style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 'auto', marginBottom: 18}}>
                <IconButton aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61554694584616"
                            target="_blank" rel="noopener" sx={{color: '#2d7a5f'}}>
                    <Facebook fontSize="large"/>
                </IconButton>
                <IconButton aria-label="Instagram" href="https://www.instagram.com/sallyma1l?igsh=MXAzNWlrOHdpb2c5aQ=="
                            target="_blank" rel="noopener" sx={{color: '#2d7a5f'}}>
                    <Instagram fontSize="large"/>
                </IconButton>
                <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noopener"
                            sx={{color: '#2d7a5f'}}>
                    <Twitter fontSize="large"/>
                </IconButton>
            </Box>
        </Container>
    );
};

export default Home;
