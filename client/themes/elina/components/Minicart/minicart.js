import React, { Fragment } from 'react';
import classes from './minicart.module.css';
import Link from 'Components/Link';
import Button from 'Components/Button';
import Price from 'Components/Price';
import { useMinicart } from 'Talons/Minicart/useMinicart';
import Item from 'Components/Minicart/item';
import IconMoon from 'Components/IconMoon';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import ReactDOM from 'react-dom';
import { usePrice } from 'Talons/Price/usePrice';

const Minicart  = props => {
    const {
        cart={},
        handleRemoveItem,
        isFetchingCart,
        handleChangeItemQuantity,
        __ 
    } = props;
    const { handleToggleDrawer,drawer, } = useDrawer(); 
    const { currencySymbol } = usePrice();

    return (
        <Fragment>
            {ReactDOM.createPortal(<div className={`${classes.root} ${drawer == 'cart' ? classes.open: null}`}>
                <div className={classes.body}>
                    <div className={classes.header}>
                        <div className={classes.titleField}>
                            <span className={classes.title}>{__("shopping.cart")}</span>
                        </div>
                        <div className={classes.closeIcon} onClick={() => handleToggleDrawer(false)}>
                            <IconMoon name="close" classes={{icon: classes.closeIcon}}/>
                        </div>
                    </div>
                    {cart.items && !isFetchingCart && cart.items.length > 0 ? 
                        <div className={classes.dropdown}>
                            <div className={classes.list}>
                            {cart.items && cart.items.map(item => 
                                <Item 
                                    key={item.id} 
                                    item={item} 
                                    handleRemoveItem={handleRemoveItem} 
                                    handleChangeItemQuantity={handleChangeItemQuantity}
                                />   
                            )}
                            </div>
                            <div className={classes.footer}>
                                <div className={classes.line}></div>
                                <div className={classes.totalField}>
                                    <div className={classes.totalNameField}>
                                        <span className={classes.totalName}>{__("cart.total")}</span>
                                    </div>
                                    <div className={classes.totalPriceField}>
                                        <span className={classes.totalPrice}>
                                            {cart.grandTotal} {currencySymbol}
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.actions}>
                                    <Link to={'/cart'}>
                                        <Button 
                                            priority={'secondary'} 
                                            classes={{button: classes.cartButton}}
                                            onClick={() => handleToggleDrawer(false)}
                                        >
                                            {__('minicart.cart.button.text')}
                                        </Button>
                                    </Link>
                                    <Link to={'/checkout'}>
                                        <Button 
                                            classes={{button: classes.checkoutButton}} 
                                            priority={'secondary'}
                                            onClick={() => handleToggleDrawer(false)}
                                        >
                                            {__('minicart.checkout.button.text')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    :  <div className={classes.emptyMiniCart}>
                            <div className={classes.emptyTitleField}>
                                <span className={classes.epmtyTitle}>
                                    {__("shopping.cart.is.empty")}
                                </span>
                            </div>
                            <div className={classes.emptyTextField}>
                                <span className={classes.emptyText}>
                                    {__("buy.product.before.message")}
                                </span>
                            </div>
                    </div>
                    }
                </div>
            </div>, document.body)
        }
        </Fragment>
    );
}

export default Minicart;