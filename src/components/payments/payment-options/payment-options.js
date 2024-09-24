import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentOptions = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Fetch the client secret from Python Flask backend when the component loads
    useEffect(() => {
        // Change this URL to point to your Python Flask backend
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 1000 }), // e.g., $10.00, amount in cents
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => console.error('Error fetching client secret:', error));
    }, []);

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
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <form onSubmit={handleCompletePayment}>
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
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={!stripe}>
                        Complete Payment
                    </Button>
                </Box>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {paymentSuccess && <Typography color="primary">Payment Successful!</Typography>}
            </form>
        </Container>
    );
};

export default PaymentOptions;
