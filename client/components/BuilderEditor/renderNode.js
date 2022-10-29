import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import ReactDOM from 'react-dom';
import { ROOT_NODE } from '@craftjs/utils';
import Icon from './icon';
import classes from './renderNode.module.css';
import { useTranslations } from 'Talons/App/useTranslations';

export const RenderNode = ({ render }) => {
    const { actions, query, connectors, builderData } = useEditor((state) => {
        return {
            builderData: state.options.builderData
        }
    });

    const { __ } = useTranslations();

    const { elements } = builderData;

    const {
        id,
        isActive,
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: { drag },
        parent,
        elementType,
        props,
    } = useNode((node) => ({
        isActive: node.events.selected,
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
        props: node.data.props,
        elementType: node.data.props.elementType
    }));

    const currentRef = useRef();

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) dom.classList.add('component-selected');
            else dom.classList.remove('component-selected');
        }
    }, [dom, isActive, isHover]);

    const getPos = useCallback((dom) => {
        const { top, left, bottom } = dom
            ? dom.getBoundingClientRect()
            : { top: 0, left: 0, bottom: 0 };
        return {
            top: `${top > 0 ? top : bottom}px`,
            left: `${left}px`,
        };
    }, []);

    const scroll = useCallback(() => {
        const { current: currentDOM } = currentRef;

        if (!currentDOM) return;
        const { top, left } = getPos(dom);
        currentDOM.style.top = top;
        currentDOM.style.left = left;
    }, [dom]);

    useEffect(() => {
        document
            .querySelector('.craftjs-renderer')
            .addEventListener('scroll', scroll);

        return () => {
            document
                .querySelector('.craftjs-renderer')
                .removeEventListener('scroll', scroll);
        };
    }, [scroll]);

    const getElementLabel = useCallback((elementType) => {
        let element = null;
        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements[i].items.length; j++) {
                if (elements[i].items[j].type == elementType) {
                    element = elements[i].items[j];
                }
            }
        }
        return element ? element.name : '';
    }, [elements]);

    return (
        <Fragment>
            {isHover || isActive
                ? ReactDOM.createPortal(
                    <div
                        ref={currentRef}
                        className="px-2 py-2 fixed flex items-center itemToolbar"
                        style={{
                            left: getPos(dom).left,
                            top: getPos(dom).top,
                            zIndex: 9999,
                            height: '30px',
                            marginTop: '-29px',
                            fontSize: '12px',
                            position: 'fixed'
                        }}
                    >
                        <p className="flex-1 mr-4">{__(getElementLabel(elementType)) || name}</p>
                        {moveable ? (
                            <button className={`${classes.button} ${classes.move}`} ref={drag}>
                                <Icon classes={{ icon: classes.icon }} name='move' />
                            </button>
                        ) : null}
                        {id !== ROOT_NODE && (
                            <button
                                className={`${classes.button}`}
                                onClick={() => {
                                    actions.selectNode(id);
                                }}
                            >
                                <Icon classes={{ icon: classes.icon }} name='pencil' />
                            </button>
                        )}
                        {deletable ? (
                            <button
                                className={`${classes.button}`}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    actions.delete(id);
                                }}
                            >
                                <Icon classes={{ icon: classes.icon }} name='trash' />
                            </button>
                        ) : null}
                        {props.submenuType == 'megamenu' ? (
                            <button
                                className={`${classes.button}`}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    actions.setProp(id, (props) => {
                                        props['editSubmenu'] = !props['editSubmenu'];
                                    });
                                }}
                            >
                                <Icon classes={{ icon: classes.icon }} name='submenu' />
                            </button>
                        ) : null}
                    </div>,
                    document.body
                )
                : null}
            {render}
        </Fragment>
    );
};
