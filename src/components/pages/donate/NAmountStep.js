import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from "@material-ui/core/InputAdornment";

export function NAmountStep(props) {
    
    const {t} = useTranslation();
    const classes = useStyles();

    const handleSliderChange = (event, newValue) => props.setAmount(newValue);
    const handleInputChange = (event) => {
        let newval = 5;
        let input = parseFloat(event.target.value);
        if (! isNaN(input)) newval = input;
        if (newval < 1) newval = 1;
        props.setAmount(newval);
    };

    const marks = [1,5,10,20,30,40,50]
        .map(n => ({ value: n, label: n+'$' }));

    return (
        <div className={classes.root}>
            <Grid container spacing={5} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={props.amount}
                        onChange={handleSliderChange}
                        aria-labelledby="discrete-slider-custom"
                        marks={marks}
                        step={1}
                        min={1}
                        max={50}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={props.amount}
                        onChange={handleInputChange}
                        inputProps={{
                            'aria-labelledby': 'input-slider',
                        }}
                        endAdornment={<InputAdornment position="end">$</InputAdornment>}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        width: 450,
    },
    input: {
        width: 60,
    },
});