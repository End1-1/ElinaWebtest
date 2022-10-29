import React, { useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "Components/Minicart/minicart.module.css";
import Link from "Components/Link";
import Button from "Components/Button";
import Price from "Components/Price";
import { useMinicart } from "Talons/Minicart/useMinicart";
import Item from "Components/Minicart/item";
import Icon from "Components/Icon";
import useWindowSize from "Hooks/useWindowSize";
import cartIcon from "./cart.png";

const Minicart = (props) => {
  const { cart, handleRemoveItem, isFetchingCart, __ } = useMinicart();
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();
  const { isMobile } = useWindowSize();

  const handleCartClick = useCallback(() => {
    if (isMobile) {
      history.replace("/cart");

      return;
    }

    setShowDropdown((prevState) => !prevState);
  }, [isMobile, history]);

  return (
    <div className={classes.root}>
      <span className={classes.cartTrigger} onClick={handleCartClick}>
        <img className={classes.cart} src={cartIcon} width="35px" alt="cart" />
        {!isFetchingCart && cart.items && cart.items.length > 0 && (
          <span className={classes.counter}>{cart.totalQty}</span>
        )}
        {isFetchingCart && <span className={classes.counter}>0</span>}
      </span>
      {cart.items && !isFetchingCart && !isMobile && showDropdown ? (
        <div
          className={classes.background}
          onClick={() => setShowDropdown(false)}
        >
          <div
            className={classes.dropdown}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={classes.header}>
              <div className={classes.headerCartContainer}>
                <img
                  className={classes.headerCart}
                  src={cartIcon}
                  width="45px"
                  alt="cart"
                />
                <p className={classes.cartText}>Cart</p>
              </div>

              <span
                className={classes.cancelIconContainer}
                onClick={() => setShowDropdown(false)}
              >
                <Icon name="X" size="16px" />
              </span>
            </div>
            {cart.items && cart.items.length > 0 ? (
              <>
                <div className={classes.list}>
                  {cart.items &&
                    cart.items.map((item) => (
                      <Item
                        key={item.id}
                        item={item}
                        handleRemoveItem={handleRemoveItem}
                      />
                    ))}
                </div>
                <div className={classes.footer}>
                  <div className={classes.totals}>
                    <p className={classes.grandTotal}>
                      Total: <Price amount={cart.grandTotal} />
                    </p>
                  </div>
                  <div className={classes.actions}>
                    <Link to={"/checkout"}>
                      <Button
                        classes={{ button: classes.actionBtn }}
                        onClick={() => setShowDropdown(false)}
                      >
                        Order Now
                      </Button>
                    </Link>
                    <Link to={"/cart"}>
                      <Button
                        priority="secondary"
                        classes={{ button: classes.actionBtn }}
                        onClick={() => setShowDropdown(false)}
                      >
                        Go to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className={classes.emptyCart}>
                <p>Your Shopping cart is empty</p>
                <p>You will find everyting you need in our menu</p>

                <Button
                  text="Continue Shopping"
                  classes={{ button: classes.continueBtn }}
                  onClick={() => setShowDropdown(false)}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Minicart;
