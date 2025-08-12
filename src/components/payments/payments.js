// src/components/Payments.js
import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Box,
    MenuItem
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './payments.css'; // Import custom CSS for additional styling if needed
import { useLocation } from "react-router-dom";

const Payments = () => {
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');
    // Extract totalAmount from location state
    const {
        totalAmount = 0,
        pedigreeTickets = {},
        allDogTickets = {},
    } = location.state || {};
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [dogs, setDogs] = useState([{ name: '', date_of_birth: '', sex: '' }]);

    const handleUserInfoChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleDogChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDogs = dogs.map((dog, i) =>
            i === index ? { ...dog, [name]: value } : dog
        );
        setDogs(updatedDogs);
    };

    const handleAddDog = () => {
        setDogs([...dogs, { name: '', date_of_birth: '', sex: '' }]);
    };

    const handleRemoveDog = (index) => {
        const updatedDogs = dogs.filter((_, i) => i !== index);
        setDogs(updatedDogs);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error
        console.log('User Info:', userInfo);
        console.log('Dogs Info:', dogs);
        console.log('Total Amount:', totalAmount);
        console.log("pedigree:", pedigreeTickets);
        console.log("all_dogs:", allDogTickets);
        // Convert array of dogs into a dictionary
        const doggieDict = dogs.reduce((acc, dog, index) => {
            acc[`dog_${index + 1}`] = dog;
            return acc;
        }, {});

        try {
            const queryParams = new URLSearchParams({
                first_name: userInfo.firstName,
                last_name: userInfo.lastName,
                email_address: userInfo.email,
            });

            const response = await fetch(`https://api.fawleydogshow.com/payment/create?${queryParams.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doggie_info: doggieDict,
                    pedigree_tickets: pedigreeTickets,
                    all_dog_tickets: allDogTickets,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else {
                setErrorMessage( 'Something went wrong. Please try again. Error: ' + data.detail);
                console.error('Failed to get redirect URL:', data);
            }
        } catch (error) {
            setErrorMessage('Payment request failed. Please check your input and try again.');
            console.error('Checkout request failed:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom className="payment-title" style={{ color: '#2d7a5f', fontWeight: 700, textAlign: 'center', marginTop: 40, marginBottom: 32, letterSpacing: 1 }}>
                Payment Information
            </Typography>
            <form onSubmit={handleSubmit} className="payment-form" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(45,122,95,0.06)', padding: 28, marginBottom: 24 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email (recommended)"
                            name="email"
                            type="email"
                            value={userInfo.email}
                            onChange={handleUserInfoChange}
                            fullWidth
                            helperText="Recommended for order confirmation, but not required."
                        />
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom className="doggie-info-title" style={{ color: '#2d7a5f', fontWeight: 600, textAlign: 'center', marginBottom: 18 }}>
                        Doggie Info
                    </Typography>
                    {dogs.map((dog, index) => (
                        <Grid container spacing={2} key={index} alignItems="center" className="dog-info-container" style={{ marginBottom: 8, background: '#f8f9fa', borderRadius: 10, padding: 10 }}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label={`Dog ${index + 1} Name`}
                                    name="name"
                                    value={dog.name}
                                    onChange={(event) => handleDogChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Date of Birth (Year and Month)"
                                    name="date_of_birth"
                                    type="month"
                                    InputLabelProps={{ shrink: true }}
                                    value={dog.date_of_birth}
                                    onChange={(event) => handleDogChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    select
                                    label="Sex"
                                    name="sex"
                                    value={dog.sex}
                                    onChange={(event) => handleDogChange(index, event)}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={1} style={{ textAlign: 'center' }}>
                                <IconButton onClick={() => handleRemoveDog(index)} disabled={dogs.length === 1}>
                                    <Remove />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Box mt={2} textAlign="center">
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={handleAddDog}
                        style={{ borderRadius: 10, color: '#2d7a5f', borderColor: '#2d7a5f', fontWeight: 600 }}
                    >
                        Add Another Dog
                    </Button>
                </Box>
                <Box mt={4} textAlign="center">
                    <Button type="submit" variant="contained" className="checkout-button" style={{
                        fontSize: '1.1rem',
                        borderRadius: 18,
                        padding: '12px 32px',
                        background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        letterSpacing: 1,
                        border: 'none',
                        minWidth: 140,
                        boxShadow: '0 2px 8px rgba(76,175,80,0.08)'
                    }}>
                        Submit Payment
                    </Button>
                </Box>
            </form>
            {errorMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
            )}
        </Container>
    );
};

export default Payments;
