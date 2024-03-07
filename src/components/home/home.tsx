import React from 'react';
import styles from './home.module.scss';
import { useTranslation } from 'react-i18next';
import AppToolbar from '../toolbar/toolbar';

function Sample() {
    const { t } = useTranslation();
    return (
        <div className={`${styles["home"]}`}>
            <AppToolbar />
            <div>
                <h1>{t("sample-text")}</h1>
            </div>

        </div>
    );
}

export default Sample;
