import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { Collapse, Grid, TextField, InputAdornment, Button, Avatar, Zoom, useTheme, Link, useMediaQuery, Card } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';

export function NDiscordStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const fullScreen = useMediaQuery(useTheme().breakpoints.up('md'));
    const phoneScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

    const [usernameFocused, setUsernameFocused] = React.useState(false);
    const usernameRef = React.useRef(null);
    const [error, setError] = React.useState(false);

    //WARNING: change thoses values in NApp as well !
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#6b54b6',
            },
            secondary: {
                main: '#120a17',
            },
        },
    });

    const handleDiscordLink = () => {
        props.setProcessing(true);
        fetch('/api/discordprofile/'+props.username+'/'+props.tag).then(res => {
            res.json().then(res => {
                if(res.status === 'success') {
                    props.setDiscordId(res.id);
                    props.setTagLinked(res.tag);
                    props.setUsernameLinked(res.username);
                    props.setDiscordPfpUrl(res.avatarURL);
                    setError(false);
                }else {
                    props.setDiscordId(null);
                    props.setTagLinked(props.tag);
                    props.setUsernameLinked(props.username);
                    setError(true);
                }
                props.setProcessing(false);
            })
            .catch(err => {
                enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
                props.setProcessing(false);
            });
        }).catch(err => {
            enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
            props.setProcessing(false);
        });
    }

    return (
        <>
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
                    &nbsp;<strong>{props.usernameLinked}</strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Success.1')}
                </Alert>
            </Collapse>

            <Collapse in={error}>
                <Alert severity="error" className={classes.alert}>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.0')}
                    &nbsp;
                    <strong>
                        {props.usernameLinked+'#'+props.tagLinked}
                    </strong>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.1')}
                    &nbsp;
                    <Link target="_blank" rel="noopener" href="https://discord.gg/fBj6xxC">
                        {t('RahNeil_N3.Irus.Donations.Discord.Error.2')}
                    </Link>
                    {t('RahNeil_N3.Irus.Donations.Discord.Error.3')}
                </Alert>
            </Collapse>
            <ThemeProvider theme={themeDark}>
                <Card className={classes.fullWidth}>
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
                                    src={props.discordPfpUrl}
                                />
                            </Collapse>
                        </Grid>
                        <Grid item style={{flex: 1}} ref={usernameRef}>
                            <Grid container>
                                <Grid item style={{flex: phoneScreen?1:0, display: phoneScreen?'flex':'block'}}>
                                    <TextField
                                        placeholder={t('RahNeil_N3.Irus.Donations.Discord.Username')}
                                        value={props.username}
                                        onChange={(event) => props.setUsername(event.target.value)}
                                        onFocus={() => setUsernameFocused(true)}
                                        onBlur={() => setUsernameFocused(false)}
                                        style={{
                                            width: phoneScreen?'auto':(fullScreen?(usernameFocused?(usernameRef.current.offsetWidth-128)+"px":Math.min((props.username===''?(t('RahNeil_N3.Irus.Donations.Discord.Username').length+2.2):props.username.length+1.2),20.2)+"ch"):'10.2ch')
                                        }}
                                        className={classes.usernameInput}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
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
                                    <Zoom in={!usernameFocused&&fullScreen}>
                                        <EditIcon className={classes.editIcon} />
                                    </Zoom>
                                </Grid>
                            </Grid>
                        </Grid>
                        {phoneScreen?null:
                            <Grid item>
                                <Grid container alignItems='center' className={classes.fullWidthHeight}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleDiscordLink}
                                            disableElevation
                                            disabled={ (props.username===props.usernameLinked&&props.tag===props.tagLinked) || props.username==='' || props.tag.length<4 || props.processing }
                                        >
                                            {t('RahNeil_N3.Irus.Donations.Minecraft.Link_Action')}
                                        </Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    {phoneScreen?
                        <div className={classes.fullWidthPadding}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDiscordLink}
                                disableElevation
                                className={classes.fullWidth}
                                startIcon={<LinkIcon />}
                                disabled={ (props.username===props.usernameLinked&&props.tag===props.tagLinked) || props.username==='' || props.tag.length<4 || props.processing }
                            >
                                {t('RahNeil_N3.Irus.Donations.Minecraft.Link_Action')}
                            </Button>
                        </div>
                    :null}
                </Card>
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
    fullWidthPadding: {
        width: '100%',
        padding: theme.spacing(0, 2, 2, 2),
    },
    fullWidthHeight: {
        width: '100%',
        height: '100%',
    },
    usernameInput: {
        transition: theme.transitions.create('width'),
        flex: 1,
        width: 0,
    },
    editIcon: {
        color: theme.palette.grey[600],
        margin: theme.spacing(.5, 0, 0, 1),
    }
}));