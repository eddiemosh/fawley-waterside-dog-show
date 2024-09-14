// src/components/Events.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './events.css'
const Events = () => {
    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate('/tickets');
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom className="upcoming-events">
                Upcoming Events
            </Typography>
            <Box>
                <Typography variant="h6">
                    1st December 2024
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEventClick}
                >
                    View Tickets
                </Button>
            </Box>
        </Container>
    );
};

export default Events;
