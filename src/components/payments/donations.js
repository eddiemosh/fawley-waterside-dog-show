import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please fill in your first and last name.');
      return;
    }
    setError('');
    try {
      const res = await fetch('https://api.fawleydogshow.com/payment/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          amount: Number(amount)
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          navigate('/donation-success');
        }
      } else {
        navigate('/donation-failure');
      }
    } catch {
      navigate('/donation-failure');
    }
  };

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
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ width: 200, marginBottom: 8 }}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ width: 200, marginBottom: 8 }}
            required
          />
          <TextField
            label="Email Address (recommended)"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: 200, marginBottom: 8 }}
            type="email"
          />
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
