import React from 'react';
import classes from './index.module.css';
import ProductSlider from 'Components/ProductSlider';
import Slider from 'Components/Slider';
import Banner from 'Components/Banner';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { fetchBanner } from 'Store/actions/banner';
import { fetchSlider } from 'Store/actions/slider';
import { fetchProductsForSlider } from 'Store/actions/product';
import trim from 'Helper/trim';
import Head from 'Components/Head';
import useWindowSize from 'Hooks/useWindowSize';
import TesimonialSlider from 'Components/TestimonialSlider/testimonialSlider';
import BlogPostsWidget from 'Components/BlogPostsWidget';

const Index = (props) => {
    const { width } = useWindowSize();
    const { scopeConfig } = useSelector(state => state.config);

    return (
        <div className={classes.root}>
            <Head>
                <title>{'Mazda USA Official Site | Cars, SUVs & Crossovers'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <div className={classes.top}>
                    {scopeConfig.pepsiSliderId && <Slider id={scopeConfig.pepsiSliderId.value} imageHeight={609} imageWidth={778} />}
                    <div className={classes.topBanners}>
                        {scopeConfig.pepsiTopBannerId && <Banner id={scopeConfig.pepsiTopBannerId.value} />}
                        <div className={classes.bottomBanners}>
                            {scopeConfig.pepsiBottomRightBannerId && <Banner id={scopeConfig.pepsiBottomRightBannerId.value} />}
                            {scopeConfig.pepsiBottomLeftBannerId && <Banner id={scopeConfig.pepsiBottomLeftBannerId.value} />}
                        </div>
                    </div>
                </div>
                <div className={classes.productSlider}>
                    <h3>Top Picks</h3>
                    {scopeConfig.mazdaTopProductSliderCatId && <ProductSlider id={scopeConfig.mazdaTopProductSliderCatId.value} 
                    visibleItems={width < 550 ? 2 : width < 800 ? 3 : 4} 
                    />}
                </div>
                <div className={classes.productSlider}>
                    <h3>Bestsellers</h3>
                    <ProductSlider visibleItems={width < 550 ? 2 : width < 800 ? 3 : 4} />
                </div>
                <div className={classes.testimonials}>
                    <TesimonialSlider/>
                </div>
                <div className={classes.blogPostsWidget}>
                    <BlogPostsWidget filterType={"createdAt"} count={3} />
                </div>
            </div>
        </div>
    );
}

export const loadData = (store, req) => {
    const slug = trim(req.path, '/');
    const { scopeConfig } = store.getState().config;
    if (slug == '') {
        const promises = [];
        if (scopeConfig.pepsiTopBannerId && scopeConfig.pepsiTopBannerId.value) {
            promises.push(store.dispatch(fetchBanner(scopeConfig.pepsiTopBannerId.value)));
        }
        if (scopeConfig.pepsiBottomRightBannerId && scopeConfig.pepsiBottomRightBannerId.value) {
            promises.push(store.dispatch(fetchBanner(scopeConfig.pepsiBottomRightBannerId.value)));
        }
        if (scopeConfig.pepsiBottomLeftBannerId && scopeConfig.pepsiBottomLeftBannerId.value) {
            promises.push(store.dispatch(fetchBanner(scopeConfig.pepsiBottomLeftBannerId.value)));
        }
        if (scopeConfig.pepsiSliderId && scopeConfig.pepsiSliderId.value) {
            promises.push(store.dispatch(fetchSlider(scopeConfig.pepsiSliderId.value)));
        }
        promises.push(store.dispatch(fetchProductsForSlider({
            type: 'bestsellers'
        })));
        return Promise.all(promises);
    }
}

export default {
    component: withRouter(Index),
    loadData
};