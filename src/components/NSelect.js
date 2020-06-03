import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { InputLabel, MenuItem, Select, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

export function NSelect(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.divSelect}>
                <InputLabel id={props.text}>
                    {props.text}
                </InputLabel>
                <Select
                    disabled={props.disabled}
                    labelId={props.text}
                    value={props.value}
                    onChange={props.onChange}
                >
                    {props.valuesList.map((data, index) => (
                        <MenuItem value={data.value}>{data.title}</MenuItem>
                    ))}
                </Select>
            </div>
            <Tooltip title={props.description} arrow>
                <HelpIcon color="action" fontSize="small" />
            </Tooltip>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2),
    },
    divSelect: {
        marginRight: theme.spacing(2),
    }
}));