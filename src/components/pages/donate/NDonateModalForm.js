import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { DialogTitle, Typography, IconButton, DialogContent, Button, DialogActions, useTheme, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import { NStepper, NStepperLoading } from '../../NStepper.js';
import { NLoading } from '../../NConsts';

function Translation(props) {
    const { t } = useTranslation();

    return t(props.t);
}

export function NDonateModalForm(props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

    return (
        <>
            <DialogTitle className={classes.title} disableTypography>
                <Typography className={classes.titleTypography} variant="h5" component="span">
                    <Suspense fallback={<Skeleton><span>Donate now</span></Skeleton>}>
                        {NLoading()?
                            <Skeleton><span>Donate now</span></Skeleton>
                        :
                            <Translation t='RahNeil_N3.Irus.Donations.Donate_Now.Title' />
                        }
                    </Suspense>
                </Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={props.handleClose}
                    aria-label={
                        <Suspense fallback="Close">
                            {NLoading()?
                                "Close"
                            :
                                <Translation t='RahNeil_N3.Irus.Close' />
                            }
                        </Suspense>
                    }
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Suspense fallback={<NStepperLoading steps={props.steps} />}>
                    {NLoading()?
                        <NStepperLoading steps={props.steps} />
                    :
                        <NStepper steps={props.steps} />
                    }
                </Suspense>
            </DialogContent>
            {fullScreen?null:
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        <Suspense fallback={<Skeleton><span>Cancel</span></Skeleton>}>
                            {NLoading()?
                                <Skeleton><span>Cancel</span></Skeleton>
                            :
                                <Translation t='RahNeil_N3.Irus.Cancel' />
                            }
                        </Suspense>
                    </Button>
                </DialogActions>
            }
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    alert: {
        marginBottom: theme.spacing(2),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    titleTypography: {
        flex: 1,
    },
}));