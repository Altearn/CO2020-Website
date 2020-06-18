import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

export function NAppBarTitle() {
    const { t } = useTranslation();
    const classes = useStyles();
    
    return (
        <Typography className={classes.title} variant="h6" color="inherit" nowrap>
            {t('RahNeil_N3.Irus.Title')}
        </Typography>
    )
}

export function NAppBarTitleLoading() {
    const classes = useStyles();

    return (
        <Typography className={classes.title} variant="h6" color="inherit" nowrap>
            <Skeleton>
                <span>
                    Irus
                </span>
            </Skeleton>
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
}));