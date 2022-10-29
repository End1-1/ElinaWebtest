import React, { Fragment } from 'react';
import { useNode, Element } from "@craftjs/core";

// components/user/Button.js
export const Button = ({ size, variant, color, children }) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <button ref={ref => connect(drag(ref))} size={size} variant={variant} color={color} >
            Some Button
        </button>
    )
}

const ButtonSettings = (props) => {
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


Button.craft = {
    // Define Default Settings
    props: {
        sliderId: '605b9f285e769131fecba00b'
    },
    related: {
        settings: ButtonSettings
    }
}