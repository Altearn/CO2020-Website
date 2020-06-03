import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, CardActionArea, CardMedia, CardContent, CardActions, Grid, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { NCard } from '../../NCard';
import { NCustomWorldGeneratorModalNewDim } from './NCustomWorldGeneratorModalNewDim';
import { NCustomWorldGeneratorModalEditDim } from './NCustomWorldGeneratorModalEditDim';

export function NCustomWorldGeneratorDimensionCards(props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const translateName = key => {
        switch(key) {
            case 'minecraft:overworld':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Overworld.Title');
            case 'minecraft:the_nether':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Nether.Title');
            case 'minecraft:the_end':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.End.Title');
            case 'superflatVillage':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Superflat_Village.Title');
            default:
                return key;
        }
    }

    const translateCode = key => {
        switch(key) {
            case 'minecraft:overworld':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Overworld.Code');
            case 'minecraft:the_nether':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Nether.Code');
            case 'minecraft:the_end':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.End.Code');
            case 'superflatVillage':
                return t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Superflat_Village.Code');
            default:
                return key;
        }
    }

    const translateMedia = key => {
        switch(key) {
            case 'minecraft:overworld':
                return '/NOverworld.png';
            case 'minecraft:the_nether':
                return '/NNether.png';
            case 'minecraft:the_end':
                return '/NEnd.png';
            case 'superflatVillage':
                return '/NSuperflatVillage.png';
            default:
                return '/NCustomWorldGenerator.png';
        }
    }
    
    return (
        <>
            <Grid container spacing={2} className={classes.grid}>
                {Object.keys(props.JSON).map(key => (
                    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                        <NCard
                            className={classes.root}
                            isDarkTheme={props.isDarkTheme}
                        >
                            <NCustomWorldGeneratorModalEditDim
                                JSON={props.JSON[key]}
                                setJSON={(newValueJSON) => props.setJSON({...props.JSON, [key]: newValueJSON})}
                            >
                                <CardActionArea className={classes.cardActionArea}>
                                    <CardMedia
                                        className={classes.media}
                                        image={translateMedia(key)}
                                        title={null}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {translateName(key)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Edit.Description')}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </NCustomWorldGeneratorModalEditDim>
                            <CardActions>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        const oldDim = props.JSON[key];
                                        let {[key]: omit, ...res} = props.JSON;
                                        props.setJSON(res);
                                        const snackID = enqueueSnackbar(
                                            t('RahNeil_N3.Erebus.Deleted')+' "'+translateName(key)+'"',
                                        { 
                                            action: (
                                                <React.Fragment>
                                                    <Button size="small" color="primary" onClick={() => {
                                                        props.setJSON({...props.JSON, [key]: oldDim});
                                                        closeSnackbar(snackID);
                                                    }}>
                                                        {t('RahNeil_N3.Erebus.Undo')}
                                                    </Button>
                                                </React.Fragment>
                                            )
                                        });
                                    }}
                                >
                                    {t('RahNeil_N3.Erebus.Delete')}
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        var name = translateCode(key)+"_"+t('RahNeil_N3.Erebus.Copy');
                                        while (props.JSON[name]!=undefined) name += "_"+t('RahNeil_N3.Erebus.Copy');

                                        props.setJSON({...props.JSON, [name]: props.JSON[key]});
                                        const snackID = enqueueSnackbar(
                                            t('RahNeil_N3.Erebus.Copied_As')+' "'+name+'"',
                                        { 
                                            action: (
                                                <React.Fragment>
                                                    <Button size="small" color="primary" onClick={() => {
                                                        let {[name]: omit, ...res} = props.JSON;
                                                        props.setJSON(res);
                                                        closeSnackbar(snackID);
                                                    }}>
                                                        {t('RahNeil_N3.Erebus.Undo')}
                                                    </Button>
                                                </React.Fragment>
                                            )
                                        });
                                    }}
                                >
                                    {t('RahNeil_N3.Erebus.Action_Copy')}
                                </Button>
                            </CardActions>
                        </NCard>
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                    <NCard className={classes.root} isDarkTheme={props.isDarkTheme}>
                        <NCustomWorldGeneratorModalNewDim
                            isDarkTheme={props.isDarkTheme}
                            JSON={props.JSON}
                            setJSON={props.setJSON}
                            translateCode={translateCode}
                        >
                            <CardActionArea className={classes.cardActionArea}>
                                <CardContent className={classes.addCard}>
                                    <AddCircleOutlineIcon className={classes.addIcon} />
                                    <Typography color="textSecondary" variant="h5" component="h2">
                                        {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Add')}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </NCustomWorldGeneratorModalNewDim>
                    </NCard>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
    },
    media: {
        height: 140,
        width: '100%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        whiteSpace: "pre-line",
    },
    cardContent: {
        flexGrow: 1,
        alignSelf: "start",
    },
    gridItem: {
        display: 'flex',
        alignContent: 'flex-start',
    },
    cardActionArea: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    checkIcon: {
        position: 'absolute',
        fontSize: 64,
        color: 'white',
    },
    delete: {
        marginLeft: 'auto',
    },
    addIcon: {
        fontSize: 80,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
    addCard: {
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));