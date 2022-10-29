import React, { useCallback, useState, useRef } from 'react';
import defaultClasses from './header.module.css';
import Minicart from 'Components/Minicart';
import Logo from 'Components/Logo';
import IconMoon from 'Components/IconMoon';
import Search from 'Components/Search';
import LanguageSelect from 'Components/LanguageSelect';
import { mergeClasses } from 'Helper/classify';
import { useTranslations } from 'Talons/App/useTranslations';
import ContactUs from './contactUs';
import Link from 'Components/Link';
import Menu from 'Components/Menu'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'Store/actions/auth';
import SignInModal from './signInModal';
import { useMinicart } from 'Talons/Minicart/useMinicart';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import useWindowSize from 'Hooks/useWindowSize';
import NavTrigger from 'Components/Menu/navTrigger';
import UserModal from './userModal';
import { useConfig } from 'Talons/App/useConfig';
import useOnClickOutside from 'Hooks/useOnClickOutside';

const Header  = props => {
    const { __ } = useTranslations();
    const {
        cart,
        handleRemoveItem,
        isFetchingCart,
        handleChangeItemQuantity,
    } = useMinicart();
    const { getConfigValue } = useConfig();
    const storeEmail = getConfigValue("storeEmail");
    const { handleToggleDrawer,drawer, } = useDrawer();
    const [openModal, setIsOpenModal] = useState(false);
    const [signInSignUp, setIssignInSignUp] = useState('');
    const [openSearch, setIsOpenSearch] = useState(false)
    const { isSignedIn } = useSelector(state => state.auth);
    const classes = mergeClasses(defaultClasses, props.classes);
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const userModalRef = useRef();
    useOnClickOutside(userModalRef, () => { if(openModal) setIsOpenModal(!openModal)});

    const handleSignOut = useCallback(() => {
        dispatch(signOut());
    }, []);

    const closeModal = () => {
        setIssignInSignUp("")
    }

    const showSignInSignUp = (element) => {
        setIssignInSignUp(element);
    }

    return (
        <div className={classes.root}>

            <div className={openSearch ? classes.middleOpenSearch : classes.middle}>
                <div className={classes.navTrigger}><NavTrigger/></div> 
                <div className={classes.logoBlock}>
                    <Logo />
                </div>
                {
                    openSearch &&
                    <Search 
                        classes={{root: classes.searchRoot}}
                        handleCloseSearchBar={setIsOpenSearch}
                    />
                }
                {
                    !openSearch && width > 1336 && 
                    <div className={classes.withoutSearch}>
                        <Menu classes={{
                            menuItem: classes.menuItem
                        }}/>
                    </div>
                
                }
                {
                    !openSearch &&
                    <div className={classes.iconActions}>
                        <div className={classes.searchTriggerField} onClick={() => { setIsOpenSearch(!openSearch)}}>
                            <IconMoon name="search"/>
                        </div>
                        <div className={classes.cartTrigger} onClick={() => handleToggleDrawer("cart")}>
                            {!isFetchingCart && cart.items && cart.items.length ? <span className={classes.counter}>{cart.totalQty}</span> : null}
                            <div className={classes.cartIcon}>
                                <IconMoon name="cart"/>
                            </div>
                        </div>
                        {width > 991 ?
                            <div
                                className={classes.userLink} 
                                onClick={() => setIsOpenModal(!openModal)}
                                ref={userModalRef}
                            >
                                <div className={classes.accountIcon}>
                                    <IconMoon name="user"/>
                                </div>
                                {openModal ? 
                                    <UserModal isSignedIn={isSignedIn} handleSignOut={handleSignOut} setIssignInSignUp={setIssignInSignUp} />
                                : 
                                    null
                                }
                            </div>
                            :
                            null
                        }
                        {openModal && <div className={classes.overlay} onClick={() =>setIsOpenModal(false)}></div>}
                    </div>
                }
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
                {
                    drawer == 'cart'
                    ?   <Minicart 
                            cart={cart}
                            handleRemoveItem={handleRemoveItem}
                            isFetchingCart={isFetchingCart}
                            handleChangeItemQuantity={handleChangeItemQuantity}
                            handleToggleDrawer={handleToggleDrawer}
                            drawer={drawer}
                            __ ={__}
                        />
                    :   null
                }

                
                {
                !openSearch && 
                <div>
                    <ul className={classes.ullang}>
                        <li>
                            <a className={classes.lilang} href='https://k.elina.am/hy'> HY |</a>
                            <a className={classes.lilang} href='https://k.elina.am/ru'> RU |</a>
                            <a className={classes.lilang} href='https://k.elina.am/hy'> EN </a>
                        </li>
                    </ul>
                </div>
                }

            </div>
            {width <= 1336 && width > 991 ? 
                <div className={classes.withoutSearch}>
                    <Menu classes={{
                        menuItem: classes.menuItem
                    }}/>
                </div>
                :
                null
            }

        </div>
    );
}

export default Header;