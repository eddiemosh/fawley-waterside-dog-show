// src/components/TicketSelection.js
import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ticket-selection.css'; // Import custom CSS for additional styling if needed

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
            <Typography variant="h2" gutterBottom className="ticket-selection-title">
                Select Tickets
            </Typography>
            <Grid container spacing={3} className="ticket-grid">
                {ticketOptions.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={ticket}>
                        <Card className="ticket-card">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {ticket}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={ticket}
                                            onChange={handleTicketChange}
                                            color="primary"
                                        />
                                    }
                                    label="Select"
                                    className="ticket-checkbox"
                                />
                            </CardContent>
                            <CardActions className="ticket-actions">
                                {/* You can add more actions if needed */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box className="checkout-button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    className="checkout-button"
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default TicketSelection;
