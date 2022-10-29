import React from 'react';
import defaultClasses from './cartContent.module.css';
import {mergeClasses} from 'Helper/classify';
import Link from 'Components/Link';
import Loading from 'Components/Loading';
import Button from 'Components/Button';
import {useCartContent} from 'Talons/CartContent/useCartContent';
import Items from 'Components/CartContent/items';
import { usePrice } from 'Talons/Price/usePrice';

const CartContent  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { currencySymbol } = usePrice();

    const {
        cart,
        isFetchingCart,
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
            <div className={classes.breadcrumbs}>
                <Link to="/" classes={{link: classes.homeLink}}>
                    {__("home")}
                </Link>
                <span className={classes.line}>|</span>
                <span className={classes.cartLink}>
                    {__("cart")}
                </span>
            </div>
            <div className={classes.body}>
                <div className={classes.titleField}>
                    <span className={classes.title}>
                        {__("cart")}
                    </span>
                </div>
                <div className={classes.columns}>
                    <div className={classes.itemsField}>
                        <Items />
                        <div className={classes.clearCartBtnField}>
                            <span className={classes.clearCartBtn} onClick={handleClearCart}>
                                {__('clear.cart')}
                            </span>
                        </div>
                    </div>
                    <div className={classes.summaryField}>
                        <div className={classes.summary}>
                            <div className={classes.summaryLine}></div>
                            <div className={classes.subtotal}>{__("my.order.totals.subtotal")} {cart.subtotal} {currencySymbol}</div>
                            <div className={classes.shipping}>{__("shipping")} {cart.shippingTotal} {currencySymbol}</div>
                            <div className={classes.grandTotal}>{__("cart.total")} {cart.grandTotal} {currencySymbol}</div>
                            <Link to="/checkout">
                                <Button
                                    onClick={() => {}}
                                    classes={{button: classes.checkoutBtn}}
                                >
                                    {__('cart.procced.to.checkout')}
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button
                                    onClick={() => {}}
                                    classes={{button: classes.continueLink}}
                                >
                                    {__('continue.shopping')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartContent;