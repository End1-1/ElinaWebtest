import React from 'react';
import classes from './footer.module.css';
import Block from 'Components/Block';
import { useFooter } from './useFooter';
import { useTranslations } from 'Talons/App/useTranslations';

const Footer  = props => {
    const { footerBlockId } = useFooter();
    const { __ } = useTranslations();
    
    return (
        <div className={classes.root}>
            {footerBlockId ? <Block blockId={footerBlockId} /> : __('block.not.selected')}
        </div>
    );
}

export default Footer;