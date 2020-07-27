import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€'}
                        {lowValue}
                        {!t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€'}
                    </Typography>
                </Grid>
                <Grid item className={classes.barContainer}>
                    <Tooltip open={true} title={
                        (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€')+
                        props.amount+
                        (!t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€')
                    } arrow>
                        <div style={{position: 'absolute', left: 'calc('+Math.round((props.amount-lowValue)/(highValue-lowValue)*100)+'% - 1px)'}}/>
                    </Tooltip>
                    <MainLinearProgress variant="determinate" value={Math.round((props.amount-lowValue)/(highValue-lowValue)*100)} />
                </Grid>
                <Grid item className={classes.titleContainer}>
                    <Typography variant="subtitle1">
                        {t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€'}
                        {highValue}
                        {!t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':'€'}
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
                    <MainLinearProgress variant="determinate" value={0} />
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

const MainLinearProgress = withStyles((theme) => ({
    root: {
        borderRadius: 5,
        height: 7,
    },
    bar: {
      borderRadius: 5,
      background: 'linear-gradient(315deg, #6617cb 0%, #cb218e 74%)',
    },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        padding: theme.spacing(2),
    },
    barContainer: {
        flex: 1,
        position: 'relative',
    }
}));