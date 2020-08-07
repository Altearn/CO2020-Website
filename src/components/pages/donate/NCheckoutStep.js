import React from 'react';
import { useTranslation } from 'react-i18next';
import { PayPalButton } from "react-paypal-button-v2";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { CircularProgress, Grid } from '@material-ui/core'; 

export function NCheckoutStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [currency, setCurrency] = React.useState(props.currency||t('RahNeil_N3.Irus.Currency.Default.Code')||'USD');
    const [loading, setLoading] = React.useState(true);

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
                        props.setProcessing(true);
                        return fetch('/api/createOrder/' + Number(props.amount).toFixed(2) + '/' + currency, {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(data) {
                            return data.id;
                        });
                    }}
                    onApprove={function(data, actions) {
                        return fetch('/api/approveOrder/'+data.orderID+'/'
                            +(props.discordId===''?'null':props.discordId)
                            +'/'+(props.uuid===null?'null':props.uuid),
                        {
                            method: 'post'
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
                        clientId: "AZou0pB8z1QnlmJkSH9Gyi2M8gyEykclrkbargPTSQGrsqFKeGbvZIQvNO8GEnqjsdCOWIC4R5-2kKg8"
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