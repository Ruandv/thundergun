import React from 'react';
import styles from './sample.module.scss';
import { useTranslation } from 'react-i18next';

function Sample() {
    const { t } = useTranslation();
    
    return (
        <div className={`${styles["sample"]}`}>
            <h1>{t("sample-text")}</h1>
        </div>
    );
}

export default Sample;
