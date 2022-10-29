import React, { useState } from 'react';
import classes from './categoryPage.module.css';
import ProductList from 'Components/ProductList';
import Toolbar from 'Components/Toolbar';
import Filters from 'Components/Filters';
import Head from 'Components/Head';
import RichContent from 'Components/RichContent';
import Sort from 'Components/Toolbar/sort';
import Pagination from 'Components/Toolbar/pagination';
import Icon from 'Components/Icon';
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

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Head>
                <title>{category ? (category.pageTitle ? category.pageTitle : category.name) : ''}</title>
                <meta name="description" content={category ? category.metaDescription : ''} />
            </Head>
            <div className={classes.body}>
                <div>
                    <div className={classes.categoryName}>
                        <h1>{category && category.name}</h1>
                        <Breadcrumbs crumbs={breadcrumbs} />
                    </div>
                    <div className={classes.sortBlock}>
                        <div className={classes.leftBlock}>
                            <div onClick={() => setIsOpen(!isOpen)}>
                                <span className={classes.icon}><Icon name='filter' /></span>
                                <span>{__('Filter')}</span>
                            </div>
                            <p>{__('Sort By')}</p>
                            <Sort classes={{root: classes.sortRoot, dir: classes.sortDir}} pageControl={pageControl} />
                        </div>
                        <div className={classes.middleBlock}>
                            {pageControl.totalPages > 0 && <Pagination pageControl={pageControl} />}
                        </div>
                        <div className={classes.rightBlock}>
                            {pageControl.total > 0 && <span>Showing {pageControl.showingFrom}-{pageControl.showingTo} Of {pageControl.total} Items</span>}
                        </div>
                    </div>
                    <div>
                        {category.image && <div className={classes.image}>
                            <Image src={`${category.image}`} />
                        </div>}
                    </div>
                    <div className={classes.filtersAndList}>
                        <div className={`${classes.filterBlock} ${isOpen ? classes.hide : ''}`}>
                        {categoryProducts && <Filters aggregations={categoryProducts.aggregations || []}  />}
                        </div>
                        {true ? 
                        <div className={classes.content}>
                            <ProductList 
                                products={categoryProducts.products} 
                                isFetchingProducts={isFetchingCategoryProducts} 
                                // This will be used to make correct links for items for breadcrumbs
                                placementInfo={{ type: 'categoryPage', categoryId: category.id }}
                            />
                            {pageControl.totalPages > 0 && <Pagination pageControl={pageControl} />}
                        </div> : 
                        <div>Empty</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;