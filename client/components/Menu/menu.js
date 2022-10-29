import React, { lazy, Suspense } from 'react';
import classes from 'Components/Menu/menu.module.css';
import Link from 'Components/Link';
import { useMenu } from 'Talons/Menu/useMenu';
import { fetchMenu } from 'Store/actions/app';
import { mergeClasses } from '../classify';
import CategoryList from 'Components/Menu/elements/categoryList';
import BuilderIcon from 'Components/BuilderEditor/icon';
import { useBuilderContent } from 'Talons/Builder/useBuilderContent';

// We need the Builder Editor in rare cases only, so we will lazy load that
const BuilderEditor = lazy(() => import('Components/BuilderEditor/builderEditor'));

const Menu  = props => {
    const { menu, sizeContent, getItemLink, isMobile, showForScreens, screen, isSignedIn, __, editorEnabled, setEditorEnabled, canUseBuilder} = useMenu(props);
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

    if (!showForScreens.includes(screen) || !sizeContent) {
        return null;
    }

    return (
        <div className={`${classes.root} ${isMobile ? classes.mobile: ''}`}>
            {canUseBuilder && <div className={classes.editorSwitch}>
                <button className={'builder-button'} onClick={() => setEditorEnabled(!editorEnabled)}>
                    <BuilderIcon name={editorEnabled ? 'close' : 'pencil'} />
                </button>
            </div>}
            <ul>
            {sizeContent.children.map(item => 
                <li key={item.id}>
                    <Link to={item.data.link} className={classes.link}>{item.data.name || item.settings.name}</Link>
                    {item.type == 'categoryLink' && item.hasSubmenu && item.submenuType == 'dropdown' && item.submenuContent == 'subcategories' && 
                        <div className={`${classes.submenu}`}>
                            <CategoryList item={item} openSubmenuOnClick={isMobile} />
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
                        <div className={`${classes.submenu} ${classes.megamenu}`}>
                            <div className={classes.submenuContainer}>
                                {getItemContent(item.children[0])}
                            </div>
                        </div>
                    }
                </li>   
            )}
            </ul>
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