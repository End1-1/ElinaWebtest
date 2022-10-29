/**
 * This function uses parent string to build the tree
 * @param {*} items 
 * @param {*} id 
 * @param {*} link 
 * @returns 
 */
export const convertItemsToTree = (items, id = null, link = 'parent') => {
    return items
        .filter(item => item[link] === id)
        .map(item => ({ ...item, children: convertItemsToTree(items, item.id) }));
}

/**
 * This function uses children array to build the free. 
 * ROOT is the id of root node
 * @param {*} items 
 * @param {*} id 
 * @param {*} link 
 * @returns 
 */
export const convertItemsToTreeWithChildren = (items, ids = ['ROOT']) => {
    return ids.map(itemId => {
        const item = items.find(({ id }) => id == itemId);
        return item ? { ...item, children: item.children ? convertItemsToTreeWithChildren(items, item.children) : null } : {}
    });
}