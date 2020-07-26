import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function NMainButton(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Button className={classes.button} {...props}>
            {t(props.translation)}
        </Button>
    );
}

export function NMainButtonLoading(props) {
    const classes = useStyles();

    return (
        <Button className={classes.button} {...props}>
            <Skeleton>
                <span>
                    {props.placeholder}
                </span>
            </Skeleton>
        </Button>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        background: 'linear-gradient(315deg, #6617cb 0%, #cb218e 74%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(102, 23, 203, .3)',
    },
}));