import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { Grid, Typography, Badge, Avatar, Card, CardHeader, Chip, IconButton, Tooltip, SvgIcon } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LaunchIcon from '@material-ui/icons/Launch';

import { NLoading } from '../../NConsts';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

const sponsorsNetwork = {
    "sirlinium": {
        type: "Website",
        url: "Play-mc.fr"
    },
    "Sotshi": {
        type: "YouTube",
        url: "youtube.com/channel/UCIcUrmQxb48Ctyyq7Ck3iNQ"
    },
    "NOPEname": {
        type: "YouTube",
        url: "youtube.com/channel/UC7qxEChJNOMVrfNRKU1mw6g"
    },
    "Greninja_San - ME^TEAM": {
        type: "Twitch",
        url: "twitch.tv/greninja_san"
    },
    "aypierre": {
        type: "YouTube",
        url: "youtube.com/channel/UCA5sfitizqs1oEbB5KY4uKQ"
    },
    "mathaym25": {
        type: "YouTube",
        url: "youtube.com/channel/UCsKdMck1EvRpu-aktfTMntw"
    },
    "Silvathor": {
        type: "YouTube",
        url: "youtube.com/channel/UCe_nGFDs5_r1hRbL5l3JcfQ"
    }
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

export function NSponsorCard(props) {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={
                    (props.data.online?
                        <StyledBadge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant="dot"
                        >
                            <Avatar alt={props.data.username} src={props.data.avatarURL} />
                        </StyledBadge>
                    :
                        <Avatar alt={props.data.username} src={props.data.avatarURL} />
                    )
                }
                title={
                    <Grid container spacing={1} alignItems='center' wrap='nowrap'>
                        <Grid item>
                            <Typography variant='subtitle2' noWrap>
                                {props.data.username}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.chipGrid}>
                            {
                                (props.data.partner?
                                    <Chip size="small" label="Partner" color='primary' />
                                :
                                    <Chip size="small" label="Sponsor" className={classes.sponsorChip} />
                                )
                            }
                        </Grid>
                        {sponsorsNetwork[props.data.username]?
                            <Grid item>
                                <Tooltip title={
                                    (sponsorsNetwork[props.data.username].type==='Website'?
                                        sponsorsNetwork[props.data.username].url
                                    :
                                        <>
                                            <Suspense fallback={"Check out"}>
                                                {NLoading()?
                                                    "Check out"
                                                :
                                                    <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Account.0' />
                                                }
                                            </Suspense>
                                            &nbsp;
                                            {sponsorsNetwork[props.data.username].type}
                                            &nbsp;
                                            <Suspense fallback={"account"}>
                                                {NLoading()?
                                                    "account"
                                                :
                                                    <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Account.1' />
                                                }
                                            </Suspense>
                                        </>
                                    )
                                } arrow>
                                    <IconButton
                                        aria-label={
                                            (sponsorsNetwork[props.data.username].type==='Website'?
                                                sponsorsNetwork[props.data.username].url
                                            :
                                                <>
                                                    <Suspense fallback={"Check out"}>
                                                        {NLoading()?
                                                            "Check out"
                                                        :
                                                            <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Account.0' />
                                                        }
                                                    </Suspense>
                                                    &nbsp;
                                                    {sponsorsNetwork[props.data.username].type}
                                                    &nbsp;
                                                    <Suspense fallback={"account"}>
                                                        {NLoading()?
                                                            "account"
                                                        :
                                                            <Translation t='RahNeil_N3.Irus.Discord.Sponsors.Account.1' />
                                                        }
                                                    </Suspense>
                                                </>
                                            )
                                        }
                                        target="_blank"
                                        rel="noopener"
                                        href={"https://"+sponsorsNetwork[props.data.username].url}
                                    >
                                        {sponsorsNetwork[props.data.username].type==='YouTube'?<YouTubeIcon />:null}
                                        {sponsorsNetwork[props.data.username].type==='Website'?<LaunchIcon />:null}
                                        {sponsorsNetwork[props.data.username].type==='Twitch'?
                                            <SvgIcon>
                                                <path fill="currentColor" d="M11.64 5.93H13.07V10.21H11.64M15.57 5.93H17V10.21H15.57M7 2L3.43 5.57V18.43H7.71V22L11.29 18.43H14.14L20.57 12V2M19.14 11.29L16.29 14.14H13.43L10.93 16.64V14.14H7.71V3.43H19.14Z" />
                                            </SvgIcon>
                                        :null}
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        :null}
                    </Grid>
                }
            />
        </Card>
    )
}

export function NSponsorCardLoading(props) {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={
                    <Skeleton variant="circle" width={40} height={40} />
                }
                title={
                    <Grid container spacing={1} alignItems='center' wrap='nowrap'>
                        <Grid item>
                            <Typography variant='subtitle2' noWrap>
                                <Skeleton>
                                    <span>
                                        neil3000
                                    </span>
                                </Skeleton>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.chipGrid}>
                            <Chip size="small" label="Sponsor" className={classes.sponsorChip} />
                        </Grid>
                    </Grid>
                }
            />
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    chipGrid: {
        flex: 1,
    },
    sponsorChip: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
    }
}));