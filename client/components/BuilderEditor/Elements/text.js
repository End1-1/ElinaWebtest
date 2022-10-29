import React, { Fragment } from 'react';
import { useNode, Element } from "@craftjs/core";
import ContentEditable from 'react-contenteditable'

export const Text = ({ text, fontSize, textAlign, color, fontWeight, fontStyle, globalClasses, margin = [0, 0, 0, 0], multilanguage, editingLanguage }) => {
    const { connectors: { connect, drag }, isActive, actions: { setProp } } = useNode((node) => ({
        isActive: node.events.selected
    }));

    const globalClassesArray = globalClasses ? globalClasses.split(',') : [];
    const content = multilanguage ? (text[editingLanguage] ? text[editingLanguage] : 'Type...') : (text ? text : 'Type...');

    return (
        <div
            ref={ref => connect(drag(ref))}
        >
            <ContentEditable
                html={content}
                onChange={e =>
                    setProp(props => {
                        const text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
                        // If for example hy_AM is editing at this moment, show that text
                        if (editingLanguage) {
                            props.text[editingLanguage] = text;
                        } else {
                            props.text = text;
                        }
                    })
                }
                className={`${globalClassesArray.join(' ')}`}
                tagName="span"
                style={{ 
                    display: 'inline-block',
                    fontSize: `${fontSize}px`, 
                    textAlign, 
                    fontWeight,
                    fontStyle,
                    color,
                    margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                }}
            />
        </div>
    )
}

const TextSettings = (props) => {
    const { actions: { setProp }, fontSize } = useNode((node) => ({
        fontSize: node.data.props.fontSize
    }));

    return (
        <Fragment>
            <form size="small" component="fieldset">
                <label>Font Size</label>
                <input type={'number'} onChange={(e) => {
                    setProp(props => props.fontSize = e.target.value);
                }} value={fontSize || 7} />

          Settings
        </form>
        </Fragment>
    )
}

Text.craft = {
    // Define Default Settings
    props: {
        fontSize: 30,
        text: 'Type something...'
    },
    related: {
        settings: TextSettings
    }
}