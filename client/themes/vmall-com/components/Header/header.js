import React from 'react';
import { mergeClasses } from 'Helper/classify';
import Menu from 'Components/Menu';
import defaultClasses from './header.module.css';
import AuthBar from 'Components/AuthBar';
import Minicart from 'Components/Minicart';
import Logo from 'Components/Logo';
import Search from 'Components/Search';
import LanguageSelect from 'Components/LanguageSelect';
import NavTrigger from 'Components/Menu/navTrigger';
import ContactUs from './contactUs';
import Link from 'Components/Link';
import SearchTrigger from 'Components/SearchBar/searchTrigger';
import { useHeader } from 'Talons/Header/useHeader';

const Header  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { isMobile } = useHeader();

    if (isMobile) {
        return (
            <div className={classes.rootPosition}>
                <div className={classes.root}>
                    <div className={classes.top}>
                        <AuthBar />
                        <LanguageSelect />
                        <ContactUs />
                    </div>
                    <div className={classes.middle}>
                        <Logo />
                        <div className={classes.mobileMiddleRight}>
                            <SearchTrigger />
                            <NavTrigger />
                        </div>
                    </div>
                    <div className={classes.navTriggerDiv}>
                        <div className={classes.searchFieldMobile}>
                            <Search classes={{root: classes.searchRoot}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.rootPosition}>
            <div className={classes.root}>
                <div className={classes.top}>
                    <AuthBar />
                    <LanguageSelect />
                    <Link to="blog">Blog</Link>
                    <ContactUs />
                </div>
                <div className={classes.middle}>
                    <Logo />
                    <Search followTrigger={false} />
                </div>
                <div className={classes.bottom}>
                    <Menu showForScreens={['tablet', 'desktop']} />
                </div>
            </div>
        </div>
    );
}

export default Header;