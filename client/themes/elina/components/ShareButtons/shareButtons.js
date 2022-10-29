import React from 'react';
import defaultClasses from './shareButtons.module.css';
import { 
    FacebookShareButton, 
    FacebookShareCount, 
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon
} from "react-share";
import { useShareButtons } from 'Talons/ShareButtons/useShareButtons';
import { mergeClasses } from 'Helper/classify';
import { string } from 'prop-types';
import instaIcon from './insta.png';

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
            {buttonList.includes('telegram') && 
                <TelegramShareButton url={url} className={classes.shareButton}>
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
            }
        </div>
    );
}

ShareButtons.propTypes = {
    place: string.isRequired,
}

export default ShareButtons;