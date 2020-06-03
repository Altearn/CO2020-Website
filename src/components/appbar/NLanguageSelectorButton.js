import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TranslateIcon from '@material-ui/icons/Translate';
import { Menu, Button, IconButton, Tooltip, MenuItem, Typography, ListItemIcon } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import NLanguageSelectItem from "./NLanguageSelectItem";

export function NLanguageSelectorButton(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenLanguageSelect = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLanguageSelect = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {props.inMenu?
                <MenuItem
                    className={classes.menuItem}
                    aria-controls="nLanguageSelect"
                    aria-haspopup="true"
                    aria-label={t('RahNeil_N3.Erebus.Language.Change')}
                    onClick={(e) => {props.closeMenu(); handleOpenLanguageSelect(e);}}
                >
                    <ListItemIcon className={classes.menuItemIcon}>
                        <TranslateIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        {t('RahNeil_N3.Erebus.Language.Change')}
                    </Typography>
                </MenuItem>
            :
                <>
                    <Tooltip title={t('RahNeil_N3.Erebus.Language.Change')} arrow enterDelay={750}>
                        <Button
                            aria-controls="nLanguageSelect"
                            aria-haspopup="true"
                            color="inherit"
                            startIcon={<TranslateIcon />}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleOpenLanguageSelect}
                            className={classes.textButton}
                        >
                            {t('RahNeil_N3.Erebus.Language.Current')}
                        </Button>
                    </Tooltip>
                    <Tooltip title={t('RahNeil_N3.Erebus.Language.Change')} arrow>
                        <IconButton
                            aria-controls="nLanguageSelect"
                            aria-haspopup="true"
                            aria-label={t('RahNeil_N3.Erebus.Language.Change')}
                            color="inherit"
                            onClick={handleOpenLanguageSelect}
                            className={classes.iconButton}
                        >
                            <TranslateIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }

            <Menu
                id="nLanguageSelect"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseLanguageSelect}
            >
                <NLanguageSelectItem text="English" code="en-US" country="us" close={handleCloseLanguageSelect} />
                <NLanguageSelectItem text="English" code="en-GB" country="gb" close={handleCloseLanguageSelect} />
                <NLanguageSelectItem text="Français" code="fr-FR" country="fr" close={handleCloseLanguageSelect} />
            </Menu>
        </>
    );
}

export function NLanguageSelectorButtonLoading() {
    const classes = useStyles();

    return (
        <>
            <Button
                color="inherit"
                startIcon={<TranslateIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                className={classes.textButton}
            >
                <Skeleton>
                    <span>
                        English
                    </span>
                </Skeleton>
            </Button>
            <IconButton
                color="inherit"
                className={classes.iconButton}
            >
                <TranslateIcon />
            </IconButton>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    textButton: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inline-flex',
        },
    },
    iconButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline-flex',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuItemIcon: {
        minWidth: 'auto',
        paddingRight: theme.spacing(2),
    }
}));