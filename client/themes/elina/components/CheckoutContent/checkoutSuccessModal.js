import React from 'react';
import classes from './checkoutSuccessModal.module.css';
import Button from 'Components/Button';
import checked from './checked.png';
import Link from 'Components/Link';
import { useTranslations } from 'Talons/App/useTranslations';

const CheckoutSuccessModal = () => {
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            <h4 className={classes.title}>{__("thank.you")}</h4>
            <img src={checked} />
            <p className={classes.orderMessage}>{__("order.accepted")}</p>
            <Link to="/">
                <Button
                    priority="primary"
                    classes={{button: classes.continueShippingButton}}
                >
                    {__("continue.shopping")}
                </Button>
            </Link>
        </div>
    );
};

export default CheckoutSuccessModal;