import React, { Suspense } from 'react';

import { AppBar, Toolbar, Slide, useScrollTrigger } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

import { NAppBarTitle, NAppBarTitleLoading } from "./NAppBarTitle";
import { NSearchInputBase, NSearchInputBaseLoading } from "./NSearchInputBase";
import { NAppbarActions, NAppbarActionsLoading } from './NAppbarActions';

export function NAppBar(props) {
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });
    const trigger2 = useScrollTrigger({
        disableHysteresis: true,
        threshold: 150
    });

    return(
        <div className={classes.root}>
            <AppBar elevation={trigger?4:0}>
                <Toolbar>
                    <Slide direction="down" in={trigger2}>
                        <div style={{flex: 1}}>
                            <Suspense fallback={<NAppBarTitleLoading />}>
                                <NAppBarTitle />
                            </Suspense>
                        </div>
                    </Slide>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Suspense fallback={<NSearchInputBaseLoading />}>
                            <NSearchInputBase />
                        </Suspense>
                    </div>

                    <Suspense fallback={
                        <NAppbarActionsLoading toggleTheme={props.toggleTheme} isDarkTheme={props.isDarkTheme} />
                    }>
                        <NAppbarActions toggleTheme={props.toggleTheme} isDarkTheme={props.isDarkTheme} />
                    </Suspense>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(6),
        backgroundColor: theme.palette.primary.main,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));