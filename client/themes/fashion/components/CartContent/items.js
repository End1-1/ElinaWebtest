import React from 'react';
import defaultClasses from './cartContent.module.css';
import { mergeClasses } from 'Helper/classify';
import Loading from 'Components/Loading';
import { useCartContent } from 'Talons/CartContent/useCartContent';
import Item from 'Components/CartContent/item';

const Items  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        cart,
        isFetchingCart,
        handleRemoveItem,
        handleChangeItemQuantity,
        __
    } = useCartContent();

    if (isFetchingCart) {
        return <Loading />
    }

    return (
        <div className={`${classes.root}`}>
            <table>
                <thead>
                    <tr>
                        <th>{__('name')}</th>
                        <th>{__('price')}</th>
                        <th>{__('quantity')}</th>
                        <th>{__('total')}</th>
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
    );
}

export default Items;