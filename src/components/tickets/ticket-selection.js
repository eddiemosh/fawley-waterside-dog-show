import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import './ticket-selection.css';

const pedigreeTickets = [
    { name: 'Any Puppy (6-12 mths)', price: 5 },
    { name: 'Any Junior (12-18 mths)', price: 5 },
    { name: 'Any Gundog', price: 5 },
    { name: 'Any Utility', price: 5 },
    { name: 'Any Hound', price: 5 },
    { name: 'Any Toy', price: 5 },
    { name: 'Any Working', price: 5 },
    { name: 'Any Pastoral', price: 5 },
    { name: 'Any Terrier', price: 5 },
    { name: 'Any Open', price: 5 },
    { name: 'Any Veteran', price: 5 },
    { name: 'Junior Handler (U16)', price: 5 },
];

const allDogTickets = [
    { name: 'Puppy', price: 4 },
    { name: 'Prettiest', price: 4 },
    { name: 'Best Condition', price: 4 },
    { name: 'Best Rescue', price: 4 },
    { name: 'Waggiest Tail', price: 4 },
    { name: "Child's Best Friend", price: 4 },
    { name: 'Fancy Dress', price: 4 },
    { name: 'Handsome', price: 4 },
    { name: 'Fluffiest', price: 4 },
    { name: 'Scruffiest', price: 4 },
    { name: 'Smooth', price: 4 },
    { name: 'Looks Like Owner', price: 4 },
    { name: 'Obedience', price: 4 },
    { name: 'Golden Oldie', price: 4 },
];

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleQuantityChange = (event, ticket) => {
        const quantity = parseInt(event.target.value);
        setSelectedTickets((prev) => ({
            ...prev,
            [ticket.name]: {
                quantity,
                price: ticket.price * quantity,
            },
        }));
    };

    const handleCheckout = () => {
        let total = 0;
        const pedigree = {};
        const allDog = {};

        Object.entries(selectedTickets).forEach(([name, details]) => {
            if (details.quantity > 0) {
                total += details.price;
                if (pedigreeTickets.find(t => t.name === name)) {
                    pedigree[name] = details.quantity;
                } else if (allDogTickets.find(t => t.name === name)) {
                    allDog[name] = details.quantity;
                }
            }
        });

        navigate('/payments', {
            state: {
                totalAmount: total * 100, // in pence
                pedigreeTickets: pedigree,
                allDogTickets: allDog
            }
        });
    };

    const allTickets = [
        ...pedigreeTickets.map(t => ({ ...t, section: 'Pedigree' })),
        ...allDogTickets.map(t => ({ ...t, section: 'All Dog' })),
    ];

    const filteredTickets = allTickets.filter(ticket =>
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPedigree = filteredTickets.filter(t => t.section === 'Pedigree');
    const filteredAllDog = filteredTickets.filter(t => t.section === 'All Dog');

    return (
        <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography variant="h2" gutterBottom className="ticket-selection-title">
                Select Tickets
            </Typography>
            <Box mb={3} display="flex" justifyContent="center">
                <TextField
                    label="Search tickets"
                    variant="outlined"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    sx={{ width: { xs: '90%', sm: '350px' } }}
                />
            </Box>

            {/* Pedigree Section */}
            <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="pedigree-content" id="pedigree-header">
                    <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 500 }}>
                        Pedigree Classes (£5)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="ticket-grid" justifyContent="center">
                        {filteredPedigree.map((ticket) => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.name}>
                                <Card className="ticket-card small-card">
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ marginTop: '-10px' }}>
                                            {ticket.name}
                                        </Typography>
                                        <Grid container alignItems="center" spacing={2} className="ticket-select-container">
                                            <Grid item xs={5}>
                                                <Typography variant="body1" className="quantity-text">Quantity:</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <FormControl className="dropdown">
                                                    <Select
                                                        value={selectedTickets[ticket.name]?.quantity || 0}
                                                        onChange={(event) => handleQuantityChange(event, ticket)}
                                                        className="ticket-select"
                                                    >
                                                        {[...Array(10).keys()].map((quantity) => (
                                                            <MenuItem key={quantity} value={quantity}>
                                                                {quantity}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" spacing={2} className="ticket-price-container">
                                            <Grid item xs={5}>
                                                <Typography variant="body1" className="price-text">Price:</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="body2" className="price-amount">
                                                    £{ticket.price}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* All Dog Section */}
            <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="alldog-content" id="alldog-header">
                    <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 500 }}>
                        All Dog Classes (£4)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="ticket-grid" justifyContent="center">
                        {filteredAllDog.map((ticket) => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.name}>
                                <Card className="ticket-card small-card">
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ marginTop: '-10px' }}>
                                            {ticket.name}
                                        </Typography>
                                        <Grid container alignItems="center" spacing={2} className="ticket-select-container">
                                            <Grid item xs={5}>
                                                <Typography variant="body1" className="quantity-text">Quantity:</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <FormControl className="dropdown">
                                                    <Select
                                                        value={selectedTickets[ticket.name]?.quantity || 0}
                                                        onChange={(event) => handleQuantityChange(event, ticket)}
                                                        className="ticket-select"
                                                    >
                                                        {[...Array(10).keys()].map((quantity) => (
                                                            <MenuItem key={quantity} value={quantity}>
                                                                {quantity}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems="center" spacing={2} className="ticket-price-container">
                                            <Grid item xs={5}>
                                                <Typography variant="body1" className="price-text">Price:</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="body2" className="price-amount">
                                                    £{ticket.price}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Box className="checkout-button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    className="checkout-button"
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default TicketSelection;
