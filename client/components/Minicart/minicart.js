import React  from 'react';
import classes from 'Components/Minicart/minicart.module.css';
import Link from 'Components/Link';
import Button from 'Components/Button';
import Price from 'Components/Price';
import { useMinicart } from 'Talons/Minicart/useMinicart';
import Item from 'Components/Minicart/item';

const Minicart  = props => {
    const {
        cart,
        handleRemoveItem,
        isFetchingCart,
        __
    } = useMinicart();

    return (
        <div className={classes.root}>
            <span className={classes.cartTrigger}>
                {!isFetchingCart && cart.items && cart.items.length > 0 && <span className={classes.counter}>{cart.totalQty}</span>}
                {isFetchingCart && <span className={classes.counter}>0</span>}
            </span>
            {cart.items && !isFetchingCart && cart.items.length > 0 ? 
                <div className={classes.dropdown}>
                    <div className={classes.list}>
                    {cart.items && cart.items.map(item => 
                        <Item key={item.id} item={item} handleRemoveItem={handleRemoveItem} />   
                    )}
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.totals}>
                            <p>Subtotal: <Price amount={cart.subtotal} /></p>
                            <p className={classes.grandTotal}>Grand Total: <Price amount={cart.grandTotal} /></p>
                        </div>
                        <div className={classes.actions}>
                            <Link to={'/cart'}><Button priority={'secondary'}>{__('minicart.cart.button.text')}</Button></Link>
                            <Link to={'/checkout'}><Button>{__('minicart.checkout.button.text')}</Button></Link>
                        </div>
                    </div>
                </div>
            : null }
        </div>
    );
}

export default Minicart;