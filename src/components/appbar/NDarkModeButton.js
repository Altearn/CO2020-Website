import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

export function NDarkModeButton(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return(
        props.inMenu?
            <MenuItem
                className={classes.menuItem}
                aria-controls="nLanguageSelect"
                aria-haspopup="true"
                aria-label={t('RahNeil_N3.Irus.Language.Change')}
                onClick={() => {props.closeMenu(); props.toggleTheme();}}
            >
                <ListItemIcon className={classes.menuItemIcon}>
                    {props.isDarkTheme?
                        <Brightness7Icon fontSize="small" />
                    :
                        <Brightness4Icon fontSize="small" />
                    }
                </ListItemIcon>
                <Typography variant="inherit">
                    {t('RahNeil_N3.Irus.Theme.'+(props.isDarkTheme?'Light':'Dark'))}
                </Typography>
            </MenuItem>
        :
            <Tooltip title={t('RahNeil_N3.Irus.Theme.'+(props.isDarkTheme?'Light':'Dark'))} arrow>
                <IconButton
                    aria-label={t('RahNeil_N3.Irus.Theme.'+(props.isDarkTheme?'Light':'Dark'))}
                    color="inherit"
                    onClick={props.toggleTheme}
                    className={classes.iconButton}
                >
                    {props.isDarkTheme?
                        <Brightness7Icon />
                    :
                        <Brightness4Icon />
                    }
                </IconButton>
            </Tooltip>
    );
}

export function NDarkModeButtonLoading(props) {
    const classes = useStyles();

    return(
        <IconButton
            color="inherit"
            onClick={props.toggleTheme}
            className={classes.iconButton}
        >
            {props.isDarkTheme?
                <Brightness7Icon />
            :
                <Brightness4Icon />
            }
        </IconButton>
    );
}

const useStyles = makeStyles((theme) => ({
    iconButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline-flex',
        },
    },
    menuItemIcon: {
        minWidth: 'auto',
        paddingRight: theme.spacing(2),
    }
}));