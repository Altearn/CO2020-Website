import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputBase, ListItemIcon } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';

export function NSearchInputBase() {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const tools = [
        { title: t('RahNeil_N3.Irus.Home_Page'), url: '/' },
        { title: t('RahNeil_N3.Irus.Donations.Donate_Now.Short'), url: '/donate' },
        { title: t('RahNeil_N3.Irus.Trailer'), url: '/trailer' }
    ];

    const pendingValue = [];
    const [searchString, setSearchString] = React.useState("");

    const handleInputChange = event => {
        setSearchString(event.currentTarget.value);
    };

    const handleClick = (newValue) => {
        if (newValue!==null) {
            setSearchString("");
            if (newValue.url!==null) history.push(newValue.url);
        }
    };

    return (
        <Autocomplete
            options={tools}
            value={pendingValue}
            onChange={(event, newValue) => {
                handleClick(newValue)
            }}
            getOptionSelected={(option, value) => option.title === value.title}
            renderOption={(option) => (
                option.url==null?(
                    <>

                        <ListItemIcon className={classes.iconLibrary}>
                            <ExtensionIcon fontSize="small" />
                        </ListItemIcon>
                        <i>{option.title}</i>
                    </>
                ):option.title
            )}
            autoHighlight
            inputValue={searchString}
            disablePortal
            getOptionLabel={option => option.title}
            renderInput={(params) => (
                <InputBase
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder={t('RahNeil_N3.Irus.Search')+'...'}
                    onChange={handleInputChange}
                />
            )}
        />
    )
}

export function NSearchInputBaseLoading() {
    const classes = useStyles();

    return (
        <InputBase
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0 ),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    iconLibrary: {
        minWidth: theme.spacing(4)
    }
}));