import React from 'react';
import defaultClasses from './item.module.css';
import {mergeClasses} from 'Helper/classify';
import ProductQuantity from 'Components/ProductQuantity';
import Image from 'Components/Image';
import {usePrice} from 'Talons/Price/usePrice';
import IconMoon from 'Components/IconMoon';
import useWindowSize from "../../../../hooks/useWindowSize";

const Item  = props => {
    const {item, handleRemoveItem, handleChangeItemQuantity, __ } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const {
        currencySymbol
    } = usePrice();

    if (width <= 1050) {
        return (
            <tr key={item.id}>
                <td>
                    {!!item.thumbnail && <Image className={classes.thumbnail} width={200} src={`${item.thumbnail}`}/>}
                </td>
                <div className={classes.info}>
                    <td className={classes.name}>
                        {item.name}
                    </td>
                    <td className={classes.priceField}>
                        {
                            item.discountedPrice
                                ? <div className={classes.discountedPriceField}>
                                    <p className={classes.discountedPrice}>
                                        {item.discountedPrice}
                                        <span>{currencySymbol}</span>
                                    </p>
                                    <p className={classes.oldPrice}>
                                        {item.price}
                                        <span>{currencySymbol}</span>
                                    </p>
                                </div>
                                : <p className={classes.price}>
                                    {item.price}
                                    <span>{currencySymbol}</span>
                                </p>
                        }
                    </td>
                    <td className={classes.colorAndSizeField}>
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
                    </td>
                    <td className={classes.quantityField}>
                        <ProductQuantity initialValue={item.quantity} maxQuantity={1000}
                                         onValueChange={(qty) => handleChangeItemQuantity(item, qty)}/>
                    </td>
                </div>
                <div className={classes.deleteIcon} onClick={() => handleRemoveItem(item)}>
                    <IconMoon name="close" classes={{icon: classes.closeIcon}}/>
                </div>
            </tr>
        )
    }

    return (
        <tr key={item.id} style={{position:'relative'}}>
            <td>
                {!!item.thumbnail && <Image className={classes.thumbnail} width={200} src={`${item.thumbnail}`}/>}
            </td>
            <td className={classes.name}>
                {item.name}
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
            </td>
            <td>
                {
                    item.discountedPrice
                        ? <div className={classes.discountedPriceField}>
                            <p className={classes.discountedPrice}>
                                {item.discountedPrice}
                                <span>{currencySymbol}</span>
                            </p>
                            <p className={classes.oldPrice}>
                                {item.price}
                                <span>{currencySymbol}</span>
                            </p>
                        </div>
                        : <p className={classes.price}>
                            {item.price}
                            <span>{currencySymbol}</span>
                        </p>
                }
            </td>
            <td>
                <ProductQuantity initialValue={item.quantity} maxQuantity={1000}
                                 onValueChange={(qty) => handleChangeItemQuantity(item, qty)}/>
            </td>
            <td style={{marginRight:'30px'}}>
                <div className={classes.priceField}>
                {
                    item.discountedPrice
                        ? <p className={`${classes.totalPrice} ${classes.discounted}`}>
                            {Number(item.quantity) * item.discountedPrice}
                            <span>{currencySymbol}</span>
                        </p>
                        : <p className={classes.totalPrice}>
                            {Number(item.quantity) * item.price}
                            <span>{currencySymbol}</span>
                        </p>
                }
                </div>
            </td>
            <div className={classes.deleteIcon} onClick={() => handleRemoveItem(item)}>
                <IconMoon name="close" classes={{icon: classes.closeIcon}}/>
            </div>
        </tr>
    );
}

export default Item;