import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { CardContent, CardMedia, Typography, Grid, Tooltip, SvgIcon, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import HistoryIcon from '@material-ui/icons/History';

import { NCard } from '../../NCard';

function CrownIcon() {
    const classes = useStyles();

    return (
        <SvgIcon color="action" className={classes.smallIcon}>
            <path fill="currentColor" d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
        </SvgIcon>
    );
}

function PodiumTopIcon() {
    const classes = useStyles();

    return (
        <SvgIcon color="action" className={classes.podium}>
            <path fill="currentColor" d="M12,7.09L14.45,8.58L13.8,5.77L16,3.89L13.11,3.64L12,1L10.87,3.64L8,3.89L10.18,5.77L9.5,8.58L12,7.09M15,23H9V10H15V23M1,17V23H7V17H1M5,21H3V19H5V21M17,13V23H23V13H17M21,21H19V15H21V21Z" />
        </SvgIcon>
    );
}

function PodiumSecondIcon() {
    const classes = useStyles();

    return (
        <SvgIcon color="action" className={classes.podium}>
            <path fill="currentColor" d="M20,10.09L22.45,11.58L21.8,8.77L24,6.89L21.11,6.64L20,4L18.87,6.64L16,6.89L18.18,8.77L17.5,11.58L20,10.09M23,23H17V13H23V23M1,17V23H7V17H1M5,21H3V19H5V21M9,10V23H15V10H9M13,21H11V12H13V21Z" />
        </SvgIcon>
    );
}

function PodiumThirdIcon() {
    const classes = useStyles();

    return (
        <SvgIcon color="action" className={classes.podium}>
            <path fill="currentColor" d="M4,13.09L6.45,14.58L5.8,11.77L8,9.89L5.11,9.64L4,7L2.87,9.64L0,9.89L2.18,11.77L1.5,14.58L4,13.09M7,23H1V17H7V23M9,10V23H15V10H9M13,21H11V12H13V21M17,13V23H23V13H17M21,21H19V15H21V21Z" />
        </SvgIcon>
    );
}

export function NDonatorCard(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const isScreenLarge = useMediaQuery(useTheme().breakpoints.up("lg"));
    const currencies = [
        { value: 'USD', label: '$' },
        { value: 'EUR', label: '€' },
        { value: 'GBP', label: '£' },
    ];
    const [username, setUsername] = React.useState(null);
    const labelFromCurrencyCode = (code) => currencies.find(c => c.value === code).label;

    useEffect(() => {
        fetch("https://api.minetools.eu/uuid/"+props.uuid, {crossDomain: true, method: 'GET'}).then((res) => {
            res.json().then((json) => {
                setUsername(json.name);
            }).catch(err => enqueueSnackbar(t('RahNeil_N3.Irus.Error.Display.Server_External'), {variant: 'error'}));
        }).catch(err => enqueueSnackbar(t('RahNeil_N3.Irus.Error.Display.Server_External'), {variant: 'error'}));
    }, [props.uuid, enqueueSnackbar, t])            

    function NDonatorCardIconLabel() {
        return (
            <>
                <Grid item className={classes.icon}>
                    {props.latest?<HistoryIcon className={classes.smallIcon} color="action" />:null}
                    {props.top?isScreenLarge?<PodiumTopIcon/>:<CrownIcon/>:null}
                    {props.second?<PodiumSecondIcon/>:null}
                    {props.third?<PodiumThirdIcon/>:null}
                </Grid>
                <Grid item className={classes.labelWrap}>
                    <Typography variant="subtitle1" color="textSecondary" noWrap>
                        {props.latest?t('RahNeil_N3.Irus.Cards.Latest.Short'):null}
                        {props.top?t('RahNeil_N3.Irus.Cards.Top.Short'):null}
                        {props.second?t('RahNeil_N3.Irus.Cards.Second.Short'):null}
                        {props.third?t('RahNeil_N3.Irus.Cards.Third.Short'):null}
                    </Typography>
                </Grid>
            </>
        );
    }

    const longText = t('RahNeil_N3.Irus.Cards.'+
        (props.top?'Top':'')+
        (props.latest?'Latest':'')+
        (props.second?'Second':'')+
        (props.third?'Third':'')+
        '.Long');

    return (
        username==null?
            <NDonatorCardLoading {...props} />
        :
            <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="subtitle1" noWrap>
                        {username}
                    </Typography>
                    <Typography gutterBottom component="h5" variant="h4">
                        {props.amount}{labelFromCurrencyCode(props.currency || 'USD')}
                    </Typography>

                    {longText===null?
                        <Grid container alignItems='center' wrap='nowrap'>
                            <NDonatorCardIconLabel />
                        </Grid>
                    :
                        <Tooltip title={longText} arrow>
                            <Grid container alignItems='center' wrap='nowrap'>
                                <NDonatorCardIconLabel />
                            </Grid>
                        </Tooltip>
                    }
                </CardContent>
                <Tooltip title={username} arrow>
                    <CardMedia
                        className={classes.cover}
                        image={"https://crafatar.com/renders/body/"+props.uuid+".png?overlay&default=MHF_"+(Math.random()>=0.5?"Steve":"Alex")}
                        title="neil3000"
                    />
                </Tooltip>
            </NCard>
    );
}

export function NDonatorCardLoading(props) {
    const classes = useStyles();
    const isScreenLarge = useMediaQuery(useTheme().breakpoints.up("lg"));

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardContent className={classes.content}>
                <Typography variant="subtitle1">
                    <Skeleton>
                        <span>
                            neil3000
                        </span>
                    </Skeleton>
                </Typography>
                <Typography gutterBottom component="h5" variant="h4">
                    <Skeleton>
                        <span>
                            50$
                        </span>
                    </Skeleton>
                </Typography>
                <Grid container alignItems='center' wrap='nowrap'>
                    <Grid item className={classes.icon}>
                        {props.latest?<HistoryIcon className={classes.smallIcon} color="action" />:null}
                        {props.top?isScreenLarge?<PodiumTopIcon/>:<CrownIcon/>:null}
                        {props.second?<PodiumSecondIcon/>:null}
                        {props.third?<PodiumThirdIcon/>:null}
                    </Grid>
                    <Grid item className={classes.labelWrap}>
                        <Typography variant="subtitle1" noWrap>
                            <Skeleton className={classes.inline}>
                                <span>
                                    {props.latest?'Most recent':null}
                                    {props.top?'Top donator':null}
                                    {props.second?'Second best':null}
                                    {props.third?'Third best':null}
                                </span>
                            </Skeleton>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Skeleton variant="rect">
                <CardMedia
                    className={classes.cover}
                    image="https://crafatar.com/renders/body/08831584-f289-40e0-b572-d1ae7363ec96.png?overlay&default=MHF_Steve"
                    title='Loading...'
                />
            </Skeleton>
        </NCard>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    cover: {
        width: 151,
        height: 151,
        backgroundPosition: 'top',
        backgroundSize: 'auto',
        flexBasis: '50%',
    },
    content: {
        flex: 1,
        flexBasis: '50%',
        minWidth: 0,
    },
    icon: {
        paddingRight: theme.spacing(1),
    },
    smallIcon: {
        marginTop: '2px',
        marginBottom: '-2px',
    },
    podium: {
        marginTop: '-2px',
        marginBottom: '2px',
    },
    labelWrap: {
        width: '85%',
    },
    inline: {
        maxWidth: 'none',
    }
}));