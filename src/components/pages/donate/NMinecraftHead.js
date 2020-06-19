import React from 'react';

export function NMinecraftHead(props) {
    return (
        <img
            height={36}
            src={
                "https://crafatar.com/renders/head/"
                +(props.uuid===null?'a2b8d2c37729406888d3d569d4e23375':props.uuid)+".png?overlay&default=606e2ff0ed7748429d6ce1d3321c7838"
            }
            alt={props.username}
        />
    );
}