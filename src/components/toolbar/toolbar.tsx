/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import styles from './toolbar.module.scss';
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthService from '../../services/auth.service';
import { useTranslation } from 'react-i18next';

interface AppToolbarProps {
    onThemeChanged: ()=>void;
  }

function AppToolbar({onThemeChanged}: AppToolbarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const authService = AuthService();
    const { t } = useTranslation();
    const [avatar, setAvatar] = React.useState<string>("");

    useEffect(() => {
        const call = async () => {
            var avatars = await authService.getAvatar()
            setAvatar(avatars);
        };
        call();
    }, []);
    return (
        <div className={`${styles["toolbar"]}`}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t("home")}
                    </Typography>
                    {(
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(event) => { setAnchorEl(event.currentTarget); }}
                                color="inherit"
                            >
                                <Avatar alt="account" src={avatar} />
                            </IconButton>
                            {<Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={() => { setAnchorEl(null); }}
                            >
                                <MenuItem onClick={() => { }}>{t("profile")}</MenuItem>
                                <MenuItem onClick={() => { }}>{t("myAccount")}</MenuItem>
                                <MenuItem onClick={() => { authService.logout() }}>{t("logout")}</MenuItem>
                                <MenuItem onClick={() => { onThemeChanged(); }}>{t("toggle_theme")}</MenuItem>
                            </Menu>}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppToolbar;
