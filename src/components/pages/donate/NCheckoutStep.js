import React from 'react';
import { useTranslation } from 'react-i18next';
import { PayPalButton } from "react-paypal-button-v2";
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

export function NCheckoutStep(props) {

    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    return (
        <PayPalButton
            createOrder={function(data, actions) {
                props.setProcessing(true);
                return fetch('/api/createOrder/' + Number(props.amount).toFixed(2) + '/' + props.currency, {
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
                clientId: "AZou0pB8z1QnlmJkSH9Gyi2M8gyEykclrkbargPTSQGrsqFKeGbvZIQvNO8GEnqjsdCOWIC4R5-2kKg8"
            }}
            currency={props.currency}
        />
    );
}