import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import {Collapse, Grid, TextField, InputAdornment, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

export function NDiscordStep(props) {

    const { t } = useTranslation();
    const classes = useStyles();

    const defaultPfp = "data:image/png;base64,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"
    const defaultNickname = t('RahNeil_N3.Irus.Donations.Discord.Username');

    const [username, setUsername] = React.useState('');
    const [usernameLinked, setUsernameLinked] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [tagLinked, setTagLinked] = React.useState('');
    const [error, setError] = React.useState(false);

    if(! props.discordNickname) props.setDiscordNickname(defaultNickname);
    if(! props.discordPfpUrl) props.setDiscordPfpUrl(defaultPfp);

    const handleDiscordLink = () => {
        fetch('/api/discordprofile/'+username+'/'+tag).then(res => {
            res.json().then(res => {
                setUsernameLinked(username);
                setTagLinked(tag);
                if(res.status === 'success') {
                    props.setDiscordId(res.id);
                    props.setDiscordNickname(res.nickname);
                    props.setDiscordPfpUrl(res.avatarURL);
                    setError(false);
                }
                else {
                    props.setDiscordId('');
                    props.setDiscordNickname(defaultNickname);
                    props.setDiscordPfpUrl(defaultPfp);
                    setError(true);
                }
            })
            .catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    return (
        <>
            <Collapse in={ !error && props.discordId === '' && (username===''||tag.length<4) }>
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

            <Collapse in={ !error && props.discordId === '' && (username!==''&&tag.length===4) }>
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

            <Collapse in={ props.discordId !== '' }>
                <Alert severity="success" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Success.0')}
                    &nbsp;<strong>{usernameLinked}</strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Success.1')}
                </Alert>
            </Collapse>

            <Collapse in={ error }>
                <Alert severity="error" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.0')}
                    &nbsp;<strong>{username+'#'+tag}</strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.1')}
                    &nbsp;<strong>{t('RahNeil_N3.Irus.Donations.Discord.Error.2')}</strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.3')}
                </Alert>
            </Collapse>

            <Grid container direction='row'>
                <Grid item style={{flex: 1}}>
                    <TextField
                        label={t('RahNeil_N3.Irus.Donations.Discord.Username')}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        style={{width: 'auto'}}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label=' '
                        placeholder='1234'
                        value={tag}
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
                                ||event.target.value==='') setTag(event.target.value);
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container direction='row'>
                <Grid item style={{width:'80%'}}>
                    <Box class={classes.profileBox}>
                        <Grid container direction='row' alignItems='center'>
                            <Grid item style={{marginLeft: '2%'}}>
                                <Avatar
                                    src={props.discordPfpUrl}
                                />
                            </Grid>
                            <Grid item style={{marginLeft: '10%'}}>
                                <p>{props.discordNickname}</p>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item style={{width:'20%', height:'100%'}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleDiscordLink}
                        disabled={ (username===usernameLinked&&tag===tagLinked) || username==='' || tag.length<4 }
                    >
                        {t('RahNeil_N3.Irus.Donations.Minecraft.Link_Action')}
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
    profileBox: {
        background: '#2C2F33',
    },
}));