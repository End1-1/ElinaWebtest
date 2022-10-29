import React, { useMemo } from 'react';
import classes from './builderContent.module.css';
import useWindowSize from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { useBuilderContent } from 'Talons/Builder/useBuilderContent';

const BuilderContent = (props) => {
    const { content } = props;
    const { currentLanguage } = useSelector(state => state.shop);
    
    const { isMobile, isTablet } = useWindowSize(); 

    const { getItemContent } = useBuilderContent();

    const sizeContent = useMemo(() => {
        if (isMobile) {
            return content.find(({ screenSize }) => screenSize == 'mobile') ? 
            content.find(({ screenSize }) => screenSize == 'mobile').contentTree :
            content.find(({ screenSize }) => screenSize == 'desktop').contentTree
        }
        if (isTablet) {
            return content.find(({ screenSize }) => screenSize == 'tablet') ? 
            content.find(({ screenSize }) => screenSize == 'tablet').contentTree :
            content.find(({ screenSize }) => screenSize == 'desktop').contentTree
        }
        return content.find(({ screenSize }) => screenSize == 'desktop').contentTree;
    }, [content, isMobile, isTablet, currentLanguage]);

    return (
        <div className={classes.root}>
            <div className={classes.preview}>
                {getItemContent(sizeContent)}
            </div>
        </div>
    );
}

export default BuilderContent;
