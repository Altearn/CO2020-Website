import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function NAmountStep(props) {
    
    const {t} = useTranslation();
    const classes = useStyles();

    if(!props.currency)
        props.setCurrency(t('RahNeil_N3.Irus.Donations.Amount.Default-Currency'));

    const currencies = [
        { value: 'USD', label: '$' },
        { value: 'EUR', label: '€' },
        { value: 'GBP', label: '£' },
    ];
    const labelFromCurrencyCode = (code) => currencies.find(c => c.value === code).label;
    let currencyLabel = labelFromCurrencyCode(props.currency || 'USD');
    const handleChangeCurrency = (event) => {
        props.setCurrency(event.target.value);
        currencyLabel = labelFromCurrencyCode(event.target.value);
        updateMarks();
    };

    const handleSliderChange = (event, newValue) => props.setAmount(newValue);

    let marks = [];
    const updateMarks = () => {
        marks = ([1,5,10,20,30,40,50]
            .map(n => ({ value: n, label: n+currencyLabel })));
    };
    updateMarks();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.selectors}>
                <Grid item xs={6}>
                    {t('RahNeil_N3.Irus.Donations.Amount.Label')}:
                </Grid>
                <Grid item xs={6}>
                    <Input
                        className={classes.amount}
                        value={props.amount}
                        onChange={(event) => {
                            if ((/^\d+(|\.|,)\d{0,2}$/.test(event.target.value))||event.target.value==='')
                                props.setAmount(event.target.value.split(',').join('.'));
                        }}
                        onBlur={(event) => {
                            if (event.target.value==='') props.setAmount(5);
                        }}
                    />
                    <TextField
                        className={classes.currency}
                        noValidate
                        select
                        value={props.currency}
                        onChange={handleChangeCurrency}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Slider
                value={props.amount}
                onChange={handleSliderChange}
                marks={marks}
                step={1}
                min={1}
                max={50}
            />
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
    currency: {
        width: '25%',
    },
    amount: {
       width: '75%',
    }
}));