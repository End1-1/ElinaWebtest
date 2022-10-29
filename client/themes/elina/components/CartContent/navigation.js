import React from 'react'
import defaultClasses from './navigation.module.css';
import { mergeClasses } from "Helper/classify";
import { useHistory } from 'react-router';
import { useTranslations } from 'Talons/App/useTranslations';

const Navigation = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const history = useHistory();
    const { handleChangeActiveStep } = props;
    const { __ } = useTranslations();

    return (
        <div className={classes.navigation}>
            <div className={classes.navFlex}>
                <div className={`${classes.navCircle} ${props.active === "delivery" && classes.active}`} onClick={() => handleChangeActiveStep("shipping")}></div>
                <div className={classes.navLine}></div>
                <div className={`${classes.navCircle} ${props.active === "payment" && classes.active}`} onClick={() => handleChangeActiveStep("billing")}></div>
            </div>
            <div className={classes.textFlex}>
                <div className={classes.navText}>
                    {__("shipping")}
                </div>
                <div className={classes.navSpace}></div>
                <div className={classes.navText}>
                    {__("payment")}
                </div>
            </div>
        </div>
    )
};

export default Navigation;