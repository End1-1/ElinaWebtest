import React from 'react';
import classes from 'Components/ProductPage/productPage.module.css';
import ProductContent from 'Components/ProductContent';
import Head from 'Components/Head';

const ProductPage = (props) => {
    const { product, breadcrumbs } = props;

    return (
        <div>
            <Head>
                <title>{product.pageTitle || product.name}</title>
                <meta name="description" content={product.metaDescription || product.shortDescription} />
            </Head>
            <div className={classes.body}>
                <ProductContent product={product} breadcrumbs={breadcrumbs} />
            </div>
        </div>
    );
}

export default ProductPage;