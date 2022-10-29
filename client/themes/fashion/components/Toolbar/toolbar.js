import React from 'react';
import defaultClasses from './toolbar.module.css';
import { mergeClasses } from 'Helper/classify';
import Pagination from './pagination';
import PerPage from 'Components/Toolbar/perPage';
import Sort from 'Components/Toolbar/sort';

const Toolbar  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <Pagination pageControl={props.pageControl} />
            <PerPage pageControl={props.pageControl} />
            <Sort pageControl={props.pageControl} />
        </div>
    ) 
        
}

export default Toolbar;