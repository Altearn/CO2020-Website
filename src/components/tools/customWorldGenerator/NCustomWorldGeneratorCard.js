import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NCard } from '../../NCard';

export function NCustomWorldGeneratorCard(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardActionArea onClick={() => history.push("/customWorldGenerator")}>
                <CardMedia
                    className={classes.media}
                    image="/NCustomWorldGenerator.png"
                    title={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Card.Image')}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Title')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Card.Description')}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Tooltip title={t('RahNeil_N3.Erebus.Library.Card.Description')} arrow enterDelay={750}>
                    <Button size="small" color="primary">
                        {t('RahNeil_N3.Erebus.Library.Card.Action')}
                    </Button>
                </Tooltip>
            </CardActions>
        </NCard>
    );
}

export function NCustomWorldGeneratorCardLoading(props) {
    const classes = useStyles();

    return (
        <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
            <CardActionArea>
                <Skeleton variant="rect" width="100%" height="140px"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Skeleton>
                            <span>
                                Custom World
                            </span>
                        </Skeleton>
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Skeleton>
                            <span>
                                This generator lets you change the generation of the Overworld, Nether, and End dimensions as well as the ability to create custom dimensions.
                            </span>
                        </Skeleton>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Skeleton>
                        <span>
                            Explore in library
                        </span>
                    </Skeleton>
                </Button>
            </CardActions>
        </NCard>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100 %'
    },
    media: {
        height: 140,
    },
}));