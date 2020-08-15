import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export function NAssoStep(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Alert severity="info" className={classes.alert}>
                {t('RahNeil_N3.Irus.Donations.Asso.Info.0')}
                &nbsp;
                <strong>
                    {t('RahNeil_N3.Irus.Donations.Asso.Info.1')}
                </strong>
                {t('RahNeil_N3.Irus.Donations.Asso.Info.2')}
                &nbsp;
                <strong>
                    {t('RahNeil_N3.Irus.Donations.Asso.Info.3')}
                </strong>
                &nbsp;
                {t('RahNeil_N3.Irus.Donations.Asso.Info.4')}
                &nbsp;
                <strong>
                    {t('RahNeil_N3.Irus.Donations.Asso.Info.5')}
                </strong>
                &nbsp;
                {t('RahNeil_N3.Irus.Donations.Asso.Info.6')}
            </Alert>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="LastName"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Last_Name')}
                        type="text"
                        autoComplete="section-asso family-name"
                        value={props.lastName}
                        onChange={(event) => props.setLastName(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="FirstName"
                        label={t('RahNeil_N3.Irus.Donations.Asso.First_Name')}
                        type="text"
                        autoComplete="section-asso given-name"
                        value={props.firstName}
                        onChange={(event) => props.setFirstName(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="Email"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Email')}
                        type="email"
                        autoComplete="section-asso home email"
                        value={props.email}
                        onChange={(event) => props.setEmail(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="Address"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Address')}
                        type="text"
                        autoComplete="section-asso street-address"
                        value={props.address}
                        onChange={(event) => props.setAddress(event.target.value)}
                        className={classes.fullWidth}
                        multiline
                        rows={2}
                    />
                </Grid>
                <Grid item xs={6} sm={8}>
                    <TextField
                        id="City"
                        label={t('RahNeil_N3.Irus.Donations.Asso.City')}
                        type="text"
                        autoComplete="section-asso address-level2"
                        value={props.city}
                        onChange={(event) => props.setCity(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="PostalCode"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Postal_Code')}
                        type="text"
                        autoComplete="section-asso postal-code"
                        value={props.postalCode}
                        onChange={(event) => props.setPostalCode(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="State"
                        label={t('RahNeil_N3.Irus.Donations.Asso.State')}
                        type="text"
                        autoComplete="section-asso address-level1"
                        value={props.state}
                        onChange={(event) => props.setState(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="Country"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Country')}
                        type="text"
                        autoComplete="section-asso country-name"
                        value={props.country}
                        onChange={(event) => props.setCountry(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="Phone"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Phone_Number')}
                        type="text"
                        autoComplete="section-asso tel-country-code tel"
                        value={props.phone}
                        onChange={(event) => {
                            if (/^(\+|\d)((\d(| ))+|)$/.test(event.target.value)||event.target.value==='') props.setPhone(event.target.value);
                        }}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="Gender"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Gender')}
                        type="text"
                        autoComplete="section-asso sex"
                        value={props.gender}
                        onChange={(event) => props.setGender(event.target.value)}
                        className={classes.fullWidth}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="Age"
                        label={t('RahNeil_N3.Irus.Donations.Asso.Age')}
                        value={props.age}
                        onChange={(event) => {
                            if (/^\d+$/.test(event.target.value)||event.target.value==='') props.setAge(event.target.value);
                        }}
                        className={classes.fullWidth}
                    />
                </Grid>
            </Grid>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    alert: {
        marginBottom: theme.spacing(2),
    },
    fullWidth: {
        width: '100%',
    }
}));