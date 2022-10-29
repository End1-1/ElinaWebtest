import React from 'react';
import classes from './navTrigger.module.css';
import { useNavTrigger } from 'Talons/Menu/useNavTrigger';
import IconMoon from 'Components/IconMoon';

const NavTrigger = (props) => {
    const {
        isOpen,
        handleToggleMobileMenu
    } = useNavTrigger();
    
    return (
        <div className={`${classes.root}`}>
            <span className={classes.closeBtn} onClick={handleToggleMobileMenu}>
                <IconMoon name='burger' />
            </span>
        </div>
    );
};

export default NavTrigger;