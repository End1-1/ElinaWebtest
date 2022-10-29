import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'Talons/App/useTranslations';
import { fetchMenu } from 'Store/actions/app';
import useWindowSize from 'Hooks/useWindowSize';
import { useBuilder } from 'Talons/Builder/useBuilder';

export const useMenu = (props) => {
    // We will get this via props, coz sometimes we use mobile menu when it is not mobile width
    const { showForScreens } = props ? props : {};
    const { __ } = useTranslations();
    const [isOpenMegamenu, setIsOpenMegamenu]  = useState(false);
    const { canUseBuilder } = useBuilder();

    const { menu } = useSelector(state => state.app);
    const { data: categories } = useSelector(state => state.category);
    const { isSignedIn } = useSelector(state => state.auth);
    const { currentShopId, currentLanguage } = useSelector(state => state.shop);
    const [editorEnabled, setEditorEnabled] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenu());
    }, [currentLanguage]);

    const getItemLink = useCallback((item) => {
        return item.link ? `${item.link}` : `${item.name}`;
    }, [categories]);

    const { isMobile, isTablet, width } = useWindowSize(); 
    
    const sizeContent = useMemo(() => {
        if (isMobile) {
            return menu.content.find(({ screenSize }) => screenSize == 'mobile') ? 
            menu.content.find(({ screenSize }) => screenSize == 'mobile').contentTree :
            menu.content.find(({ screenSize }) => screenSize == 'desktop').contentTree
        }
        if (isTablet) {
            return menu.content.find(({ screenSize }) => screenSize == 'tablet') ? 
            menu.content.find(({ screenSize }) => screenSize == 'tablet').contentTree :
            menu.content.find(({ screenSize }) => screenSize == 'desktop').contentTree
        }
        return menu.content.find(({ screenSize }) => screenSize == 'desktop').contentTree;
    }, [menu, isMobile, isTablet]);

    const screen = useMemo(() => {
        if (width <= 768) {
            return 'mobile';
        } else if (isTablet) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }, [isMobile, isTablet, width]);

    return {
        menu,
        sizeContent,
        getItemLink,
        isMobile,
        showForScreens,
        screen,
        isSignedIn,
        editorEnabled, 
        setEditorEnabled,
        __,
        isOpenMegamenu,
        setIsOpenMegamenu,
        canUseBuilder,
        __
    }
}