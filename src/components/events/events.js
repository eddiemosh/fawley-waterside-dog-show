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
            <Typography variant="h3" gutterBottom style={{
                textAlign: 'center',
                fontWeight: 700,
                color: '#2d7a5f',
                marginTop: 40,
                marginBottom: 32,
                letterSpacing: 1
            }}>
                Upcoming Events
            </Typography>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
                {eventsList.map((event, index) => (
                    <Box key={index} style={{
                        background: '#fff',
                        borderRadius: 18,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        padding: '32px 24px',
                        minWidth: 260,
                        maxWidth: 400,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16
                    }}>
                        <IconButton style={{
                            background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
                            color: '#fff',
                            fontSize: 32,
                            width: 56,
                            height: 56,
                            marginBottom: 8
                        }}>
                            {event.icon}
                        </IconButton>
                        <Typography style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2d7a5f', marginBottom: 8, textAlign: 'center' }}>
                            {event.date}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleEventClick}
                            style={{
                                fontSize: '1.1rem',
                                padding: '10px 32px',
                                borderRadius: 18,
                                background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
                                color: '#fff',
                                fontWeight: 600,
                                letterSpacing: 1,
                                border: 'none',
                                minWidth: 140,
                                boxShadow: '0 2px 8px rgba(76,175,80,0.08)'
                            }}
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
