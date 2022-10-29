import React, {useState} from 'react';
import defaultClasses from './categoryPage.module.css';
import ProductList from 'Components/ProductList';
import Toolbar from 'Components/Toolbar';
import Pagination from 'Components/Toolbar/pagination';
import Filters from 'Components/Filters';
import Head from 'Components/Head';
import RichContent from 'Components/RichContent';
import {useCategoryPage} from 'Talons/CategoryPage/useCategoryPage';
import Image from 'Components/Image';
import {mergeClasses} from "Helper/classify"
import Breadcrumbs from 'Components/Breadcrumbs';
import Banner from 'Components/Banner';
import Link from 'Components/Link'
import useWindowSize from 'Hooks/useWindowSize';
import IconMoon from "../IconMoon";
import FilterMenu from "./filterMenu";

const CategoryPage = (props) => {
    const {breadcrumbs} = props;
    const {
        category,
        categoryProducts,
        pageControl,
        isFetchingCategoryProducts,
        __
    } = useCategoryPage(props);
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const [isOpen, setIsOpen] = useState(false)

    if (category && category.urlKey && category.urlKey.toLowerCase().includes("gift")) {
        return (
            <div className={classes.giftCartRoot}>
                <Head>
                    <title>{category ? (category.pageTitle ? category.pageTitle : category.name) : ''}</title>
                    <meta name="description" content={category ? category.metaDescription : ''}/>
                </Head>
                {category.image && <div className={classes.image}>
                                <Image src={`${category.image}`}/>
                                {/*
                            <div className={classes.categoryNameField}>
                                <RichContent html={category.description}/>
                            </div> */}
                        </div>
                }
                {categoryProducts.products && !categoryProducts.products.length ? 
                    <h4 className={classes.emptyGiftCards}>{__("no.products.found")}</h4>
                :
                    <ProductList
                        products={categoryProducts.products}
                        isFetchingProducts={isFetchingCategoryProducts}
                        classes={{
                            list: classes.listGift,
                            itemRoot: classes.itemRoot,
                        }}
                        addToCartEnabled={true}
                    />
                }
                {categoryProducts.products && categoryProducts.products.length ?
                    <div className={classes.footerTools}>
                        <Pagination pageControl={pageControl}/>
                    </div>
                    :
                    null
                }
            </div>
        )
    }

    if (width <= 768) {
        return (
            <div className={classes.root}>
                <Head>
                    <title>{category ? (category.pageTitle ? category.pageTitle : category.name) : ''}</title>
                    <meta name="description" content={category ? category.metaDescription : ''}/>
                </Head>
                <div className={classes.body}>
                    <div>
                        {category.image && <div className={classes.image}>
                                <Image src={`${category.image}`}/>
                                {/*
                            <div className={classes.categoryNameField}>
                                <RichContent html={category.description}/>
                            </div>
                        */}
                        </div>
                        }
                        {/*
                        <div className={classes.breadcrumbs}>
                            <Link to="/">
                                <span>{__("home")}</span>
                            </Link>
                            <span className={classes.line}>|</span>
                         <Breadcrumbs crumbs={breadcrumbs} classes={{label: classes.breadcrumbsLabel}}/> 
                        </div>
                    */}
                    </div>
                    <div className={classes.filtersAndList}>
                        {true ?
                            <div className={classes.mainField}>
                                <div className={classes.toolbarField}>
                                    <div className={classes.allField}>
                                        <button onClick={() => setIsOpen(!isOpen)}
                                                className={`${classes.filter}  ${isOpen && classes.filterOpen}`}>{__("filter")} <IconMoon
                                            name='filter' classes={{iconClass: classes.filterIcon}}/>
                                        </button>
                                        <FilterMenu isOpen={isOpen} setIsOpen={setIsOpen}>
                                        {categoryProducts  && <Filters aggregations={categoryProducts.aggregations || []}/>}
                                        </FilterMenu>
                                    </div>
                                    <Toolbar pageControl={pageControl}/>
                                </div>
                                <ProductList
                                    products={categoryProducts.products}
                                    isFetchingProducts={isFetchingCategoryProducts}
                                    classes={{
                                        list: classes.list,
                                        itemRoot: classes.itemRoot
                                    }}
                                    largeItems={true}
                                />
                                {categoryProducts.products && categoryProducts.products.length ?
                                    <div className={classes.footerTools}>
                                        <Pagination pageControl={pageControl}/>
                                    </div>
                                    :
                                    null
                                }
                            </div> :
                            <div>{__("empty")}</div>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Head>
                <title>{category ? (category.pageTitle ? category.pageTitle : category.name) : ''}</title>
                <meta name="description" content={category ? category.metaDescription : ''}/>
            </Head>
            <div className={classes.body}>
                <div>
                    {category.image
                    && <div className={classes.image}>
                        <Image src={`${category.image}`}/>
                        {/*
                        <div className={classes.categoryNameField}>
                            <RichContent html={category.description}/>
                        </div>
                    */}
                    </div>
                    }
                    {/*
                    <div className={classes.breadcrumbs}>
                        <Link to="/">
                            <span>{__("home")}</span>
                        </Link>
                        <span className={classes.line}>|</span>
                         <Breadcrumbs crumbs={breadcrumbs} classes={{label: classes.breadcrumbsLabel}}/> 
                    </div>
                */}
                </div>
                <div className={classes.filtersAndList}>
                    <div className={classes.filterContainer}>
                        {categoryProducts &&
                        <Filters aggregations={categoryProducts.aggregations || []}/>}
                        <div className={classes.banner}>
                            <Banner
                                id="60642421b0e47f12f2b23a40"
                                classes={{
                                    image: classes.bannerImage,
                                    overlay: classes.bannerOverlay
                                }}
                                hovered={true}
                                mustOverlay={true}
                            />
                        </div>
                    </div>

                    {true ?
                        <div className={classes.mainField}>
                            <div className={classes.toolbarField}>
                                <div className={classes.allField}>
                                     <span className={classes.all}>
                                        {__("all")}
                                    </span>
                                </div>
                                <div></div>
                                <div></div>
                                <Toolbar pageControl={pageControl}/>
                            </div>
                            <ProductList
                                products={categoryProducts.products}
                                isFetchingProducts={isFetchingCategoryProducts}
                                classes={{
                                    list: classes.list,
                                    itemRoot: classes.itemRoot
                                }}
                                largeItems={true}
                            />
                            {categoryProducts.products && categoryProducts.products.length ?
                                <div className={classes.footerTools}>
                                    <Pagination pageControl={pageControl}/>
                                </div>
                                :
                                null
                            }
                        </div> :
                        <div>{__("empty")}</div>}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;