import React from 'react';
import defaultClasses from 'Components/CartContent/cartContent.module.css';
import { mergeClasses } from 'Helper/classify';
import Link from 'Components/Link';
import Loading from 'Components/Loading';
import Button from 'Components/Button';
import CouponCodeForm from 'Components/CouponCodeForm';
import Totals from 'Components/Totals';
import { useCartContent } from 'Talons/CartContent/useCartContent';
import Items from 'Components/CartContent/items';

const CartContent  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
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
            <h1>{__('cart')}</h1>
            <Items />
            <div className={classes.couponAndTotals}>
                <CouponCodeForm />
                <Totals />
            </div>
            <div className={classes.actions}>
                <Button onClick={handleClearCart} priority={'secondary'}>
                    {__('clear.cart')}
                </Button>
                <Link to={'/checkout'}>
                    <Button>
                        {__('checkout')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CartContent;