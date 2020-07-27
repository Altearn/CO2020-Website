import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { NAppBar } from './appbar/NAppBar';
import { NHome } from './pages/home/NHome';
import { NDonateModal } from './pages/donate/NDonateModal';
import { NTrailerModal } from './pages/trailer/NTrailerModal';

export default function App(props) {
    var prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkTheme, setDarkTheme] = useState(null);

    const renderDark = isDarkTheme===null?prefersDark:isDarkTheme;

    const toggleTheme = () => {
        setDarkTheme(isDarkTheme => isDarkTheme===null?!prefersDark:!isDarkTheme);
    }

    const themeLight = createMuiTheme({
        palette: {
            primary: {
                main: '#6b54b6',
            },
            secondary: {
                main: '#120a17',
            }
        },
    });

    //WARNING: change thoses values in NDiscordStep as well !
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#6b54b6',
            },
            secondary: {
                main: '#120a17',
            },
            background: {
                default: '#1b0f23',
                paper: '#1e1e1e',
            },
        },
    });

    return (
        <ThemeProvider theme={renderDark?themeDark:themeLight}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline/>
                <meta name="theme-color" content={renderDark?"#000000":"#6b54b6"} />

                <BrowserRouter>
                    <NAppBar toggleTheme={toggleTheme} isDarkTheme={renderDark} />

                    <NHome isDarkTheme={renderDark}/>
                    <Switch>
                        <Route exact path="/">
                            <NDonateModal />
                            <NTrailerModal />
                        </Route>
                        <Route path="/donate">
                            <NDonateModal opened />
                            <NTrailerModal />
                        </Route>
                        <Route path="/trailer">
                            <NDonateModal />
                            <NTrailerModal opened />
                        </Route>
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}