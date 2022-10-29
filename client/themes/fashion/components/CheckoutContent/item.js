import React from 'react';
import defaultClasses from './item.module.css';
import { mergeClasses } from 'Helper/classify';
import Button from 'Components/Button';
import ProductQuantity from 'Components/ProductQuantity';
import Image from 'Components/Image';
import Price from 'Components/Price';

const Item  = props => {
    const { item, handleRemoveItem, handleChangeItemQuantity, __ } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.itemBlock} key={item.id}>
            <div className={classes.image}>{!!item.thumbnail && <Image className={classes.thumbnail} width={100} src={`${item.thumbnail}`} />}</div>
            <div className={classes.info}>
                <div>{item.name}</div>
                <div className={classes.qty}><span>{'Qty:'}</span>{item.quantity}</div>
                <div><Price amount={item.price} /></div>
            </div>

        </div>
    );
}

export default Item;