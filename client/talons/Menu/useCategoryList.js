import { useMemo } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';
import { findInTree } from 'Helper/findInTree';

export const useCategoryList = (props) => {
    const { rootCategoryId, categories = [] } = props;
    const { __ } = useTranslations();

    const categoryTree = useMemo(() => {
        const tree = findInTree(categories, rootCategoryId);
        if (tree) {
            return tree;
        } else {
            // If node not found, return the root node
            return {
                children: categories
            };
        }
    }, [categories, rootCategoryId]);

    return {
        categoryTree,
        categories,
        __
    }
}