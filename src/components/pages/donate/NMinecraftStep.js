import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { Collapse, Grid, Tooltip, TextField, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';

import { NMinecraftHead } from './NMinecraftHead'

export function NMinecraftStep(props) {
    const [username, setUsername] = React.useState('');
    const [usernameLinked, setUsernameLinked] = React.useState(null);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

    const handleUsernameChange = (event) => {
        var value = event.target.value;
        setUsername(value);
    }

    const handleMinecraftLink = (event) => {
        if (username==='') {
            props.setUuid(null);
            setUsernameLinked(null);
        }else{
            fetch("https://api.minetools.eu/uuid/"+username,
                { crossDomain: true, method: 'GET'}).then((res) => {
                    res.json().then((json) => {
                        props.setUuid(json.id==null?'a2b8d2c37729406888d3d569d4e23375':json.id);
                        setUsernameLinked(username);
                    }).catch(err => enqueueSnackbar(t('RahNeil_N3.Irus.Error.Display.Server_External'), {variant: 'error'}));
                }).catch(err => enqueueSnackbar(t('RahNeil_N3.Irus.Error.Display.Server_External'), {variant: 'error'}));
        }
    }

    return (
        <>
            <Collapse in={props.uuid===null}>
                <Alert severity="warning" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Minecraft.Warning.0')}
                    &nbsp;
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Warning.1')}
                    </strong>
                    &nbsp;
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Warning.2')}
                    &nbsp;
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Warning.3')}
                    </strong>
                    &nbsp;
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Warning.4')}
                </Alert>
            </Collapse>

            <Collapse in={props.uuid==='a2b8d2c37729406888d3d569d4e23375'}>
                <Alert severity="error" className={classes.alert}>
                    <strong>
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Error.0')}
                    </strong>
                    {t('RahNeil_N3.Irus.Donations.Minecraft.Error.1')}
                </Alert>
            </Collapse>

            <Collapse in={props.uuid!=='a2b8d2c37729406888d3d569d4e23375'&&props.uuid!==null}>
                <Alert severity="success" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Minecraft.Success.0')}
                    &nbsp;
                    <strong>
                        {usernameLinked}
                    </strong>
                    {t('RahNeil_N3.Irus.Donations.Minecraft.Success.1')}
                </Alert>
            </Collapse>

            <Grid container spacing={1} alignItems="center">
                {props.uuid!=='a2b8d2c37729406888d3d569d4e23375'&&props.uuid!==null?
                    <Tooltip title={usernameLinked} arrow>
                        <Grid item>
                            <NMinecraftHead uuid={props.uuid} username={username} />
                        </Grid>
                    </Tooltip>
                :
                    <Grid item>
                        <NMinecraftHead uuid={props.uuid} username={username} />
                    </Grid>
                }
                <Grid item style={{flex: fullScreen?1:'inherit'}}>
                    <TextField
                        label={t('RahNeil_N3.Irus.Donations.Minecraft.Username')}
                        value={username}
                        fullWidth={fullScreen}
                        onChange={handleUsernameChange}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleMinecraftLink}
                        disabled={username===usernameLinked||username===''}
                    >
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Link_Action')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export function NMinecraftStepLoading(props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

    return (
        <>
            <Alert severity="warning" className={classes.alert}>
                <Skeleton style={{maxWidth: 'inherit'}}>
                    <span>
                        This step is <strong>optional</strong>, but you won't be <strong>whitelisted</strong> if you don't link your Minecraft account.
                    </span>
                </Skeleton>
            </Alert>

            <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <img
                        height={36}
                        src={
                            "https://crafatar.com/renders/head/a2b8d2c37729406888d3d569d4e23375.png?overlay&default=606e2ff0ed7748429d6ce1d3321c7838"
                        }
                        alt="Loading..."
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label=" "
                        disabled
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled
                        fullWidth={fullScreen}
                        className={classes.linkButton}
                    >
                        <Skeleton>
                            <span>
                                Link
                            </span>
                        </Skeleton>
                    </Button>
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