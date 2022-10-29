import React from 'react';
import classes from './elements.module.css';
import { Element, useEditor } from "@craftjs/core";
import { Container } from './Elements/container';
import Icon from './icon';

const Elements = (props) => {
    const { builderData, elementComponentMap, elementDefaultSettings, editorEnabled, __ } = props;
    const { elements } = builderData;
    const { connectors } = useEditor();

    return (
        <div className={`${classes.root} builder-elements`}>
            {elements.map((group) =>
                <div className={classes.group} key={group.id}>
                    <div className={classes.heading}>
                        {Array.isArray(group.translate) && group.translate.includes('name') ? __(group.name) : group.name}
                    </div>
                    {group.items.map((element, index) => {
                        const defaultSettings = elementDefaultSettings[(element.type && element.id) ? (element.type + '#' + element.id): element?.identifier];
                        return element.type == 'section' ? <div key={`${element.type}-${element.id}`} className={classes.element} ref={(ref) =>
                            connectors.create(
                                ref,
                                <Element
                                    canvas
                                    is={Container}
                                    backgroundColor='#CCCCCC'
                                    color={{ r: 0, g: 0, b: 0, a: 1 }}
                                    height="300px"
                                    width="300px"
                                    custom={{ elementType: 'section' }}
                                    {...defaultSettings}
                                ></Element>
                            )
                        }>
                            <Icon name={element.icon || 'section'} classes={{ icon: classes.icon }} />
                            <span className={classes.name}>{Array.isArray(element.translate) && element.translate.includes('name') ? __(element.name) : element.name}</span>
                        </div>
                        : <div key={`${element.type}-${element.id}`} className={classes.element} ref={ref => connectors.create(ref, React.createElement(elementComponentMap[element.type], {
                            elementType: element.type,
                            elementName: element.name,
                            vahe: element.id,
                            defaultSettings: defaultSettings,
                            // Default props as props
                            ...defaultSettings
                        }))}>
                            <Icon name={element.icon || 'section'} classes={{ icon: classes.icon }} />
                            <span className={classes.name}>{Array.isArray(element.translate) && element.translate.includes('name') ? __(element.name) : element.name}</span>
                        </div>   
                    }
                    )}
                </div>
            )}

        </div>
    );
}

export default Elements;