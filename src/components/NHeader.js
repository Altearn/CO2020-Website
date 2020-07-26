import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

export function NHeader(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    
    return (
        <Typography className={props.className||classes.title} variant={props.size||"h5"}>
            {t(props.translation)}
        </Typography>
    )
}

export function NHeaderLoading(props) {
    const classes = useStyles();

    return (
        <Typography className={props.className||classes.title} variant={props.size||"h5"}>
            <Skeleton>
                <span>
                    {props.placeholder}
                </span>
            </Skeleton>
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        paddingBottom: theme.spacing(2),
    }
}));