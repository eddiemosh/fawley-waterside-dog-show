// src/components/orders/OrderSuccess.js
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import './order-confirmation.css';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <Container className="order-page">
            <Typography variant="h4" className="order-title" gutterBottom>
                🎉 Thank you for your order!
            </Typography>
            <Typography variant="body1" className="order-message">
                Your payment was successful. Your order ID is:
            </Typography>
            <Typography variant="h6" className="order-id">
                {orderId}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ marginTop: 3 }}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default OrderSuccess;
