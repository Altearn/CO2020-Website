import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

export function NLanding(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const [activeStep, setActiveStep] = React.useState(0);
    
    return (
        <>
            <div className={classes.waveTopContainer}>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={classes.fullSize}>
                    <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className={classes.waveTop} />
                </svg>
            </div>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={(step) => setActiveStep(step)}
                enableMouseEvents
            >
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                        <img className={classes.img} src={step.imgPath} alt={step.label} />
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
    fullSize: {
        height: '100%',
        width: '100%'
    },
    waveTopContainer: {
        height: '150px',
        overflow: 'hidden'
    },
    waveTop: {
        stroke: 'none',
        fill: theme.palette.primary.main
    }
}));