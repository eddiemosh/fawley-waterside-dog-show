import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
const DonationSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const donationId = query.get('donationId');

  return (
    <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Paper elevation={3} style={{ padding: 32, borderRadius: 18, marginTop: 48, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#2d7a5f', fontWeight: 700 }}>
          Thank You For Your Donation!
        </Typography>
        {donationId && (
          <Typography variant="subtitle1" style={{ color: '#2d7a5f', marginTop: 18, marginBottom: 8, fontWeight: 600, fontSize: '1.1rem', letterSpacing: 1 }}>
            Donation ID: {donationId}
          </Typography>
        )}
        <Typography variant="body1" style={{ marginBottom: 24, color: '#444', fontSize: '1.15rem' }}>
          Your generosity helps us continue our mission to support cancer research and make a difference in the lives of those affected. Every contribution, big or small, brings us closer to a world where cancer can be beaten. We are deeply grateful for your support and for joining us in this important cause.
        </Typography>
        <Typography variant="body2" style={{ color: '#666' }}>
          With heartfelt thanks from everyone at Fawley & The Waterside Dog Show.
        </Typography>
      </Paper>
    </Container>
  );
};

export default DonationSuccess;
