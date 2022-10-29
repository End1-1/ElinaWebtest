export const findInTree = (tree, rootCategoryNodeId) => {
    let found = false;
    tree.map(cat => {
        if (cat.id == rootCategoryNodeId) {
            found = cat;
            return;
        } else if (cat.children) {
            const foundInChild = findInTree(cat.children, rootCategoryNodeId)
            if (foundInChild) {
                found = foundInChild;
                return;
            }
        }
    })
    return found;
}