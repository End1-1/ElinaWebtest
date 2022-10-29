import React, { useEffect } from 'react';
import classes from './navDrawer.module.css';
import Menu from 'Components/Menu';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import LanguageSelect from 'Components/LanguageSelect';
import UserModal from 'Components/Header/userModal';
import useWindowSize from 'Hooks/useWindowSize';

const NavDrawer = (props) => {
    const {isSignedIn, handleSignOut, setIssignInSignUp } = props;
    const { handleToggleDrawer, drawer } = useDrawer();
    const { width } = useWindowSize();

    useEffect(() => {
        if(width >= 991 && drawer === "nav") {
            handleToggleDrawer("");
        }
    }, [width]);

    return (
        <div className={`${classes.root} ${drawer === 'nav' && classes.open}`}>
            <LanguageSelect isMobile={true}/>
            <Menu isMobile={true} showForScreens={['mobile', 'tablet']} />
            <UserModal isMobile={true} isSignedIn={isSignedIn} handleSignOut={handleSignOut} setIssignInSignUp={setIssignInSignUp} />
        </div>
    );
}

export default NavDrawer;