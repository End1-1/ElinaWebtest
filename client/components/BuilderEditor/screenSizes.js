import React from 'react';
import classes from './screenSizes.module.css';
import Icon from './icon';

const ScreenSizes = (props) => {
    const { screenSize, switchScreenSize } = props;

    return (
        <div className={classes.root}>
            <span className={screenSize == 'mobile' ? classes.active : ''} onClick={() => switchScreenSize('mobile')}>
                <Icon name="screen-mobile" size={37} />
            </span>
            <span className={screenSize == 'tablet' ? classes.active : ''} onClick={() => switchScreenSize('tablet')}>
                <Icon name="screen-tablet" size={42} />
            </span>
            <span className={screenSize == 'desktop' ? classes.active : ''} onClick={() => switchScreenSize('desktop')}>
                <Icon name="screen-desktop" size={42} />
            </span>
        </div>
    );
}

export default ScreenSizes;