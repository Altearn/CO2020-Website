import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { Grid, Typography, SvgIcon, Divider, Collapse, Slide, Dialog, DialogTitle, IconButton, Button, DialogContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import { NMainButton, NMainButtonLoading } from '../../NMainButton';
import { NSponsorCard } from './NSponsorCard';
import { NLoading } from '../../NConsts';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NDiscord(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const [discordValues, setDiscordValues] = React.useState({
        onlineCount: null,
        memberCount: null,
        sponsors: [],
    });
    const [sponsorIndex, setSponsorIndex] = React.useState(0);
    const [dialogOpened, setDialogOpened] = React.useState(false);
    
    React.useEffect(() => {
        const reloadDiscord = () => {
            fetch('/api/discord/').then(res => {
                res.json().then(res => {
                    setDiscordValues(res);
                    setSponsorIndex(0);
                    const timeoutID = window.setTimeout(() => {
                        setSponsorIndex(1);
                        window.clearTimeout(timeoutID);
                    }, 5000);
                })
                .catch(err => enqueueSnackbar(
                    <Suspense fallback="We're unable to reach a third-party server, some things may not display properly">
                        {NLoading()?
                            "We're unable to reach a third-party server, some things may not display properly"
                        :
                            <Translation t='RahNeil_N3.Irus.Error.Display.Server_External'/>
                        }
                    </Suspense>,
                    {variant: 'error'}));
            }).catch(err => enqueueSnackbar(
                <Suspense fallback="We're unable to reach a third-party server, some things may not display properly">
                    {NLoading()?
                        "We're unable to reach a third-party server, some things may not display properly"
                    :
                        <Translation t='RahNeil_N3.Irus.Error.Display.Server_External'/>
                    }
                </Suspense>,
                {variant: 'error'}));
        }
        reloadDiscord();
    }, [enqueueSnackbar]);

    return (
        <Grid container alignItems='center' direction='column' spacing={2}>
            <Grid item style={{textAlign: 'center'}}>
                <Typography variant='h5'>
                    <Suspense fallback={<Skeleton className={classes.inline}><span>Join us on Discord now !</span></Skeleton>}>
                        {NLoading()?
                            <Skeleton className={classes.inline}><span>Join us on Discord now !</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Join_Now.Long' />
                        }
                    </Suspense>
                </Typography>
                <Typography gutterBottom variant='subtitle1' color='textSecondary'>
                    {discordValues.memberCount||<Skeleton className={classes.inline}><span>999</span></Skeleton>}
                    &nbsp;
                    <Suspense fallback={<Skeleton className={classes.inline}><span>members</span></Skeleton>}>
                        {NLoading()?
                            <Skeleton className={classes.inline}><span>members</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Discord.Members' />
                        }
                    </Suspense>
                    &nbsp;&mdash;&nbsp;
                    {discordValues.onlineCount||<Skeleton className={classes.inline}><span>999</span></Skeleton>}
                    &nbsp;
                    <Suspense fallback={<Skeleton className={classes.inline}><span>online</span></Skeleton>}>
                        {NLoading()?
                            <Skeleton className={classes.inline}><span>online</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Discord.Online' />
                        }
                    </Suspense>
                </Typography>
            </Grid>
            <Grid item>
                <Suspense fallback={
                    <NMainButtonLoading
                        variant="contained"
                        size="large"
                        startIcon={
                            <SvgIcon>
                                <path fill="currentColor" d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
                            </SvgIcon>
                        }
                        placeholder='Join now'
                        target="_blank"
                        rel="noopener"
                        href="https://discord.gg/fBj6xxC"
                    />
                }>
                    {NLoading()?
                        <NMainButtonLoading
                            variant="contained"
                            size="large"
                            startIcon={
                                <SvgIcon>
                                    <path fill="currentColor" d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
                                </SvgIcon>
                            }
                            placeholder='Join now'
                            target="_blank"
                            rel="noopener"
                            href="https://discord.gg/fBj6xxC"
                        />
                    :
                        <NMainButton
                            variant="contained"
                            size="large"
                            startIcon={
                                <SvgIcon>
                                    <path fill="currentColor" d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
                                </SvgIcon>
                            }
                            translation='RahNeil_N3.Irus.Discord.Sponsors.Join_Now.Short'
                            target="_blank"
                            rel="noopener"
                            href="https://discord.gg/fBj6xxC"
                        />
                    }
                </Suspense>
            </Grid>
            <Grid item style={{margin: theme.spacing(2), width: 500}}>
                <Divider variant="middle" />
            </Grid>
            <Grid item>
                {discordValues.sponsors.map(function(data, index){
                    return (
                        <Collapse in={sponsorIndex===index} onEnter={() => {
                            const timeoutID = window.setTimeout(() => {
                                setSponsorIndex(sponsorIndex>=discordValues.sponsors.length-1?0:(sponsorIndex+1));
                                window.clearTimeout(timeoutID);
                            }, 5000);
                        }}>
                            <NSponsorCard data={data} />
                        </Collapse>
                    );
                })}
            </Grid>
            <Grid item>
                <Suspense fallback={
                    <Button size="small" variant="outlined">
                        <Skeleton><span>All sponsors</span></Skeleton>
                    </Button>
                }>
                    {NLoading()?
                        <Button size="small" variant="outlined">
                            <Skeleton><span>All sponsors</span></Skeleton>
                        </Button>
                    :
                        <Button size="small" variant="outlined" onClick={() => setDialogOpened(true)}>
                            <Translation t='RahNeil_N3.Irus.Discord.Sponsors.All' />
                        </Button>
                    }
                </Suspense>
                <Dialog
                    onClose={() => setDialogOpened(false)}
                    aria-labelledby={
                        <Suspense fallback="Sponsors">
                            {NLoading()?
                                "Sponsors"
                            :
                                <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Title' />
                            }
                        </Suspense>
                    }
                    scroll="body"
                    open={dialogOpened}
                    fullWidth
                    maxWidth='lg'
                    keepMounted
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="dialogSponsorsID" className={classes.title} disableTypography>
                        <Typography className={classes.titleTypography} variant="h5" component="span">
                            <Suspense fallback={<Skeleton><span>Sponsors</span></Skeleton>}>
                                {NLoading()?
                                    <Skeleton><span>Sponsors</span></Skeleton>
                                :
                                    <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Title' />
                                }
                            </Suspense>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setDialogOpened(false)}
                            aria-label={
                                <Suspense fallback="Close">
                                    {NLoading()?
                                        "Close"
                                    :
                                        <Translation t='RahNeil_N3.Irus.Close' />
                                    }
                                </Suspense>
                            }
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            {discordValues.sponsors.map(function(data, index){
                                return (
                                    <Grid item xs={12} sm={12} md={6} lg={4}>
                                        <NSponsorCard data={data} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    titleTypography: {
        flex: 1,
    },
    inline: {
        maxWidth: 'none',
        display: 'inline',
    },
}));