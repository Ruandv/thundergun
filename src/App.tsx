import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from './i18n/config';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import styles from './app.module.scss';
import Login from './components/login/login';
import Sample from './components/sample/sample';
import Home from './components/home/home';
function App() {
  const c = i18n;
  useEffect((): void => {
    c.changeLanguage(navigator.languages[0]);
  }, []);

  const defaultTheme = createTheme();

  return (
    <div className= {`${styles['thunder']}`}>
      <I18nextProvider i18n={c}>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Sample />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
