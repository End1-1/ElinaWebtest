import React from 'react';
import defaultClasses from './logo.module.css';
import Link from 'Components/Link';
import { useConfig } from 'Talons/App/useConfig';
import { mergeClasses } from 'Helper/classify';
import getImageUrl from 'Helper/getImageUrl';
import { useSelector } from "react-redux";

const Logo  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { getConfigValue } = useConfig();
    const { accountId } = useSelector(state => state.shop);

    return (
        <div className={classes.root}>
            {getConfigValue('logo')  &&
                <Link to={'/'}><img className={classes.logo} src={`${getImageUrl({ src: getConfigValue('logo'), accountId })}`} /></Link>
            }
        </div>
    );
}

export default Logo;