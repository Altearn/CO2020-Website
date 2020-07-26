import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Typography, Grid, useScrollTrigger, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function NLogo(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const md = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <div className={classes.waveTopContainer}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={classes.waveTopSvg}>
                    <path d="M0,192L1440,0L1440,0L0,0Z" className={classes.waveTopPath} style={{fill: props.isDarkTheme?'#08040a':theme.palette.secondary.main}} />
                </svg>
            </div>
            {xs?null:
                <Grid container alignItems='center' className={classes.header} style={{position: md?'absolute':'fixed'}}>
                    <div className={trigger?classes.logoContainerAnimated:classes.logoContainer}>
                        <img alt={t('RahNeil_N3.Irus.Logo')} src='logo150_animated.gif' width='150px' height='150px' className={trigger?classes.logoAnimated:classes.logo} />
                    </div>
                    {!md?
                        <div className={trigger?classes.titleContainerAnimated:classes.titleContainer}>
                            <Typography variant='h4' className={trigger?classes.titleAnimated:classes.title}>
                                {t('RahNeil_N3.Irus.Title')}
                            </Typography>
                        </div>
                    :null}
                </Grid>
            }
        </>
    );
}

export function NLogoLoading(props) {
    const classes = useStyles();
    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const md = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <div className={classes.waveTopContainer}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={classes.waveTopSvg}>
                    <path d="M0,192L1440,0L1440,0L0,0Z" className={classes.waveTopPath} style={{fill: props.isDarkTheme?'#08040a':theme.palette.secondary.main}} />
                </svg>
            </div>
            {xs?null:
                <Grid container alignItems='center' className={classes.header} style={{position: md?'absolute':'fixed'}}>
                    <div className={trigger?classes.logoContainerAnimated:classes.logoContainer}>
                        <img alt="Creative Olympics's Logo" src='logo150_animated.gif' width='150px' height='150px' className={trigger?classes.logoAnimated:classes.logo} />
                    </div>
                    {!md?
                        <div className={trigger?classes.titleContainerAnimated:classes.titleContainer}>
                            <Typography variant='h4' className={trigger?classes.titleAnimated:classes.title}>
                                <Skeleton>
                                    <span>
                                        Creative Olympics
                                    </span>
                                </Skeleton>
                            </Typography>
                        </div>
                    :null}
                </Grid>
            }
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        marginBottom: theme.spacing(6),
        marginLeft: theme.spacing(2),
        transition: 'all .2s ease-out',
    },
    titleAnimated: {
        color: theme.palette.common.white,
        marginBottom: theme.spacing(6),
        marginLeft: theme.spacing(2),
        transition: 'all .2s ease-in',
        transform: 'translate(-315px, -50px)',
    },
    titleContainer: {
        transition: 'all .2s ease-in',
    },
    titleContainerAnimated: {
        transition: 'all .2s ease-out',
        transform: 'scale(.6)',
    },
    logo: {
        transition: 'all .2s ease-out',
    },
    logoAnimated: {
        transition: 'all .2s ease-in',
        transform: 'translate(-210px, -110px)',
    },
    logoContainer: {
        transition: 'all .2s ease-in',
    },
    logoContainerAnimated: {
        transition: 'all .2s ease-out',
        transform: 'scale(.4)',
    },
    waveTopSvg: {
        height: '100%',
        width: '100%',
        marginTop: theme.spacing(6),

        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(4),
        },
    },
    waveTopContainer: {
        width: '100%',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
        transform: 'scaleY(.5)',

        height: '160px',
        [theme.breakpoints.down('md')]: {
            height: '191px',
        },
        [theme.breakpoints.down('xs')]: {
            height: '160px',
        },
    },
    waveTopPath: {
        stroke: 'none',
    },
    header: {
        top: 0,
        left: '5%',
        zIndex: 1150,
        width: 'auto',
    },
}));