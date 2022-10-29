import React, { useCallback } from 'react';
import classes from './stage.css';
import { useCategoryList } from '../../../../talons/Builder/Elements/CategoryList/useCategoryList';

const Stage = (props) => {
    const { item } = props;

    return (
        <div className={classes.root}>
            Image Slider with id {item.settings.sliderId}
        </div>
    )
}

export default Stage;