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
                    <FacebookIcon size={32} round={true} />
                    {showShareCounts && <FacebookShareCount url={url} />}
                </FacebookShareButton>
            }
            {buttonList.includes('linkedIn') && 
                <LinkedinShareButton url={url} className={classes.shareButton}>
                    <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
            }
            {buttonList.includes('twitter') && 
                <TwitterShareButton url={url} className={classes.shareButton}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
            }
        </div>
    );
}

ShareButtons.propTypes = {
    place: string.isRequired,
}

export default ShareButtons;