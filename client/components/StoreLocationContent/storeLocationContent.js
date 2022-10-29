import React from 'react';
import defaulClasses from './storeLocationContent.module.css';
import { mergeClasses } from 'Helper/classify';
import Banner from 'Components/Banner';
import Button from 'Components/Button';
import {useStoreLocationContent} from 'Talons/StoreLocationContent/useStoreLocationContent';
import {useSocialIcons} from 'Talons/Social/useSocialIcons';
import {getMapUrlFromEmbedHtml} from 'Helper/getMapUrlFromEmbedHtml';
import Block from 'Components/Block';
import useWindowSize from "../../hooks/useWindowSize";
import Link from 'Components/Link';

const StoreLocationConent = (props) => {
    const classes = mergeClasses(defaulClasses, props.classes);
    const {
        storeLocations,
        __
    } = useStoreLocationContent();
    const {data: socialIcons} = useSocialIcons();
    const {width} = useWindowSize()

    return (
        <div className={classes.root}>
            <div className={classes.bannerField}>
                <Banner id="60af5748c846e94207871ad5" classes={{content: classes.content}}/>
            </div>
            {width >= 775 && <div className={classes.breadcrumbs}>
                <Link to="/" classes={{link: classes.breadCrumbsTextActive}}>
                    {__("home")}
                </Link>
                <span className={classes.breadCrumbsTextLine}>|</span>
                <span className={classes.breadCrumbsText}>{__("our.stores")}</span>
            </div>}
            <div className={classes.body}>
                {width>=775 && <div className={classes.titleField}>
                    <h1 className={classes.title}>
                        {__("our.stores")}
                    </h1>
                </div>}
                <div className={classes.descriptionField}>
                    <span className={classes.description}>
                        <Block blockId="609d0a6de6ca25314db76e08"/>
                    </span>
                </div>
                <div className={classes.mapList}>
                    {
                        storeLocations.map(e => {
                            const url = getMapUrlFromEmbedHtml(e.embedHtml);
                            return (
                                <div className={classes.storeLocator}>
                                    <div className={classes.map}>
                                        <div dangerouslySetInnerHTML={{__html: e.embedHtml}}></div>
                                    </div>
                                    <div className={classes.details}>
                                        <div className={classes.detailsItem}>
                                            {e.address}
                                        </div>
                                        <div className={classes.detailsItem}>
                                            {e.workingHours.from}-{e.workingHours.to}
                                        </div>
                                        <div className={classes.detailsItem}>
                                            {e.phoneNumber}
                                        </div>
                                    </div>
                                    <a target="_blank" jstcache="46" href={url} jsaction="mouseup:placeCard.largerMap">
                                        <Button classes={{ button: classes.button }}>
                                            { __('road') }
                                        </Button>
                                    </a>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
}

export default StoreLocationConent