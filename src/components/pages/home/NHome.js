import React, { Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ScrollableAnchor  from 'react-scrollable-anchor';

import { useMediaQuery } from '@material-ui/core';

import { NLanding, NLandingLoading } from './NLanding';
import { NCards } from './NCards';
import { NDiscord } from './NDiscord';
import { NLoading } from '../../NConsts';

export function NHome(props) {
    const classes = useStyles();
    const theme = useTheme();

    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <>
            <Suspense fallback={<NLandingLoading isDarkTheme={props.isDarkTheme} />}>
                {NLoading()?
                    <NLandingLoading isDarkTheme={props.isDarkTheme} />
                :
                    <NLanding isDarkTheme={props.isDarkTheme} />
                }
            </Suspense>

            
            <ScrollableAnchor id='donate'>
                <div className={classes.cards}>
                    {xs?null:
                        <>
                            <div className={classes.waveTopContainer}>
                                <svg preserveAspectRatio="none" className={classes.waveTopSvg} viewBox="0 0 1440 320">
                                    <path className={classes.waveTopPathWhite} d="M0,288L1440,128L1440,320L0,320Z" />
                                </svg>
                            </div>
                            <div className={classes.waveBottomContainer}>
                                <svg preserveAspectRatio="none" className={classes.waveTopSvg} viewBox="0 0 1440 320">
                                    <path className={classes.waveTopPathWhite} d="M0,32L1440,96L1440,0L0,0Z" />
                                </svg>
                            </div>
                        </>
                    }
                    <NCards />
                </div>
            </ScrollableAnchor>
            
            <ScrollableAnchor id='discord'>
                <div className={classes.discord}>
                    {xs?null:
                        <>
                            <div className={classes.waveTopContainer} style={{transform: 'scale(-1, -1)'}}>
                                <svg preserveAspectRatio="none" className={classes.waveTopSvg} viewBox="0 0 1440 320">
                                    <path className={classes.waveTopPathWhite} d="M0,32L1440,96L1440,0L0,0Z" />
                                </svg>
                            </div>
                            <div className={classes.waveBottomContainer} style={{transform: 'scaleX(-1)'}}>
                                <svg preserveAspectRatio="none" className={classes.waveTopSvg} viewBox="0 0 1440 320">
                                    <path className={classes.waveTopPathWhite} d="M0,32L1440,96L1440,0L0,0Z" />
                                </svg>
                            </div>
                        </>
                    }
                    <NDiscord />
                </div>
            </ScrollableAnchor>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    cards: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6),
        },
    },
    discord: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        marginTop: 'calc(210px + '+theme.spacing(2)+'px)',

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6),
        },
    },
    waveTopPathWhite: {
        stroke: 'none',
        fill: theme.palette.background.default,
    },
    waveTopPathPurple: {
        stroke: 'none',
        fill: theme.palette.primary.main,
    },
    waveTopContainer: {
        width: '100%',
        position: 'absolute',
        left: 0,
        top: -210,
        height: '210px',
        zIndex: -1,
    },
    waveBottomContainer: {
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: -210,
        height: '210px',
        zIndex: -1,
    },
    waveTopSvg: {
        height: '100%',
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: theme.spacing(-5),
        left: 0,
        width: '100%',
        textAlign: 'center',
    }
}));