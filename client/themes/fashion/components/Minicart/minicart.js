import React, { useState, useEffect }  from 'react';

import classes from './minicart.module.css';
import Link from 'Components/Link';
import Button from 'Components/Button';
import Price from 'Components/Price';
import { useMinicart } from 'Talons/Minicart/useMinicart';
import Item from 'Components/Minicart/item';
import Icon from 'Components/Icon';

const Minicart  = props => {
    const {
        cart,
        handleRemoveItem,
        isFetchingCart,
        __
    } = useMinicart();


    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(cart.items && !cart.items.length) {
            setIsOpen(false);
        }
    }, [cart.items]);

    const { width } = props;

    return (
        <div className={classes.root}>
            {width > 768 ?
                <span className={`${classes.cartTrigger} ${isOpen ? classes.open : ''}`} onClick={
                    () => !isFetchingCart && cart.items && cart.items.length > 0 && setIsOpen(!isOpen)
                }>
                    {!isFetchingCart && cart.items && cart.items.length > 0 && <span className={classes.counter}>{cart.totalQty}</span>}
                    {isFetchingCart && <span className={classes.counter}>0</span>}
                    <Icon name='cart' />
                </span>
                : <Link className={classes.cartTrigger} to="/cart">
                    {!isFetchingCart && cart.items && cart.items.length > 0 && <span className={classes.counter}>{cart.totalQty}</span>}
                    {isFetchingCart && <span className={classes.counter}>0</span>}
                    <Icon name='cart' />
                </Link>
            }
            {cart.items && !isFetchingCart && cart.items.length > 0 ? 
                <div className={classes.dropdown}>
                    <span className={classes.title}>MY CART</span>
                    <div className={classes.list}>
                    {cart.items && cart.items.map(item => 
                        <Item key={item.id} item={item} handleRemoveItem={handleRemoveItem} />   
                    )}
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.totals}>
                            <p><span>Subtotal:</span> <Price amount={cart.subtotal} /></p>
                        </div>
                        <div className={classes.actions}>
                            <Link to={'/cart'}><Button onClick={() => {setIsOpen(false)}} priority={'secondary'}>{__('minicart.cart.button.text')}</Button></Link>
                            <Link to={'/checkout'}><Button onClick={() => {setIsOpen(false)}}>{__('minicart.checkout.button.text')}</Button></Link>
                        </div>
                    </div>
                </div>
            : null }
        </div>
    );
}

export default Minicart;

