// src/components/orders/OrderFailure.js
import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {Button, Container, Typography} from '@mui/material';
import './order-confirmation.css';

const OrderFailure = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <Container className="order-page">
            <Typography variant="h4" className="order-title" gutterBottom>
                😞 Payment Failed
            </Typography>

            <Typography variant="body1" className="order-message">
                Unfortunately, your payment didn’t go through.
            </Typography>

            <Typography variant="body1" className="order-message">
                <br/>
                Please reach out to the event organisers
                <br/>
                or
                <br/>
                send an email with your Order ID to:
                <strong> hardyedward18@gmail.com</strong>
            </Typography>

            <Typography variant="body2" className="order-id" sx={{marginTop: 2}}>
                Order ID: {orderId}
            </Typography>

            <Button
                variant="contained"
                color="error"
                href="/tickets"
                sx={{marginTop: 3}}
            >
                Try Again
            </Button>
        </Container>
    );
};

export default OrderFailure;
