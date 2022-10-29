import React, { useCallback } from 'react';
import { useCategoryList } from '../../../../talons/Builder/Elements/CategoryList/useCategoryList';

const Preview = (props) => {
    const { maxDepth, rootCategoryId } = props;

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

    return getCategoryList(rootCategoryId, 1, maxDepth);
}

export default Preview;