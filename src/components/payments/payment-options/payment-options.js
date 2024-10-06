import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to retrieve passed state
import { Container, Typography, Button, Box } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentOptions = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const location = useLocation();
    const { totalAmount } = location.state || { totalAmount: 0 }; // Get the totalAmount passed from TicketSelection

    // Fetch the client secret from Python Flask backend when the component loads
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalAmount }), // Send correct amount to backend
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => console.error('Error fetching client secret:', error));
    }, [totalAmount]);

    const handleCompletePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setPaymentSuccess(true);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{marginTop: 2, marginBottom: 7}}>
                Payment Details
            </Typography>
            <Box
                component="form"
                onSubmit={handleCompletePayment}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ gap: 3, maxWidth: 200, margin: '0 auto' }}
            >
                <Box sx={{ width: '180%' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={!stripe}>
                    Complete Payment
                </Button>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {paymentSuccess && <Typography color="primary">Payment Successful!</Typography>}
            </Box>
        </Container>
    );
};

export default PaymentOptions;
