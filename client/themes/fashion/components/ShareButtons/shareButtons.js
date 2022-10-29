import React from 'react';
import defaultClasses from './shareButtons.module.css';
import { 
    FacebookShareButton, 
    FacebookShareCount, 
    FacebookIcon, 
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon
} from "react-share";
import { useShareButtons } from 'Talons/ShareButtons/useShareButtons';
import { mergeClasses } from 'Helper/classify';
import { string } from 'prop-types';
import Icon from 'Components/Icon';

const ShareButtons  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        shouldShow,
        buttonList,
        showShareCounts,
        url
    } = useShareButtons(props);

    if (!shouldShow) {
        return null;
    }

    return (
        <div className={classes.root}>
            {buttonList.includes('facebook') && 
                <FacebookShareButton url={url} className={classes.shareButton}>
                    <Icon classes={{icon: classes.icon}} name="facebook"/>
                    {showShareCounts && <FacebookShareCount url={url} />}
                </FacebookShareButton>
            }
            {buttonList.includes('linkedIn') && 
                <LinkedinShareButton url={url} className={`${classes.shareButton} ${classes.linkedin}`}>
                    <Icon classes={{icon: classes.icon}} name="linkedin"/>
                </LinkedinShareButton>
            }
            {buttonList.includes('twitter') && 
                <TwitterShareButton url={url} className={classes.shareButton}>
                    <Icon classes={{icon: classes.icon}} name="twitter"/>
                </TwitterShareButton>
            }
        </div>
    );
}

ShareButtons.propTypes = {
    place: string.isRequired,
}

export default ShareButtons;