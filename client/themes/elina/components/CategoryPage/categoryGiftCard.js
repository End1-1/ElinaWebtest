import React from 'react';
import defaultClasses from './categoryGiftCard.module.css'
import Toolbar from 'Components/Toolbar';
import Pagination from 'Components/Toolbar/pagination';
import Head from 'Components/Head';
import RichContent from 'Components/RichContent';
import Image from 'Components/Image';
import {mergeClasses} from "Helper/classify"
import Breadcrumbs from 'Components/Breadcrumbs';
import Link from 'Components/Link';
import get from "lodash/get";
import { useTranslations } from 'Talons/App/useTranslations';

const CategoryGiftCard = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    const {
        category,
        categoryProducts,
        pageControl,
        breadcrumbs,
    } = props;

    const { __ } = useTranslations();

    const imageUrl = product => {
        return get(product, "variants[0].product.images[0].path", "") || get(product, "images[0].path", "")
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
                        <div className={classes.categoryNameField}>
                            <RichContent html={category.description}/>
                        </div>
                    </div>
                    }
                    <div className={classes.breadcrumbs}>
                        <Link to="/">
                            <span>{__("home")}</span>
                        </Link>
                        <span className={classes.line}>|</span>
                        <Breadcrumbs crumbs={breadcrumbs} classes={{label: classes.breadcrumbsLabel}}/>
                    </div>
                </div>
                <div className={classes.mainField}>
                    <div className={classes.toolbarField}>
                        <div className={classes.allField}>
                                     <span className={classes.all}>
                                        {__("all")}
                                    </span>
                        </div>
                        <Toolbar pageControl={pageControl} />
                    </div>
                    <div className={classes.cards}>
                        {categoryProducts.products.map(item => {
                            return (<div key={item.id} className={classes.card} >
                                    <div className={classes.imageWrapper}>
                                        <Image className={classes.giftImage} width={400} src={imageUrl(item)} />
                                    </div>
                                    <p className={classes.cardName}>{item.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.footerTools}>
                        <Pagination pageControl={pageControl}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryGiftCard;