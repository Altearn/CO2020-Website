import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FormControlLabel, Switch, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export function NSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={
                    <Switch
                        checked={props.checked}
                        onChange={props.onChange}
                        color="primary"
                        disabled={props.disabled}
                    />
                }
                label={props.text}
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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));