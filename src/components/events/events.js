// src/components/Events.js
import React from 'react';
import {Container, Typography, Button, Box, Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';  // Event icon for each event
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
            <Grid container spacing={2} justifyContent="center">
                {/* First Event */}
                <Grid item xs={12} sm={6} md={4}>
                    <Box className="event-box">
                        <EventIcon style={{fontSize: 50}}/> {/* Event icon */}
                        <Typography variant="h6" className="event-title">
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
                </Grid>

                {/* Add more events as needed */}
                <Grid item xs={12} sm={6} md={4}>
                    <Box className="event-box">
                        <EventIcon style={{fontSize: 50}}/>
                        <Typography variant="h6" className="event-title">
                            15th January 2025
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEventClick}
                        >
                            View Tickets
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Events;
