export const applyRecursive = (item, func) => {
    func(item);
    
    if (item.children) {
        item.children = item.children.map(item => applyRecursive(item, func));
    }
    return item;
}

export const applyRecursiveAsync = async (item, func) => {
    await func(item);
    
    if (item.children) {
        for (let i = 0; i < item.children.length; i++) {
            await applyRecursiveAsync(item.children[i], func);
        }
    }
    return item;
}