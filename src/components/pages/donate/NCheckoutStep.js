import React from 'react';
import { useTranslation } from 'react-i18next';
import { PayPalButton } from "react-paypal-button-v2";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";

import { CircularProgress, Grid } from '@material-ui/core';

import { NPaypalInfo } from '../../NConsts';

export function NCheckoutStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [currency, setCurrency] = React.useState(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD');
    const [loading, setLoading] = React.useState(true);

    let { ref } = useParams();

    React.useEffect(() => {
        setCurrency(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD');
    }, [props.currency, t]);

    return (
        <div className={classes.root}>
            {loading?
                <Grid container alignItems='center' justify='center' className={classes.loadingGrid}>
                    <CircularProgress />
                </Grid>
            :null}

            <div style={{visibility: loading?'hidden':'visible'}}>
                <PayPalButton
                    createOrder={function(data, actions) {
                        console.debug("CHECK 0");
                        // props.setProcessing(true);
                        // return fetch('/api/createOrder/' + Number(props.amount).toFixed(2) + '/' + currency, {
                        //     method: 'post'
                        // }).then(function(res) {
                        //     console.debug("CHECK 0.1");
                        //     return res.json();
                        // }).then(function(data) {
                        //     console.debug("CHECK 0.2");
                        //     return data.id;
                        // });
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: props.amount
                                }
                            }]
                        });
                    }}
                    onApprove={function(data, actions) {
                        return fetch('/api/approveOrder/', {
                            body: JSON.stringify({
                                orderId: data.orderID,
                                discordId: (props.discordId===''?'null':props.discordId),
                                uuid: (props.uuid===null?'null':props.uuid),
                                ref: (ref===null?'null':(ref||'null')),
                                firstName: props.firstName||null,
                                lastName: props.lastName||null,
                                email: props.email||null,
                                address: props.address||null,
                                city: props.city||null,
                                postalCode: props.postalCode||null,
                                state: props.state||null,
                                country: props.country||null,
                                phone: props.phone||null,
                                gender: props.gender||null,
                                age: props.age||null,
                            }),
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then(function(res) {
                            return res.json();
                        }).then(function(data) {
                            props.setProcessing(false);
                            if (data.status==='success') {
                                props.onSuccess();
                            }else{
                                enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
                                history.push('/');
                            }
                        });
                    }}
                    catchError={(error) => {
                        props.setProcessing(false);
                        enqueueSnackbar(error, {variant: 'error'});
                        history.push('/');
                    }}
                    onError={() => {
                        props.setProcessing(false);
                        enqueueSnackbar(t('RahNeil_N3.Irus.Error.General'), {variant: 'error'});
                        history.push('/');
                    }}
                    onCancel={() => {
                        props.setProcessing(false);
                        enqueueSnackbar(t('RahNeil_N3.Irus.Donations.Checkout.Snackbar.Cancelled'), {variant: 'warning'});
                    }}
                    options={{
                        currency: currency,
                        clientId: NPaypalInfo().client_id,
                        debug: true
                    }}
                    onButtonReady={() => setLoading(false)}
                    currency={currency}
                />
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: '142px',
    },
    loadingGrid: {
        position: 'absolute',
        height: '100%',
    }
}));