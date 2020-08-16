import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Grid, Zoom, Badge, Avatar, Card, CardContent, Typography, useTheme } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { getCurrencyLabel, getCurrencyValue } from '../../NCurrencies';

export function NAdvantagesCard(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();

    let translatedAmount = Math.ceil(props.value*getCurrencyValue(props.currency));

    return (
        <Card variant='outlined' className={classes.card} style={{borderColor: props.amount>=translatedAmount?theme.palette.success.light:theme.palette.error.light}}>
            <CardContent>
                <Grid container direction='column' alignItems='center'>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        badgeContent={
                            <>
                                <Zoom in={props.amount>=translatedAmount}>
                                    <SmallAvatar className={classes.badgeEnabled}>
                                        <CheckIcon className={classes.badgeIcon}/>
                                    </SmallAvatar>
                                </Zoom>
                                <Zoom in={props.amount<translatedAmount}>
                                    <SmallAvatar className={classes.badgeDisabled}>
                                        <ClearIcon className={classes.badgeIcon}/>
                                    </SmallAvatar>
                                </Zoom>
                            </>
                        }
                    >
                        <Avatar className={classes.avatar} style={{borderColor: props.amount>=translatedAmount?theme.palette.success.main:theme.palette.error.main}}>
                            {
                                (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')?'':getCurrencyLabel(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD'))+
                                translatedAmount+
                                (t('RahNeil_N3.Irus.Currency.IsPlacedAfter')===false?'':getCurrencyLabel(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD'))
                            }
                        </Avatar>
                    </Badge>
                    <Typography variant="h6" component="h2" className={classes.advTypo}>
                        {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Title')}
                    </Typography>
                </Grid>
                <Typography variant="body2" className={classes.advTypo}>
                    {props.value===1?
                        <>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Small.0')}
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Small.1')}
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Small.2')}
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Small.3')}
                                </Grid>
                            </Grid>
                        </>
                    :
                        <>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Big.0')}
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Big.1')}
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={1}>
                                <Grid item>
                                    <span className={classes.bullet}>•</span>
                                </Grid>
                                <Grid item>
                                    {t('RahNeil_N3.Irus.Donations.Amount.Advantages.Big.2')}
                                </Grid>
                            </Grid>
                        </>
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 28,
        height: 28,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    card: {
        transition: theme.transitions.create('border-color'),
        height: '100%'
    },
    avatar: {
        color: theme.palette.getContrastText(theme.palette.background.paper),
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        width: theme.spacing(8),
        height: theme.spacing(8),

        transition: theme.transitions.create('border-color'),
    },
    badgeEnabled: {
        backgroundColor: theme.palette.success.main,
    },
    badgeDisabled: {
        backgroundColor: theme.palette.error.main,
        position: "absolute",
    },
    badgeIcon: {
        fontSize: 16,
    },
    advTypo: {
        marginTop: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
    }
}));