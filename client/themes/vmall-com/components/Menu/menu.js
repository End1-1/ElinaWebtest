import React, { useCallback } from 'react';
import classes from './menu.module.css';
import { Link  } from 'react-router-dom';
import { useMenu } from 'Talons/Menu/useMenu';
import { fetchMenu } from '../../../../store/actions/app';
import CategoryList from 'Components/Menu/elements/categoryList';
import Icon from 'Components/Icon';

const Menu  = props => {
    const { menu, getItemLink, __ } = useMenu({

    });

    
    return (
        <div className={classes.root}>
            <a href={'https://vmall-dashboard.yereone.com/?lang=hy_AM'} target={'_blank'}>Sign In</a>
        </div>
    );
}

export const loadData = async (store, req) => {
    return store.dispatch(fetchMenu());
}

export default Menu;