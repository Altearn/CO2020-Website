import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';

import { NCustomWorldGeneratorModal } from './NCustomWorldGeneratorModal';

export function NCustomWorldGeneratorFinalButton(props) {
    const { t } = useTranslation();

    const downloadJSON = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(props.JSON, undefined, 2)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "customWorldExported.json";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <NCustomWorldGeneratorModal
            title={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Export.World.Title')}
            aria={t('RahNeil_N3.Erebus.Tools.Custom_World_Generator.Export.World.Description')}
            JSON={props.JSON}
            buttonText={t('RahNeil_N3.Erebus.Download')}
            buttonAction={downloadJSON}
        >
            <Button
                variant="contained"
                color="primary"
            >
                {t('RahNeil_N3.Erebus.Export')}
            </Button>
        </NCustomWorldGeneratorModal>
    );
}