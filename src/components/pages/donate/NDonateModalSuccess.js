import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Fade, Typography, DialogContent, useTheme, useMediaQuery } from '@material-ui/core';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

export function NDonateModalSuccess(props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

    return (
        <DialogContent className={classes.successContent}>
            {props.successStep>=1?
                <>
                    <svg
                        id="successAnimation"
                        class="animated"
                        xmlns="http://www.w3.org/2000/svg"
                        width="154"
                        height="154"
                        viewBox="0 0 70 70"
                    >
                        <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
                        <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
                        <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
                    </svg>
                    <Fade in={props.successStep>1} timeout={1500}>
                        <Typography gutterbottom variant="h4" component="h2" className={classes.successTitle}>
                            <Translation t={'RahNeil_N3.Irus.Donations.Success.Title.'+(fullScreen?'Short':'Full')} />
                        </Typography>
                    </Fade>
                    <Fade in={props.successStep>2} timeout={1500}>
                        <Typography variant="subtitle1" component="p" className={classes.successDescription}>
                            <Translation t='RahNeil_N3.Irus.Donations.Success.Description' />
                        </Typography>
                    </Fade>
                </>
            :null}
        </DialogContent>
    );
}

const useStyles = makeStyles((theme) => ({
    successContent: {
        backgroundColor: theme.palette.success.main,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '75vh',
        },
    },
    successTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.white,
    },
    successDescription: {
        color: theme.palette.common.white,
        paddingBottom: theme.spacing(10),
    }
}));