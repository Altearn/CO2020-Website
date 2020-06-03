import React, { Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { NHeader, NHeaderLoading } from '../../NHeader';
import { NStepper, NStepperLoading } from '../../NStepper';
import { NCustomWorldGeneratorTemplateCards, NCustomWorldGeneratorTemplateCardsLoading } from './NCustomWorldGeneratorTemplateCards';
import { NCustomWorldGeneratorFinalButton } from './NCustomWorldGeneratorFinalButton';
import { NCustomWorldGeneratorGeneralSettings } from './NCustomWorldGeneratorGeneralSettings';
import { NCustomWorldGeneratorDimensionCards } from './NCustomWorldGeneratorDimensionCards';

export function NCustomWorldGenerator(props) {
    const classes = useStyles();
    const [lastTemplateSelected, setLastTemplateSelected] = useState(0);
    const [finalJSON, setFinalJSON] = React.useState({
        bonus_chest: false,
        generate_features: false,
        seed: randomLong(),
        dimensions: {
            
        }
    });

    const handleSetFinalJSON = (newJson) => {
        var processedJson = JSON.parse(JSON.stringify(newJson)); //We're removing the reference

        if (processedJson.bonus_chest===undefined) processedJson.bonus_chest = false;
        if (processedJson.generate_features===undefined) processedJson.generate_features = false;
        if (processedJson.generate_features===undefined) processedJson.generate_features = false;
        if (processedJson.seed===undefined) processedJson.seed = randomLong();
        if (processedJson.dimensions===undefined) processedJson.dimensions = {};

        setFinalJSON(processedJson);
    }

    const stepsData = [
        {
            label: {
                placeholder: 'Choose template',
                translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Template.Title'
            },
            content: {
                placeholder: (
                    <NCustomWorldGeneratorTemplateCardsLoading isDarkTheme={props.isDarkTheme} />
                ),
                translation: (
                    <NCustomWorldGeneratorTemplateCards
                        setJSON={handleSetFinalJSON}
                        isDarkTheme={props.isDarkTheme}
                        selected={lastTemplateSelected}
                        setSelected={setLastTemplateSelected}
                    />
                )
            }
        },
        {
            label: {
                placeholder: 'General settings',
                translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Title'
            },
            content: {
                translation: (
                    <NCustomWorldGeneratorGeneralSettings JSON={finalJSON} setJSON={setFinalJSON} />
                )
            }
        },
        {
            label: {
                placeholder: 'Edit dimensions',
                translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Title'
            },
            content: {
                translation: (
                    <NCustomWorldGeneratorDimensionCards
                        JSON={finalJSON.dimensions}
                        setJSON={(newValue) => setFinalJSON({ ...finalJSON, dimensions: newValue})}
                        isDarkTheme={props.isDarkTheme}
                    />
                )
            }
        },
        {
            label: {
                placeholder: 'Export world',
                translation: 'RahNeil_N3.Erebus.Tools.Custom_World_Generator.Export.Title'
            },
            content: {
                translation: 'Hey hey preset'
            }
        },
    ];

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Suspense fallback={<NHeaderLoading placeholder="Custom world generator" />}>
                    <NHeader translation="RahNeil_N3.Erebus.Tools.Custom_World_Generator.Title" />
                </Suspense>
            </div>

            <Suspense fallback={<NStepperLoading steps={stepsData} />}>
                <NStepper steps={stepsData} finishButton={
                    <NCustomWorldGeneratorFinalButton JSON={finalJSON} />
                } />
            </Suspense>
        </div>
    );
}

const randomLong = () => {
    return parseInt(Math.random()*1000000000, 10);
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        marginBottom: theme.spacing(4),

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(6),
            marginBottom: 0,
        },
    },
    header: {
        padding: theme.spacing(4),
        paddingBottom: 0,

        [theme.breakpoints.up('sm')]: {
            padding: 0,
        },
    }
}));