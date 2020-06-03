import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions, useTheme, useMediaQuery } from '@material-ui/core';

export function NCustomWorldGeneratorModal(props) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const classes = useStyles();
    
    const NJSONContent = () => {
        var json = JSON.stringify(props.JSON, undefined, 2);
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
            (match) => {
                var className = classes.number;
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        className = classes.key;
                    } else {
                        className = classes.string;
                    }
                } else if (/true|false/.test(match)) {
                    className = classes.boolean;
                } else if (/null/.test(match)) {
                    className = classes.null;
                }
                return `<span class='${className}'>${match}</span>`
            })
        return (
            <pre className={classes.root} dangerouslySetInnerHTML={{__html: json}} />
        )
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={props.title}
                aria-describedby={props.aria}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent dividers>
                    <NJSONContent />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        {t('RahNeil_N3.Erebus.Close')}
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            props.buttonAction();}
                        }
                        color="primary"
                        disabled={props.buttonDisabled}
                        autoFocus
                    >
                        {props.buttonText}
                    </Button>
                </DialogActions>
        </Dialog>

        {React.cloneElement(props.children, { onClick: () => setOpen(true) })}
      </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '9pt',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    string: {
        color: theme.palette.success.main,
    },
    number: {
        color: theme.palette.warning.main,
    },
    boolean: {
        color: theme.palette.info.main,
    },
    null: {
        color: 'magenta',
    },
    key: {
        color: theme.palette.text.secondary,
    }
}));