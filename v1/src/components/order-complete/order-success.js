import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Button, Container, Typography} from '@mui/material';
import './order-confirmation.css';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    useEffect(() => {
        const notifyBackend = async () => {
            if (!orderId) return;

            try {
                const response = await fetch('https://api.fawleydogshow.com/order/success', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({order_id: orderId}),
                });

                if (!response.ok) {
                    console.error("Failed to notify backend about successful order");
                }
            } catch (error) {
                console.error("Error calling backend:", error);
            }
        };

        notifyBackend();
    }, [orderId]);

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
            <Typography variant="body1" className="order-message">
                <br/>
                A confirmation email has been sent.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{marginTop: 3}}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default OrderSuccess;
