import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { Skeleton } from '@material-ui/lab';
import { Image } from '@material-ui/core';

export function NLanding(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const AutoPlaySwipeableViews = (SwipeableViews);

    const [activeStep, setActiveStep] = React.useState(0);
    
    return (
        <>
            <div className={classes.waveTopContainer}>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={classes.waveTopSvg}>
                    <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className={classes.waveTopPath} />
                </svg>
            </div>
            <img src='logo150_animated.gif' width='150px' height='150px' className={classes.logo} />
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={(step) => setActiveStep(step)}
                enableMouseEvents
                className={classes.views}
            >
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <div style={{backgroundImage: 'url('+step.imgPath+')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '100vh'}} alt={step.label} />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
        </>
    )
}

export function NLandingLoading(props) {
    const classes = useStyles();

    return (
        'landing'
    )
}

const tutorialSteps = [
    {
        label: 'Goč, Serbia',
        imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    }
];

const useStyles = makeStyles((theme) => ({
    title: {
        paddingBottom: theme.spacing(2)
    },
    waveTopSvg: {
        height: '100%',
        width: '100%',
        marginTop: theme.spacing(6),
    },
    waveTopContainer: {
        width: '100%',
        height: '150px',
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
    waveTopPath: {
        stroke: 'none',
        fill: theme.palette.primary.main,
    },
    logo: {
        position: 'absolute',
        top: 0,
        left: theme.spacing(8),
        zIndex: 1150,
    },
    views: {
        width: '100%',
    }
}));