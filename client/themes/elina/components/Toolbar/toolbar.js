import React from 'react';
import defaultClasses from './toolbar.module.css';
import { mergeClasses } from 'Helper/classify';
import Sort from 'Components/Toolbar/sort';

const Toolbar  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <Sort pageControl={props.pageControl} />
        </div>
    ) 
        
}

export default Toolbar;