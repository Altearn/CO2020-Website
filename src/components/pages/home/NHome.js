import React, { Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Grid, useMediaQuery  } from '@material-ui/core';

import { NDonateCard, NDonateCardLoading } from './NDonateCard';
import { NDonatorCard, NDonatorCardLoading } from './NDonatorCard';
import { NHeader, NHeaderLoading } from '../../NHeader';

export function NHome(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isScreenLarge = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <div className={classes.root}>
            <Suspense fallback={<NHeaderLoading placeholder="Donations" />}>
                <NHeader translation="RahNeil_N3.Irus.Donations.Title" />
            </Suspense>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={6}>
                    <Suspense fallback={<NDonateCardLoading isDarkTheme={props.isDarkTheme} />}>
                        <NDonateCard isDarkTheme={props.isDarkTheme}/>
                    </Suspense>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={12} lg={6}>
                            <Suspense fallback={<NDonatorCardLoading isDarkTheme={props.isDarkTheme} />}>
                                <NDonatorCard isDarkTheme={props.isDarkTheme} />
                            </Suspense>
                        </Grid>
                        <Grid item xs={12} sm={6} md={12} lg={6}>
                            <Suspense fallback={<NDonatorCardLoading isDarkTheme={props.isDarkTheme} />}>
                                <NDonatorCard isDarkTheme={props.isDarkTheme} />
                            </Suspense>
                        </Grid>
                        {isScreenLarge?
                            <>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Suspense fallback={<NDonatorCardLoading isDarkTheme={props.isDarkTheme} />}>
                                        <NDonatorCard isDarkTheme={props.isDarkTheme} />
                                    </Suspense>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Suspense fallback={<NDonatorCardLoading isDarkTheme={props.isDarkTheme} />}>
                                        <NDonatorCard isDarkTheme={props.isDarkTheme} />
                                    </Suspense>
                                </Grid>
                            </>
                        :null}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6),
        },
    },
}));