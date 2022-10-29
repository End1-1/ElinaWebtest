import React from 'react';
import defaultClasses from './link.module.css';
import { mergeClasses } from 'Helper/classify';
import { useLink } from 'Talons/Link/useLink';
import { Link as LinkRouter } from 'react-router-dom';

const Link  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getLocalizedUrl } = useLink();

    // 'to' is usually the path, but sometimes we specify object in order to pass state as well (used in breadcrumbs mainly)

    return (
        <LinkRouter { ...props } to={typeof props.to == 'string' ? getLocalizedUrl(props.to) : { ...props.to, pathname: getLocalizedUrl(props.to.pathname) }} />
    );
}

export default Link;