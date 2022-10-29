export default ({ src, width, height, accountId }) => {
    if (!src) {
        return '';
    }
    const srcParts = src.split('/');
    const extension = srcParts[srcParts.length - 1].split('.').pop();
    // Add resize parameters if height or width are specified
    if (['product', 'gallery'].includes(srcParts[0])) {
        if ((height || width) && ['png', 'jpg'].includes(extension)) {
            srcParts[0] = `${srcParts[0]}/r/${[width, height].join('x')}`;
            return FILE_STORAGE_BASE_URL + `${accountId || ACCOUNT_ID}/${srcParts.join('/')}`;
        } else {
            return FILE_STORAGE_BASE_URL + `${accountId || ACCOUNT_ID}/${src}`;
        }
    } else if(['config', 'slide', 'banner', 'category', 'post', 'testimonial', 'job', 'cv'].includes(srcParts[0])) {
        return FILE_STORAGE_BASE_URL + `${accountId || ACCOUNT_ID}/${src}`;
    }
    return `${FILE_STORAGE_BASE_URL}${src}`;
}
