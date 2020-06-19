import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { Dialog, DialogTitle, Fade, InputAdornment, Collapse, DialogActions, Slide, Button, DialogContent, useTheme, useMediaQuery, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab';

import { NStepper, NStepperLoading } from '../../NStepper.js';
import { NMinecraftStep, NMinecraftStepLoading } from './NMinecraftStep.js';
import { NDiscordStep } from './NDiscordStep.js';
import { NCheckoutStep } from './NCheckoutStep.js';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NDonateModal(props) {
    const history = useHistory();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();

    const [uuid, setUuid] = React.useState(null);
    const [discordUsername, setDiscordUsername] = React.useState('');
    const [discordTag, setDiscordTag] = React.useState('');

    const [success, setSuccess] = React.useState(false);
    const [successStep, setSuccessStep] = React.useState(0);

    const handleClose = () => {
        history.push('/');
    }

    const steps = [
        {
            label: {
                placeholder: "Link Minecraft account",
                translation: "RahNeil_N3.Irus.Donations.Minecraft.Title",
            },
            content: {
                placeholder: (
                    <NMinecraftStepLoading />
                ),
                translation: (
                    <NMinecraftStep uuid={uuid} setUuid={setUuid} />
                ),
            }
        },
        {
            label: {
                placeholder: "Link Discord account",
                translation: "RahNeil_N3.Irus.Donations.Discord.Title",
            },
            content: {
                translation: (
                    <NDiscordStep
                        username={discordUsername}
                        setUsername={setDiscordUsername}
                        tag={discordTag}
                        setTag={setDiscordTag}
                    />
                ),
            }
        },
        {
            label: {
                placeholder: "Checkout",
                translation: "RahNeil_N3.Irus.Donations.Checkout.Title",
            },
            content: {
                translation: (
                    <NCheckoutStep
                        discordUsername={discordUsername}
                        discordTag={discordTag}
                        onSuccess={() => {
                            setSuccess(true);

                            const timeoutID = window.setTimeout(() => {
                                setSuccessStep(1);
                                window.clearTimeout(timeoutID);
                            }, 500);
                            const timeoutID2 = window.setTimeout(() => {
                                setSuccessStep(2);
                                window.clearTimeout(timeoutID2);
                            }, 1750);
                            const timeoutID3 = window.setTimeout(() => {
                                setSuccessStep(3);
                                window.clearTimeout(timeoutID3);
                            }, 2250);
                            const timeoutID4 = window.setTimeout(() => {
                                history.push('/');
                                window.clearTimeout(timeoutID4);
                            }, 5000);
                            const timeoutID5 = window.setTimeout(() => {
                                setSuccess(false);
                                setSuccessStep(0);
                                window.clearTimeout(timeoutID5);
                            }, 5250);
                        }}
                    />
                ),
            },
            noMargins: true,
        },
    ];
    
    return (
        <>
            <Dialog
                open={props.opened}
                onClose={handleClose}
                aria-labelledby={
                    <Suspense fallback={<Skeleton><span>Donate now</span></Skeleton>}>
                        <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Title' />
                    </Suspense>
                }
                aria-describedby={
                    <Suspense fallback={<Skeleton><span>Donate to support the charity of your choice :D\nThe donation amount isn't restricted</span></Skeleton>}>
                        <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Description' />
                    </Suspense>
                }
                fullScreen={fullScreen}
                maxWidth='sm'
                keepMounted
                TransitionComponent={Transition}
                fullWidth
                scroll='body'
            >
                <Collapse in={!success}>
                    <DialogTitle className={classes.title} disableTypography>
                        <Typography className={classes.titleTypography} variant="h5" component="span">
                            <Suspense fallback={<Skeleton><span>Donate now</span></Skeleton>}>
                                <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Title' />
                            </Suspense>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Suspense fallback={<NStepperLoading steps={steps} />}>
                            <NStepper steps={steps} />
                        </Suspense>
                    </DialogContent>
                    {fullScreen?null:
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                <Suspense fallback={<Skeleton><span>Cancel</span></Skeleton>}>
                                    <Translation t='RahNeil_N3.Irus.Cancel' />
                                </Suspense>
                            </Button>
                        </DialogActions>
                    }
                </Collapse>
                <Collapse in={success} className={classes.successWrapper}>
                    <DialogContent className={classes.successContent}>
                        {successStep>=1?
                            <>
                                <svg
                                    id="successAnimation"
                                    class="animated"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="154"
                                    height="154"
                                    viewBox="0 0 70 70"
                                >
                                    <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
                                    <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
                                    <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
                                </svg>
                                <Fade in={successStep>1} timeout={1500}>
                                    <Typography gutterbottom variant="h4" component="h2" className={classes.successTitle}>
                                        <Translation t='RahNeil_N3.Irus.Donations.Success.Title' />
                                    </Typography>
                                </Fade>
                                <Fade in={successStep>2} timeout={1500}>
                                    <Typography variant="subtitle1" component="p" className={classes.successDescription}>
                                        <Translation t='RahNeil_N3.Irus.Donations.Success.Description' />
                                    </Typography>
                                </Fade>
                            </>
                        :null}
                    </DialogContent>
                </Collapse>
        </Dialog>
      </>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    titleTypography: {
        flex: 1,
    },
    successContent: {
        backgroundColor: theme.palette.success.main,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            height: '75vh',
        },
    },
    successWrapper: {
        overflow: 'hidden',
    },
    successTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.white,
    },
    successDescription: {
        color: theme.palette.common.white,
        paddingBottom: theme.spacing(10),
    }
}));