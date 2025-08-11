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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import './ticket-selection.css';

// Mapping dictionaries
export const pedigreeNameMap = {
    "Any Puppy (6-12 mths)": "any_puppy",
    "Any Junior (12-18 mths)": "any_junior",
    "Any Gundog": "any_gundog",
    "Any Utility": "any_utility",
    "Any Hound": "any_hound",
    "Any Toy": "any_toy",
    "Any Working": "any_working",
    "Any Pastoral": "any_pastoral",
    "Any Terrier": "any_terrier",
    "Any Open": "any_open",
    "Any Veteran": "any_veteran",
    "Junior Handler (U16)": "junior_handler",
};

export const allDogNameMap = {
    "Puppy": "puppy",
    "Prettiest": "prettiest",
    "Best Condition": "best_condition",
    "Best Rescue": "best_rescue",
    "Waggiest Tail": "waggiest_tale",
    "Child's Best Friend": "childs_best_friend",
    "Fancy Dress": "fancy_dress",
    "Handsome": "handsome",
    "Fluffiest": "fluffiest",
    "Scruffiest": "scruffiest",
    "Smooth": "smooth",
    "Looks Like Owner": "looks_like_owner",
    "Obedience": "obedience",
    "Golden Oldie": "golden_oldie",
};

export const pedigreeTickets = [
    { name: "Any Puppy (6-12 mths)", price: 5 },
    { name: "Any Junior (12-18 mths)", price: 5 },
    { name: "Any Gundog", price: 5 },
    { name: "Any Utility", price: 5 },
    { name: "Any Hound", price: 5 },
    { name: "Any Toy", price: 5 },
    { name: "Any Working", price: 5 },
    { name: "Any Pastoral", price: 5 },
    { name: "Any Terrier", price: 5 },
    { name: "Any Open", price: 5 },
    { name: "Any Veteran", price: 5 },
    { name: "Junior Handler (U16)", price: 5 }
];

export const allDogTickets = [
    { name: "Puppy", price: 4 },
    { name: "Prettiest", price: 4 },
    { name: "Best Condition", price: 4 },
    { name: "Best Rescue", price: 4 },
    { name: "Waggiest Tail", price: 4 },
    { name: "Child's Best Friend", price: 4 },
    { name: "Fancy Dress", price: 4 },
    { name: "Handsome", price: 4 },
    { name: "Fluffiest", price: 4 },
    { name: "Scruffiest", price: 4 },
    { name: "Smooth", price: 4 },
    { name: "Looks Like Owner", price: 4 },
    { name: "Obedience", price: 4 },
    { name: "Golden Oldie", price: 4 }
];

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleIncrement = (ticket) => {
        setSelectedTickets((prev) => {
            const current = prev[ticket.name]?.quantity || 0;
            return {
                ...prev,
                [ticket.name]: {
                    quantity: current + 1,
                    price: ticket.price * (current + 1),
                },
            };
        });
    };
    const handleDecrement = (ticket) => {
        setSelectedTickets((prev) => {
            const current = prev[ticket.name]?.quantity || 0;
            if (current <= 0) return prev;
            return {
                ...prev,
                [ticket.name]: {
                    quantity: current - 1,
                    price: ticket.price * (current - 1),
                },
            };
        });
    };

    const handleCheckout = () => {
        let total = 0;
        const pedigree = {};
        const allDog = {};

        Object.entries(selectedTickets).forEach(([name, details]) => {
            if (details.quantity > 0) {
                total += details.price;

                if (pedigreeTickets.find(t => t.name === name)) {
                    const backendKey = pedigreeNameMap[name];
                    if (backendKey) {
                        pedigree[backendKey] = details.quantity;
                    }
                } else if (allDogTickets.find(t => t.name === name)) {
                    const backendKey = allDogNameMap[name];
                    if (backendKey) {
                        allDog[backendKey] = details.quantity;
                    }
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
        <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 }, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h2" gutterBottom className="ticket-selection-title" style={{
                textAlign: 'center',
                fontWeight: 700,
                color: '#2d7a5f',
                marginTop: 40,
                marginBottom: 32,
                letterSpacing: 1
            }}>
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
            <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 6px rgba(45,122,95,0.08)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="pedigree-content" id="pedigree-header">
                    <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600 }}>
                        Pedigree Classes (£5)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="ticket-grid" justifyContent="center">
                        {filteredPedigree.map((ticket) => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.name}>
                                <Card className="ticket-card small-card" style={{
                                    borderRadius: 18,
                                    boxShadow: '0 4px 24px rgba(45,122,95,0.08)',
                                    background: '#fff',
                                    padding: 12
                                }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                        <Typography variant="h6" component="div" sx={{ color: '#2d7a5f', fontWeight: 600, fontSize: '1.05rem', textAlign: 'center' }}>
                                            {ticket.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888', fontWeight: 500, fontSize: '0.95rem', marginBottom: 1 }}>
                                            £{ticket.price}
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Button size="small" onClick={() => handleDecrement(ticket)} style={{ minWidth: 32, padding: 4 }}><RemoveIcon /></Button>
                                            <Typography variant="body1" sx={{ minWidth: 18, textAlign: 'center', fontWeight: 600 }}>{selectedTickets[ticket.name]?.quantity || 0}</Typography>
                                            <Button size="small" onClick={() => handleIncrement(ticket)} style={{ minWidth: 32, padding: 4 }}><AddIcon /></Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* All Dog Section */}
            <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 6px rgba(76,175,80,0.08)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="alldog-content" id="alldog-header">
                    <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 600 }}>
                        All Dog Classes (£4)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="ticket-grid" justifyContent="center">
                        {filteredAllDog.map((ticket) => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.name}>
                                <Card className="ticket-card small-card" style={{
                                    borderRadius: 18,
                                    boxShadow: '0 4px 24px rgba(76,175,80,0.08)',
                                    background: '#fff',
                                    padding: 12
                                }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                        <Typography variant="h6" component="div" sx={{ color: '#388e3c', fontWeight: 600, fontSize: '1.05rem', textAlign: 'center' }}>
                                            {ticket.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#888', fontWeight: 500, fontSize: '0.95rem', marginBottom: 1 }}>
                                            £{ticket.price}
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Button size="small" onClick={() => handleDecrement(ticket)} style={{ minWidth: 32, padding: 4 }}><RemoveIcon /></Button>
                                            <Typography variant="body1" sx={{ minWidth: 18, textAlign: 'center', fontWeight: 600 }}>{selectedTickets[ticket.name]?.quantity || 0}</Typography>
                                            <Button size="small" onClick={() => handleIncrement(ticket)} style={{ minWidth: 32, padding: 4 }}><AddIcon /></Button>
                                        </Box>
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
                    onClick={handleCheckout}
                    className="checkout-button"
                    style={{
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
                    }}
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default TicketSelection;
