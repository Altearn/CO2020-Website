import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Skeleton } from '@material-ui/lab';
import { Typography, CardActionArea, CardMedia, CardContent, CardActions, Tooltip, Button, Grid, Zoom } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { NCard } from '../../NCard';
import { NCustomWorldGeneratorModal } from './NCustomWorldGeneratorModal';

export function NCustomWorldGeneratorTemplateCards(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleSelected = (index) => {
        props.setSelected(index);
        props.setJSON(templates[index].JSON);
    }
    
    return (
        <Grid container spacing={2} className={classes.grid}>
            {templates.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={"cardTemplate_"+index} className={classes.gridItem}>
                    <NCard
                        className={classes.root}
                        isDarkTheme={props.isDarkTheme}
                    >
                        <CardActionArea className={classes.cardActionArea} onClick={() => handleSelected(index)}>
                            <div className={classes.media}>
                                <CardMedia
                                    className={props.selected===index?classes.mediaSelected:classes.media}
                                    image={data.imageSrc}
                                    title={t(data.title.translation)}
                                />
                                <Zoom in={props.selected===index}>
                                    <CheckIcon className={classes.checkIcon} />
                                </Zoom>
                            </div>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {t(data.title.translation)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                    {t(data.description.translation)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Tooltip
                                title={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Show_JSON.Description')}
                                arrow
                                enterDelay={750}
                            >
                                <NCustomWorldGeneratorModal
                                    title={t(data.title.translation)}
                                    JSON={data.JSON}
                                    aria={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Show_JSON.Description')}
                                    buttonText={t('RahNeil_N3.Erebus.Choose')}
                                    buttonAction={() => handleSelected(index)}
                                    buttonDisabled={props.selected===index}
                                >
                                    <Button size="small" color="primary">
                                        {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Show_JSON.Action')}
                                    </Button>
                                </NCustomWorldGeneratorModal>
                            </Tooltip>
                        </CardActions>
                    </NCard>
                </Grid>
            ))}
        </Grid>
    )
}

export function NCustomWorldGeneratorTemplateCardsLoading(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            {templates.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={"cardTemplate_"+index} className={classes.gridItem}>
                    <NCard
                        className={index===0?classes.rootSelected:classes.root}
                        isDarkTheme={props.isDarkTheme}
                    >
                        <CardActionArea className={classes.cardActionArea}>
                            <Skeleton variant="rect" width="100%" height="140px"/>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Skeleton>
                                        <span>
                                            {data.title.placeholder}
                                        </span>
                                    </Skeleton>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                    <Skeleton>
                                        <span>
                                            {data.description.placeholder}
                                        </span>
                                    </Skeleton>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                <Skeleton>
                                    <span>
                                        Show JSON
                                    </span>
                                </Skeleton>
                            </Button>
                        </CardActions>
                    </NCard>
                </Grid>
            ))}
        </Grid>
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
    mediaSelected: {
        height: 140,
        width: '100%',
        opacity: .75,
        position: "absolute",
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
    }
}));

const emptyTemplateJSON = {
    
}

const defaultTemplateJSON = {
    bonus_chest: false,
    dimensions: {
        "minecraft:overworld": {
            generator: {
                biome_source: {
                    large_biomes: false,
                    type: "minecraft:vanilla_layered"
                },
                settings: "minecraft:overworld",
                type: "minecraft:noise"
            },
            type: "minecraft:overworld"
        },
        "minecraft:the_nether": {
            generator: {
                biome_source: {
                    preset: "minecraft:nether",
                    type: "minecraft:multi_noise"
                },
                settings: "minecraft:nether",
                type: "minecraft:noise"
            },
            type: "minecraft:the_nether"
        },
        "minecraft:the_end": {
            generator: {
                biome_source: {
                    type: "minecraft:the_end"
                },
                settings: "minecraft:end",
                type: "minecraft:noise"
            },
            type: "minecraft:the_end"
        }
    },
    generate_features: true
}

const templates = [
    {
        title: {
            translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Empty.Title',
            placeholder: 'Empty template'
        },
        description: {
            translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Empty.Description',
            placeholder: 'An empty template, with no parameters sets.\nUseful to start from scratch.'
        },
        imageSrc: '/NEmptyWorld.png',
        JSON: emptyTemplateJSON,
    },
    {
        title: {
            translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Default.Title',
            placeholder: 'Default world'
        },
        description: {
            translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Default.Description',
            placeholder: 'An exported default Minecraft world.\nOnly the three default dimensions are present, untouched.'
        },
        imageSrc: '/NOverworld.png',
        JSON: defaultTemplateJSON,
    },
];