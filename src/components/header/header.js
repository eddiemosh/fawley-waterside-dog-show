// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const handleMenuItemClick = (page) => {
        handleMenuClose();
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
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    style={{ flexGrow: 1, cursor: 'pointer', fontSize: '90%'}}
                    onClick={() => navigate('/')} // Navigate to home when title is clicked
                >
                    Fawley & The Waterside Dog Show
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/events')}>Events</MenuItem>
                </Menu>
                <Menu
                    anchorEl={anchorElProfile}
                    open={Boolean(anchorElProfile)}
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
