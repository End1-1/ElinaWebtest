import React from 'react';
import defaultClasses from './items.module.css';
import { mergeClasses } from 'Helper/classify';
import Loading from 'Components/Loading';
import { useCartContent } from 'Talons/CartContent/useCartContent';
import Item from 'Components/CheckoutContent/item';

const Items  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        cart,
        isFetchingCart,
        handleRemoveItem,
        handleChangeItemQuantity,
        handleClearCart,
        __
    } = useCartContent();

    if (isFetchingCart) {
        return <Loading />
    }

    if (cart.items && !cart.items.length) {
        return <div className={classes.empty}>{__('empty.cart.text')}</div>
    }

    return (
        <div className={classes.root}>
            <div className={classes.items}>
                <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{__('name')}</th>
                        <th>{__('price')}</th>
                        <th>{__('quantity')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items && cart.items.map(item => 
                        <Item 
                            key={item.id} 
                            item={item} 
                            handleRemoveItem={handleRemoveItem} 
                            handleChangeItemQuantity={handleChangeItemQuantity}
                            __={__} 
                        />   
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default Items;