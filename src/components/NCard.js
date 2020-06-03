import React from 'react';

import { Card } from '@material-ui/core';

export function NCard(props) {
    return (
        <Card style={{backgroundColor: (props.isDarkTheme?"#1e1e1e":"#fff")}} {...props}/>
    );
}