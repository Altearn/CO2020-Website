import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { Grid, useMediaQuery } from '@material-ui/core';

import { NDonateCard, NDonateCardLoading } from './NDonateCard';
import { NDonatorCard, NDonatorCardLoading } from './NDonatorCard';
import { NGoalCard, NGoalCardLoading } from './NGoalCard';
import { NLoading, NDonations } from '../../NConsts';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

export function NCards(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const ws = React.useRef(null);

    const isScreenLarge = useMediaQuery(theme.breakpoints.up("lg"));

    const [cards, setCards] = React.useState({
        top: null,
        second: null,
        third: null,
        latest: null,
        total: null
    });

    React.useEffect(() => {
        ws.current = new WebSocket("ws://"+window.location.host+"/api/ws");
    
        ws.current.onmessage = e => {
            try {
                e = JSON.parse(e.data)
            } catch (err) {
                console.error(err);
                return;
            }
            if (e.code === 600) setCards(e.newCards);
        };
    
        return () => {
            ws.current.close();
        };
    }, []);

    React.useEffect(() => {
        const reloadCards = () => {
            fetch('/api/cards/').then(res => {
                res.json().then(res => {
                    setCards(res);
                })
                .catch(err => enqueueSnackbar(
                    <Suspense fallback="We're unable to reach our servers, some things may not display properly">
                        {NLoading()?
                            "We're unable to reach our servers, some things may not display properly"
                        :
                            <Translation t='RahNeil_N3.Irus.Error.Display.Server'/>
                        }
                    </Suspense>,
                    {variant: 'error'}));
            }).catch(err => enqueueSnackbar(
                <Suspense fallback="We're unable to reach our servers, some things may not display properly">
                    {NLoading()?
                        "We're unable to reach our servers, some things may not display properly"
                    :
                        <Translation t='RahNeil_N3.Irus.Error.Display.Server'/>
                    }
                </Suspense>,
                {variant: 'error'}));
        }
        reloadCards();
    }, [enqueueSnackbar]);
    
    return (
        <Grid container spacing={2} className={classes.gridRoot}>
            <Grid item xs={12} sm={12} md={8} lg={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Suspense fallback={<NDonateCardLoading/>}>
                    {NDonations()&&!NLoading()?
                        <NDonateCard/>
                    :
                        <NDonateCardLoading/>
                    }
                </Suspense>

                <Suspense fallback={<NGoalCardLoading/>}>
                    {cards.total===null||NLoading()?
                        <NGoalCardLoading/>
                    :
                        <NGoalCard amount={cards.total} />
                    }
                </Suspense>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={12} lg={6}>
                        <Suspense fallback={
                            <NDonatorCardLoading top />
                        }>
                            {cards.top==null||NLoading()?
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
                                    {cards.second==null||NLoading()?
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
                                    {cards.third==null||NLoading()?
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
                            {cards.latest==null||NLoading()?
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
    )
}

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        width: 'auto',
        margin: 0,
    }
}));