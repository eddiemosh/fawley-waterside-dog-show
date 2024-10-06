import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ticket-selection.css'; // Import custom CSS for additional styling

// Define ticket data structure with names and prices
const ticketData = [
    { name: 'General Admission', price: 3 },
    { name: 'VIP Admission', price: 3 },
    { name: 'Student Discount', price: 3 },
    { name: 'Senior Discount', price: 3 },
    // Add more tickets as needed
];

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const navigate = useNavigate();

    // Handle ticket quantity change and calculate total price
    const handleQuantityChange = (event, ticket) => {
        const quantity = event.target.value;
        setSelectedTickets((prev) => ({
            ...prev,
            [ticket.name]: {
                quantity,
                price: ticket.price * quantity,
            },
        }));
    };

    const handleCheckout = () => {
        // Calculate total price of selected tickets
        const totalPrice = Object.values(selectedTickets).reduce((sum, ticket) => sum + ticket.price, 0);

        // Navigate to the payment page and pass the total amount
        navigate('/payments', { state: { totalAmount: totalPrice * 100 } }); // Amount in cents for Stripe
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom className="ticket-selection-title">
                Select Tickets
            </Typography>
            <Grid container spacing={3} className="ticket-grid">
                {ticketData.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={ticket.name}>
                        <Card className="ticket-card">
                            <CardContent>
                                <Typography variant="h6" component="div" sx={{marginTop: '-10px'}}>
                                    {ticket.name}
                                </Typography>
                                <Grid container alignItems="center" spacing={2} className="ticket-select-container">
                                    <Grid item xs={4}>
                                        <Typography variant="body1" className="quantity-text">Quantity:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl className="dropdown">
                                            <Select
                                                value={selectedTickets[ticket.name]?.quantity || 0}
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
                                {/* Price under quantity, aligned to the left */}
                                <Grid container alignItems="center" spacing={2} className="ticket-price-container">
                                    <Grid item xs={4}>
                                        <Typography variant="body1" className="price-text">Price:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2" className="price-amount">
                                            £{ticket.price}
                                        </Typography>
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
