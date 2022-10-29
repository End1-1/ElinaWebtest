import React, { useMemo } from 'react';
import classes from 'Components/AddressCard/addressCard.module.css';
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
            <ul>
                <li className={classes.name}>{firstName} {lastName}</li>
                <li className={classes.address}>
                    <div>
                        <p>{address}</p>
                        <p>{city} {country}</p>
                    </div>
                    {selected && <span className={classes.selected}></span>}
                    {isDefaultBilling && <span>Default Billing</span>}
                    {isDefaultShipping && <span>Default Shipping</span>}
                </li>
            </ul>
            {children}
        </div>
    );
};

export default AddressCard;