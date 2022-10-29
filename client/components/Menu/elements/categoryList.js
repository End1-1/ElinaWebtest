import React, { useCallback } from 'react';
import { useCategoryList } from 'Talons/Menu/useCategoryList';
import Link from 'Components/Link';
import classes from './categoryList.css';

const CategoryList = (props) => {
    const { item, openSubmenuOnClick } = props;

    const { categories, categoryTree } = useCategoryList({
        rootCategoryId: item.categoryId,
        categories: item.data.categories
    });

    const getCategoryList = useCallback((children, currentDepth = 1, maxDepth = 1) => {
        if (!children || !children.length || currentDepth > maxDepth) return null;

        return (
            <ul className={`${classes.submenu} ${classes['level' + currentDepth]}`}>
                {children.map(category => 
                    <li key={category.id}>
                        <Link to={category.urlKey}>{category.name}</Link>
                        {getCategoryList(category.children, currentDepth + 1, maxDepth)}
                    </li>    
                )}
            </ul>
        );
    }, [categories]);

    return getCategoryList(categoryTree.children, 1, item.maxDepth || 3);
}

export default CategoryList;