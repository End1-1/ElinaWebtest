import React, { useCallback } from 'react';
import classes from './uploadZone.module.css';
import { useUploadZone } from 'Talons/UploadZone/useUploadZone';
import Dropzone from 'react-dropzone';
import Loading from 'Components/Loading';
import Button from 'Components/Button';
import Icon from 'Components/Icon';

const UploadZone  = props => {
    const { path, type, multiple, allowMultipleUpload, folderName, withRoles, roles, returnPathOnly } = props;
    const {
        onDrop,
        images,
        handleImageRemove,
        handleImageRoleCheckboxChange,
        getFileUrl,
        __
    } = useUploadZone({
        ...props
    });

    const getThumb = useCallback((file, index) => {
        if (!file) return null;
        // For newly uploaded files, uploadedPath will be user. For existing - path
        const path = file.uploadedPath || file.path;
        const inner = typeof file == 'object' ? (
            <div className={classes.thumbInner}>
                <img src={path && !file.uploading ? getFileUrl(path) : file.preview} />
                {(file && file.uploading) &&
                    <div className={classes.loading}>
                        <Loading />
                    </div>
                }
            </div>
        ) : (
            <div className={classes.thumbInner}>
                <img src={`/media/${ACCOUNT_ID}/${file}`} />
            </div>
        )
        return (
            <div className={`${classes.thumbWrapper}`}>
                <div className={`${classes.thumb}`}>
                    <div className={classes.toolbar}>
                        <Button onClick={(e) => handleImageRemove(e, index)} iconOnly={true}>
                            <Icon name='trash' />
                        </Button>
                    </div>
                    {inner}
                </div>
                {withRoles && <div className={classes.roles}>
                    {roles.map(role => 
                        <div key={role.id}>
                            <input type={'checkbox'} checked={file.roles.includes(role.id)} onChange={(e) => handleImageRoleCheckboxChange(role, e.target.checked, file, index)} />
                            <span>{role.label}</span>
                        </div>
                    )}
                </div>}
            </div>
        );
    }, [images, handleImageRemove]);
    
    return (
        <div className={classes.root}>
            <div className={classes.images}>
                {multiple && images && !!images.length && images.map((image, index) => <React.Fragment key={index}>{getThumb(image, index)}</React.Fragment>)}
                <Dropzone onDrop={acceptedFile => onDrop(acceptedFile)} multiple={allowMultipleUpload}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()} className={`${classes.thumbBox}`}>
                            <input {...getInputProps()} />
                            <div className={classes.loadingOrText}>
                                {((!multiple && !images.length) || !images || multiple) && <p>Drag 'n' drop some files here</p>}
                            </div>
                            {!multiple && !!images && getThumb(images[0])}
                        </div>
                    </section>
                )}
                </Dropzone>
            </div>
        </div>
    );
}

UploadZone.defaultProps = {
    type: 'productImage',
    withRoles: false,
    roles: [],
    // Only path will be stored, not like product images (roles, pathname)
    returnPathOnly: false,
    // Allowing upload few files once
    allowMultipleUpload: false
}

export default UploadZone;