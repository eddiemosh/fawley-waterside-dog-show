import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Typography, Button } from '@mui/material';

const stripePromise = loadStripe("pk_test_...");

const PaymentOptions = () => {
    const location = useLocation();
    const { totalAmount } = location.state || { totalAmount: 300 };

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const response = await fetch('https://api.fawleydogshow.com/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalAmount }),
        });

        const data = await response.json();

        if (data.url) {
            window.location.href = data.url;  // Redirect directly using the URL
        } else {
            console.error('Failed to get redirect URL:', data);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ marginTop: 2, marginBottom: 4 }}>
                Redirecting to Stripe Checkout
            </Typography>
            <Button
                onClick={handleCheckout}
                variant="contained"
                color="primary"
                size="large"
            >
                Continue to Payment
            </Button>
        </Container>
    );
};

export default PaymentOptions;
