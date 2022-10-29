import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ADD_GUEST_CITY } from 'Store/actions/cart';

export const useAddressForm = props => {
    const { countries, states, districts, cities } = useSelector(state => state.app);
    const { isSignedIn } = useSelector(state => state.auth);
    const { currentUser } = useSelector(state => state.auth);
    const { addresses } = currentUser;
    const { initialValues, onSubmit, showSetAsDefault, showSaveAsAddress, type, setFormApi, mode } = props;
    const [isShowingDistrict, setIsShowingDistrict] = useState(false);
    const { __ } = useTranslations();
    const dispatch = useDispatch();

    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFirstAddress = useMemo(() => {
        if(!addresses) {
            return false;
        }
        else {
            return addresses.length ? false : true;
        }
    }, [addresses]);

    const AccountAddressFormSchema = useMemo(() => Yup.object().shape({
        firstName: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')).nullable(),
        lastName: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')).nullable(),
        address: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')).nullable(),
        city: Yup.string()
          .required(__('form.field.required.error.message')).nullable(),
        countryCode: Yup.string()
          .required(__('form.field.required.error.message')).nullable(),
        stateCode: Yup.string()
            .required(__('form.field.required.error.message')).nullable(),
        districtCode: Yup.string().when("city", {
            is: val => val === "ER" ? true : false,
            then: Yup.string().required(__('form.field.required.error.message')).nullable(),
        }),  
        phone: Yup.string()
            .required(__('form.field.required.error.message')).nullable()
    }), []);
    

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues ? initialValues : {
            firstName: '',
            lastName: '',
            phone: '',
            districtCode: '',
            stateCode: '',
            address: '',
            city: '',
            countryCode: '',
            isDefaultBilling: false,
            isDefaultShipping: false
        },
        validationSchema: AccountAddressFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            try {
                setIsSubmitting(true);
                setMessage({
                    type: 'success',
                    text: "Saving..."
                });
                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    phone: values.phone,
                    state: values.state,
                    district: values.district,
                    city: values.city,
                    countryCode: values.countryCode,
                    stateCode: values.stateCode,
                    districtCode: values.districtCode,
                    isDefaultBilling: values.isDefaultBilling,
                    isDefaultShipping: isFirstAddress ? isFirstAddress : values.isDefaultShipping
                }
                if(props.guestInfo) {
                    data.additionalInformation = props.guestInfo;
                }
                console.log('dataaaaaaa', data);
                await onSubmit(data);
                setMessage({ type: 'success', text: "Address added" });
                setIsSubmitting(false);
                formik.resetForm();
            } catch (error) {
                console.log('error', error);
                setIsSubmitting(false);
                setMessage({
                    type: 'error',
                    text: error.message
                });
            }
            
        },
    });
    const countryDropdownOptions = useMemo(() => {
        if (!countries) return [];
        return countries.map(country => {
            return {
                value: country.id,
                label: country.name
            }
        })
    }, [countries]);

    const stateDropdownOptions = useMemo(() => {
        if (!states) return [];
        return states.map(state => {
            return {
                value: state.id,
                label: state.name
            }
        })
    }, [states]);

    const districtDropdownOptions = useMemo(() => {
        if (!districts) return [];
        return districts.map(district => {
            return {
                value: district.id,
                label: district.name
            }
        })
    }, [districts]);

    const cityDropdownOptions = useMemo(() => {
        if (!cities) return [];
        return cities.map(city => {
            return {
                value: city.id,
                label: city.name
            }
        })
    }, [cities]);
    // Pass the form api to parent if needed
    useEffect(() => {
        if (setFormApi) {
            setFormApi(formik, type);
        }
    }, [formik.isSubmitting, formik.isValidating]);

    useEffect(() => {
        if(formik.values.city === "ER") {
            setIsShowingDistrict(true);
            if(!isSignedIn) {
                dispatch({
                    type: ADD_GUEST_CITY,
                    payload: "ER"
                });
            }
        }
        else {
            setIsShowingDistrict(false);
            formik.setFieldValue("districtCode", "");
            if(!isSignedIn) {
                dispatch({
                    type: ADD_GUEST_CITY,
                    payload: formik.values.city
                });
            }
        }
    }, [formik.values.city, isSignedIn]);

    return {
        formik,
        countries,
        countryDropdownOptions,
        stateDropdownOptions,
        districtDropdownOptions,
        cityDropdownOptions,
        type,
        showSetAsDefault,
        showSaveAsAddress,
        isSubmitting,
        __,
        mode,
        isShowingDistrict
    }
}