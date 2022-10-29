import React, { useCallback } from 'react';
import classes from './stage.css';
import { useCategoryList } from '../../../../talons/Builder/Elements/CategoryList/useCategoryList';

const Stage = (props) => {
    const { item } = props;

    const { 
        categories
    } = useCategoryList();

    const getCategoryList = useCallback((categoryId, currentDepth = 1, maxDepth = 1) => {
        const children = categories.filter(cat => cat.parent == categoryId);
        if (!children || !children.length || currentDepth > maxDepth) return null;

        return (
            <ul>
                {children.map(category => 
                    <li key={category.id}>
                        {category.name}
                        {getCategoryList(category.id, currentDepth + 1, maxDepth)}
                    </li>    
                )}
            </ul>
        );
    }, [categories]);

    return (
        <div className={classes.root}>
            <div className={classes.preview}>
                {!!item.settings.rootCategoryId && getCategoryList(item.settings.rootCategoryId, 1, item.settings.maxDepth)}
            </div>
        </div>
    )
}

export default Stage;