// src/components/Home.js
import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './home.css'; // Import the CSS file

const Home = () => {
    const navigate = useNavigate();

    const handleBuyTicketsClick = () => {
        navigate('/events');
    };

    return (
        <Container>
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
