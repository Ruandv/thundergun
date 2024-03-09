import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { useTranslation } from 'react-i18next';

import UserService from '../../services/user.service';
import { Button, Container, Typography } from '@mui/material';

function Home() {
    const { t } = useTranslation();
    const userService = UserService();
    const [user, setUser] = React.useState({});

    useEffect(() => {
        const call = async () => {
            setUser(await userService.get());
        };
        call();
    }, []);
    return (
        <div className={`${styles["home"]}`}>
            <Container className={`${styles["container"]}`}>
                <Typography variant="h2" component="h1">
                    Welcome to Our Website
                </Typography>
                <Typography variant="h5" component="h2">
                    We're glad you're here.
                </Typography>
                <Button variant="contained" color="primary" className={styles["button"]}>
                    Get Started
                </Button>
            </Container>
        </div>
    );
}

export default Home;
