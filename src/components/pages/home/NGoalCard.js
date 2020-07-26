import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { LinearProgress, Card, Typography, Grid, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function NGoalCard(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const [lowValue, setLowValue] = React.useState(0);
    const [highValue, setHighValue] = React.useState(10);

    useEffect(() => {
        var newLowValue = 0;
        var newHighValue = 10;
        while (newHighValue<=props.amount) {
            newLowValue=newHighValue;
            newHighValue*=2.5;
            if (newHighValue<=props.amount) {
                newLowValue=newHighValue;
                newHighValue*=2;
            }
            if (newHighValue<=props.amount) {
                newLowValue=newHighValue;
                newHighValue*=1.5;
            }
            if (newHighValue<=props.amount) {
                newLowValue=newHighValue;
                newHighValue*=4/3;
            }
        }
        setLowValue(newLowValue);
        setHighValue(newHighValue);
    }, [props.amount]);

    return (
        <Card isDarkTheme={props.isDarkTheme}>
            <Grid container alignItems="center">
                <Grid item className={classes.titleContainer}>
                    <Typography variant="subtitle1">
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===true?'':'€'}
                        {lowValue}
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===false?'':'€'}
                    </Typography>
                </Grid>
                <Grid item className={classes.barContainer}>
                    <Tooltip open={true} title={
                        (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===true?'':'€')+
                        props.amount+
                        (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===false?'':'€')
                    } arrow>
                        <div style={{position: 'absolute', left: 'calc('+Math.round((props.amount-lowValue)/(highValue-lowValue)*100)+'% - 1px)'}}/>
                    </Tooltip>
                    <LinearProgress variant="determinate" value={Math.round((props.amount-lowValue)/(highValue-lowValue)*100)} style={{borderRadius: 5, height: 7}}/>
                </Grid>
                <Grid item className={classes.titleContainer}>
                    <Typography variant="subtitle1">
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===true?'':'€'}
                        {highValue}
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===false?'':'€'}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

export function NGoalCardLoading(props) {
    const classes = useStyles();

    return (
        <Card isDarkTheme={props.isDarkTheme}>
            <Grid container alignItems="center">
                <Grid item className={classes.titleContainer}>
                    <Typography variant="subtitle1">
                        <Skeleton>
                            <span>
                                $50
                            </span>
                        </Skeleton>
                    </Typography>
                </Grid>
                <Grid item className={classes.barContainer}>
                    <LinearProgress variant="determinate" value={0} style={{borderRadius: 5, height: 7}}/>
                </Grid>
                <Grid item className={classes.titleContainer}>
                    <Typography variant="subtitle1">
                        <Skeleton>
                            <span>
                                $50
                            </span>
                        </Skeleton>
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        padding: theme.spacing(2),
    },
    barContainer: {
        flex: 1,
        position: 'relative',
    }
}));