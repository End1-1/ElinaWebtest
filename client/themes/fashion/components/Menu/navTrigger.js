import React from 'react';
import classes from './navTrigger.module.css';
import { useNavTrigger } from 'Talons/Menu/useNavTrigger';
import Icon from 'Components/Icon';

const NavTrigger = (props) => {
    const {
        isOpen,
        handleToggleMobileMenu
    } = useNavTrigger();
    
    return (
        <div className={`${classes.root} navtrigger`}>
            <span className={classes.closeBtn} onClick={handleToggleMobileMenu}>
                <Icon size={'20px'} name='menu' />
            </span>
        </div>
    );
};

export default NavTrigger;