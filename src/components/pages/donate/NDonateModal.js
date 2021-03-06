import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { Dialog, Collapse, Slide, useTheme, useMediaQuery, Backdrop, CircularProgress } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NMinecraftStep, NMinecraftStepLoading } from './NMinecraftStep.js';
import { NDiscordStep } from './NDiscordStep.js';
import { NAmountStep } from "./NAmountStep";
import { NAssoStep } from './NAssoStep.js';
import { NCheckoutStep } from './NCheckoutStep.js';
import { NDonateModalForm } from './NDonateModalForm.js';
import { NDonateModalSuccess } from './NDonateModalSuccess.js';
import { NLoading } from '../../NConsts';

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
    const [discordId, setDiscordId] = React.useState(null);
    const [amount, setAmount] = React.useState(5);
    const [currency, setCurrency] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [successStep, setSuccessStep] = React.useState(0);
    const [processing, setProcessing] = React.useState(false);

    const [DS_discordPfpUrl, DS_setDiscordPfpUrl] = React.useState(null);
    const [DS_tag, DS_setTag] = React.useState('');
    const [DS_tagLinked, DS_setTagLinked] = React.useState(null);
    const [DS_username, DS_setUsername] = React.useState('');
    const [DS_usernameLinked, DS_setUsernameLinked] = React.useState(null);

    const [MS_username, MS_setUsername] = React.useState('');
    const [MS_usernameLinked, MS_setUsernameLinked] = React.useState(null);

    const [DT_firstName, DT_setFirstName] = React.useState('');
    const [DT_lastName, DT_setLastName] = React.useState('');
    const [DT_email, DT_setEmail] = React.useState('');
    const [DT_address, DT_setAddress] = React.useState('');
    const [DT_city, DT_setCity] = React.useState('');
    const [DT_postalCode, DT_setPostalCode] = React.useState('');
    const [DT_state, DT_setState] = React.useState('');
    const [DT_country, DT_setCountry] = React.useState('');
    const [DT_phone, DT_setPhone] = React.useState('');
    const [DT_gender, DT_setGender] = React.useState('');
    const [DT_age, DT_setAge] = React.useState('');

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
                    <NMinecraftStep
                        uuid={uuid}
                        setUuid={setUuid}
                        username={MS_username}
                        setUsername={MS_setUsername}
                        usernameLinked={MS_usernameLinked}
                        setUsernameLinked={MS_setUsernameLinked}
                        processing={processing}
                        setProcessing={setProcessing}
                    />
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
                        discordId={discordId}
                        setDiscordId={setDiscordId}
                        discordPfpUrl={DS_discordPfpUrl}
                        setDiscordPfpUrl={DS_setDiscordPfpUrl}
                        tag={DS_tag}
                        setTag={DS_setTag}
                        tagLinked={DS_tagLinked}
                        setTagLinked={DS_setTagLinked}
                        username={DS_username}
                        setUsername={DS_setUsername}
                        usernameLinked={DS_usernameLinked}
                        setUsernameLinked={DS_setUsernameLinked}
                        processing={processing}
                        setProcessing={setProcessing}
                    />
                ),
            }
        },
        {
            label: {
                placeholder: "Choose donation amount",
                translation: "RahNeil_N3.Irus.Donations.Amount.Title",
            },
            content: {
                translation: (
                    <NAmountStep
                        amount={amount}
                        setAmount={setAmount}
                        currency={currency}
                        setCurrency={setCurrency}
                    />
                ),
            }
        },
        {
            label: {
                placeholder: "Fill out association's infos",
                translation: "RahNeil_N3.Irus.Donations.Asso.Title",
            },
            content: {
                translation: (
                    <NAssoStep
                        firstName={DT_firstName}
                        setFirstName={DT_setFirstName}
                        lastName={DT_lastName}
                        setLastName={DT_setLastName}
                        email={DT_email}
                        setEmail={DT_setEmail}
                        address={DT_address}
                        setAddress={DT_setAddress}
                        city={DT_city}
                        setCity={DT_setCity}
                        postalCode={DT_postalCode}
                        setPostalCode={DT_setPostalCode}
                        state={DT_state}
                        setState={DT_setState}
                        country={DT_country}
                        setCountry={DT_setCountry}
                        phone={DT_phone}
                        setPhone={DT_setPhone}
                        gender={DT_gender}
                        setGender={DT_setGender}
                        age={DT_age}
                        setAge={DT_setAge}
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
                        discordId={discordId}
                        amount={amount}
                        currency={currency}
                        uuid={uuid}
                        setProcessing={setProcessing}
                        firstName={DT_firstName}
                        lastName={DT_lastName}
                        email={DT_email}
                        address={DT_address}
                        city={DT_city}
                        postalCode={DT_postalCode}
                        state={DT_state}
                        country={DT_country}
                        phone={DT_phone}
                        gender={DT_gender}
                        age={DT_age}
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
                        {NLoading()?
                            <Skeleton><span>Donate now</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Title' />
                        }
                    </Suspense>
                }
                aria-describedby={
                    <Suspense fallback={<Skeleton><span>Donate to support the charity of your choice :D\nThe donation amount isn't restricted</span></Skeleton>}>
                        {NLoading()?
                            <Skeleton><span>Donate to support the charity of your choice :D\nThe donation amount isn't restricted</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Description' />
                        }
                    </Suspense>
                }
                fullScreen={fullScreen}
                maxWidth='sm'
                keepMounted
                TransitionComponent={Transition}
                fullWidth
                scroll='body'
            >
                <Backdrop className={classes.backdrop} open={processing}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Collapse in={!success}>
                    <NDonateModalForm handleClose={handleClose} steps={steps} />
                </Collapse>
                <Collapse in={success} className={classes.successWrapper}>
                    <NDonateModalSuccess successStep={successStep} />
                </Collapse>
        </Dialog>
      </>
    );
}

const useStyles = makeStyles((theme) => ({
    successWrapper: {
        overflow: 'hidden',
    },
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff',
    }
}));