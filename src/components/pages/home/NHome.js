import React, { Suspense, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ScrollableAnchor  from 'react-scrollable-anchor';

import { Grid, useMediaQuery } from '@material-ui/core';

import { NDonateCard, NDonateCardLoading } from './NDonateCard';
import { NDonatorCard, NDonatorCardLoading } from './NDonatorCard';
import { NGoalCard, NGoalCardLoading } from './NGoalCard';
import { NLanding, NLandingLoading } from './NLanding';

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
        latest: null,
        total: null
    });

    const xs = useMediaQuery(theme.breakpoints.down("xs"));

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
        <>
            <Suspense fallback={<NLandingLoading isDarkTheme={props.isDarkTheme} />}>
                <NLanding isDarkTheme={props.isDarkTheme} />
            </Suspense>

            
            <div className={classes.root}>
                {xs?null:
                    <div className={classes.waveTopContainer}>
                        <svg preserveAspectRatio="none" className={classes.waveTopSvg} viewBox="0 0 1440 320">
                            <path className={classes.waveTopPath} d="M0,288L1440,128L1440,320L0,320Z" />
                        </svg>
                    </div>
                }

                <ScrollableAnchor id='donate'>
                    <div>
                        <Grid container spacing={2} className={classes.gridRoot}>
                            <Grid item xs={12} sm={12} md={8} lg={6} style={{display: 'flex', flexDirection: 'column'}}>
                                <Suspense fallback={<NDonateCardLoading/>}>
                                    <NDonateCard/>
                                </Suspense>

                                <Suspense fallback={<NGoalCardLoading/>}>
                                    {cards.total===null?
                                        <NGoalCardLoading/>
                                    :
                                        <NGoalCard amount={cards.total}/>
                                    }
                                </Suspense>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={12} lg={6}>
                                        <Suspense fallback={
                                            <NDonatorCardLoading top />
                                        }>
                                            {cards.top==null?
                                                <NDonatorCardLoading top />
                                            :
                                                <NDonatorCard
                                                    amount={cards.top.amount}
                                                    amountGlobal={cards.top.amount_global}
                                                    currency={cards.top.currency}
                                                    uuid={cards.top.uuid}
                                                    top
                                                />
                                            }
                                        </Suspense>
                                    </Grid>
                                    {isScreenLarge?
                                        <>
                                            <Grid item xs={12} sm={6} md={12} lg={6}>
                                                <Suspense fallback={
                                                    <NDonatorCardLoading second />
                                                }>
                                                    {cards.second==null?
                                                        <NDonatorCardLoading second />
                                                    :
                                                        <NDonatorCard
                                                            amount={cards.second.amount}
                                                            amountGlobal={cards.second.amount_global}
                                                            currency={cards.second.currency}
                                                            uuid={cards.second.uuid}
                                                            second
                                                        />
                                                    }
                                                </Suspense>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={12} lg={6}>
                                                <Suspense fallback={
                                                    <NDonatorCardLoading third />
                                                }>
                                                    {cards.third==null?
                                                        <NDonatorCardLoading third />
                                                    :
                                                        <NDonatorCard
                                                            amount={cards.third.amount}
                                                            amountGlobal={cards.third.amount_global}
                                                            currency={cards.third.currency}
                                                            uuid={cards.third.uuid}
                                                            third
                                                        />
                                                    }
                                                </Suspense>
                                            </Grid>
                                        </>
                                    :null}
                                    <Grid item xs={12} sm={6} md={12} lg={6}>
                                        <Suspense fallback={
                                            <NDonatorCardLoading latest />
                                        }>
                                            {cards.latest==null?
                                                <NDonatorCardLoading latest />
                                            :
                                                <NDonatorCard
                                                    amount={cards.latest.amount}
                                                    amountGlobal={cards.latest.amount_global}
                                                    currency={cards.latest.currency}
                                                    uuid={cards.latest.uuid}
                                                    latest
                                                />
                                            }
                                        </Suspense>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </ScrollableAnchor>
            </div>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6),
            paddingTop: 0,
        },
    },
    waveTopPath: {
        stroke: 'none',
        fill: theme.palette.background.default,
    },
    waveTopContainer: {
        width: '100%',
        position: 'absolute',
        left: 0,

        top: -210,
        height: '210px',
    },
    waveTopSvg: {
        height: '100%',
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        width: '100%',
        textAlign: 'center',
    },
    gridRoot: {
        width: 'auto',
        margin: 0,
    }
}));