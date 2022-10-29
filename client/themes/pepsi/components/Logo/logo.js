import React from 'react';
import defaultClasses from './logo.module.css';
import Link from 'Components/Link';
import { useConfig } from 'Talons/App/useConfig';
import { mergeClasses } from 'Helper/classify';

const Logo  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getConfigValue } = useConfig();

    return (
        <div className={classes.root}>
            {getConfigValue('logo')  &&
                <Link to={'/'}><img className={classes.logo} src={`${IMAGE_BASE_URL}${getConfigValue('logo')}`} /></Link>
            }
        </div>
    );
}

export default Logo;