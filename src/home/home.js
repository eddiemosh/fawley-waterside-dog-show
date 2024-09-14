import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import './home.css'; // Link to external CSS file

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
                    href="/fawley-waterside-dog-show/events" // Navigate to events page on button click
                >
                    Buy Tickets
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
