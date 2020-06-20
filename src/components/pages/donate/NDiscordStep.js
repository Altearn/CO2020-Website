import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Collapse, Grid, TextField, InputAdornment } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export function NDiscordStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Collapse in={props.username===''||props.tag.length<4}>
                <Alert severity="warning" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Warning.0')}
                    &nbsp;
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Discord.Warning.1')}
                    </strong>
                    &nbsp;
                    {t('RahNeil_N3.Irus.Donations.Discord.Warning.2')}
                    &nbsp;
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Discord.Warning.3')}
                    </strong>
                    &nbsp;
                    {t('RahNeil_N3.Irus.Donations.Discord.Warning.4')}
                </Alert>
            </Collapse>

            <Collapse in={props.username!==''&&props.tag.length===4}>
                <Alert severity="info" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Info.0')}
                    &nbsp;
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Discord.Info.1')}
                    </strong>
                    &nbsp;
                    {t('RahNeil_N3.Irus.Donations.Discord.Info.2')}
                </Alert>
            </Collapse>

            <Grid container direction='row'>
                <Grid item style={{flex: 1}}>
                    <TextField
                        label={t('RahNeil_N3.Irus.Donations.Discord.Username')}
                        value={props.username}
                        onChange={(event) => props.setUsername(event.target.value)}
                        style={{width: 'auto'}}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label=' '
                        placeholder='1234'
                        value={props.tag}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                #
                                </InputAdornment>
                            ),
                        }}
                        style={{width: '64px'}}
                        onChange={(event) => {
                            if ((event.target.value.length<=4 && /^\d+$/.test(event.target.value))
                                ||event.target.value==='') props.setTag(event.target.value);
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    alert: {
        marginBottom: theme.spacing(2),
    },
}));