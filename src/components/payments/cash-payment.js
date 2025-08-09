import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    Box,
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { pedigreeTickets, allDogTickets, pedigreeNameMap, allDogNameMap } from '../tickets/ticket-selection';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const allTickets = [
    ...pedigreeTickets.map(t => ({ ...t, section: 'Pedigree' })),
    ...allDogTickets.map(t => ({ ...t, section: 'All Dog' })),
];

const CashPayment = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [dogs, setDogs] = useState([{ name: '', date_of_birth: '', sex: '' }]);
    const [selectedTickets, setSelectedTickets] = useState({});
    const [cashAmount, setCashAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [ticketSearch, setTicketSearch] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleUserInfoChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleDogChange = (index, event) => {
        const { name, value } = event.target;
        setDogs(dogs => dogs.map((dog, i) => i === index ? { ...dog, [name]: value } : dog));
    };

    const handleAddDog = () => setDogs([...dogs, { name: '', date_of_birth: '', sex: '' }]);
    const handleRemoveDog = (index) => setDogs(dogs => dogs.filter((_, i) => i !== index));

    const handleTicketChange = (event, ticket) => {
        const quantity = parseInt(event.target.value);
        setSelectedTickets((prev) => ({
            ...prev,
            [ticket.name]: { quantity, price: ticket.price * quantity },
        }));
    };

    const handleCashAmountChange = (event) => {
        setCashAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        let total = 0;
        const pedigree = {};
        const allDog = {};
        Object.entries(selectedTickets).forEach(([name, details]) => {
            if (details.quantity > 0) {
                total += details.price;
                if (pedigreeTickets.find(t => t.name === name)) {
                    const backendKey = pedigreeNameMap[name];
                    if (backendKey) pedigree[backendKey] = details.quantity;
                } else if (allDogTickets.find(t => t.name === name)) {
                    const backendKey = allDogNameMap[name];
                    if (backendKey) allDog[backendKey] = details.quantity;
                }
            }
        });
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
                cash_amount: cashAmount,
            });

            const response = await fetch(`https://api.fawleydogshow.com/payment/cash?${queryParams.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doggie_info: doggieDict,
                    pedigree_tickets: pedigree,
                    all_dog_tickets: allDog,
                }),
            });
            if (!response.ok) throw new Error('Failed to record cash payment');
            const data = await response.json();
            setSnackbarMsg(`${data.message} Order ID: ${data.order_id}`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setSuccessMessage('');
        } catch (err) {
            setSnackbarMsg(err.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setErrorMessage(err.message);
        }
    };

    return (
        <Container>
            <Box mt={2} mb={4}>
                <Typography variant="h4" gutterBottom>Record Cash Payment</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleUserInfoChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={userInfo.email}
                            onChange={handleUserInfoChange}
                            fullWidth
                            helperText="Recommended for order confirmation, but not required."
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Cash Amount (£)"
                            name="cashAmount"
                            type="number"
                            value={cashAmount}
                            onChange={handleCashAmountChange}
                            fullWidth
                            required
                            inputProps={{ min: 0, step: '0.01' }}
                        />
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>Doggie Info</Typography>
                    {dogs.map((dog, index) => (
                        <Grid container spacing={2} key={index} alignItems="center">
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label={`Dog ${index + 1} Name`}
                                    name="name"
                                    value={dog.name}
                                    onChange={e => handleDogChange(index, e)}
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
                                    onChange={e => handleDogChange(index, e)}
                                    fullWidth
                                    required
                                    sx={{ minHeight: { xs: 56, sm: 56 }, '.MuiInputBase-root': { minHeight: { xs: 56, sm: 56 } } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    select
                                    label="Sex"
                                    name="sex"
                                    value={dog.sex}
                                    onChange={e => handleDogChange(index, e)}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <IconButton onClick={() => handleRemoveDog(index)} disabled={dogs.length === 1}>
                                    <Remove />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Box mt={2} textAlign="center">
                        <Button variant="outlined" startIcon={<Add />} onClick={handleAddDog}>
                            Add Another Dog
                        </Button>
                    </Box>
                </Box>
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>Tickets</Typography>
                    <Box mb={2} display="flex" justifyContent="flex-start">
                        <TextField
                            label="Search tickets"
                            variant="outlined"
                            value={ticketSearch}
                            onChange={e => setTicketSearch(e.target.value)}
                            sx={{ width: { xs: '90%', sm: '350px' } }}
                        />
                    </Box>
                    <Grid container spacing={2}>
                        {allTickets.filter(ticket => ticket.name.toLowerCase().includes(ticketSearch.toLowerCase())).map(ticket => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.name}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{ticket.name}</Typography>
                                        <Typography variant="body2">Section: {ticket.section}</Typography>
                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                            <Select
                                                value={selectedTickets[ticket.name]?.quantity || 0}
                                                onChange={e => handleTicketChange(e, ticket)}
                                            >
                                                {[...Array(10).keys()].map(q => (
                                                    <MenuItem key={q} value={q}>{q}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Typography variant="body2" sx={{ mt: 1 }}>Price: £{ticket.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={4} textAlign="center">
                    <Button type="submit" variant="contained" color="primary">
                        Record Cash Payment
                    </Button>
                </Box>
                {errorMessage && (
                    <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>
                )}
                {successMessage && (
                    <Typography color="primary" sx={{ mt: 2 }}>{successMessage}</Typography>
                )}
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMsg}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default CashPayment;
