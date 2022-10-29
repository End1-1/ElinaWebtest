import React, { useMemo, useState } from 'react';
import classes from './checkoutSuccessPage.module.css';
import { Helmet } from 'react-helmet';
import Modal from 'Components/Modal';
import CheckoutSuccessModal from 'Components/CheckoutContent/checkoutSuccessModal';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useLink } from 'Talons/Link/useLink';

const CheckoutSuccessPage = () => {
    const [open, setIsOpen] = useState(true);
    const history = useHistory();
    const { isSignedIn } = useSelector(state => state.auth);
    const { getLocalizedUrl } = useLink();
    const accountOrdersLink = useMemo(() => {
        return getLocalizedUrl("/account/orders")
    }, [getLocalizedUrl]);

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{'Checkout'}</title>
            </Helmet>
            <Modal
                open={open}
                onClose={() => { setIsOpen(false); isSignedIn ? history.push(accountOrdersLink) :  history.push('/')}}
                classes={{content: classes.modalContent, closeIconField: classes.closeIconField}}
            >
                <CheckoutSuccessModal />
            </Modal>
        </div>
    );
}

export default {
    component: CheckoutSuccessPage,
    loadData: () => { }
};