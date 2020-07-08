import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { Collapse, Grid, TextField, InputAdornment, Button, Avatar, Zoom, useTheme, Link, useMediaQuery, Backdrop, CircularProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import red from '@material-ui/core/colors/red';
import EditIcon from '@material-ui/icons/Edit';

import { NCard } from '../../NCard';

export function NDiscordStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const fullScreen = useMediaQuery(useTheme().breakpoints.up('md'));
    const [discordPfpUrl, setDiscordPfpUrl] = React.useState(null);
    const [tag, setTag] = React.useState('');
    const [tagLinked, setTagLinked] = React.useState(null);
    const [username, setUsername] = React.useState('');
    const [usernameLinked, setUsernameLinked] = React.useState(null);
    const [usernameFocused, setUsernameFocused] = React.useState(false);
    const usernameRef = React.useRef(null);
    const [error, setError] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    //WARNING: change thoses values in NApp as well !
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark',
            primary: red,
            secondary: {
                main: '#f44336',
            },
            background: {
                default: '#121212'
            },
            card: {
                backgroundColor: '#ff6600',
            },
        },
    });

    const handleDiscordLink = () => {
        setProcessing(true);
        fetch('/api/discordprofile/'+username+'/'+tag).then(res => {
            res.json().then(res => {
                if(res.status === 'success') {
                    props.setDiscordId(res.id);
                    setTagLinked(res.tag);
                    setUsernameLinked(res.nickname);
                    setDiscordPfpUrl(res.avatarURL);
                    setError(false);
                }else {
                    props.setDiscordId(null);
                    setTagLinked(tag);
                    setUsernameLinked(username);
                    setError(true);
                }
                setProcessing(false);
            })
            .catch(err => {
                enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
                setProcessing(false);
            });
        }).catch(err => {
            enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
            setProcessing(false);
        });
    }

    return (
        <>
            <Backdrop className={classes.backdrop} open={processing}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Collapse in={!error && props.discordId===null}>
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

            <Collapse in={props.discordId!==null}>
                <Alert severity="success" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Success.0')}
                    &nbsp;<strong>{usernameLinked}</strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Success.1')}
                </Alert>
            </Collapse>

            <Collapse in={error}>
                <Alert severity="error" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.0')}
                    &nbsp;
                    <strong>
                        {usernameLinked+'#'+tagLinked}
                    </strong>
                    &nbsp;
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.1')}
                    &nbsp;
                    <Link target="_blank" rel="noopener" href="https://discord.gg/fBj6xxC">
                        {t('RahNeil_N3.Irus.Donations.Discord.Error.2')}
                    </Link>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.3')}
                </Alert>
            </Collapse>
            <ThemeProvider theme={themeDark}>
                <NCard isDarkTheme className={classes.fullWidth}>
                    <Grid container className={classes.content} spacing={3}>
                        <Grid item>
                            <Collapse in={props.discordId===null}>
                                <Avatar
                                    className={classes.avatar}
                                    src={'https://discord.com/assets/1cbd08c76f8af6dddce02c5138971129.png'}
                                />
                            </Collapse>
                            <Collapse in={props.discordId!==null}>
                                <Avatar
                                    className={classes.avatar}
                                    src={discordPfpUrl}
                                />
                            </Collapse>
                        </Grid>
                        <Grid item style={{flex: 1}} ref={usernameRef}>
                            <TextField
                                placeholder={t('RahNeil_N3.Irus.Donations.Discord.Username')}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                style={{
                                    width: fullScreen?(usernameFocused?(usernameRef.current.offsetWidth-128)+"px":Math.min((username===''?(t('RahNeil_N3.Irus.Donations.Discord.Username').length+2.2):username.length+1.2),20.2)+"ch"):'10.2ch'
                                }}
                                className={classes.usernameInput}
                            />
                            <TextField
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
                            <Zoom in={!usernameFocused&&fullScreen}>
                                <EditIcon className={classes.editIcon} />
                            </Zoom>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems='center' className={classes.fullWidthHeight}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDiscordLink}
                                        disableElevation
                                        disabled={ (username===usernameLinked&&tag===tagLinked) || username==='' || tag.length<4 || processing }
                                    >
                                        {t('RahNeil_N3.Irus.Donations.Minecraft.Link_Action')}
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </NCard>
            </ThemeProvider>
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
    content: {
        padding: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    fullWidth: {
        width: '100%',
    },
    fullWidthHeight: {
        width: '100%',
        height: '100%',
    },
    usernameInput: {
        transition: theme.transitions.create('width'),
        width: 0,
    },
    editIcon: {
        color: theme.palette.grey[600],
        margin: theme.spacing(.5, 0, 0, 1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));