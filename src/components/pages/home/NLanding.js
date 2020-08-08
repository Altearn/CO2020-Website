import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typist from 'react-typist';
import { goToAnchor } from 'react-scrollable-anchor';

import { Typography, Grid, useMediaQuery, Fade, Fab } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { NLogo, NLogoLoading } from './NLogo';
import { NLandingButtons, NLandingButtonsLoading } from './NLandingButtons';

export function NLanding(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    const [slideIndex, setSlideIndex] = React.useState(0);

    function NRenderTypist(param) {
        switch(slideIndex) {
            case 0:
                return (
                    <Typist className={classes.typist} cursor={{show: false}} onTypingDone={() => setSlideIndex(1)}>
                        {t('RahNeil_N3.Irus.Landing.Headline.Poverty')}
                        <Typist.Backspace count={t('RahNeil_N3.Irus.Landing.Headline.Poverty').length} delay={4000} />
                    </Typist>
                );
            case 1:
                return (
                    <Typist className={classes.typist} cursor={{show: false}} onTypingDone={() => setSlideIndex(2)}>
                        {t('RahNeil_N3.Irus.Landing.Headline.Deforestation')}
                        <Typist.Backspace count={t('RahNeil_N3.Irus.Landing.Headline.Deforestation').length} delay={4000} />
                    </Typist>
                );
            default:
                return (
                    <Typist className={classes.typist} cursor={{show: false}} onTypingDone={() => setSlideIndex(0)}>
                        {t('RahNeil_N3.Irus.Landing.Headline.War')}
                        <Typist.Backspace count={t('RahNeil_N3.Irus.Landing.Headline.War').length} delay={4000} />
                    </Typist>
                );
        }
    }
    
    return (
        <>
            {xs?null:
                <Fab
                    variant="extended"
                    size="medium"
                    color={props.isDarkTheme?"primary":"secondary"}
                    aria-label="Scroll"
                    className={classes.fab}
                    onClick={() => goToAnchor('donate')}
                >
                    {t('RahNeil_N3.Irus.Scroll')}
                    <ExpandMoreIcon/>
                </Fab>
            }

            <NLogo isDarkTheme={props.isDarkTheme} />

            <div className={classes.viewsContainer}>
                <Fade in={slideIndex===0} timeout={1000} appear={false}>
                    <div style={{backgroundImage: `url(${"/header1.png"})`}} className={classes.views} />
                </Fade>
                <Fade in={slideIndex===1} timeout={1000}>
                    <div style={{backgroundImage: `url(${"/header2.png"})`}} className={classes.views} />
                </Fade>
                <Fade in={slideIndex===2} timeout={1000}>
                    <div style={{backgroundImage: `url(${"/header3.png"})`}} className={classes.views} />
                </Fade>
                <div className={classes.viewsBackdrop} />
            </div>
            <Grid container alignItems='center' justify='center' direction='column' className={classes.headlineContainer} spacing={5}>
                <Grid item>
                    <Typography variant={xs?"h3":"h2"} className={classes.headline}>
                        <span>{t('RahNeil_N3.Irus.Landing.Headline.Title')}</span>
                    </Typography>
                    {sm?<br/>:null}
                    <Typography variant={xs?"h3":"h2"} className={classes.headline}>
                        &nbsp;<NRenderTypist/>&nbsp;
                    </Typography>
                </Grid>
                <Grid item>
                    <NLandingButtons/>
                </Grid>
            </Grid>
        </>
    )
}

export function NLandingLoading(props) {
    const classes = useStyles();
    const theme = useTheme();
    
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <>
            {xs?null:
                <Fab
                    variant="extended"
                    size="medium"
                    color={props.isDarkTheme?"primary":"secondary"}
                    aria-label="Scroll"
                    className={classes.fab}
                    onClick={() => goToAnchor('donate')}
                >
                    <Skeleton>
                        <span>
                            Scroll
                        </span>
                    </Skeleton>
                    <ExpandMoreIcon/>
                </Fab>
            }

            <NLogoLoading isDarkTheme={props.isDarkTheme} />

            <div className={classes.viewsContainer}>
                <div style={{backgroundImage: `url(${"/header1.png"})`}} className={classes.views} />
                <div className={classes.viewsBackdrop} />
            </div>
            <Grid container alignItems='center' justify='center' direction='column' className={classes.headlineContainer} spacing={5}>
                <Grid item>
                    <Typography variant="h2" className={classes.headline}>
                        <Skeleton className={classes.inline}>
                            <span>
                                Stand against
                            </span>
                        </Skeleton>
                    </Typography>
                    {sm?<br/>:null}
                    <Typography variant="h2" className={classes.headline}>
                        <Skeleton className={classes.inline}>
                            <span>
                                &nbsp;poverty&nbsp;
                            </span>
                        </Skeleton>
                    </Typography>
                </Grid>
                <Grid item>
                    <NLandingButtonsLoading/>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    views: {
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'fixed',
        zIndex: -1,
    },
    viewsContainer: {
        width: '100%',
        height: '100vh',
    },
    viewsBackdrop: {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#0004',
        zIndex: -1,
    },
    typist: {
        display: 'inline',
        borderBottom: '4px solid',
        borderBottomColor: '#6617cb',
    },
    headline: {
        color: theme.palette.common.white,
        textShadow: '2px 2px'+theme.palette.grey[800],
    },
    headlineContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        textAlign: 'center',
        width: '100%',
        margin: 0,
        marginTop: theme.spacing(4),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1,
    },
    inline: {
        maxWidth: 'none',
        display: 'inline',
    },
}));