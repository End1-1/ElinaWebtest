import React from 'react';
import defaultClasses from './breadcrumbs.module.css';
import { useBreadcrumbs } from 'Talons/Breadcrumbs/useBreadcrumbs';
import { mergeClasses } from 'Helper/classify';
import Link from 'Components/Link';

const Breadcrumbs = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { crumbs } = useBreadcrumbs(props);
    
    return (
        <div className={`${classes.root}`}>
            {crumbs.map(crumb => 
                <div className={classes.crumb}>
                    {crumb.link ? <Link className={classes.link} to={crumb.link}>{crumb.label}</Link> : <span className={classes.label}>{crumb.label}</span>}
                </div>
            )}
        </div>
    );
}

export default Breadcrumbs;