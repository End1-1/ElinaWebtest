import React, { useCallback } from 'react';
import classes from './menu.module.css';
import { Link  } from 'react-router-dom';
import { useMenu } from 'Talons/Menu/useMenu';
import { fetchMenu } from '../../../../store/actions/app';
import CategoryList from 'Components/Menu/elements/categoryList';
import Icon from 'Components/Icon';

const Menu  = props => {
    const { menu, getItemLink, __ } = useMenu();

    const getItemContent = useCallback((item) => {
        if (item.children && item.children.length) {
            return (
                <React.Fragment>
                    {item && item.children.map(child => 
                        <div key={child.id} style={{ display: 'grid', gridColumn: `span ${child.ratio}` }}>  
                            {getItemContent(child)}
                        </div>
                    )}
                </React.Fragment>
            );
        } else if (item.type == 'htmlBlock') {
            return (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
            )
        } else if (item.type == 'categoryList') {
            return <CategoryList item={item} />
        }
    }, []);

    const getAlignFlex = useCallback(() => {
        switch (menu.align) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';

        }
    }, [menu]);

    return (
        <div className={classes.root} style={{ justifyContent: getAlignFlex() }}>
            <ul>
            {menu.items.map(item => 
                <li key={item.id}>
                    <Link to={getItemLink(item)} className={classes.link}>{item.name}</Link>
                    <span className={classes.arrow}><Icon name="arrow"/></span>
                    {item.type == 'category' && item.hasSubmenu && item.submenuType == 'dropdown' && item.submenuContent == 'subcategories' && 
                        <div className={`${classes.submenu}`}>
                            <CategoryList item={item} />
                        </div>
                    }
                    {item.hasSubmenu && item.submenuType == 'megamenu' && 
                        <div className={`${classes.submenu} ${classes.megamenu}`}>
                            {getItemContent(item)}
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

export default Menu;