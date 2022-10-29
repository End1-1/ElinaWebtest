import React from 'react';
import classes from './categoryPage.module.css';
import ProductList from 'Components/ProductList';
import Toolbar from 'Components/Toolbar';
import Filters from 'Components/Filters';
import Head from 'Components/Head';
import RichContent from 'Components/RichContent';
import { useCategoryPage } from 'Talons/CategoryPage/useCategoryPage';
import Image from 'Components/Image';
import Breadcrumbs from 'Components/Breadcrumbs';

const CategoryPage = (props) => {
    const { breadcrumbs } = props;
    const {
        category,
        categoryProducts,
        pageControl,
        isFetchingCategoryProducts,
        __
    } = useCategoryPage(props);

    return (
        <div className={classes.root}>
            <Head>
                <title>{category ? (category.pageTitle ? category.pageTitle : category.name) : ''}</title>
                <meta name="description" content={category ? category.metaDescription : ''} />
            </Head>
            <div className={classes.body}>
                <div>
                    <h1>{category && category.name}</h1>
                    <Breadcrumbs crumbs={breadcrumbs} />
                    <div>
                        {category.image && <div className={classes.image}>
                            <Image src={`${category.image}`} />
                        </div>}
                        <RichContent html={category.description} />
                    </div>
                    <div className={classes.filtersAndList}>
                        {categoryProducts && <Filters aggregations={categoryProducts.aggregations || []}  />}
                        {true ? 
                        <div>
                            <Toolbar pageControl={pageControl} />
                            <ProductList 
                                products={categoryProducts.products} 
                                isFetchingProducts={isFetchingCategoryProducts} 
                                // This will be used to make correct links for items for breadcrumbs
                                placementInfo={{ type: 'categoryPage', categoryId: category.id }}
                            />
                            <Toolbar pageControl={pageControl} />
                        </div> : 
                        <div>Empty</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;