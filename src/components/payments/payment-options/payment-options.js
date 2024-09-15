// src/components/PaymentOptions.js
import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const PaymentOptions = () => {
    const handleCompletePayment = () => {
        // Payment logic here (integration with Stripe, PayPal, etc.)
        console.log("Payment Completed");
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <form onSubmit={handleCompletePayment}>
                <TextField
                    label="Credit Card Number"
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Expiration Date"
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="CVC"
                    fullWidth
                    required
                    margin="normal"
                />
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Complete Payment
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PaymentOptions;
