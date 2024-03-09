import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from './i18n/config';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import styles from './app.module.scss';
import Login from './pages/login/login';
import Sample from './pages/sample/sample';
import Home from './pages/home/home';
import AppToolbar from './components/toolbar/toolbar';
import CssBaseline from "@mui/material/CssBaseline";
import { SessionKeys } from './services/SessionKeys';
import SessionService from './services/session.service';
function App() {
  const c = i18n;
  const [appMode, setAppMode] = useState<'light' | 'dark' | undefined>(undefined);;
  useEffect((): void => {
    c.changeLanguage(navigator.languages[0]);
    let theme: string | null | undefined = SessionService.getInstance().get(SessionKeys.Theme);
    if (theme !== 'light' && theme !== 'dark' && theme !== undefined) {
      theme = undefined;
    }
    setAppMode(theme);
  }, [c]);

  const defaultTheme = createTheme({
    palette: {
      mode: appMode,
    },
  });

  function toggleTheme(): void {
    let val = appMode
    if (!appMode || appMode === 'light') {
      val = 'dark';
    } else {
      val = 'light';
    }
    setAppMode(val);
    SessionService.getInstance().set(SessionKeys.Theme, val);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className={`${styles['thunder']}`}>
        <I18nextProvider i18n={c}>
          <div className={`${SessionService.getInstance().get(SessionKeys.AuthToken) !== null ? styles['show'] : styles['hide']}`}>
            <AppToolbar onThemeChanged={() => toggleTheme()} />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Sample />} />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
