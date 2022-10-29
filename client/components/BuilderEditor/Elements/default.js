import React, { useCallback } from 'react';
import { useNode, useEditor } from "@craftjs/core";
import SettingForm from '../settingForm';
import { useTranslations } from 'Talons/App/useTranslations';

export const Default = () => {
    const { __ } = useTranslations();
    const { elementComponentMap, currentLanguage } = useEditor((state) => {
        return {
            elementComponentMap: state.options.elementComponentMapReal,
            currentLanguage: state.options.currentLanguage
        }
    });

    const { connectors: { connect, drag }, comProps } = useNode((node) => {
        if (node.data.props.elementName) {
            // We should do something, but when I enable this, a lot of things break. Need to find another solution
            // For example text element doesn't work properly
            // node.data.displayName = __(node.data.props.elementName);
        }
        
        return {
            comProps: node.data.props
        }
    });

    const { elementType: type, defaultSettings, ...props } = comProps;

    if (elementComponentMap[type].name == 'Default') {
        // This means it will lead to infinite loop
        return null;
    }

    // Mapping props
    const processProps = useCallback((props, type) => {
        if (type == 'imageSlider') {
            return {
                ...props,
                id: props.sliderId
            }
        } else if (type == 'textHtmlBlock') {
            const { editingLanguage } = props;
            const html = props.multilanguage ? (props.content ? props.content[editingLanguage || currentLanguage] : '') : props.content;
            return {
                ...props,
                html: html || 'Type'
            }
        } else if (type == 'categoryList') {
            return {
                ...props,
                item: {
                    categoryId: props.rootCategoryId,
                    settings: {
                        maxDepth: 4
                    }
                }
            }
        } else if (type == 'banner') {
            return {
                ...props,
                id: props.bannerId
            }
        } else if (type == 'section') {
            return {
                canvas: true,
                style: {
                    ...props
                }
            }
        } else if (type == 'image') {
            return {
                ...props,
                src: props.image
            }
        } else if (type == 'categoryLink') {
            return {
                ...props,
                text: props.name
            }
        } else if (type == 'productSlider') {
            return {
                ...props,
                id: props.categoryId
            }
        }
        return props;
    }, []);

    const propsProcessed = processProps(Object.assign({}, defaultSettings, props), type);
    return (
        <div ref={ref => connect(drag(ref))} style={{ width: '100%' }}>
            {React.createElement(elementComponentMap[type], propsProcessed)}
        </div>
    )
}

const DefaultSettings = (props) => {
    const { actions: { setProp }, fontSize } = useNode((node) => {
        return {
            fontSize: node.data.props.fontSize
        }
    });

    return <SettingForm setProp={setProp} />
}

Default.craft = {
    // Define Default Settings
    props: {},
    rules: {
        canDrop: (targetNode, currentNode) => {
            // If target node is the menu canvas, only specific elements are allowed to drop in
            if (targetNode.data.custom.isMenuCanvas && !['categoryLink', 'pageLink', 'otherLink'].includes(currentNode.data.props.elementType)) {
                return false;
            }
            return true;
        },
    },
    related: {
        settings: DefaultSettings
    }
}