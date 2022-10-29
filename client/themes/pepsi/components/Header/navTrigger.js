import React from 'react';
import classes from './navTrigger.module.css';
import Menu from 'Components/Menu';

const NavTrigger = (props) => {
    return (
      <div className={`${classes.menu} ${props.isOpen && classes.menuOpen}`}>
        <Menu isMobile={true} onClick={props.onClick}/>
      </div>
    );
  };

  export default NavTrigger;