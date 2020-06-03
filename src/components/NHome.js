import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import { NCustomWorldGeneratorCard, NCustomWorldGeneratorCardLoading } from './tools/customWorldGenerator/NCustomWorldGeneratorCard';
import { NHeader, NHeaderLoading } from './NHeader';

export function NHome(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Suspense fallback={<NHeaderLoading placeholder="Tools" />}>
                <NHeader translation="RahNeil_N3.Erebus.Tools.Title" />
            </Suspense>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Suspense fallback={<NCustomWorldGeneratorCardLoading isDarkTheme={props.isDarkTheme} />}>
                        <NCustomWorldGeneratorCard isDarkTheme={props.isDarkTheme} />
                    </Suspense>
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