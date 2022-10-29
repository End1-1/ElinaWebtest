import React from 'react';
import defaultClasses from './socialIcons.module.css';
import { mergeClasses } from 'Helper/classify';
import { useSocialIcons } from 'Talons/Social/useSocialIcons';

const SocialIcons  = props => {
    const { icons } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        data
    } = useSocialIcons({
        ...props
    });

    if (data === false) {
        return null;
    }

    return (
        <div className={classes.root}>
            <ul>
            {data.map(({ id, label, url }, index) => 
                <li key={index}><a className={`${id || ''}`} target={'_blank'} href={url}>{label}</a></li>
            )}
            </ul>
        </div>
    );
}

export default SocialIcons;