import React, { useState } from 'react';
import classes from './guestOrders.module.css';
import Button from 'Components/Button';
import { useTranslations } from 'Talons/App/useTranslations';
import Banner from 'Components/Banner';
import SignInModal from 'Components/Header/signInModal';

const GuestOrders = () => {
    const { __ } = useTranslations();
    const [signInSignUp, setIssignInSignUp] = useState('');

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    return (
        <div className={classes.root}>
            <div>
                <div className={classes.image}>
                    <Banner id="60880bb07515ab48238068fb" classes={{root:classes.bannerRoot}}/>
                </div>
            </div>
            <div className={classes.content}>
                <div>
                    <h3>{__("already.have.an.account")}</h3>
                    <Button
                        onClick={() => showSignInSignUp('signIn')}
                    > 
                        {__('sign.in')}
                    </Button>
                </div>
                <div>
                    <h3>{__("dont.have.an.account")}</h3>
                    <Button
                        onClick={() => showSignInSignUp('signUp')}
                    > 
                        {__('sign.up')}
                    </Button>
                </div>
            </div>
            {signInSignUp 
                ?   <SignInModal 
                        openModal={!!signInSignUp} 
                        closeModal={() => setIssignInSignUp("")}
                        signInSignUp={signInSignUp}
                        showSignInSignUp={showSignInSignUp}
                    />
                :   null
            }
        </div>
    );
};

export default GuestOrders;