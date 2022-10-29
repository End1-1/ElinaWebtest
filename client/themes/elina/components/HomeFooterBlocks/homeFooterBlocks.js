import React from 'react';
import defaultClasses from './homeFooterBlocks.module.css';
import { mergeClasses } from 'Helper/classify';
import Block from 'Components/Block';
import IconMoon from '../IconMoon/iconMoon';

const HomeFooterBlocks = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.item}>
                    <div>
                        <IconMoon name="block-1" classes={{iconClass: classes.icon}}/>
                    </div>
                   <Block blockId = "607ee88f55827425d9b8edc3"/> 
                </div>
                <div className={classes.item}>
                    <div>
                        <IconMoon name="block-2" classes={{iconClass: classes.icon}}/>
                    </div>
                    <Block blockId = "607ee89f55827425d9b8edc4"/>
                </div>
                <div className={classes.item}>
                    <div>
                        <IconMoon name="block-3" classes={{iconClass: classes.icon}}/>
                    </div>
                    <Block blockId = "607ee8b055827425d9b8edc5"/>
                </div>
                <div className={classes.item}>
                    <div>
                        <IconMoon name="block-4" classes={{iconClass: classes.icon}}/>
                    </div>
                    <Block blockId = "607ee8c355827425d9b8edc6"/>
                </div>
            </div>
        </div>
    )
}

export default HomeFooterBlocks;