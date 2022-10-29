import React, { useMemo } from 'react';
import defaultClasses from './addressCard.module.css';
import { useSelector } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';
import CheckBox from 'Components/CheckBox';
import {mergeClasses} from "../../../../../helper/classify";

const AddressCard = props => {
    const { children, selected, type, handleEditAddressDefaultShipping } = props;
    const classes = mergeClasses(defaultClasses, props.classes)
    const { __ } = useTranslations();
    const { 
        firstName,
        lastName,
        address,
        city: cityCode,
        countryCode,
        stateCode,
        isDefaultShipping
    } = props.address;
   
    const { countries, states, cities } = useSelector(state => state.app);
    
    const country = useMemo(() => {
        const country = countries ? countries.find(c => c.id == countryCode) : ''
        return country ? country.name : "";
    }, [countries, countryCode]);

    const state = useMemo(() => {
        const state = states ? states.find(c => c.id == stateCode) : ''
         console.log("states", stateCode, state, states)
        return state ? state.name : "";
    }, [states, stateCode]);

    const city = useMemo(() => {
        const city = cities ? cities.find(c => c.id == cityCode) : ''
        return city ? city.name : "";
    }, [cities, cityCode]);

    return (
        <div className={`${type === "checkout" ? classes.checkoutRoot : classes.root} ${selected && classes.selected}`}>
            <ul>
                <li className={classes.name}>{firstName} {lastName}</li>
                <li className={classes.row}>
                    <p className={classes.title}>{__("country")}</p>
                    <p className={classes.value}>{country}</p>
                </li>
                <li className={classes.row}>
                    <p className={classes.title}>{__("state")}</p>
                    <p className={classes.value}>{state}</p>
                </li>
                <li className={classes.row}>
                    <p className={classes.title}>{__("city")}</p>
                    <p className={classes.value}>{city}</p>
                </li>
                <li className={classes.row}>
                    <p className={classes.title}>{__("address")}</p>
                    <p className={classes.value}>{address}</p>
                </li>
            </ul>
            {props.type !== "checkout" && 
                <div className={classes.radioComponent}>
                    <CheckBox
                        name="isDefaultShipping"
                        label={__("address.form.is.default.shipping")}
                        value={isDefaultShipping}
                        classes={{ radioLabel: classes.radioLabel }}
                        onChange={() =>{ if(!isDefaultShipping) { handleEditAddressDefaultShipping(props.address.addressId, {isDefaultShipping: !isDefaultShipping})}}}
                    />
                </div>
            }
            {children}
        </div>
    );
};

export default AddressCard;