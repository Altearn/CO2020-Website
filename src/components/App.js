import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { NAppBar } from './appbar/NAppBar';
import { NHome } from './pages/home/NHome';
import { NDonateModal } from './pages/donate/NDonateModal';

export default function App() {
    var prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkTheme, setDarkTheme] = useState(null);

    const renderDark = isDarkTheme===null?prefersDark:isDarkTheme;

    const toggleTheme = () => {
        setDarkTheme(isDarkTheme => isDarkTheme===null?!prefersDark:!isDarkTheme);
    }

    const themeLight = createMuiTheme({
        palette: {
            primary: red,
            secondary: {
                main: '#f44336',
            }
        },
    });

    //WARNING: change thoses values in NDiscordStep as well !
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark',
            primary: red,
            secondary: {
                main: '#f44336',
            },
            background: {
                default: '#121212'
            },
            card: {
                backgroundColor: '#ff6600',
            },
        },
    });

    return (
        <ThemeProvider theme={renderDark?themeDark:themeLight}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline/>
                <meta name="theme-color" content={renderDark?"#000000":"#f44336"} />

                <BrowserRouter>
                    <NAppBar toggleTheme={toggleTheme} isDarkTheme={renderDark} />

                    <NHome isDarkTheme={renderDark}/>
                    <Switch>
                        <Route exact path="/">
                            <NDonateModal />
                        </Route>
                        <Route path="/donate">
                            <NDonateModal opened />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}