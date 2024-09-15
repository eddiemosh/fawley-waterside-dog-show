// src/components/Payments.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './payments.css'; // Import custom CSS for additional styling if needed
import { useNavigate } from "react-router-dom";

const Payments = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [dogs, setDogs] = useState([{ name: '', dob: '', sex: '' }]);

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
        setDogs([...dogs, { name: '', dob: '', sex: '' }]);
    };

    const handleRemoveDog = (index) => {
        const updatedDogs = dogs.filter((_, i) => i !== index);
        setDogs(updatedDogs);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('User Info:', userInfo);
        console.log('Dogs Info:', dogs);
        navigate('/payment-options');
        // Handle the submission logic here
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom className="payment-title">
                Payment Information
            </Typography>
            <form onSubmit={handleSubmit} className="payment-form">
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
                            label="Email"
                            name="email"
                            type="email"
                            value={userInfo.email}
                            onChange={handleUserInfoChange}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Typography variant="h5" gutterBottom className="doggie-info-title">
                        Doggie Info
                    </Typography>
                    {dogs.map((dog, index) => (
                        <Grid container spacing={2} key={index} alignItems="center" className="dog-info-container">
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
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={dog.dob}
                                    onChange={(event) => handleDogChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="Sex"
                                    name="sex"
                                    value={dog.sex}
                                    onChange={(event) => handleDogChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={1}>
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
                    >
                        Add Another Dog
                    </Button>
                </Box>

                <Box mt={4} textAlign="center">
                    <Button type="submit" variant="contained" color="primary" className="submit-button">
                        Submit Payment
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default Payments;
