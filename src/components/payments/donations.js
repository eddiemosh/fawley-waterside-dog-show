import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, Paper } from '@mui/material';

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDonate = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Optionally, integrate with payment/donation API here
    // window.open('https://www.justgiving.com/crowdfunding/fawleydogshow', '_blank');
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={3} style={{ padding: 32, borderRadius: 18, marginTop: 48 }}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#2d7a5f', fontWeight: 700 }}>
            Thank You!
          </Typography>
          <Typography variant="body1" align="center" style={{ marginBottom: 24 }}>
            Your donation of <b>£{Number(amount).toFixed(2)}</b> is greatly appreciated and will help support cancer research.
          </Typography>
          <Typography align="center" style={{ color: '#888' }}>
            Together, we can make a difference.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ padding: 32, borderRadius: 18, marginTop: 48 }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#2d7a5f', fontWeight: 700 }}>
          Support Our Mission
        </Typography>
        <Typography variant="body1" align="center" style={{ marginBottom: 18, color: '#444' }}>
          At Fawley & The Waterside Dog Show, we are committed to making a difference in the fight against cancer. Every donation goes directly to supporting vital cancer research, helping to save lives and bring hope to families everywhere.
        </Typography>
        <Typography variant="body2" align="center" style={{ marginBottom: 28, color: '#666' }}>
          Thank you for your generosity and for joining us in this important cause.
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TextField
            label="Donation Amount (£)"
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            inputProps={{ inputMode: 'decimal', pattern: '[0-9]*', style: { textAlign: 'center', fontSize: '1.3rem', fontWeight: 600 } }}
            style={{ width: 200, marginBottom: 8 }}
            placeholder="e.g. 10.00"
          />
          {error && <Typography color="error" style={{ marginBottom: 8 }}>{error}</Typography>}
          <Button
            variant="contained"
            onClick={handleDonate}
            style={{
              background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 12,
              fontSize: '1.1rem',
              padding: '10px 32px',
              marginTop: 8
            }}
          >
            Donate
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Donations;

