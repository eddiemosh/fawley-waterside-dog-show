import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const DonationFailure = () => (
  <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Paper elevation={3} style={{ padding: 32, borderRadius: 18, marginTop: 48, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#e57373', fontWeight: 700 }}>
        Donation Failed
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 24, color: '#444', fontSize: '1.15rem' }}>
        Unfortunately, your donation could not be processed at this time. Please check your details and try again, or contact us if the problem persists.
      </Typography>
      <Typography variant="body2" style={{ color: '#666' }}>
        We appreciate your support and hope you'll try again soon.
      </Typography>
    </Paper>
  </Container>
);

export default DonationFailure;

