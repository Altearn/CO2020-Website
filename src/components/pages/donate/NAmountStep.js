import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Slider, Input, Button, Dialog, DialogTitle, ListItem, Avatar, useTheme, Slide, ListItemText, List, Tooltip } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { currencies, getCurrencyLabel, hasCurrencyDecimals, getCurrencyValue } from '../../NCurrencies';
import { NAdvantagesCard } from './NAdvantagesCard';
import { NPaypalInfo } from '../../NConsts';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NAmountStep(props) {
    const {t} = useTranslation();
    const classes = useStyles();
    const [dialogOpened, setDialogOpened] = React.useState(false);

    const handleChangeCurrency = (value) => {
        const paypalURL = 'https://www.paypal.com/sdk/js?client-id=' + NPaypalInfo().sdk_clientid + '&currency=';
        const Zdiv = document.querySelector(`script[src="${paypalURL}${(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')}"]`)
        if (Zdiv !== null) Zdiv.src = paypalURL + (value||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD');
        props.setCurrency(value);
        setDialogOpened(false);
    }
    const handleSliderChange = (event, newValue) => props.setAmount(newValue);

    let marks = ([
        Math.ceil(getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(5*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(10*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(20*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(30*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(40*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
        Math.ceil(50*getCurrencyValue(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')),
    ].map(n => ({ value: n, label: (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':getCurrencyLabel(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD'))+n+(t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===false?'':getCurrencyLabel(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')) })));

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.selectors}>
                <Grid item>
                    {t('RahNeil_N3.Irus.Donations.Amount.Label')}:
                </Grid>
                <Grid item>
                    <Grid container direction={t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?"row":"row-reverse"} spacing={1}>
                        <Grid item>
                            <Input
                                className={classes.amount}
                                value={props.amount}
                                onChange={(event) => {
                                    if (((hasCurrencyDecimals(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')?/^\d+(|\.|,)\d{0,2}$/:/^\d+$/).test(event.target.value))||event.target.value==='')
                                        props.setAmount(event.target.value.split(',').join('.'));
                                }}
                                onBlur={(event) => {
                                    if (event.target.value==='') props.setAmount(5);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title={t('RahNeil_N3.Irus.Currency.Description')} arrow enterDelay={750}>
                                <Button
                                    startIcon={t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?null:<KeyboardArrowDownIcon/>}
                                    endIcon={t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?<KeyboardArrowDownIcon/>:null}
                                    onClick={() => setDialogOpened(true)}
                                >
                                    {getCurrencyLabel(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')}
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Slider
                value={props.amount}
                onChange={handleSliderChange}
                marks={marks}
                step={1}
                min={1}
                max={50}
                className={classes.slider}
            />
            <Grid container spacing={2} className={classes.gridAwards}>
                <Grid item xs={6} style={{flex: 1}}>
                    <NAdvantagesCard
                        amount={props.amount}
                        currency={props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD'}
                        value={1}
                        />
                </Grid>
                <Grid item xs={6} style={{flex: 1}}>
                    <NAdvantagesCard
                        amount={props.amount}
                        currency={props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD'}
                        value={5}
                    />
                </Grid>
            </Grid>
            <Dialog
                onClose={() => setDialogOpened(false)}
                aria-labelledby={t('RahNeil_N3.Irus.Currency.Description')}
                scroll="body"
                open={dialogOpened}
                keepMounted
                TransitionComponent={Transition}
            >
                <DialogTitle id="dialogCurrencySelectorId">
                    {t('RahNeil_N3.Irus.Currency.Title')}
                </DialogTitle>
                <List>
                    {currencies.map((option) => (
                        <ListItem
                            button
                            onClick={() => handleChangeCurrency(option.code)}
                            key={option.code}
                            selected={option.code===(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD')}
                        >
                            <ListItemText primary={t('RahNeil_N3.Irus.Currency.Name.'+(option.code || 'USD'))+' ('+option.code+')'} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
    selectors: {
        marginBottom: theme.spacing(1),
    },
    slider: {
       margin: theme.spacing(0, 2),
    },
    gridAwards: {
        marginTop: theme.spacing(4),
    },
}));