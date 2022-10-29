import React from 'react';
import classes from 'Components/Footer/footer.module.css';
import NewsletterForm from 'Components/NewsletterForm';

const Footer  = props => {
    return (
        <div className={classes.root}>
            <p>SHOPIAN ALL RIGHTS RESERVED.</p>
            <NewsletterForm />
        </div>
    );
}

export default Footer;