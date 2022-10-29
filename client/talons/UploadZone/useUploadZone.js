import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { useTranslations } from '../../talons/App/useTranslations';
import { useSelector } from "react-redux";
import uploadImage from 'Helper/uploadImage';

export const useUploadZone = (props) => {
    const { formik, path, multiple, folderName, type, initialFiles, returnPathOnly } = props;
    const { __ } = useTranslations();
    const token = useSelector(state => state.auth.token);
    const state = useSelector(state => state);
    const [images, setImages] = useState(returnPathOnly ? initialFiles.map(file => { return { uploadedPath: file } }) : initialFiles);
    useEffect(() => {
        let returnValue = returnPathOnly ? images.map(({ uploadedPath }) => uploadedPath) : images.map(image => {
            return {
                ...image,
                path: image.uploadedPath || image.path
            };
        });
        if (!multiple) {
            returnValue = returnValue[0];
        }
        formik.setFieldValue(path, returnValue, false);
        
    }, [images, returnPathOnly, path]);

    // We use the formikRef, because after passing to uploadImage callback, the
    // regular one will be outdated when the callback is called.
    const imagesRef = useRef();
    imagesRef.current = images;

    const onDrop = useCallback(async (acceptedFiles) => {
        // Multiple = false, so acceptedFiles will have only one image

        if (multiple) {
            let currentImages = images ? [...images] : [];
            const uploadedImages = acceptedFiles.map(file => 
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    uploading: true,
                    roles: []
                })
            );
            setImages([...currentImages, ...uploadedImages]);
        } else {
            const file = acceptedFiles[0];

            const image = Object.assign(
                file, 
                {
                    preview: URL.createObjectURL(file),
                    uploading: true,
                    roles: []
                }
            );
            setImages([image]);
        }
        
        // Set in state for preview
        for (let i = 0; i < acceptedFiles.length; i++) {
            // Uploading the file
            uploadImage(acceptedFiles[i], folderName, token, handleImageUploadDone, { currentAccountId: ACCOUNT_ID, type, state });
        }
    }, [token, multiple, ACCOUNT_ID, images, handleImageUploadDone, type]);

    const handleImageUploadDone = (uploadedPath, preview) => {
        let currentImages = [...imagesRef.current];
        if (multiple) {
            currentImages.map((image, index) => {
                if (image.preview == preview) {
                    image.uploadedPath = uploadedPath;
                    image.uploading = false;
                }
            })
        } else {
            currentImages[0].uploadedPath = uploadedPath;
            currentImages[0].uploading = false;
        }
        setImages(currentImages);
    };

    const handleImageRemove = useCallback((e, index = 0) => {
        e.preventDefault();
        if (multiple) {
            let images = [...formik.getFieldMeta(path).value];
            images.splice(index, 1);
            formik.setFieldValue(path, images, false);
        } else {
            formik.setFieldValue(path, false, false);
        }
    }, [formik, multiple, path]);

    const handleImageRoleCheckboxChange = useCallback((role, checked, file, index) => {
        let images = [...formik.getFieldMeta(path).value];
        if (checked) {
            if (role.single) {
                images = images.map(image => {
                    image.roles = image.roles.filter(r => r != role.id);
                    return image;
                })
            }
            images[index].roles = [...images[index].roles, role.id];
        } else {
            images[index].roles = images[index].roles.filter(r => r != role.id)
        }
        formik.setFieldValue(path, images, false);
    }, [formik, path]);

    const getFileUrl = useCallback((path) => {
        if (FILE_STORAGE == 'file' && path) {
            if (['defaultConfig'].includes(path.split('/')[0])) {
                return `${FILE_STORAGE_BASE_URL}${path}`
            }
            return `${FILE_STORAGE_BASE_URL}${ACCOUNT_ID}/${path}`;
        } else if (FILE_STORAGE == 's3') {
            return `${S3_BUCKET_URL}${ACCOUNT_ID}/${path}`;
        }
    }, []);


    return {
        onDrop,
        images,
        handleImageRemove,
        handleImageRoleCheckboxChange,
        getFileUrl,
        __
    }
}