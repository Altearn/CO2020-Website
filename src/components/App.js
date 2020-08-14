import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { configureAnchors } from 'react-scrollable-anchor'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { NAppBar } from './appbar/NAppBar';
import { NHome } from './pages/home/NHome';
import { NDonateModal } from './pages/donate/NDonateModal';
import { NTrailerModal } from './pages/trailer/NTrailerModal';
import { NDonations } from './NConsts';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

export default function App(props) {
    const classes = useStyles();
    var prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkTheme, setDarkTheme] = useState(null);

    const renderDark = isDarkTheme===null?prefersDark:isDarkTheme;
    configureAnchors({offset: -60})

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
                <meta property="og:title" content={<Translation t="RahNeil_N3.Irus.Opengraph.title" />} />
                <meta property="og:description" content={<Translation t="RahNeil_N3.Irus.Opengraph.description" />} />

                <BrowserRouter>
                    <NAppBar toggleTheme={toggleTheme} isDarkTheme={renderDark} />

                    <NHome isDarkTheme={renderDark}/>
                    <Switch>
                        <Route exact path="/">
                            <NDonateModal />
                            <NTrailerModal />
                        </Route>
                        <Route path="/donate">
                            {NDonations()?
                                <>
                                    <NDonateModal opened />
                                    <NTrailerModal />
                                </>
                            :
                                <Redirect to="/" />
                            }
                        </Route>
                        <Route path="/trailer">
                            <NDonateModal />
                            <NTrailerModal opened />
                        </Route>
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                    <div className={classes.footer}>This website is not affiliated with Mojang Studios | Copyright © 2020 Gunivers. All rights reserved</div>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        color: 'gray',
        marginLeft: theme.spacing(4)
    }
}));