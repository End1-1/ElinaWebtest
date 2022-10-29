import React from 'react';
import defaultClasses from './cartContent.module.css';
import {mergeClasses} from 'Helper/classify';
import Link from 'Components/Link';
import Button from 'Components/Button';
import Loading from 'Components/Loading';
import Totals from 'Components/Totals';
import {useCartContent} from 'Talons/CartContent/useCartContent';
import Items from 'Components/CartContent/items';
import useWindowSize from "../../../../hooks/useWindowSize";
import Breadcrumbs from "Components/Breadcrumbs";
import cartIcon from '../Minicart/cart.png'
import {ButtonNext} from "pure-react-carousel";

const CartContent = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    // const {breadcrumbs} = props
    const {width} = useWindowSize()
    const {
        cart,
        isFetchingCart,
        handleClearCart,
        __
    } = useCartContent();

    if (isFetchingCart) {
        return <Loading/>
    }

    if (cart.items && !cart.items.length) {
        return (
            <div>
                {width <= 768 && <div className={classes.cart}>
                    <div className={classes.cartIconContainer}>
                        <img src={cartIcon} className={classes.cartIcon}/>
                        <span className={classes.cartText}>Cart</span>
                    </div>
                </div>}
                <div className={classes.empty}>
                    <span className={classes.cartEmpty}>{__('empty.cart.text')}</span>
                    <Link to={'/'}>
                        <Button priority="primary" classes={{button:classes.continueShopping}}>
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.breadcrumbs}>
                {width > 768 ? <Breadcrumbs crumbs={[
                    {label: 'Home', link: '/'},
                    {label: 'Cart', link: null},

                ]}/> : <div className={classes.cart}>
                    <div className={classes.cartIconContainer}>
                        <img src={cartIcon} className={classes.cartIcon}/>
                        <span className={classes.cartText}>Cart</span>
                    </div>
                </div>}
            </div>
            <div className={classes.content}>
                <div className={classes.products}>
                    <Items/>
                </div>
                {width <= 768 && <div className={classes.line}>
                </div>}
                <dvi className={classes.orders}>
                    <div className={classes.actions}>
                        <div className={classes.couponAndTotals}>
                            <Totals/>
                        </div>
                        <Button onClick={handleClearCart} classes={{button: classes.clearCartButton}}>
                            {__('clear.cart')}
                        </Button>
                        <Link to={'/checkout'}>
                            <Button classes={{button: classes.checkoutButton}}>
                                {__('checkout')}
                            </Button>
                        </Link>
                    </div>
                </dvi>
            </div>

        </div>
    );
}

export default CartContent;