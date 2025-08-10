// src/components/Events.js
import React from 'react';
import {Box, Button, Container, IconButton, Typography} from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; // Import an icon for events
import {useNavigate} from 'react-router-dom';
import './events.css';

const eventsList = [
    {date: '10th August 2025', icon: <EventIcon/>},
    {date: '5th December 2025 (Christmas Event)', icon: <EventIcon/>},
    {date: '10th August 2026 (Next Year)', icon: <EventIcon/>},
];

const Events = () => {
    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate('/tickets');
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom className="upcoming-events">
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
