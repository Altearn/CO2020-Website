import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { NAppBar } from './appbar/NAppBar';
import { NHome } from './NHome';
import { NCustomWorldGenerator } from './tools/customWorldGenerator/NCustomWorldGenerator';

export default function App() {
    var prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkTheme, setDarkTheme] = useState(null);

    const renderDark = isDarkTheme===null?prefersDark:isDarkTheme;

    const themeLight = createMuiTheme({
        palette: {
            primary: red,
            secondary: {
                main: '#f44336',
            }
        },
    });
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

    const toggleTheme = () => {
        setDarkTheme(isDarkTheme => isDarkTheme===null?!prefersDark:!isDarkTheme);
    }

    return (
        <ThemeProvider theme={renderDark?themeDark:themeLight}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline/>

                <BrowserRouter>
                    <NAppBar toggleTheme={toggleTheme} isDarkTheme={renderDark} />

                    <Switch>
                        <Route path="/customWorldGenerator">
                            <NCustomWorldGenerator isDarkTheme={renderDark} />
                        </Route>
                        <Route path="/">
                            <NHome isDarkTheme={renderDark} />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}