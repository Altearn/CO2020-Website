import React, { Suspense, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { Grid, useMediaQuery } from '@material-ui/core';

import { NDonateCard, NDonateCardLoading } from './NDonateCard';
import { NDonatorCard, NDonatorCardLoading } from './NDonatorCard';
import { NHeader, NHeaderLoading } from '../../NHeader';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

export function NHome(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isScreenLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const { enqueueSnackbar } = useSnackbar();

    const [cards, setCards] = React.useState({
        top: null,
        second: null,
        third: null,
        latest: null
    });

    useEffect(() => {
        const reloadCards = () => {
            fetch('/api/cards/').then(res => {
                res.json().then(res => {
                    setCards(res);
                })
                .catch(err => enqueueSnackbar(
                    <Suspense fallback="We're unable to reach our servers, some things may not display properly">
                        <Translation t='RahNeil_N3.Irus.Error.Display.Server'/>
                    </Suspense>,
                    {variant: 'error'}));
            }).catch(err => enqueueSnackbar(
                <Suspense fallback="We're unable to reach our servers, some things may not display properly">
                    <Translation t='RahNeil_N3.Irus.Error.Display.Server'/>
                </Suspense>,
                {variant: 'error'}));
        }
        reloadCards();
    }, [enqueueSnackbar]);

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
                            <Suspense fallback={
                                <NDonatorCardLoading isDarkTheme={props.isDarkTheme} top />
                            }>
                                {cards.top==null?
                                    <NDonatorCardLoading isDarkTheme={props.isDarkTheme} top />
                                :
                                    <NDonatorCard
                                        amount={cards.top.amount}
                                        currency={cards.top.currency}
                                        uuid={cards.top.uuid}
                                        isDarkTheme={props.isDarkTheme}
                                        top
                                    />
                                }
                            </Suspense>
                        </Grid>
                        {isScreenLarge?
                            <>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Suspense fallback={
                                        <NDonatorCardLoading isDarkTheme={props.isDarkTheme} second />
                                    }>
                                        {cards.second==null?
                                            <NDonatorCardLoading isDarkTheme={props.isDarkTheme} second />
                                        :
                                            <NDonatorCard
                                                amount={cards.second.amount}
                                                currency={cards.second.currency}
                                                uuid={cards.second.uuid}
                                                isDarkTheme={props.isDarkTheme}
                                                second
                                            />
                                        }
                                    </Suspense>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Suspense fallback={
                                        <NDonatorCardLoading isDarkTheme={props.isDarkTheme} third />
                                    }>
                                        {cards.third==null?
                                            <NDonatorCardLoading isDarkTheme={props.isDarkTheme} third />
                                        :
                                            <NDonatorCard
                                                amount={cards.third.amount}
                                                currency={cards.third.currency}
                                                uuid={cards.third.uuid}
                                                isDarkTheme={props.isDarkTheme}
                                                third
                                            />
                                        }
                                    </Suspense>
                                </Grid>
                            </>
                        :null}
                        <Grid item xs={12} sm={6} md={12} lg={6}>
                            <Suspense fallback={
                                <NDonatorCardLoading isDarkTheme={props.isDarkTheme} latest />
                            }>
                                {cards.latest==null?
                                    <NDonatorCardLoading isDarkTheme={props.isDarkTheme} latest />
                                :
                                    <NDonatorCard
                                        amount={cards.latest.amount}
                                        currency={cards.latest.currency}
                                        uuid={cards.latest.uuid}
                                        isDarkTheme={props.isDarkTheme}
                                        latest
                                    />
                                }
                            </Suspense>
                        </Grid>
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