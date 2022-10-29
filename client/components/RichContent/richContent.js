import React from 'react';

import classes from './richContent.module.css';

const RichContent = props => {
    const { html, additionalModuleClasses, additionalGlobalClasses } = props;

    return (
        <div 
            className={`${classes.root} ${additionalModuleClasses.map(c => classes[c]).join(' ')} ${additionalGlobalClasses.join(' ')}`} 
            dangerouslySetInnerHTML={{ __html: html }} 
        />
    );
};

RichContent.defaultProps = {
    additionalModuleClasses: [],
    additionalGlobalClasses: []
}

export default RichContent;
