// src/components/Events.js
import React from 'react';
import { Container, Typography, Button, Box, IconButton } from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; // Import an icon for events
import { useNavigate } from 'react-router-dom';
import './events.css';

const eventsList = [
    { date: '1st December 2024', icon: <EventIcon /> },
    { date: '15th December 2024', icon: <EventIcon /> },
    { date: '10th January 2025', icon: <EventIcon /> },
    { date: '20th February 2025', icon: <EventIcon /> },
    { date: '5th March 2025', icon: <EventIcon /> }
];

const Events = () => {
    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate('/fawley-waterside-dog-show/tickets');
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom className="upcoming-events">
                Upcoming Events
            </Typography>
            <Box className="events-container">
                {eventsList.map((event, index) => (
                    <Box key={index} className="event-box">
                        <IconButton className="event-icon">
                            {event.icon}
                        </IconButton>
                        <Typography className="event-date">
                            {event.date}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className="view-tickets-button"
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
