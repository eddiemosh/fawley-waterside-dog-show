import React from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, Button } from '@mui/material';

const WhatToExpect = () => (
  <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', mt: { xs: 2, sm: 6 } }}>
    <Typography variant="h3" className="what-to-expect-title" gutterBottom style={{ textAlign: 'center', fontWeight: 700, color: '#2d7a5f', marginTop: 16, marginBottom: 24, letterSpacing: 1 }}>
      What To Expect
    </Typography>
    <Card className="what-to-expect-card" sx={{ borderRadius: 3, boxShadow: '0 4px 24px rgba(45,122,95,0.08)', background: '#fff', mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600, mb: 2 }}>
          Registration
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Registration usually opens an hour before the show starts. Please arrive early to sign up for your chosen classes and get your number.
        </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
          Registration is available online or on the day of the show. If you register online, please bring your confirmation email to the registration desk.
      </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600, mb: 2 }}>
          How it Works
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          When your class is called, bring your dog into the ring. Our judges will meet all the dogs and award rosettes for 1st, 2nd, and 3rd place. Every dog is welcome, and it's all about having fun!
        </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        If you enter a pedigree class, please ensure your dog is registered with the relevant kennel club. For fun classes, no registration is required.
      </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600, mb: 2 }}>
          Raffle & Prizes
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Don’t miss our raffle for a chance to win great prizes! Tickets are available at the Raffle Desk.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600, mb: 2 }}>
          Vendors, Food & More
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enjoy a variety of stalls selling doggy merchandise, food, and drinks. Sometimes there’s even an agility course for your dog to try!
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 600, mb: 2 }}>
          Donations
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Donations are always welcome and help us support local causes and keep the show running. Thank you for your generosity!
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="small"
            sx={{
              background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
              color: '#fff',
              borderRadius: 18,
              fontWeight: 600,
              letterSpacing: 1,
              minWidth: 100,
              fontSize: '0.95rem',
              boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
              mt: 1
            }}
            href="/donations"
          >
            Donate Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Container>
);

export default WhatToExpect;
