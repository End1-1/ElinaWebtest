import React, { useEffect, useCallback } from 'react';
import defaultClasses from './bannerOne.module.css';
import { mergeClasses } from 'Helper/classify';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from 'Components/ProductList';
import Banner from 'Components/Banner';
import { fetchCategoryProducts } from 'Store/actions/product';
import useWindowSize from 'Hooks/useWindowSize';

const BannerOne = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { categoryId, title, link, perPage, categoryUrlKey } = props;
    const dispatch = useDispatch();
    const { width } = useWindowSize();

    return (
        <div className={classes.root}>

            <div className={classes.banner}>
                <Banner
                    id={width <= 860 ? "608181e24975ae7828488739" : "606423d3b0e47f12f2b23a3d"}
                    classes={{overlay: classes.bannerOverlay, content: classes.content}}
                    hovered={true}
                />
                <Banner
                    id={width <= 860 ? "608181e24975ae7828488739" : "63433b33cd353d050feb3f91"}
                    classes={{overlay: classes.bannerOverlay, content: classes.content}}
                    hovered={true}
                />
                <Banner
                    id={width <= 860 ? "608181e24975ae7828488739" : "63433b33cd353d050feb3f91"}
                    classes={{overlay: classes.bannerOverlay, content: classes.content}}
                    hovered={true}
                />
            </div>


        </div>
    )
}

export default BannerOne;