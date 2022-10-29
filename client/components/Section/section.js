import React from 'react';

import classes from './section.module.css';

const Section = props => {
    const { additionalModuleClasses, additionalGlobalClasses, propRef, ...divProps } = props;

    return (
        <div 
            {...divProps}
            ref={propRef}
            className={`${divProps.className} ${additionalModuleClasses.map(c => classes[c]).join(' ')} ${additionalGlobalClasses.join(' ')}`} 
        />
    );
};

Section.defaultProps = {
    additionalModuleClasses: [],
    additionalGlobalClasses: []
}

export default Section;
