import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';


export const useSettings = (props) => {
    const { handleSubmit, item } = props;
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { __ } = useTranslations();

    const SpaceFormSchema = useMemo(() => Yup.object().shape({
        content: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item ? item : {
            content: ''
        },
        validationSchema: SpaceFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleSubmit(values);
        },
    });

    return {
        formik,
        isSubmitting,
        message,
        __
    }
}