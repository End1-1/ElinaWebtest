import getApolloClient from 'Apollo/apolloClient';
import { gql } from '@apollo/client';

export default async (file, folder = 'product', token, callback, params = {}) => {
    const { currentAccountId, type, state } = params;
    if (FILE_STORAGE == 'file') {
        let queryName = '';
        if (type == 'productImage') {
            queryName = 'adminUploadProductFile';
        } if (type == 'slide') {
            queryName = 'adminUploadSlideImage';
        } if (type == 'banner') {
            queryName = 'adminUploadBannerImage';
        } if (type == 'category') {
            queryName = 'adminUploadCategoryImage';
        } else if (type == 'config') {
            queryName = 'adminUploadConfigFile';
        } else if (type == 'testimonial') {
            queryName = 'adminUploadTestimonialFile';
        } else if (type == 'postImage') {
            queryName = 'adminUploadPostImage';
        } else if (type == 'gallery') {
            queryName = 'builderUploadGalleryImage';
        }
        const UPLOAD_FILE = gql`
            mutation ${queryName}($file: Upload!) {
                ${queryName}(file: $file) {
                    path
                }
            }
        `;
        // Somehow, file uploads don't work through proxy, that's why in these cases we directly call the api
        // @todo: Find out why. Probably replaced to express-http-proxy bug 
        const apolloClient = getApolloClient(state, { useApiUrl: true });
        console.log('file', file);
        const { data } = await apolloClient.mutate({
            mutation: UPLOAD_FILE,
            variables: {
                file: file
            }
        });
        const response = data[queryName];
        callback(response.path, file.preview);
    } else if (FILE_STORAGE == 's3') {
        file.fileName = `${file.name}`;
        console.log('file.fileName', file.fileName);

        let queryName = '';
        if (type == 'productImage') {
            queryName = 'adminGetProductFilePresignedUrl';
        }
    
        const GET_SHOP_PRESIGNED_URL = gql`
            query adminGetShopPresignedUrl($name: String!, $type: String!) {
                ${queryName}(name: $name, type: $type) {
                    url
                    path
                }
            }
        `;
        const apolloClient = getApolloClient(state);
        const { data } = await apolloClient.query({
            query: GET_SHOP_PRESIGNED_URL,
            variables: {
                name: file.fileName,
                type: file.type
            }
        });
    
        const { url: presignedUrl, path } = data[queryName];
        console.log('presignedUrl', presignedUrl);
        // Upload using presignedUrl
    
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', presignedUrl)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(path, params);
                    console.log('Image successfully uploaded to S3');
                } else {
                    console.log('Error while sending the image to S3')
                }
            }
        }
        xhr.setRequestHeader('Content-Type', file.type);
        console.log('photo', file);
        xhr.send(file);
    }
    
}