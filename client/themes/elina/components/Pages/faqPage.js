import React from 'react';
import defaultClasses from './faqPage.css';
import { mergeClasses } from 'Helper/classify';
import Faq from 'Components/Faq';

const FaqPage = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    
    return (
        <div className={classes.root}>
            <Faq/>
        </div>
    )
};

export default {
    component: FaqPage,
    loadData: () => { }
};