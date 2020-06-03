import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery } from '@material-ui/core';

import { NSlider } from '../../NSlider';
import { NSelect } from '../../NSelect';

export function NCustomWorldGeneratorModalEditDim(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [typeValues, setTypeValues] = React.useState({
        ultrawarm: false,
        natural: false,
        shrunk: false,
        has_skylight: false,
        has_ceiling: false,
        ambient_light: 0.5,
        biome_zoomer: 'FuzzyOffsetConstantColumnBiomeZoomer',
        ender_dragon: false
    });

    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const pushType = () => {
        if (typeof props.JSON.type === 'object') props.setJSON({ ...props.JSON, type: typeValues});
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Edit.Title')}
                aria-describedby={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Edit.Description')}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    {t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Edit.Title')}
                </DialogTitle>
                <DialogContent dividers>

                    <NSelect
                        text={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Settings.Type.Title')}
                        description={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Settings.Type.Description')}
                        value={typeof props.JSON.type === 'object'?'custom':props.JSON.type}
                        valuesList={[
                            {
                                title: t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Overworld.Title'),
                                value: "minecraft:overworld"
                            },
                            {
                                title: t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Nether.Title'),
                                value: "minecraft:the_nether"
                            },
                            {
                                title: t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.End.Title'),
                                value: "minecraft:the_end"
                            },
                            {
                                title: t('RahNeil_N3.Erebus.Custom'),
                                value: "custom"
                            }
                        ]}
                        onChange={
                            (event) => props.setJSON({ ...props.JSON, type: event.target.value==='custom'?typeValues:event.target.value})
                        }
                    />

                    <NSlider
                        text={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Settings.Ultrawarm.Title')}
                        description={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Dimensions.Settings.Ultrawarm.Description')}
                        checked={typeValues.ultrawarm}
                        disabled={typeof props.JSON.type === 'object'}
                        onChange={() => {
                            setTypeValues({ ...typeValues, ultrawarm: !typeValues.ultrawarm});
                            pushType();
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        {t('RahNeil_N3.Erebus.Close')}
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                        autoFocus
                    >
                        {t('RahNeil_N3.Erebus.OK')}
                    </Button>
                </DialogActions>
            </Dialog>

            {React.cloneElement(props.children, { onClick: () => setOpen(true) })}
      </>
    )
}

const useStyles = makeStyles((theme) => ({
    
}));