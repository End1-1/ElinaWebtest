import React, { useCallback } from 'react';
import { useNode, useEditor, Element } from "@craftjs/core";
import { Resizer } from '../resizer';
import SettingForm from '../settingForm';
import { useTranslations } from 'Talons/App/useTranslations';

const defaultProps = {
    flexDirection: 'column',
    fillSpace: 'no',
    padding: ['0', '0', '0', '0'],
    margin: ['0', '0', '0', '0'],
    backgroundColor: '#CCCCCC',
    color: { r: 0, g: 0, b: 0, a: 1 },
    shadow: 0,
    radius: 0,
    width: '100%',
    height: 'auto',
};


// components/user/Container.js
export const Container = (props) => {
    const { __ } = useTranslations();
    props = { ...defaultProps, ...props };
    const { background, color, padding, radius, fillSpace, justifyContent, flexDirection, alignItems, margin, shadow, children, backgroundColor, className,
        borderColor,
        borderWidth,
        borderStyle,
        borderRadius
    } = props;
    
    const { connectors: { connect, drag }, comProps } = useNode((node) => {
        // We should do something, but when I enable this, a lot of things break. Need to find another solution
        // For example text element doesn't work properly
        // node.data.displayName = __('section');
    });
    
    return (
        <Resizer
            propKey={{ width: 'width', height: 'height' }}
            className={className}
            style={{
                display: 'flex',
                justifyContent,
                flexDirection,
                flexShrink: 'unset',
                alignItems,
                backgroundColor,
                color: `rgba(${Object.values(color)})`,
                padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
                margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                borderRadius: `${borderRadius}px`,
                borderColor,
                borderStyle,
                borderWidth: borderWidth ? `${borderWidth}px` : 0,
                flex: fillSpace == 'yes' ? 1 : 'unset',
            }}
        >
            {children}
        </Resizer>
    )
}

const ContainerSettings = (props) => {
    const { actions: { setProp } } = useNode();

    return <SettingForm setProp={setProp} />
}

Container.craft = {
    props: defaultProps,
    rules: {
        canDrag: () => true,
        canDrop: (targetNode, currentNode) => {
            // If target node is the menu canvas, only specific elements are allowed to drop in
            if (targetNode.data.custom.isMenuCanvas && !['categoryLink', 'pageLink', 'otherLink'].includes(currentNode.data.props.elementType)) {
                return false;
            }
            return true;
        },
    },
    related: {
        settings: ContainerSettings
    }
};