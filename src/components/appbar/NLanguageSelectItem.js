import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { MenuItem } from '@material-ui/core';

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

export default function NLanguageSelectItem(props) {
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        props.close();
        i18n.changeLanguage(props.code, (err) => {
            if (err) {
                enqueueSnackbar(t('RahNeil_N3.Irus.Error.Language')+' "'+props.text+'"', { 
                    variant: 'error',
                });
            }
        });
    };

    return (
        <>
            <MenuItem
                onClick={ handleClick }
                selected={i18n.language===props.code}
                disabled={i18n.language===props.code}
            >
                <span style={{marginRight: 10, fontSize: 18, marginBottom: 3}}>
                    { countryToFlag(props.country) }
                </span>
                { props.text }
            </MenuItem>
        </>
    );
}