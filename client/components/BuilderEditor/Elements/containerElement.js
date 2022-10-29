import React, { useCallback } from 'react';
import { useNode, useEditor, Element } from "@craftjs/core";
import SettingForm from '../settingForm';
import { Container } from './container';

export const ContainerElement = () => {
    const { connectors: { connect, drag }, comProps } = useNode((node) => {
        return {
            comProps: node.data.props
        }
    });

    console.log('comProps', comProps);

    const style = {
        backgroundColor: comProps.backgroundColor || '',
        height: comProps.height || '100px',
        width: comProps.width || '100%'
    }

    console.log('style', style);
    console.log('style.height', style.height);

    return (
        <Element id="container" is={Container} canvas {...comProps} style={style} />
    )
}

const ContainerSettings = (props) => {
    const { actions: { setProp }, fontSize } = useNode((node) => {
        return {
            fontSize: node.data.props.fontSize
        }
    });

    return <SettingForm setProp={setProp} />
}

ContainerElement.craft = {
    // Define Default Settings
    displayName: 'ContainerElement',
    props: {},
    related: {
        settings: ContainerSettings
    }
}