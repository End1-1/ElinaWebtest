import React, { useCallback, useMemo, useRef } from 'react';
import getImageUrl from 'Helper/getImageUrl';
import classes from 'Components/Image/image.module.css';
import { useSelector } from "react-redux";

const Image  = props => {
    const { setDetails, className, additionalModuleClasses, additionalGlobalClasses, setLoaded, ...imgProps } = props;
    const { accountId } = useSelector(state => state.shop);
    const ref = useRef();
    const processedSrc = useMemo(() => {
        return getImageUrl({ ...props, accountId });
    }, [props, accountId]);

    // We will use this to pass image details on parent components if needed (for example to slider)
    const handleImageLoad = useCallback((e) => {
        if (!setDetails) return ;
        const details = {
            height: e.target.naturalHeight,
            width: e.target.naturalWidth
        }
        setDetails(details);
        setLoaded(true);
    });

    return (
        <img { ...imgProps } onLoad={() => { handleImageLoad(); if(setLoaded) { setLoaded(true)}}} className={`${className || ''} ${additionalModuleClasses.map(c => classes[c]).join(' ')} ${additionalGlobalClasses.join(' ')}`} ref={ref}  src={processedSrc} />
    );
}

Image.defaultProps = {
    additionalModuleClasses: [],
    additionalGlobalClasses: []
}

export default Image;