import React, { Fragment, useCallback, useMemo } from 'react';
import classes from './settings.module.css';
import { Element, useEditor } from "@craftjs/core";
import { Container } from './Elements/container';

const Settings = (props) => {
    const { setSizeContent } = props;
    const { selected, query, builderData } = useEditor((state) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                type: state.nodes[currentNodeId].data.props.elementType,
                settingValues: state.nodes[currentNodeId].props,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                setProp: state.handlers.store.actions.setProp
            };
        }

        return {
            selected,
            builderData: state.options.builderData
        }
    });

    if (!selected) return null;

    // If item is selected, its options should be shown in SettingForm Component

    return (
        <div>
            {selected && selected.settings ? <selected.settings /> : null}
        </div>
    );
}

export default Settings;