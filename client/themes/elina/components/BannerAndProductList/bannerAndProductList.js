import React, { useEffect, useCallback } from 'react';
import defaultClasses from './bannerAndProductList.module.css';
import { mergeClasses } from 'Helper/classify';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from 'Components/ProductList';
import Banner from 'Components/Banner';
import { fetchCategoryProducts } from 'Store/actions/product';
import useWindowSize from 'Hooks/useWindowSize';

const BannerAndProductList = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { categoryId, title, link, perPage, categoryUrlKey } = props;
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const { categoryProducts: allCategoryProducts } = useSelector(state => state.product);

    const categoryProducts = allCategoryProducts[categoryId] ? allCategoryProducts[categoryId] : {
        products: [],
        aggregations: []
    };

    useEffect(() => {
        dispatch(fetchCategoryProducts(categoryId, {}, 1, {
            perPage: perPage,
            sort: "date",
        }));
    }, []);
    
    const handleRemoveLastItems = useCallback((qty) => {
        let updated = [...categoryProducts.products];
        updated.splice(-qty);
        return updated;
    }, [categoryProducts]);

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
            </div>

            <div className={classes.body}>
                <ProductList
                    isFetchingList={false}
                    products={width <= 1070 ? handleRemoveLastItems(4) : width <= 1290 ? handleRemoveLastItems(2) : categoryProducts.products}
                    classes={{
                        list: classes.list,
                        productImage: classes.productImage,
                        productImageWrapper: classes.productImageWrapper,
                    }}
                    categoryUrlKey={categoryUrlKey}
                />
            </div>

        </div>
    )
}

export default BannerAndProductList;