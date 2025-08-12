import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Collapse,
    Container,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Ticket definitions (copied from ticket-selection.js)
const pedigreeTickets = [
    {name: "Any Puppy (6-12 mths)", price: 5},
    {name: "Any Junior (12-18 mths)", price: 5},
    {name: "Any Gundog", price: 5},
    {name: "Any Utility", price: 5},
    {name: "Any Hound", price: 5},
    {name: "Any Toy", price: 5},
    {name: "Any Working", price: 5},
    {name: "Any Pastoral", price: 5},
    {name: "Any Terrier", price: 5},
    {name: "Any Open", price: 5},
    {name: "Any Veteran", price: 5},
    {name: "Junior Handler (U16)", price: 5}
];
const allDogTickets = [
    {name: "Puppy", price: 4},
    {name: "Prettiest", price: 4},
    {name: "Best Condition", price: 4},
    {name: "Best Rescue", price: 4},
    {name: "Waggiest Tail", price: 4},
    {name: "Child's Best Friend", price: 4},
    {name: "Fancy Dress", price: 4},
    {name: "Handsome", price: 4},
    {name: "Fluffiest", price: 4},
    {name: "Scruffiest", price: 4},
    {name: "Smooth", price: 4},
    {name: "Looks Like Owner", price: 4},
    {name: "Obedience", price: 4},
    {name: "Golden Oldie", price: 4}
];
const allTickets = [
    ...pedigreeTickets.map(t => ({...t, type: 'Pedigree'})),
    ...allDogTickets.map(t => ({...t, type: 'All Dog'})),
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
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [openTicket, setOpenTicket] = useState(null);
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderData, setOrderData] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderExpanded, setOrderExpanded] = useState(false);
    const [ticketExpanded, setTicketExpanded] = useState(false);
    const [orderSearch, setOrderSearch] = useState('');
    const [donationExpanded, setDonationExpanded] = useState(false);
    const [donationData, setDonationData] = useState([]);
    const [donationLoading, setDonationLoading] = useState(false);
    const [donationError, setDonationError] = useState(null);
    const [donationSearch, setDonationSearch] = useState("");

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        const allowed = ["ed", "ian", "sally"];
        if (allowed.includes(username.trim().toLowerCase())) {
            setAuth(true);
            setAuthError('');
        } else {
            setAuthError('Invalid username');
        }
    };

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
            setAnalytics(prev => ({...prev, [ticketName]: data}));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderAccordion = (event, expanded) => {
        setOrderExpanded(expanded);
        if (expanded && orderData.length === 0 && !orderLoading) {
            setOrderLoading(true);
            setOrderError(null);
            fetch('https://api.fawleydogshow.com/order')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch order analytics');
                    return res.json();
                })
                .then(data => setOrderData(data))
                .catch(e => setOrderError(e.message))
                .finally(() => setOrderLoading(false));
        }
    };
    const handleTicketAccordion = (event, expanded) => {
        setTicketExpanded(expanded);
    };
    const handleDonationAccordion = (event, expanded) => {
        setDonationExpanded(expanded);
        if (expanded && donationData.length === 0 && !donationLoading) {
            setDonationLoading(true);
            setDonationError(null);
            fetch('https://api.fawleydogshow.com/donation')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch donation analytics');
                    return res.json();
                })
                .then(data => setDonationData(data))
                .catch(e => setDonationError(e.message))
                .finally(() => setDonationLoading(false));
        }
    };

    const buyers = analytics[openTicket] || [];
    const filteredBuyers = buyers.filter(buyer =>
        (`${buyer.first_name} ${buyer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const prioritizedTickets = allTickets;

    if (!auth) {
        return (
            <Container maxWidth="xs" sx={{mt: 8}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 4,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        background: '#fff',
                    }}
                >
                    <Typography variant="h5" gutterBottom>Analytics Login</Typography>
                    <form onSubmit={handleAuthSubmit} style={{width: '100%'}}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoFocus
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        {authError && (
                            <Typography color="error" sx={{mt: 1}}>{authError}</Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                            Login
                        </Button>
                    </form>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Accordion expanded={ticketExpanded} onChange={handleTicketAccordion} sx={{mt: 3, mb: 2}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">Ticket Analytics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={2} display="flex" justifyContent="flex-start">
                        <TextField
                            label="Search tickets"
                            variant="outlined"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            sx={{width: {xs: '90%', sm: '350px'}}}
                        />
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                        {prioritizedTickets
                            .filter(ticket => ticket.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(ticket => (
                                <Card key={ticket.name} sx={{minWidth: 250, flex: '1 0 250px', position: 'relative'}}>
                                    <CardContent>
                                        <Typography variant="h6">{ticket.name}</Typography>
                                        <Typography variant="body2"
                                                    color="textSecondary">Type: {ticket.type}</Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{mt: 2}}
                                            onClick={() => handleViewAnalytics(ticket.name, ticket.type)}
                                        >
                                            View Analytics
                                        </Button>
                                        {openTicket === ticket.name && (
                                            <Button
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    minWidth: 0,
                                                    padding: 0,
                                                    zIndex: 2,
                                                    background: 'white'
                                                }}
                                                onClick={() => setOpenTicket(null)}
                                                aria-label="Close analytics"
                                            >
                                                <CloseIcon fontSize="small"/>
                                            </Button>
                                        )}
                                        <Collapse in={openTicket === ticket.name}>
                                            <Box mt={2}>
                                                {loading ? (
                                                    <CircularProgress size={24}/>
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
                                                                        <SearchIcon/>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                            sx={{mb: 2}}
                                                        />
                                                        <List>
                                                            {filteredBuyers.length === 0 ? (
                                                                <ListItem>
                                                                    <ListItemText primary="No buyers found."/>
                                                                </ListItem>
                                                            ) : (
                                                                filteredBuyers.map((buyer, idx) => (
                                                                    <ListItem key={idx}>
                                                                        <ListItemText
                                                                            primary={`${buyer.first_name} ${buyer.last_name}`}/>
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
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={orderExpanded} onChange={handleOrderAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">Order Analytics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={2} display="flex" justifyContent="flex-start">
                        <TextField
                            label="Search by Order ID"
                            variant="outlined"
                            value={orderSearch}
                            onChange={e => setOrderSearch(e.target.value)}
                            sx={{width: {xs: '90%', sm: '350px'}}}
                        />
                    </Box>
                    {orderLoading ? (
                        <CircularProgress/>
                    ) : orderError ? (
                        <Typography color="error">{orderError}</Typography>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={3}>
                            {orderData.length === 0 ? (
                                <Typography>No orders found.</Typography>
                            ) : (
                                orderData
                                    .filter(order => order.order_id.toLowerCase().includes(orderSearch.toLowerCase()))
                                    .map(order => (
                                        <Card key={order.order_id} sx={{width: '100%', p: 2, background: '#f9f9f9'}}>
                                            <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1}}>Order
                                                ID: {order.order_id}</Typography>
                                            <Typography
                                                variant="body2"><b>Name:</b> {order.first_name} {order.last_name}
                                            </Typography>
                                            <Typography
                                                variant="body2"><b>Date:</b> {order.date_of_purchase ? new Date(order.date_of_purchase).toLocaleString() : 'N/A'}
                                            </Typography>
                                            <Typography variant="body2"><b>Email:</b> {order.email_address || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2"><b>Amount:</b> £{order.amount}</Typography>
                                            <Typography variant="body2"><b>Order
                                                Status:</b> {order.order_status ? 'Complete' : 'Incomplete'}
                                            </Typography>
                                            {/* Pedigree Tickets */}
                                            {order.pedigree_tickets && Object.values(order.pedigree_tickets).some(v => v) && (
                                                <Box mt={1}>
                                                    <Typography variant="body2" sx={{fontWeight: 500}}>Pedigree
                                                        Tickets:</Typography>
                                                    <ul style={{margin: 0, paddingLeft: 18}}>
                                                        {Object.entries(order.pedigree_tickets)
                                                            .filter(([_, v]) => v)
                                                            .map(([k, v]) => (
                                                                <li key={k}>{k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}: {v}</li>
                                                            ))}
                                                    </ul>
                                                </Box>
                                            )}
                                            {/* All Dog Tickets */}
                                            {order.all_dog_tickets && Object.values(order.all_dog_tickets).some(v => v) && (
                                                <Box mt={1}>
                                                    <Typography variant="body2" sx={{fontWeight: 500}}>All Dog
                                                        Tickets:</Typography>
                                                    <ul style={{margin: 0, paddingLeft: 18}}>
                                                        {Object.entries(order.all_dog_tickets)
                                                            .filter(([_, v]) => v)
                                                            .map(([k, v]) => (
                                                                <li key={k}>{k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}: {v}</li>
                                                            ))}
                                                    </ul>
                                                </Box>
                                            )}
                                            {/* Doggie Info */}
                                            {order.doggie_info && order.doggie_info.length > 0 && (
                                                <Box mt={1}>
                                                    <Typography variant="body2" sx={{fontWeight: 500}}>Doggie
                                                        Info:</Typography>
                                                    <ul style={{margin: 0, paddingLeft: 18}}>
                                                        {order.doggie_info.map((dog, idx) => (
                                                            <li key={idx}>
                                                                <span style={{fontFamily: 'inherit', fontSize: '1rem'}}>
                                                                    Name: {dog.name}, DOB: {dog.date_of_birth}, Sex: {dog.sex}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Box>
                                            )}
                                        </Card>
                                    ))
                            )}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={donationExpanded} onChange={handleDonationAccordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h5">Donation Analytics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={2} display="flex" justifyContent="flex-start">
                        <TextField
                            label="Search by Name or Email"
                            variant="outlined"
                            value={donationSearch}
                            onChange={e => setDonationSearch(e.target.value)}
                            sx={{width: {xs: '90%', sm: '350px'}}}
                        />
                    </Box>
                    {donationLoading ? (
                        <CircularProgress/>
                    ) : donationError ? (
                        <Typography color="error">{donationError}</Typography>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={3}>
                            {donationData.length === 0 ? (
                                <Typography>No donations found.</Typography>
                            ) : (
                                donationData
                                    .filter(donation =>
                                        (`${donation.first_name || ''} ${donation.last_name || ''} ${donation.email_address || ''}`.toLowerCase().includes(donationSearch.toLowerCase()))
                                    )
                                    .map((donation, idx) => (
                                        <Card key={idx} sx={{width: '100%', p: 2, background: '#f9f9f9', position: 'relative'}}>
                                            <Typography variant="subtitle1" sx={{fontWeight: 600, mb: 1}}>
                                                {donation.first_name || ''} {donation.last_name || ''}
                                            </Typography>
                                            <Typography variant="body2"><b>Donation ID:</b> {donation.donation_id || 'N/A'}</Typography>
                                            <Typography variant="body2"><b>Email:</b> {donation.email_address || 'N/A'}</Typography>
                                            <Typography variant="body2"><b>Date:</b> {donation.timestamp ? new Date(donation.timestamp).toLocaleString() : 'N/A'}</Typography>
                                            <Typography variant="body2"><b>Amount:</b> £{donation.amount}</Typography>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                sx={{ position: 'absolute', top: 8, right: 8, minWidth: 0, padding: '2px 8px' }}
                                                onClick={async () => {
                                                    if (window.confirm('Are you sure you want to delete this donation?')) {
                                                        try {
                                                            await fetch(`https://api.fawleydogshow.com/donation/delete?donation_id=${donation.donation_id}`, { method: 'DELETE' });
                                                            setDonationData(donationData => donationData.filter((_, i) => i !== idx));
                                                        } catch (e) {
                                                            alert('Failed to delete donation.');
                                                        }
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Card>
                                    ))
                            )}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default Analytics;
