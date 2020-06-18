import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { CardContent, CardMedia, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NCard } from '../../NCard';

export function NDonatorCard(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardContent className={classes.content}>
                <Typography variant="subtitle1">
                    neil3000
                </Typography>
                <Typography gutterBottom component="h5" variant="h4">
                    50$
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" style={{whiteSpace: 'pre'}}>
                    Latest donator
                </Typography>
            </CardContent>
            <CardMedia
                className={classes.cover}
                image={"https://crafatar.com/renders/body/08831584-f289-40e0-b572-d1ae7363ec96.png?overlay&default=MHF_"+(Math.random()>=0.5?"Steve":"Alex")}
                title="neil3000"
            />
        </NCard>
    );
}

export function NDonatorCardLoading(props) {
    const classes = useStyles();

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardContent className={classes.content}>
                <Typography variant="subtitle1" color="textSecondary">
                    <Skeleton>
                        <span>
                            Top donation
                        </span>
                    </Skeleton>
                </Typography>
                <Typography gutterBottom component="h5" variant="h4">
                    <Skeleton>
                        <span>
                            50$
                        </span>
                    </Skeleton>
                </Typography>
                <Typography variant="subtitle2" component="h5">
                    <Skeleton>
                        <span>
                            neil3000
                        </span>
                    </Skeleton>
                </Typography>
            </CardContent>
            <Skeleton variant="rect">
                <CardMedia
                    className={classes.cover}
                    image="https://crafatar.com/renders/body/08831584-f289-40e0-b572-d1ae7363ec96.png?overlay&default=MHF_Steve"
                    title={props.username}
                />
            </Skeleton>
        </NCard>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    cover: {
        width: 151,
        backgroundPosition: 'top',
        backgroundSize: 'auto',
    },
    content: {
        flex: 1,
    }
}));