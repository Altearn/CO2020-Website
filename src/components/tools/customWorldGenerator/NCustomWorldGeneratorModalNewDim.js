import React from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Dialog, Grid, Button, DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery, Tooltip, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core';

import { NCard } from '../../NCard';

export function NCustomWorldGeneratorModalNewDim(props) {
    const { t } = useTranslation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Template')}
                fullScreen={fullScreen}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Template')}
                </DialogTitle>
                <DialogContent className={classes.dialogContent} dividers>

                <Grid container spacing={2} className={classes.grid}>
                    {templates.map((data, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={data.key} className={classes.gridItem}>
                            <NCard className={classes.card} isDarkTheme={props.isDarkTheme}>
                                <CardActionArea className={classes.cardActionArea} onClick={() => {
                                    setOpen(false);
                                    var name = data.key;
                                    console.log(props.JSON);
                                    if (props.JSON[name]!=undefined) {
                                        name = props.translateCode(data.key);
                                        var i = 1;
                                        while (props.JSON[name+i]!=undefined) i+=1;
                                        name+=i;
                                    }

                                    props.setJSON({...props.JSON, [name]: data.JSON});
                                    const snackID = enqueueSnackbar(
                                        t('RahNeil_N3.Erebus.Added_As')+'"'+name+'"',
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
                                }}>
                                    <CardMedia
                                        className={classes.media}
                                        image={data.imageSrc}
                                        title={t(data.title)}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {t(data.title)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {t(data.description)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </NCard>
                        </Grid>
                    ))}
                </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        {t('RahNeil_N3.Erebus.Cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
            {React.cloneElement(props.children, { onClick: () => setOpen(true) })}
      </>
    )
}

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    media: {
        width: '100%',
        height: 140,
    },
    cardContent: {
        flexGrow: 1,
        alignSelf: "start",
    },
    cardActionArea: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    grid: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    gridItem: {
        display: 'flex',
        alignContent: 'flex-start',
    },
    dialogContent: {
        backgroundColor: theme.palette.background.default,
    }
}));

const templateOverworld = {
    "generator": {
        "biome_source": {
            "large_biomes": false,
            "type": "minecraft:vanilla_layered"
        },
        "settings": "minecraft:overworld",
        "type": "minecraft:noise"
    },
    "type": "minecraft:overworld"
}

const templateNether = {
    "generator": {
        "biome_source": {
            "preset": "minecraft:nether",
            "type": "minecraft:multi_noise"
        },
        "settings": "minecraft:nether",
        "type": "minecraft:noise"
    },
    "type": "minecraft:the_nether"
}

const templateEnd = {
    "generator": {
        "biome_source": {
            "type": "minecraft:the_end"
        },
        "settings": "minecraft:end",
        "type": "minecraft:noise"
    },
    "type": "minecraft:the_end"
}

const templateSuperflatVillage = {
    "generator": {
        "settings": {
            "structures": {
                "structures": {
                    "minecraft:village": {
                        "spacing": 3,
                        "separation": 1,
                        "salt": 10387312
                    }
                }
            },
            "layers": [
                {
                    "height": 5,
                    "block": "minecraft:basalt"
                },
                {
                    "height": 4,
                    "block": "minecraft:coarse_dirt"
                },
                {
                    "height": 1,
                    "block": "minecraft:grass_block"
                }
            ],
            "biome": "minecraft:plains"
        },
        "type": "minecraft:flat"
    },
    "type": {
        "ultrawarm": false,
        "natural": true,
        "shrunk": false,
        "ambient_light": 0.5,
        "fixed_time": 1000,
        "has_skylight": true,
        "has_ceiling": false
    }
}

const templates = [
    {
        title: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Overworld.Title',
        description: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Overworld.Description',
        imageSrc: '/NOverworld.png',
        key: 'minecraft:overworld',
        JSON: templateOverworld,
    },
    {
        title: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Nether.Title',
        description: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Nether.Description',
        imageSrc: '/NNEther.png',
        key: 'minecraft:the_nether',
        JSON: templateNether,
    },
    {
        title: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.End.Title',
        description: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.End.Description',
        imageSrc: '/NEnd.png',
        key: 'minecraft:the_end',
        JSON: templateEnd,
    },
    {
        title: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Superflat_Village.Title',
        description: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Superflat_Village.Description',
        imageSrc: '/NSuperflatVillage.png',
        key: 'superflatVillage',
        JSON: templateSuperflatVillage,
    },
];