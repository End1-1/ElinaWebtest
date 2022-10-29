import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateCurrentUserDetails, deleteAccount } from 'Store/actions/auth';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

export const useAccountForm = props => {
    const { currentUser } = props;
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const { __ } = useTranslations();

    const AccountFormSchema = useMemo(() => Yup.object().shape({
        firstName: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .required(__('form.field.required.error.message')),
        lastName: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .required(__('form.field.required.error.message')),
        password: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .when("changePassword", {
                is: true,
                then: Yup.string().required(__('form.field.required.error.message')),
            }),
        passwordConfirm: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                __("passwords.must.match")
            ).when("changePassword", {
                is: true,
                then: Yup.string().required(__('form.field.required.error.message')),
            }),
        }),
        currentPassword: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .when("changePassword", {
                is: true,
                then: Yup.string().required(__('form.field.required.error.message')),
            }),
    }), []);

    const handleDeleteAccount = useCallback(async () => {
        setIsDeletingAccount(true);
        await dispatch(deleteAccount());
        setIsDeletingAccount(false);
        history.replace('/');
    }, []);
    
    const formik = useFormik({
        initialValues: currentUser ? { ...currentUser, password: '', passwordConfirm: '', currentPassword: '', changePassword: false } : {
            firstName: '',
            lastName: ''
        },
        validationSchema: AccountFormSchema,
        onSubmit: async (values) => {
            try {
                const customerData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                }
                if (values.changePassword) {
                    customerData.password = values.password;
                    customerData.currentPassword = values.currentPassword;
                }
                setIsSubmitting(true);
                await dispatch(updateCurrentUserDetails(customerData));
                setIsSubmitting(false);
                setMessage({ type: 'success', text: __("Account.saved") });
            } catch (error) {
                if (error.message == "WrongCurrentPassword") {
                    setMessage({ type: 'error', text: __("wrong.password") });
                } else {
                    setMessage({ type: 'error', text: __("account.update.failed") });
                }
                setIsSubmitting(false);
            }

        },
    });
    return {
        formik,
        handleDeleteAccount,
        isDeletingAccount,
        isSubmitting,
        message,
        __
    }
}