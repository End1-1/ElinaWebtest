import React, { Fragment } from 'react';
import { useNode, useEditor, Element } from "@craftjs/core";
import { Resizer } from '../resizer';
import SettingForm from '../settingForm';
import { Container } from './container';
import classes from './linkWithSubmenu.module.css';

const defaultProps = {
    
};


// components/user/Container.js
export const LinkWithSubmenu = (props) => {
    props = { ...defaultProps, ...props };

    const { getItemContent } = useEditor((state) => {
        return {
            getItemContent: state.options.getItemContent
        }
    });

    const { connectors: { connect, drag }, isActive, actions: { setProp } } = useNode((node) => ({
        isActive: node.events.selected
    }));

    const { name } = props;

    // Even if item has submenu, and editSubmenu is false, we need to show it anyways, coz otherwise craft considers them to be non-existant, and 
    // informs formik that it is not inside the builder. That's why, even with display: none, we should show it
    return (
        <div ref={ref => connect(drag(ref))}>
            <span className={classes.link}>{name}</span>
            {props.submenuType == 'megamenu' && 
                <Fragment>
                    {props.submenuChildren && props.submenuChildren.length ? 
                        <Fragment>{props.editSubmenu ? getItemContent(props.submenuChildren[0], '', false) : <div style={{ display: 'none' }}>{getItemContent(props.submenuChildren[0], '', false)}</div>}</Fragment> : 
                        <Fragment>{props.editSubmenu && <Element
                                canvas
                                is={Container}
                                color={{ r: 0, g: 0, b: 0, a: 1 }}
                                height="300px"
                                width="100%"
                                id={'megamenu'}
                                custom={{ elementType: 'section' }}
                                position={'absolute'}
                                top={10}
                                className={classes.megamenu}
                            ></Element>}
                        </Fragment>}
                </Fragment>
            }
        </div>
    )
}

const LinkWithSubmenuSettings = (props) => {
    const { actions: { setProp }, fontSize } = useNode((node) => {
        return {
            fontSize: node.data.props.fontSize
        }
    });

    return <SettingForm setProp={setProp} />
}

LinkWithSubmenu.craft = {
    displayName: 'LinkWithSubmenu',
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
        settings: LinkWithSubmenuSettings
    }
};