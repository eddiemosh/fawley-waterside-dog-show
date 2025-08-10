// src/components/Header.js
import React, {useState} from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const handleMenuItemClick = (page) => {
        handleDrawerClose();
        navigate(page); // Navigate to the selected page
    };

    const handleProfileItemClick = (option) => {
        handleProfileClose();
        console.log(option); // Handle profile menu item click logic here
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    style={{flexGrow: 1, cursor: 'pointer', fontSize: '90%', fontWeight: '600'}}
                    onClick={() => navigate('/')} // Navigate to home when title is clicked
                >
                    Fawley & The Waterside Dog Show
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                >
                    <AccountCircleIcon/>
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                >
                    <div
                        role="presentation"
                        style={{ width: 180 }}
                        onClick={handleDrawerClose}
                        onKeyDown={handleDrawerClose}
                    >
                        <List>
                            <ListItem button onClick={() => handleMenuItemClick('/')}> <ListItemText primary="Home" /> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/events')}> <ListItemText primary="Events" /> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/feedback')}> <ListItemText primary="Feedback" /> </ListItem>
                        </List>
                        <div style={{ borderTop: '5px solid #e0e0e0', margin: '2px 0' }} />
                        <List>
                            <ListItem button onClick={() => handleMenuItemClick('/analytics')}> <ListItemText primary="Analytics" /> </ListItem>
                            <ListItem button onClick={() => handleMenuItemClick('/cash')}> <ListItemText primary="Cash" /> </ListItem>
                        </List>
                    </div>
                </Drawer>
                <Menu
                    anchorEl={anchorElProfile}
                    // open={Boolean(anchorElProfile)}
                    onClose={handleProfileClose}
                >
                    <MenuItem onClick={() => handleProfileItemClick('Manage Account')}>Manage Account</MenuItem>
                    <MenuItem onClick={() => handleProfileItemClick('Settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => handleProfileItemClick('Logout')}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
