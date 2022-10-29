import React, { lazy, Suspense } from 'react';
import defaultClasses from './menu.module.css';
import Link from 'Components/Link';
import { useMenu } from 'Talons/Menu/useMenu';
import { fetchMenu } from 'Store/actions/app';
import { mergeClasses } from 'Helper/classify';
import CategoryList from 'Components/Menu/elements/categoryList';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import { useBuilderContent } from 'Talons/Builder/useBuilderContent';
import IconMoon from 'Components/IconMoon';

// We need the Builder Editor in rare cases only, so we will lazy load that
const BuilderEditor = lazy(() => import('Components/BuilderEditor/builderEditor'));

const Menu  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { menu, sizeContent, getItemLink, isMobile, showForScreens, screen, isSignedIn, __, editorEnabled, canUseBuilder, setEditorEnabled, isOpenMegamenu, setIsOpenMegamenu } = useMenu(props);
    
    const { getItemContent } = useBuilderContent();

    if (canUseBuilder && editorEnabled) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <BuilderEditor setEditorEnabled={setEditorEnabled} contentType={'menu'} content={menu.content || [
                                {
                                    screenSize: 'desktop',
                                    content: [
                                        {
                                            id: "ROOT",
                                            type: 'section',
                                            children: []
                                        }
                                    ]
                                }
                            ]} /> 
            </Suspense>
        );
    }

    // if (!menu) {
    //     return null;
    // }
    if (!showForScreens.includes(screen) || !sizeContent) {
        return null;
    }

    return (
        <div className={`${classes.root} ${props.isMobile ? classes.mobile: ''}`}>
            {canUseBuilder && <div className={classes.editorSwitch}>
                <button className="builder-button" onClick={() => setEditorEnabled(!editorEnabled)}>
                    <Icon name={editorEnabled ? 'close' : 'settings'} />
                </button>
            </div>}
            <ul>
            {sizeContent.children.map(item => 
                <li key={item.id} className={`${props.isMobile ? classes.menuItemMobile : classes.menuItem} ${props.isMobile && item.settings.submenuType && item.settings.submenuType == 'megamenu' && item.children.length > 0 && classes.hasSubMenuItemMobile}`}>
                    <Link to={item.data.link} classes={{link: `${props.isMobile ? item.settings.submenuType && item.settings.submenuType == 'megamenu' ? classes.hasMenuLink : classes.link : ''} ${item.settings.name == "Sales" && classes.salesLink}` }}>
                        {item.data.name || item.settings.name}
                        {props.isMobile && item.settings.submenuType && item.settings.submenuType == 'megamenu' ? 
                            <div className={`${classes.downArrow} ${isOpenMegamenu && classes.isOpenArrow}`} onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsOpenMegamenu(!isOpenMegamenu)}}>
                                <IconMoon name="arrow"/>
                            </div>
                        :
                            null}
                    </Link>
                    {item.type == 'categoryLink' && item.hasSubmenu && item.submenuType == 'dropdown' && item.submenuContent == 'subcategories' && 
                        <div className={`${classes.submenu}`}>
                            <CategoryList item={item} openSubmenuOnClick={props.isMobile} />
                        </div>
                    }
                    {item.type == 'categoryLink' && item.hasSubmenu && item.submenuType == 'dropdown' && item.submenuContent == 'customLinks' && 
                        <div className={`${classes.submenu}`}>
                            <ul>
                                {item.children.map(category => 
                                    <li key={category.id}><Link to={category.link}>{category.name}</Link></li>
                                )}
                            </ul>
                        </div>
                    }
                    {item.settings.submenuType && item.settings.submenuType == 'megamenu' && item.children.length > 0 && 
                        <div className={`${classes.submenu} ${props.isMobile ? isOpenMegamenu ? classes.megamenuMobile : '' : classes.megamenu}`}>
                            <div className={classes.submenuContainer}>
                                {getItemContent(item.children[0])}
                            </div>
                        </div>
                    }
                </li>   
            )}
            </ul>
            {props.isMobile && <span className={`${classes.border} `}></span>}
        </div>
    );
}

export const loadData = async (store, req) => {
    return store.dispatch(fetchMenu());
}

Menu.defaultProps = {
    showForScreens: ['mobile', 'tablet', 'desktop']
}

export default Menu;