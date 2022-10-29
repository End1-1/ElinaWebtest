import React from 'react';
import defaultClasses from 'Components/Toolbar/toolbar.module.css';
import { mergeClasses } from 'Helper/classify';
import Pagination from 'Components/Toolbar/pagination';
import PerPage from 'Components/Toolbar/perPage';
import Sort from 'Components/Toolbar/sort';

const Toolbar  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            {props.pageControl.totalPages > 0 && <Pagination pageControl={props.pageControl} />}
            <PerPage pageControl={props.pageControl} />
            <Sort pageControl={props.pageControl} />
            {props.pageControl.total > 0 && <span>Showing {props.pageControl.showingFrom}-{props.pageControl.showingTo} Of {props.pageControl.total} Items</span>}
        </div>
    ) 
        
}

export default Toolbar;