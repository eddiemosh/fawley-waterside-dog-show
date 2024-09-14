// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);

    // Handle menu button click
    const handleMenuClick = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    // Handle profile button click
    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    // Close both menus
    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    // Handle menu item click
    const handleMenuItemClick = (option) => {
        handleMenuClose();
        console.log(`Navigating to ${option}`); // Handle page navigation logic here
    };

    // Handle profile menu item click
    const handleProfileMenuItemClick = (option) => {
        handleProfileClose();
        console.log(option); // Handle profile menu item logic here
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
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Fawley & The Waterside Dog Show
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                >
                    <AccountCircleIcon />
                </IconButton>

                {/* Menu Button Dropdown */}
                <Menu
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleMenuItemClick('Home')}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('Page 1')}>Page 1</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('Page 2')}>Page 2</MenuItem>
                </Menu>

                {/* Profile Menu Dropdown */}
                <Menu
                    anchorEl={anchorElProfile}
                    open={Boolean(anchorElProfile)}
                    onClose={handleProfileClose}
                >
                    <MenuItem onClick={() => handleProfileMenuItemClick('Manage Account')}>Manage Account</MenuItem>
                    <MenuItem onClick={() => handleProfileMenuItemClick('Settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => handleProfileMenuItemClick('Logout')}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
