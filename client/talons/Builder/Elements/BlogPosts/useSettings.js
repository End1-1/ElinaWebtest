import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';
import isObjectEmpty from 'Helper/isObjectEmpty';


export const useSettings = (props) => {
    const { handleSubmit, item } = props;
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { __ } = useTranslations();

    const BlogPostsSettingsFormSchema = useMemo(() => Yup.object().shape({
        count: Yup.number()
          .required(__('form.field.required.error.message')),
        visibleItems: Yup.number()
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item && !isObjectEmpty(item.settings) ? item.settings : {
            count: 1,
            visibleItems: 2
        },
        validationSchema: BlogPostsSettingsFormSchema,
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