export const prepareRecursive = (item, params = {}) => {
    const { jsonDecodeSettings, jsonDecodeData } = params;
    if (jsonDecodeSettings && typeof item.settings == 'string') {
        item.settings = JSON.parse(item.settings);
    }

    if (jsonDecodeData && typeof item.data == 'string') {
        item.data = JSON.parse(item.data);
    }
    
    if (item.children) {
        item.children = item.children.map((child) => prepareRecursive(child, params));
    }
    return item;
}