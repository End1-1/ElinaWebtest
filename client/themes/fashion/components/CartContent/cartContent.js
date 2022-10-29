import React from 'react';
import defaultClasses from './cartContent.module.css';
import { mergeClasses } from 'Helper/classify';
import Link from 'Components/Link';
import Loading from 'Components/Loading';
import Button from 'Components/Button';
import CouponCodeForm from 'Components/CouponCodeForm';
import Totals from 'Components/Totals';
import ProductQuantity from 'Components/ProductQuantity';
import Image from 'Components/Image';
import { useCartContent } from 'Talons/CartContent/useCartContent';
import Icon from 'Components/Icon';
import Price from 'Components/Price';
import Items from 'Components/CartContent/items';

const CartContent  = props => {
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
        <div className={`${classes.root}`}>
            <h1>{__('cart')}</h1>
            <div className={`${classes.content}`}>
                <div className={classes.items}>
                    <Items />
                    <div className={classes.bottom}>
                        <div className={classes.couponCode}>
                            <CouponCodeForm />
                        </div>
                        <div className={classes.clearCart}>
                            <Button onClick={handleClearCart} priority={'secondary'}>
                                <Icon name='trash' />
                                {__('clear.cart')}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.totals}>
                    <span>{__('Order Summary')}</span>
                    <Totals classes={{root: classes.rootTotal, total: classes.totalBlock}} />
                    <div className={classes.checkoutBtn}>
                        <Link to={'/checkout'}>
                            <Button>
                                {__('checkout')}
                                <Icon name='right' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartContent;