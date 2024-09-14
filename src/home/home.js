// src/components/Home.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import './home.css'; // Import the CSS file

const Home = () => {
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
                >
                    Buy Tickets
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
