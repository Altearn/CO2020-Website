import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { TextField, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export function NTextField(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                label={props.text}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                className={classes.field}
                disabled={props.disabled}
                inputProps={props.inputProps}
            />
            <Tooltip title={props.description} arrow>
                <HelpIcon color="action" fontSize="small" />
            </Tooltip>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'baseline',
        margin: theme.spacing(2),
    },
    field: {
        marginRight: theme.spacing(2),
    }
}));