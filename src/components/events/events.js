// src/components/Events.js
import React from 'react';
import {Box, Button, Container, IconButton, Typography} from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; // Import an icon for events
import {useNavigate} from 'react-router-dom';
import './events.css';

const eventsList = [
    {date: '7th December 2025 (Christmas Event)', icon: <EventIcon/>},
    {date: '8th August 2026 (Next Year)', icon: <EventIcon/>},
];

const Events = () => {
    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate('/tickets');
    };

    return (
        <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography className="upcoming-events" variant="h3" gutterBottom>
                Upcoming Events
            </Typography>
            <Box className="events-container">
                {eventsList.map((event, index) => (
                    <Box className="event-box" key={index}>
                        <IconButton className="event-icon">
                            {event.icon}
                        </IconButton>
                        <Typography className="event-date">
                            {event.date}
                        </Typography>
                        <Button
                            className="view-tickets-button"
                            variant="contained"
                            onClick={handleEventClick}
                        >
                            View Tickets
                        </Button>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Events;
