import React, { useEffect } from 'react';
import defaultClasses from './drawer.module.css';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import { mergeClasses } from 'Helper/classify';
import NavDrawer from 'Components/NavDrawer';
import SignInModal from 'Components/Header/signInModal';

const Drawer = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { drawer, handleToggleDrawer, isSignedIn, handleSignOut, signInSignUp, setIssignInSignUp, closeModal, showSignInSignUp } = useDrawer();
    useEffect(() => {
        if (drawer || signInSignUp) {
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [drawer, signInSignUp]);

    return (
        <div className={`${classes.root} ${drawer ? classes.open : ''}`} onClick={() => handleToggleDrawer("")}>
            <NavDrawer isSignedIn={isSignedIn} handleSignOut={handleSignOut} setIssignInSignUp={setIssignInSignUp} />
            {
                signInSignUp 
                ?   <SignInModal 
                        openModal={!!signInSignUp} 
                        closeModal={closeModal} 
                        signInSignUp={signInSignUp}
                        showSignInSignUp={showSignInSignUp}
                    />
                :   null
            }
        </div>
    );
}

export default Drawer;