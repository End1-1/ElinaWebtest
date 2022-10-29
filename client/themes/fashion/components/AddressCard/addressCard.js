import React, { useState, useEffect, useMemo } from 'react';
import classes from './addressCard.module.css';
import { useSelector } from "react-redux";

const AddressCard = props => {
    const { children, selected } = props;

    const { 
        firstName,
        lastName,
        address,
        city,
        countryCode,
        isDefaultBilling,
        isDefaultShipping
    } = props.address;

    const { countries } = useSelector(state => state.app);

    const country = useMemo(() => {
        return countries ? countries[countryCode] : '';
    }, [countries, countryCode]);

    return (
        <div className={classes.root}>
            <ul className={classes.addressBlock}>
                <li className={classes.name}>{firstName} {lastName}</li>
                <li className={classes.address}>
                    <div>
                        <p>{address}</p>
                        <p>{city} {country}</p>
                    </div>
                    <span className={`${classes.checkmark} ${selected ? classes.selected : ''}`}></span>
                </li>
            </ul>
            {children}
        </div>
    );
};

export default AddressCard;