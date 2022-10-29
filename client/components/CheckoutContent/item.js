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
        <tr key={item.id}>
            <td>
                {!!item.thumbnail && <Image className={classes.thumbnail} width={100} src={`${item.thumbnail}`} />}
            </td>
            <td>{item.name}</td>
            <td><Price amount={item.price} /></td>
            <td>
                <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} />
            </td>
            <td>
                <Button onClick={() => handleRemoveItem(item)}>
                    {__('x')}
                </Button>
            </td>
        </tr>
    );
}

export default Item;