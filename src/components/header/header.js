// src/components/Header.js
import React, {useState} from 'react';
import {AppBar, Drawer, IconButton, List, ListItem, ListItemText, Snackbar, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleProfileClick = () => {
        setSnackbarMsg("Oops, we haven't implemented this bit yet. Come back soon!");
        setSnackbarOpen(true);
    };

    const handleMenuItemClick = (page) => {
        handleDrawerClose();
        navigate(page); // Navigate to the selected page
    };

    return (
        <AppBar position="static" style={{background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                    sx={{color: '#2d7a5f'}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    className="header-title"
                    style={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#2d7a5f',
                        letterSpacing: 1
                    }}
                    onClick={() => navigate('/')}
                >
                    Fawley & The Waterside Dog Show
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                    sx={{color: '#2d7a5f'}}
                >
                    <AccountCircleIcon/>
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    PaperProps={{style: {background: '#f8f9fa', borderTopRightRadius: 18, borderBottomRightRadius: 18}}}
                >
                    <div
                        role="presentation"
                        style={{width: 200, paddingTop: 24}}
                        onClick={handleDrawerClose}
                        onKeyDown={handleDrawerClose}
                    >
                        <List>
                            <ListItem button onClick={() => handleMenuItemClick('/')}> <ListItemText primary="Home"
                                                                                                     primaryTypographyProps={{
                                                                                                         style: {
                                                                                                             color: '#2d7a5f',
                                                                                                             fontWeight: 600
                                                                                                         }
                                                                                                     }}/> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/events')}> <ListItemText
                                primary="Events" primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/>
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/feedback')}> <ListItemText
                                primary="Feedback"
                                primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/about')}> <ListItemText
                                primary="About Us"
                                primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/what-to-expect')}> <ListItemText
                                primary="What To Expect"
                                primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/contact')}> <ListItemText
                                primary="Contact Us"
                                primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/donations')}> <ListItemText
                                primary="Donate" primaryTypographyProps={{style: {color: '#2d7a5f', fontWeight: 600}}}/>
                            </ListItem>
                        </List>
                        <div style={{borderTop: '1px solid #e0e0e0', margin: '12px 0'}}/>
                        <List>
                            <ListItem button onClick={() => handleMenuItemClick('/analytics')}> <ListItemText
                                primary="Analytics" primaryTypographyProps={{style: {color: '#888', fontWeight: 500}}}/>
                            </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/cash')}> <ListItemText primary="Cash"
                                                                                                         primaryTypographyProps={{
                                                                                                             style: {
                                                                                                                 color: '#888',
                                                                                                                 fontWeight: 500
                                                                                                             }
                                                                                                         }}/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </Toolbar>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMsg}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            />
        </AppBar>
    );
};

export default Header;
