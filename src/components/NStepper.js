import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import { Skeleton } from '@material-ui/lab';
import { Stepper, Step, StepLabel, StepContent, Button, MobileStepper, useMediaQuery, useTheme } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export function NStepper(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBackStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const ActionsStep = (subProps) => {
        return (
            <div className={subProps.noMargins?null:classes.actionsContainer}>
                <div>
                    <Button
                        disabled={subProps.index === 0}
                        onClick={handleBackStep}
                        className={classes.button}
                    >
                        {t('RahNeil_N3.Irus.Back')}
                    </Button>
                    {subProps.index === props.steps.length-1 ?null:
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            className={classes.button}
                        >
                            {t('RahNeil_N3.Irus.Next')}
                        </Button>
                    }
                </div>
            </div>
        );
    }

    return (
        useMediaQuery(theme => theme.breakpoints.up('sm'))?
            <Stepper activeStep={activeStep} orientation="vertical">
                {props.steps.map((data, index) => (
                    <Step key={data.label.placeholder}>
                        <StepLabel>
                            {t(data.label.translation)}
                        </StepLabel>
                        <StepContent>
                            {data.content.translation}
                            <ActionsStep index={index} noMargins={data.noMargins} />
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        :
            <>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {props.steps.map((data, index) => (
                        <div className={classes.mobileStep} key={data.label.placeholder}>
                            {data.content.translation}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    variant="dots"
                    steps={props.steps.length}
                    activeStep={activeStep}
                    nextButton={
                            <Button
                                size="small"
                                onClick={activeStep !== props.steps.length-1 ? handleNextStep:null}
                                disabled={activeStep===props.steps.length-1}
                            >
                                {t('RahNeil_N3.Irus.Next')}
                                {theme.direction === 'rtl' ?
                                    <KeyboardArrowLeft />
                                :
                                    <KeyboardArrowRight />
                                }
                            </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBackStep} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            {t('RahNeil_N3.Irus.Back')}
                        </Button>
                    }
                />
            </>
    )
}

export function NStepperLoading(props) {
    const classes = useStyles();
    const theme = useTheme();

    const ActionsStep = () => {
        return (
            <div className={classes.actionsContainer}>
                <div>
                    <Button
                        disabled
                        className={classes.button}
                    >
                        <Skeleton>
                            <span>
                                Back
                            </span>
                        </Skeleton>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        <Skeleton>
                            <span>
                                Next
                            </span>
                        </Skeleton>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        useMediaQuery(theme => theme.breakpoints.up('sm'))?
            <Stepper activeStep={0} orientation="vertical">
                {props.steps.map((data, index) => (
                    index===0?
                        <Step key={data.label.placeholder}>
                            <StepLabel>
                                <Skeleton>
                                    <span>
                                        {data.label.placeholder}
                                    </span>
                                </Skeleton>
                            </StepLabel>
                            <StepContent>
                                {data.content.placeholder}
                                <ActionsStep />
                            </StepContent>
                        </Step>
                    :
                        <Step key={data.label.placeholder}>
                            <StepLabel>
                                <Skeleton>
                                    <span>
                                        {data.label.placeholder}
                                    </span>
                                </Skeleton>
                            </StepLabel>
                        </Step>
                ))}
            </Stepper>
        :
            <>
                <div className={classes.mobileStep} key={props.steps[0].label.placeholder}>
                    {props.steps[0].content.placeholder}
                </div>
                <MobileStepper
                    variant="dots"
                    steps={props.steps.length}
                    activeStep={0}
                    nextButton={
                        <Button size="small">
                            <Skeleton>
                                <span>
                                    Next
                                </span>
                            </Skeleton>
                            {theme.direction === 'rtl' ?
                                <KeyboardArrowLeft />
                            :
                                <KeyboardArrowRight />
                            }
                        </Button>
                    }
                    backButton={
                        <Button size="small" disabled>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            <Skeleton>
                                <span>
                                    Back
                                </span>
                            </Skeleton>
                        </Button>
                    }
                />
            </>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
    },
    mobileStepper: {
        flex: 1,
    },
    mobileStep: {
        overflow: 'hidden',
        padding: theme.spacing(4),
        paddingTop: 0,
    },
}));