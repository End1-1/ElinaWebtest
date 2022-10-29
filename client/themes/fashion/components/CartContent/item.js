import React from 'react';
import defaultClasses from './cartContent.module.css';
import { mergeClasses } from 'Helper/classify';
import Button from 'Components/Button';
import ProductQuantity from 'Components/ProductQuantity';
import Image from 'Components/Image';
import Icon from 'Components/Icon';
import Price from 'Components/Price';

const Item  = props => {
    const { item, handleRemoveItem, handleChangeItemQuantity, __ } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    
    return (
        <tr key={item.id}>
            <td className={classes.productDetails}>
                <div>
                    <div className={`${classes.removeItem} ${classes.mobileVersion}`}>
                        <Button onClick={() => handleRemoveItem(item)}>
                            <Icon name='close' />
                            {__('cart.remove.item.button.text')}
                        </Button>
                    </div>
                    <div className={classes.imgBlock}>{!!item.thumbnail && <Image className={classes.thumbnail} width={200} src={`${item.thumbnail}`} />}</div>
                    <div className={classes.info}>
                        <div className={classes.details}>{item.name}</div>
                        <div className={classes.mobileVersion}>
                            <span className={classes.price}><Price amount={item.price} /></span>
                        </div>
                        <div className={classes.mobileVersion}>
                            <div className={classes.qty}>
                                <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td><Price amount={item.price} /></td>
            <td className={classes.qty}>
                <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} />
            </td>
            <td><Price amount={item.price} /></td>
            <td className={classes.removeItem}>
                <Button onClick={() => handleRemoveItem(item)}>
                    <Icon name='close' />
                    {__('cart.remove.item.button.text')}
                </Button>
            </td>
        </tr>
    );
}

export default Item;