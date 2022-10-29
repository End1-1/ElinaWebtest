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

    const ProductSliderSettingsFormSchema = useMemo(() => Yup.object().shape({
        count: Yup.number()
          .required(__('form.field.required.error.message')),
        visibleItems: Yup.number()
          .required(__('form.field.required.error.message')),
        type: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message')),
        categoryId: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .when("type", {
                is: 'category',
                then: Yup.string().required(__('form.field.required.error.message')),
            }),
    }), []);
    console.log('item.settings', item.settings);
    const formik = useFormik({
        initialValues: item && !isObjectEmpty(item.settings) ? item.settings : {
            count: 2,
            visibleItems: 2
        },
        validationSchema: ProductSliderSettingsFormSchema,
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