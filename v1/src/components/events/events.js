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
        <Container maxWidth="sm"
                   sx={{
                       minHeight: '100vh',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'flex-start',
                       alignItems: 'center',
                       pt: { xs: 2, sm: 6 },
                       pb: { xs: 2, sm: 6 }
                   }}>
            <Box sx={{
                background: '#fff',
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(45,122,95,0.08)',
                p: { xs: 2, sm: 4 },
                mb: { xs: 2, sm: 4 },
                width: '100%',
                maxWidth: 520,
                textAlign: 'center',
            }}>
                <Typography variant="h5" sx={{
                    color: '#2d7a5f',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: '1.5rem', sm: '2.2rem' },
                }}>
                    Upcoming Events
                </Typography>
                <Typography variant="body1" sx={{ color: '#444', mb: 2 }}>
                    Join us for our next dog show events! All dogs and people welcome.
                </Typography>
            </Box>
            <Box className="events-container" sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 2, sm: 4 },
                width: '100%',
                mb: 2
            }}>
                {eventsList.map((event, index) => (
                    <Box key={index} sx={{
                        background: '#fff',
                        borderRadius: 3,
                        boxShadow: '0 2px 12px rgba(45,122,95,0.10)',
                        p: { xs: 2, sm: 3 },
                        minWidth: { xs: 180, sm: 240 },
                        maxWidth: 320,
                        flex: '1 1 220px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: { xs: 2, sm: 3 },
                    }}>
                        <IconButton sx={{
                            fontSize: { xs: '2.2rem', sm: '2.8rem' },
                            color: '#2d7a5f',
                            background: 'rgba(45,122,95,0.08)',
                            mb: 1,
                        }}>
                            {event.icon}
                        </IconButton>
                        <Typography sx={{
                            fontSize: { xs: '1.1rem', sm: '1.3rem' },
                            color: '#2d7a5f',
                            fontWeight: 600,
                            mb: 2,
                            textAlign: 'center',
                        }}>
                            {event.date}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
                                color: '#fff',
                                fontWeight: 600,
                                borderRadius: 2,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                px: 3,
                                py: 1,
                                boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
                                letterSpacing: 1,
                                mt: 1,
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #256c53 0%, #388e3c 100%)',
                                }
                            }}
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
