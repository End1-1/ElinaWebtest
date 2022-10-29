import React, { useState } from 'react';
import Menu from 'Components/Menu';
import classes from './header.module.css';
import AuthBar from 'Components/AuthBar';
import Minicart from 'Components/Minicart';
import Logo from 'Components/Logo';
import Icon from 'Components/Icon';
import Search from 'Components/Search';
import LanguageSelect from 'Components/LanguageSelect';
import { useConfig } from 'Talons/App/useConfig';
import { useTranslations } from 'Talons/App/useTranslations';
import NavTrigger from 'Components/Menu/navTrigger';
import useWindowSize from 'Hooks/useWindowSize';
import Link from 'Components/Link'

const Header  = props => {
    const { getConfigValue } = useConfig();
    const { __ } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const { width } = useWindowSize();

    return (
        <div className={classes.root}>
            <div className={`${classes.top}`}>
                <div className='row'>
                    <span className={classes.openMenu}>
                        <NavTrigger />
                    </span>
                    <div className={`${classes.languageBlock}`} >
                        <LanguageSelect />
                    </div>
                </div>
            </div>
            <div className={`${classes.middle} container`}>
                <div className='row'>
                    <div className={classes.logoBlock}>
                        <Logo />
                    </div>
                    <div className={classes.menuBlock}>
                        <Menu showForScreens={['desktop']} />
                    </div>
                    <div className={classes.rightBlock}>
                        {width > 992 &&
                            <div className={`${classes.searchBlock} ${isOpen ? classes.open : ''}`}>
                                <Search/>
                            </div>
                        }
                        <span className={`${classes.searchLink} ${isOpen ? classes.open : ''}`}
                            onClick={() => setIsOpen(!isOpen)}>
                            <Icon name='search' />
                        </span>
                        <AuthBar />
                        <Minicart width={width} />
                        <Link to="stores">Stores</Link>
                    </div>
                </div>
                {width < 993 &&
                    <div className={`${classes.searchBlock} ${isOpen ? classes.open : ''}`}>
                        <Search/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;