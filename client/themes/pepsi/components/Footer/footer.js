import React from 'react';
import classes from './footer.module.css';
import { useConfig } from 'Talons/App/useConfig';
import Block from 'Components/Block';

const Footer  = props => {
    const { getConfigValue } = useConfig();

    return (
        <div className={classes.root}>
            <div className={classes.footerBlock}>
                <Block blockId="600eb2392f5a7d524fcb10d6" />
            </div>
        </div>
    );
}

export default Footer;