import React, { ChangeEvent, useEffect } from 'react';
import styles from './home.module.scss';
import { useTranslation } from 'react-i18next';

import UserService from '../../services/user.service';
import { Button, Container, TextField, Typography } from '@mui/material';
import AuthService from '../../services/auth.service';
import SessionService from '../../services/session.service';
import { SessionKeys } from '../../services/SessionKeys';

function Home() {
    const { t } = useTranslation();
    const authService = AuthService();

    const [user, setUser] = React.useState({} as any);

    useEffect(() => {
        const call = async () => {
            const token = SessionService.getInstance().get(SessionKeys.AuthToken);
            var result = await authService.decodeToken(token!);
            setUser(result);
        };
        call();
    }, []);
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        
    }

    return (
        <div className={`${styles["home"]}`}>
            <Container className={`${styles["container"]}`}>
                <Container>
                    <TextField className={styles["txtField"]} label="iss" name="iss" value={user.iss} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="azp" name="azp" value={user.azp} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="aud" name="aud" value={user.aud} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="sub" name="sub" value={user.sub} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="email" name="email" value={user.email} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="name" name="name" value={user.name} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="picture" name="picture" value={user.picture} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="given_name" name="given_name" value={user.given_name} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="family_name" name="family_name" value={user.family_name} onChange={handleChange} fullWidth />
                    <TextField className={styles["txtField"]} label="locale" name="locale" value={user.locale} onChange={handleChange} fullWidth />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Container>
            </Container>

            {JSON.stringify(user, null, 2)}
        </div>
    );
}

export default Home;
