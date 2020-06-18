import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { useSnackbar } from 'notistack';

import { Dialog, TextField, Grid, DialogTitle, InputAdornment, Collapse, DialogActions, Slide, Button, DialogContent, useTheme, useMediaQuery, IconButton, Typography } from '@material-ui/core';
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
                            <Grid item>
                                <img
                                    height={36}
                                    src={
                                        "https://crafatar.com/renders/head/"
                                        +(uuid===null?'a2b8d2c37729406888d3d569d4e23375':uuid)+".png?overlay&default=606e2ff0ed7748429d6ce1d3321c7838"
                                    }
                                    alt={username}
                                />
                            </Grid>
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
                                    label='Discord username'
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
                        amount={5}
                        shippingPreference='NO_SHIPPING'
                        onAuthorize={(details, data) => {
                            alert("Transaction completed by " + details.payer.name.given_name);
                    
                            // OPTIONAL: Call your server to save the transaction
                            return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                    orderID: data.orderID
                                })
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
    }
}));