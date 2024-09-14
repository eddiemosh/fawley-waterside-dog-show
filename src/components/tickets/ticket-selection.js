// src/components/TicketSelection.js
import React, { useState } from 'react';
import { Container, Typography, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ticketOptions = Array.from({ length: 20 }, (_, index) => `Ticket Type ${index + 1}`);

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const navigate = useNavigate();

    const handleTicketChange = (event) => {
        const ticket = event.target.value;
        setSelectedTickets((prev) =>
            prev.includes(ticket)
                ? prev.filter((t) => t !== ticket)
                : [...prev, ticket]
        );
    };

    const handleCheckout = () => {
        navigate('/payments');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Select Tickets
            </Typography>
            <Box>
                {ticketOptions.map((ticket) => (
                    <FormControlLabel
                        key={ticket}
                        control={
                            <Checkbox
                                value={ticket}
                                onChange={handleTicketChange}
                                color="primary"
                            />
                        }
                        label={ticket}
                    />
                ))}
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                style={{ marginTop: '20px' }}
            >
                Checkout
            </Button>
        </Container>
    );
};

export default TicketSelection;
