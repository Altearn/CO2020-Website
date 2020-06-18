import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, IconButton, Tooltip } from '@material-ui/core';

import { NLanguageSelectorButton, NLanguageSelectorButtonLoading } from "./NLanguageSelectorButton";
import { NDarkModeButton, NDarkModeButtonLoading } from "./NDarkModeButton";

export function NAppbarActions(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMore = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMore = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={t('RahNeil_N3.Irus.More')} arrow>
                <IconButton
                    aria-controls="nMore"
                    aria-haspopup="true"
                    aria-label={t('RahNeil_N3.Irus.More')}
                    color="inherit"
                    onClick={handleOpenMore}
                    className={classes.iconButton}
                >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="nMore"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMore}
            >
                <NLanguageSelectorButton closeMenu={() => {handleCloseMore()}} inMenu />
                <NDarkModeButton
                    toggleTheme={props.toggleTheme}
                    isDarkTheme={props.isDarkTheme}
                    closeMenu={() => {handleCloseMore()}}
                    inMenu />
            </Menu>

            <NLanguageSelectorButton />
            <NDarkModeButton toggleTheme={props.toggleTheme} isDarkTheme={props.isDarkTheme} />
        </>
    );
}

export function NAppbarActionsLoading(props) {
    const classes = useStyles();

    return (
        <>
            <IconButton
                color="inherit"
                className={classes.iconButton}
            >
                <MoreVertIcon />
            </IconButton>

            <NLanguageSelectorButtonLoading />
            <NDarkModeButtonLoading toggleTheme={props.toggleTheme} isDarkTheme={props.isDarkTheme} />
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    iconButton: {
        display: 'inline-flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));