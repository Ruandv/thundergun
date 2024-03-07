/* eslint-disable react/jsx-no-undef */
import React from 'react';
import styles from './toolbar.module.scss';
import { AppBar,  IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AppToolbar() {
    return (
        <div className={`${styles["toolbar"]}`}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppToolbar;
