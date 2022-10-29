import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import * as Yup from 'yup';

export const usePasswordReset = (props) => {
    const { cognitoUser, oldPassword, afterSuccess } = props;
    console.log('Inside component', cognitoUser);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { __ } = useTranslations();

    const PasswordResetSchema = useMemo(() => Yup.object().shape({
        oldPassword: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        newPassword: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        newPasswordConfirm: Yup.string().when("newPassword", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("newPassword")],
                __("passwords.must.match")
            )
        })
    }), []);

    const formik = useFormik({
        initialValues: {
            oldPassword,
            newPassword: '',
            newPasswordConfirm: ''
        },
        validationSchema: PasswordResetSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            const { oldPassword, newPassword, newPasswordConfirm } = values;
            try {
                setIsSubmitting(true);
                const result = await Auth.completeNewPassword(cognitoUser, newPassword);
                setIsSubmitting(false);
                if (afterSuccess) {
                    afterSuccess();
                }
            } catch (error) {
                console.log('error', error);
            }
            
        },
    });

    return {
        formik,
        isSubmitting,
        __
    }
}