import React from 'react';
import defaultClasses from './carrer.module.css';
import CareerContent from "../CareerContent";
import { mergeClasses } from "Helper/classify";

const Career = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.root}>
            <CareerContent/>
        </div>
    );
};

export default Career;