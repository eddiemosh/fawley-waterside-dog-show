import React, { useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Box,
    CircularProgress,
    TextField,
    List,
    ListItem,
    ListItemText,
    Collapse,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Ticket definitions (copied from ticket-selection.js)
const pedigreeTickets = [
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
const allDogTickets = [
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
const allTickets = [
    ...pedigreeTickets.map(t => ({ ...t, type: 'Pedigree' })),
    ...allDogTickets.map(t => ({ ...t, type: 'All Dog' })),
];

// Mapping dictionaries
const pedigreeNameMap = {
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
const allDogNameMap = {
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

const Analytics = () => {
    const [openTicket, setOpenTicket] = useState(null);
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleViewAnalytics = async (ticketName, ticketType) => {
        setOpenTicket(ticketName);
        setLoading(true);
        setError(null);
        setSearchTerm('');
        let backendKey = null;
        if (ticketType === 'Pedigree') {
            backendKey = pedigreeNameMap[ticketName];
        } else if (ticketType === 'All Dog') {
            backendKey = allDogNameMap[ticketName];
        }
        if (!backendKey) {
            setError('No backend mapping for this ticket');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`https://api.fawleydogshow.com/analytics/ticket?ticket=${encodeURIComponent(backendKey)}`);
            if (!response.ok) throw new Error('Failed to fetch analytics');
            const data = await response.json();
            setAnalytics(prev => ({ ...prev, [ticketName]: data }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const buyers = analytics[openTicket] || [];
    const filteredBuyers = buyers.filter(buyer =>
        (`${buyer.first_name} ${buyer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const prioritizedTickets = allTickets;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Ticket Analytics</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {prioritizedTickets.map(ticket => (
                    <Card key={ticket.name} sx={{ minWidth: 250, flex: '1 0 250px', position: 'relative' }}>
                        <CardContent>
                            <Typography variant="h6">{ticket.name}</Typography>
                            <Typography variant="body2" color="textSecondary">Type: {ticket.type}</Typography>
                            <Button
                                variant="outlined"
                                sx={{ mt: 2 }}
                                onClick={() => handleViewAnalytics(ticket.name, ticket.type)}
                            >
                                View Analytics
                            </Button>
                            {openTicket === ticket.name && (
                                <Button
                                    size="small"
                                    sx={{ position: 'absolute', top: 8, right: 8, minWidth: 0, padding: 0, zIndex: 2, background: 'white' }}
                                    onClick={() => setOpenTicket(null)}
                                    aria-label="Close analytics"
                                >
                                    <CloseIcon color="warning" fontSize="small" />
                                </Button>
                            )}
                            <Collapse in={openTicket === ticket.name}>
                                <Box mt={2}>
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : error ? (
                                        <Typography color="error">{error}</Typography>
                                    ) : (
                                        <>
                                            <Typography variant="subtitle2" gutterBottom>
                                                {buyers.length} tickets bought
                                            </Typography>
                                            <TextField
                                                label="Search by name"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ mb: 2 }}
                                            />
                                            <List>
                                                {filteredBuyers.length === 0 ? (
                                                    <ListItem>
                                                        <ListItemText primary="No buyers found." />
                                                    </ListItem>
                                                ) : (
                                                    filteredBuyers.map((buyer, idx) => (
                                                        <ListItem key={idx}>
                                                            <ListItemText primary={`${buyer.first_name} ${buyer.last_name}`} />
                                                        </ListItem>
                                                    ))
                                                )}
                                            </List>
                                        </>
                                    )}
                                </Box>
                            </Collapse>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Analytics;
