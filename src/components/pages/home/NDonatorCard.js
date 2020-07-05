import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { CardContent, CardMedia, Typography, Grid, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import HistoryIcon from '@material-ui/icons/History';

import { NCard } from '../../NCard';

export function NDonatorCard(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const currencies = [
        { value: 'USD', label: '$' },
        { value: 'EUR', label: '€' },
        { value: 'GBP', label: '£' },
    ];
    const labelFromCurrencyCode = (code) => currencies.find(c => c.value === code).label;

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="subtitle1">
                    {props.username}
                </Typography>
                <Typography gutterBottom component="h5" variant="h4">
                    {props.amount}{labelFromCurrencyCode(props.currency || 'USD')}
                </Typography>
                <Tooltip title={t('RahNeil_N3.Irus.Cards.Latest.Long')} arrow>
                    <Grid container>
                        <Grid item className={classes.icon}>
                            {props.latest?<HistoryIcon color="action" />:null}
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.latest?t('RahNeil_N3.Irus.Cards.Latest.Short'):'First'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Tooltip>
            </CardContent>
            <Tooltip title={props.username} arrow>
                <CardMedia
                    className={classes.cover}
                    image={"https://crafatar.com/renders/body/"+props.uuid+".png?overlay&default=MHF_"+(Math.random()>=0.5?"Steve":"Alex")}
                    title="neil3000"
                />
            </Tooltip>
        </NCard>
    );
}

export function NDonatorCardLoading(props) {
    const classes = useStyles();

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardContent className={classes.content}>
                <Typography variant="subtitle1">
                    <Skeleton>
                        <span>
                            neil3000
                        </span>
                    </Skeleton>
                </Typography>
                <Typography gutterBottom component="h5" variant="h4">
                    <Skeleton>
                        <span>
                            50$
                        </span>
                    </Skeleton>
                </Typography>
                <Grid container>
                    <Grid item className={classes.icon}>
                        {props.latest?<HistoryIcon color="action" />:null}
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Skeleton>
                                <span>
                                    {props.latest?'Latest':'First'}
                                </span>
                            </Skeleton>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Skeleton variant="rect">
                <CardMedia
                    className={classes.cover}
                    image="https://crafatar.com/renders/body/08831584-f289-40e0-b572-d1ae7363ec96.png?overlay&default=MHF_Steve"
                    title={props.username}
                />
            </Skeleton>
        </NCard>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    cover: {
        width: 151,
        backgroundPosition: 'top',
        backgroundSize: 'auto',
    },
    content: {
        flex: 1,
    },
    icon: {
        paddingRight: theme.spacing(1),
    }
}));