import React from "react";
import defaultClasses from "Components/AddressForm/addressForm.module.css";
import TextInput from "Components/TextInput";
import { useAddressForm } from "Talons/AddressForm/useAddressForm";
import { mergeClasses } from "Helper/classify";

const AddressForm = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const {
    formik,
    countries,
    countryDropdownOptions,
    type,
    showSaveAsAddress,
    showSetAsDefault,
    isSubmitting,
    __,
  } = useAddressForm(props);

  if (!countries || !countries.length) {
    return null;
  }

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <div className={classes.fields}>
        <div>
          <div className={`${classes.field} ${classes.fieldPerson}`}>
            <div>
              <p className={classes.label}>{"Name"}</p>
              <TextInput
                type="text"
                name="firstName"
                classes={{ input: classes.input }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && formik.touched.firstName ? (
                <div className={classes.validationError}>
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div>
              <p className={classes.label}>{"Surname"}</p>
              <TextInput
                type="text"
                name="lastName"
                classes={{ input: classes.input }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className={classes.validationError}>
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.field}>
            <p className={classes.label}>{"Email"}</p>
            <TextInput
              type="text"
              name="email"
              placeholder="test@gmail.com"
              classes={{ input: classes.input }}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className={classes.validationError}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className={classes.field}>
            <p className={classes.label}>{"Phone number"}</p>
            <TextInput
              type="text"
              name="phone"
              classes={{ input: classes.input }}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className={classes.validationError}>
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <div className={classes.field}>
            <p className={classes.label}>{"Address"}</p>
            <TextInput
              type="text"
              name="address"
              classes={{ input: classes.input }}
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.touched.address ? (
              <div className={classes.validationError}>
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <div className={classes.field}>
            <p className={classes.label}>{"Region"}</p>
            <TextInput
              type="text"
              name="region"
              classes={{ input: classes.input }}
              value={formik.values.region}
              onChange={formik.handleChange}
            />
            {formik.errors.region && formik.touched.region ? (
              <div className={classes.validationError}>
                {formik.errors.region}
              </div>
            ) : null}
          </div>
          <div className={classes.field}>
            <p className={classes.label}>{"City"}</p>
            <TextInput
              type="text"
              name="city"
              classes={{ input: classes.input }}
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            {formik.errors.city && formik.touched.city ? (
              <div className={classes.validationError}>
                {formik.errors.city}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {props.showBtn ? (
        <Button
          classes={{ button: classes.btn }}
          type={"submit"}
          loading={isSubmitting}
        >
          {"Add"}
        </Button>
      ) : null}
    </form>
  );
};

AddressForm.defaultProps = {
  showSetAsDefault: false,
};

export default AddressForm;
