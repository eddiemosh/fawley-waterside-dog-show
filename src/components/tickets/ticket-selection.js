// src/components/TicketSelection.js
import React, { useState } from 'react';
import {
    Container, Typography, Grid, Card, CardContent, FormControl, Select, MenuItem, Button, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ticket-selection.css'; // Import custom CSS for additional styling

const ticketOptions = Array.from({ length: 200 }, (_, index) => `Ticket Type ${index + 1}`);

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const navigate = useNavigate();

    const handleQuantityChange = (event, ticket) => {
        const quantity = event.target.value;
        setSelectedTickets((prev) => ({
            ...prev,
            [ticket]: quantity,
        }));
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
                                <Grid container alignItems="center" spacing={2} className="ticket-select-container">
                                    <Grid item xs={4}>
                                        <Typography variant="body1" className="quantity-text">Quantity:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className="dropdown">
                                            <Select
                                                value={selectedTickets[ticket] || 0}
                                                onChange={(event) => handleQuantityChange(event, ticket)}
                                                className="ticket-select"
                                            >
                                                {[...Array(10).keys()].map((quantity) => (
                                                    <MenuItem key={quantity} value={quantity}>
                                                        {quantity}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
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
