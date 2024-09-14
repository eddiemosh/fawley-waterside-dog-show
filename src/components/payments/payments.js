// src/components/Payments.js
import React from 'react';
import {Container, Typography, Box, Button, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const paymentOptions = ['Credit Card', 'PayPal', 'Bank Transfer'];

const Payments = () => {
    const [selectedPayment, setSelectedPayment] = React.useState('');
    const navigate = useNavigate();

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handlePaymentSubmit = () => {
        // Handle payment processing
        alert('Payment processed');
        navigate('/fawley-waterside-dog-show/');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Payment Options
            </Typography>
            <Box>
                <RadioGroup value={selectedPayment} onChange={handlePaymentChange}>
                    {paymentOptions.map((option) => (
                        <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio/>}
                            label={option}
                        />
                    ))}
                </RadioGroup>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handlePaymentSubmit}
                style={{marginTop: '20px'}}
            >
                Confirm Payment
            </Button>
        </Container>
    );
};

export default Payments;
