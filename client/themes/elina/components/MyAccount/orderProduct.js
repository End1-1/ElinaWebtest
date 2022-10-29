import React, {useMemo} from 'react';
import defaultClasses from './orderProduct.module.css';
import {mergeClasses} from 'Helper/classify';
import Image from 'Components/Image';
import useWindowSize from "../../../../hooks/useWindowSize";
import { useTranslations } from 'Talons/App/useTranslations';

const OrderProduct = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {product, currencyValue} = props;
    const {width} = useWindowSize()
    const { __ } = useTranslations();

    const price = useMemo(() => {
        if (product.discountedPrice) {
            return (
                <div className={classes.discountedPriceContent}>
                    <div className={classes.discountedField}>
                        <div className={classes.discountedPrice}>
                            {product.discountedPrice}
                        </div>
                        <div className={classes.discountedCurrency}>
                            {currencyValue}
                        </div>
                    </div>
                    <div className={classes.oldPriceField}>
                        <div className={classes.oldPrice}>
                            {product.price}
                        </div>
                        <div className={classes.oldCurrency}>
                            {currencyValue}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.priceField}>
                    <div className={classes.price}>
                        {product.price}
                    </div>
                    <div className={classes.currency}>
                        {currencyValue}
                    </div>
                </div> 
            ) 
        }
    }, [product, currencyValue])

    return (
        <div className={classes.root}>
        <div className={classes.content}>
            <div className={classes.imageField}>
                {
                    !!product.thumbnail 
                    ?   <Image className={classes.thumbnail} height={200} src={`${product.thumbnail}`} />
                    :   null
                }
            </div>
            <div className={classes.DetailsField}>
                <div className={classes.name}>
                    {product.name}
                </div>
                <div className={classes.attributes}>
                    {
                        product.selectedAttributes ?
                        product.selectedAttributes.map((attr, i) => {
                            if (attr.type == "swatch") {
                                return  (
                                    <div className={classes.attributesFlex}>
                                        <span className={classes.attributeName}>{__(attr.name.toLowerCase())}: </span>
                                        <span className={classes.optionName}>{attr.option.name}</span>
                                    </div>
                                )
                            } else if (attr.type == "colorSwatch") {
                                return  (
                                    <div className={classes.attributesFlex}>
                                        <span className={classes.attributeName}>{__(attr.name.toLowerCase())}: </span>
                                        <div className={classes.colorField}>
                                            <span className={classes.colorSwatch} style={{background: `${attr.option.swatch}`}}></span>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        :null
                    }
                </div>
                <div className={classes.qtyField}>
                    <span className={classes.qtyText}>
                        {__("quantity")} :
                    </span>
                    <span className={classes.qtyValue}>
                        {product.quantity}
                    </span>
                </div>
                <div className={classes.skuField}>
                    <span className={classes.skuText}>
                        {__("sku")} :
                    </span>
                    <span className={classes.skuValue}>
                        {product.sku}
                    </span>
                </div>
            </div>
            {width > 700 && <div className={classes.priceContent}>
                {price}
            </div>}
        </div>
            { width <=700 &&  <div className={classes.totalField}>
                    <span >
                        {__("price")}
                    </span>
                <span className={classes.totalValue}>
                        {price}
                    </span>
            </div>}
        </div>
    )
}

export default OrderProduct;