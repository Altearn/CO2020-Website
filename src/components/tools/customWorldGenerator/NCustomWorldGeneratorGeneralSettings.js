import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';

import { NSlider } from '../../NSlider';
import { NTextField } from '../../NTextField';

export function NCustomWorldGeneratorGeneralSettings(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <NSlider
                text={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Bonus_Chest.Title')}
                description={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Bonus_Chest.Description')}
                checked={props.JSON.bonus_chest}
                onChange={() => props.setJSON({ ...props.JSON, bonus_chest: !props.JSON.bonus_chest})}
            />
            <NSlider
                text={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Generate_Structures.Title')}
                description={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Generate_Structures.Description')}
                checked={props.JSON.generate_features}
                onChange={() => props.setJSON({ ...props.JSON, generate_features: !props.JSON.generate_features})}
            />

            <div className={classes.inline}>
                <NTextField
                    text={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Seed.Title')}
                    description={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.General_Settings.Seed.Description')}
                    value={props.JSON.seed}
                    onChange={(event) => props.setJSON({ ...props.JSON, seed: parseInt(event.target.value, 10)})}
                    type="number"
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setJSON({ ...props.JSON, seed: randomLong()})}
                >
                    {t('RahNeil_N3.Erebus.Randomize')}
                </Button>
            </div>
        </>
    )
}

const randomLong = () => {
    return parseInt(Math.random()*1000000000, 10);
}

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'flex',
        alignItems: 'baseline',
    },
}));