import React from 'react';
import defaultClasses from './filterMenu.module.css'
import {mergeClasses} from "Helper/classify"
import Button from "../Button";
import IconMoon from 'Components/IconMoon';
import { useTranslations } from 'Talons/App/useTranslations';

const FilterMenu = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes)
    const { __ } = useTranslations();

    return (
        <div className={classes.root}>
            {props.isOpen && <div className={classes.filterMenu}>
                <IconMoon name="close" onClick={() => props.setIsOpen(false)} size={"18px"}
                      classes={{icon: classes.close}}/>
                <div className={classes.content}>
                    {props.children}
                    <Button classes={{button: classes.button}} onClick={() => props.setIsOpen(false)}>{__("confirm")}</Button>
                </div>
            </div>}
        </div>
    );
};

export default FilterMenu;