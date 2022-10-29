import React from 'react';
import defaultClasses from './items.module.css';
import {mergeClasses} from 'Helper/classify';
import Loading from 'Components/Loading';
import {useCartContent} from 'Talons/CartContent/useCartContent';
import Item from 'Components/CartContent/item';
import useWindowSize from "../../../../hooks/useWindowSize";

const Items  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()
    const {
        cart,
        isFetchingCart,
        handleRemoveItem,
        handleChangeItemQuantity,
        handleClearCart,
        __
    } = useCartContent();

    if (isFetchingCart) {
        return <Loading/>
    }

    if (cart.items && !cart.items.length) {
        return <div className={classes.empty}>{__('empty.cart.text')}</div>
    }

    return (
        <div className={classes.root}>
            <div className={classes.items}>
                <table className={classes.table}>
                    {width>1050 && <thead className={classes.tableHeader}>
                    <tr className={classes.tableHeaderField}>
                        <th style={{minWidth:"145px"}}>{__("image")}</th>
                        <th>{__('name')}</th>
                        <th>{__('price')}</th>
                        <th>{__('quantity')}</th>
                        <th style={{marginRight:'30px'}}>{__("cart.total")}</th>
                    </tr>
                    </thead>}
                <tbody>
                    {cart.items && cart.items.map((item, index)=>
                        <div className={index !== 0 && classes.item}>
                            <Item 
                                key={item.id} 
                                item={item} 
                                handleRemoveItem={handleRemoveItem} 
                                handleChangeItemQuantity={handleChangeItemQuantity}
                                __={__} 
                            />
                            {width>768 &&   index < cart.items.length - 1
                                ?  <div className={classes.line}></div>
                                :  null
                            }
                        </div>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default Items;