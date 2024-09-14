import React, {useState} from 'react';
import {Container, Typography, Grid, Checkbox, FormControlLabel, Button, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './ticket-selection.css'; // Add external CSS for better control

const ticketOptions = Array.from({length: 20}, (_, index) => `Ticket Type ${index + 1}`);

const TicketSelection = () => {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const navigate = useNavigate();

    const handleTicketChange = (event) => {
        const ticket = event.target.value;
        setSelectedTickets((prev) =>
            prev.includes(ticket)
                ? prev.filter((t) => t !== ticket)
                : [...prev, ticket]
        );
    };

    const handleCheckout = () => {
        navigate('/payments');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Select Tickets
            </Typography>
            <Grid container spacing={2}>
                {ticketOptions.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={ticket}
                                    onChange={handleTicketChange}
                                    color="primary"
                                />
                            }
                            label={ticket}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default TicketSelection;
