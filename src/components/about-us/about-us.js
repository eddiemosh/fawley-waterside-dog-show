import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AboutUs = () => (
  <Container maxWidth="sm" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Paper elevation={3} style={{ padding: 32, borderRadius: 18, marginTop: 48, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#2d7a5f', fontWeight: 700 }}>
        About Fawley & The Waterside Dog Show
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 18, color: '#444', fontSize: '1.1rem' }}>
        The Fawley & The Waterside Dog Show is a community event led entirely by dedicated volunteers. Our mission is to bring people and their dogs together for a day of fun, friendship, and fundraising.
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 18, color: '#444', fontSize: '1.1rem' }}>
        We are proud to support cancer research. In August 2025, thanks to your generosity, we raised <b>£1,000</b> for Southampton Hospital Cancer Research. Every ticket, donation, and helping hand makes a real difference.
      </Typography>
      <Typography variant="body2" style={{ color: '#666', marginBottom: 12 }}>
        We welcome your feedback and any offers of help—together, we can make each year even better!
      </Typography>
      <Box mt={2}>
        <Typography variant="caption" style={{ color: '#888' }}>
          Thank you for being part of our journey.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

export default AboutUs;

