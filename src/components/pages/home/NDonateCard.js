import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { CardActionArea, CardMedia, Button, Typography, Card } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function NDonateCard(props) {
    const { t } = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);

    return (
        <>
            <img style={{display: 'none'}} src="/NDonateCardBackground.jpg" onLoad={() => setLoading(false)} alt='Loading...'/>

            {loading?
                <NDonateCardLoading {...props} />
            :
                <Card className={classes.root}>
                    <CardActionArea className={classes.actionArea} onClick={() => history.push("/donate")}>
                        <CardMedia
                            className={classes.media}
                            image="/NDonateCardBackground.jpg"
                            title={t('RahNeil_N3.Irus.Donations.Donate_Now.Title')}
                        >
                            <Typography gutterBottom variant="h4" component="h2" className={classes.whiteColor}>
                                {t('RahNeil_N3.Irus.Donations.Donate_Now.Title')}
                            </Typography>
                            <Typography variant="body2" component="p" className={classes.description}>
                                {t('RahNeil_N3.Irus.Donations.Donate_Now.Description')}
                            </Typography>
                            <Button size="large" tabIndex="-1" disableRipple className={classes.whiteColorMargin} variant='outlined'>
                                {t('RahNeil_N3.Irus.Donations.Donate_Now.Title')}
                            </Button>
                        </CardMedia>
                    </CardActionArea>
                </Card>
            }
        </>
    );
}

export function NDonateCardLoading(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Skeleton variant="rect" className={classes.actionArea}>
                <CardActionArea>
                    <CardMedia className={classes.media} title="Donate now">
                        <div>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.whiteColor}>
                                Donate now
                            </Typography>
                            <Typography variant="body2" component="p" className={classes.description}>
                                Donate now to support the charity of your choice :D
                                The donation amount isn't restricted
                            </Typography>
                            <Button size="large" tabIndex="-1" disableRipple className={classes.whiteColorMargin} variant='outlined'>
                                Donate now
                            </Button>
                        </div>
                    </CardMedia>
                </CardActionArea>
            </Skeleton>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flex: 1,
        marginBottom: theme.spacing(2),
    },
    actionArea: {
        height: '100%',
    },
    media: {
        padding: theme.spacing(5),
        height: '100%',
    },
    whiteColorMargin: {
        color: theme.palette.common.white,
        borderColor: '#fff',
        marginTop: theme.spacing(2),
    },
    whiteColor: {
        color: theme.palette.common.white,
        borderColor: '#fff',
    },
    description: {
        color: theme.palette.common.white,
        borderColor: '#fff',
        whiteSpace: 'pre-line'
    },
}));