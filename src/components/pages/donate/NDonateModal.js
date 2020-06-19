import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { useSnackbar } from 'notistack';

import { Dialog, TextField, Grid, DialogTitle, Fade, Tooltip, InputAdornment, Collapse, DialogActions, Slide, Button, DialogContent, useTheme, useMediaQuery, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton, Alert } from '@material-ui/lab';

import { NStepper, NStepperLoading } from '../../NStepper.js';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NDonateModal(props) {
    const history = useHistory();
    const [uuid, setUuid] = React.useState(null);
    const [username, setUsername] = React.useState('');
    const [discordUsername, setDiscordUsername] = React.useState('');
    const [discordTag, setDiscordTag] = React.useState('');
    const [usernameLinked, setUsernameLinked] = React.useState(null);
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [success, setSuccess] = React.useState(false);
    const [successStep, setSuccessStep] = React.useState(0);

    const handleClose = () => {
        history.push('/');
    }

    const handleUsernameChange = (event) => {
        var value = event.target.value;
        setUsername(value);
    }

    const handleMinecraftLink = (event) => {
        if (username==='') {
            setUuid(null);
            setUsernameLinked(null);
        }else{
            fetch("https://api.minetools.eu/uuid/"+username,
                { crossDomain: true, method: 'GET'}).then((res) => {
                    res.json().then((json) => {
                        setUuid(json.id==null?'a2b8d2c37729406888d3d569d4e23375':json.id);
                        setUsernameLinked(username);
                    }).catch( e => {
                        console.log(e);
                    });
                }).catch( e => {
                    console.log(e);
                });
        }
    }

    function MinecraftHead() {
        return (
            <img
                height={36}
                src={
                    "https://crafatar.com/renders/head/"
                    +(uuid===null?'a2b8d2c37729406888d3d569d4e23375':uuid)+".png?overlay&default=606e2ff0ed7748429d6ce1d3321c7838"
                }
                alt={username}
            />
        );
    }

    const steps = [
        {
            label: {
                placeholder: "Link Minecraft account",
                translation: "RahNeil_N3.Irus.Donations.Minecraft.Title",
            },
            content: {
                placeholder: (
                    <>
                        <Alert severity="warning" className={classes.alert} classes={{display: 'flex'}}>
                            <Skeleton style={{maxWidth: 'inherit'}}>
                                <span>
                                    This step is <strong>optional</strong>, but you won't be <strong>whitelisted</strong> if you don't link your Minecraft account.
                                </span>
                            </Skeleton>
                        </Alert>
    
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <img
                                    height={36}
                                    src={
                                        "https://crafatar.com/renders/head/a2b8d2c37729406888d3d569d4e23375.png?overlay&default=606e2ff0ed7748429d6ce1d3321c7838"
                                    }
                                    alt="Loading..."
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label=" "
                                    disabled
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled
                                    fullWidth={fullScreen}
                                    className={classes.linkButton}
                                >
                                    <Skeleton>
                                        <span>
                                            Link
                                        </span>
                                    </Skeleton>
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ),
                translation: (
                    <>
                        <Collapse in={uuid===null}>
                            <Alert severity="warning" className={classes.alert}>
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Warning.0'/>
                                &nbsp;
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Warning.1'/>
                                </strong>
                                &nbsp;
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Warning.2'/>
                                &nbsp;
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Warning.3'/>
                                </strong>
                                &nbsp;
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Warning.4'/>
                            </Alert>
                        </Collapse>

                        <Collapse in={uuid==='a2b8d2c37729406888d3d569d4e23375'}>
                            <Alert severity="error" className={classes.alert}>
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Error.0'/>
                                </strong>
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Error.1'/>
                            </Alert>
                        </Collapse>

                        <Collapse in={uuid!=='a2b8d2c37729406888d3d569d4e23375'&&uuid!==null}>
                            <Alert severity="success" className={classes.alert}>
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Success.0'/>
                                &nbsp;
                                <strong>
                                    {usernameLinked}
                                </strong>
                                <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Success.1'/>
                            </Alert>
                        </Collapse>
    
                        <Grid container spacing={1} alignItems="center">
                            {uuid!=='a2b8d2c37729406888d3d569d4e23375'&&uuid!==null?
                                <Tooltip title={usernameLinked} arrow>
                                    <Grid item>
                                        <MinecraftHead/>
                                    </Grid>
                                </Tooltip>
                            :
                                <Grid item>
                                    <MinecraftHead/>
                                </Grid>
                            }
                            <Grid item style={{flex: fullScreen?1:'inherit'}}>
                                <TextField
                                    label={
                                        <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Username'/>
                                    }
                                    value={username}
                                    fullWidth={fullScreen}
                                    onChange={handleUsernameChange}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleMinecraftLink}
                                    disabled={username===usernameLinked||username===''}
                                >
                                    <Translation t='RahNeil_N3.Irus.Donations.Minecraft.Link_Action'/>
                                </Button>
                            </Grid>
                        </Grid>
                    </>
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
                    <>
                        <Collapse in={discordUsername===''||discordTag.length<4}>
                            <Alert severity="warning" className={classes.alert}>
                                <Translation t='RahNeil_N3.Irus.Donations.Discord.Warning.0'/>
                                &nbsp;
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Discord.Warning.1'/>
                                </strong>
                                &nbsp;
                                <Translation t='RahNeil_N3.Irus.Donations.Discord.Warning.2'/>
                                &nbsp;
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Discord.Warning.3'/>
                                </strong>
                                &nbsp;
                                <Translation t='RahNeil_N3.Irus.Donations.Discord.Warning.4'/>
                            </Alert>
                        </Collapse>

                        <Collapse in={discordUsername!==''&&discordTag.length===4}>
                            <Alert severity="info" className={classes.alert}>
                                <Translation t='RahNeil_N3.Irus.Donations.Discord.Info.0'/>
                                &nbsp;
                                <strong>
                                    <Translation t='RahNeil_N3.Irus.Donations.Discord.Info.1'/>
                                </strong>
                                &nbsp;
                                <Translation t='RahNeil_N3.Irus.Donations.Discord.Info.2'/>
                            </Alert>
                        </Collapse>

                        <Grid container>
                            <Grid item>
                                <TextField
                                    label={
                                        <Translation t='RahNeil_N3.Irus.Donations.Discord.Username'/>
                                    }
                                    value={discordUsername}
                                    onChange={(event) => setDiscordUsername(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label=' '
                                    placeholder='1234'
                                    value={discordTag}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            #
                                          </InputAdornment>
                                        ),
                                    }}
                                    style={{width: '64px'}}
                                    onChange={(event) => {
                                        if ((event.target.value.length<=4 && /^\d+$/.test(event.target.value))
                                            ||event.target.value==='') setDiscordTag(event.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </>
                ),
            }
        },
        {
            label: {
                placeholder: "Choose amount & checkout",
                translation: "RahNeil_N3.Irus.Donations.Checkout.Title",
            },
            content: {
                translation: (
                    <PayPalButton
                        createOrder={function(data, actions) {
                            return fetch('/api/createOrder/5.00', {
                                method: 'post'
                            }).then(function(res) {
                                return res.json();
                            }).then(function(data) {
                                return data.id;
                            });
                        }}
                        onApprove={function(data, actions) {
                            return fetch('/api/approveOrder/'+data.orderID+'/'
                                +(discordUsername===''?'null':discordUsername)
                                +'/'+(discordTag===''?'null':discordTag),
                            {
                                method: 'post'
                            }).then(function(res) {
                                return res.json();
                            }).then(function(data) {
                                if (data.status==='success') {
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
                                    }, 4500);
                                    const timeoutID5 = window.setTimeout(() => {
                                        setSuccess(false);
                                        setSuccessStep(0);
                                        window.clearTimeout(timeoutID5);
                                    }, 4750);
                                }else{
                                    enqueueSnackbar(
                                        <Translation t='RahNeil_N3.Irus.Error.General' />
                                    , {variant: 'error'});
                                    history.push('/');
                                }
                            });
                        }}
                        catchError={(error) => {
                            enqueueSnackbar(error, {variant: 'error',});
                            history.push('/');
                        }}
                        onError={() => {
                            enqueueSnackbar(
                                <Translation t='RahNeil_N3.Irus.Error.General' />
                            , {variant: 'error'});
                            history.push('/');
                        }}
                        onCancel={() => {
                            enqueueSnackbar(
                                <Translation t='RahNeil_N3.Irus.Donations.Checkout.Snackbar.Cancelled' />
                            , {variant: 'warning'});
                        }}
                        options={{
                            clientId: "Aem1NU0lE5_WzawW0TOiHCj4RhxBWlbuR-oEv7khOF_m86E7hUpOhOtO8ioY_LYNMu61VJsAShTUxdSd"
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
                    <DialogContent dividers>
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
    alert: {
        marginBottom: theme.spacing(2),
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