import React from 'react';
import defaultClasses from './logo.module.css';
import Link from 'Components/Link';
import { useConfig } from 'Talons/App/useConfig';
import { mergeClasses } from 'Helper/classify';
import getImageUrl from 'Helper/getImageUrl';

const Logo  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getConfigValue } = useConfig();
    return (
        <div className={classes.root}>
            {getConfigValue('logo')  &&
                <Link to={'/'}><img className={classes.logo} src={`${getImageUrl({ src: getConfigValue('logo') })}`} /></Link>
            }
        </div>
    );
}

export default Logo;