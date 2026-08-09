import React from 'react';
import { Box, Typography, IconButton, Link, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactUs = () => (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', pt: { xs: 2, sm: 6 }, pb: { xs: 2, sm: 6 } }}>
        <Box sx={{ background: '#fff', borderRadius: 3, boxShadow: '0 4px 24px rgba(45,122,95,0.08)', p: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 }, width: '100%', maxWidth: 520, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#2d7a5f', fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', sm: '2.2rem' } }}>
                Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#444', mb: 2 }}>
                We'd love to hear from you! Reach out with any questions or feedback.
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#2d7a5f' }}>Email:</Typography>
                <Link href="mailto:fawleydogshow@gmail.com" sx={{ color: '#2d7a5f', fontWeight: 600 }}>fawleydogshow@gmail.com</Link>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#2d7a5f' }}>Social Media:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                    <IconButton href="https://www.facebook.com/profile.php?id=61554694584616" target="_blank" rel="noopener" sx={{ color: '#2d7a5f' }}>
                        <FacebookIcon fontSize="large" />
                    </IconButton>
                    <IconButton href="https://www.instagram.com/sallyma1l?igsh=MXAzNWlrOHdpb2c5aQ==" target="_blank" rel="noopener" sx={{ color: '#2d7a5f' }}>
                        <InstagramIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#2d7a5f' }}>Location:</Typography>
                <Typography variant="body2" sx={{ color: '#444', fontWeight: 600 }}>
                    Gang Warily Recreation Centre, Newlands Road, Fawley, SO45 1GA
                </Typography>
            </Box>
        </Box>
    </Container>
);

export default ContactUs;

