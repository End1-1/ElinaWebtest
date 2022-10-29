import React  from 'react';
import defaultClasses from './item.module.css';
import IconMoon from 'Components/IconMoon';
import Price from 'Components/Price';
import Image from 'Components/Image';
import ProductPrice from "Components/ProductPrice";
import { usePrice } from 'Talons/Price/usePrice';
import { mergeClasses } from 'Helper/classify';

const Item  = props => {
    const {
        item,
        handleRemoveItem,
        handleChangeItemQuantity
    } = props;
    const { 
        currencySymbol,
        __
    } =  usePrice();

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.thumbnailWrapper}>
                    {!!item.thumbnail && <Image className={classes.thumbnail} height={151} src={`${item.thumbnail}`} />}
                </div>
                <div className={classes.details}>
                    <div className={classes.nameField}>
                        <span className={classes.name}>{item.name}</span>
                    </div>
                    <div className={classes.priceField}>
                        {
                            item.discountedPrice
                            ?   <div className={classes.discountedPriceField}>
                                    <p className={classes.discounted}>
                                        {item.discountedPrice}
                                        <span>{currencySymbol}</span>
                                    </p>
                                    <p className={classes.oldPrice}>
                                        {item.price}
                                        <span>{currencySymbol}</span>
                                    </p>
                                </div>
                            :   <p className={classes.price}>
                                    {item.price}
                                    <span>{currencySymbol}</span>
                                </p>
                        }
                    </div>
                    <div className={classes.attributes}>
                        {
                            item.selectedAttributes ?
                            item.selectedAttributes.map((attr, i) => {
                                if (attr.type == "swatch") {
                                    return  (
                                        <div className={classes.flex}>
                                            <span className={classes.attributeName}>{__(attr.name.toLowerCase())}: </span>
                                            <span className={classes.optionName}>{attr.option.name}</span>
                                        </div>
                                    )
                                } else if(attr.type == "colorSwatch") {
                                    return  (
                                        <div className={classes.flex}>
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
                    <div className={classes.removeIcon} onClick={() => handleRemoveItem(item.id)}>
                        <IconMoon name="close" classes={{icon: classes.closeIcon}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;