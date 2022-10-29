import React, { useMemo } from "react";
import classes from "./addressCard.module.css";
import { useSelector } from "react-redux";
import RadioButton from "Components/CheckoutContent/radioButton";
import TextInput from "Components/TextInput";

const AddressCard = (props) => {
  const { children, selected, label, inputName, onClick } = props;

  const {
    firstName,
    lastName,
    address,
    city,
    countryCode,
    isDefaultBilling,
    isDefaultShipping,
  } = props.address;

  const { countries } = useSelector((state) => state.app);

  const country = useMemo(() => {
    return countries ? countries[countryCode] : "";
  }, [countries, countryCode]);

  return (
    <div className={classes.root}>
      <div>
        <RadioButton
          onClick={onClick}
          classes={{ radioButton: classes.radioBtn }}
        />
      </div>
      <div>
        <p className={classes.label}>{label}</p>
        <TextInput
          type="text"
          name={inputName || "address"}
          classes={{ input: classes.input }}
          value={"afafasfa "}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default AddressCard;
