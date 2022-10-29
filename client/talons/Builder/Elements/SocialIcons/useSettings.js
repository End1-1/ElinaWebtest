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
        direction: Yup.string()
          .min(2, __('to.short'))
          .max(50, __('to.long'))
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item ? item.settings : {
            items: [],
            direction: 'horizontal'
        },
        validationSchema: SpaceFormSchema,
        onSubmit: async (values) => {
            handleSubmit(values);
        },
    });

    const handleItemChange = useCallback((attribute, item, value) => {
        let existing = [...formik.values.items];
        existing = existing.map((r) => {
            if (r.id == item.id) {
                return {
                    ...r,
                    [attribute]: value
                }
            }
            return r;
        });
        formik.setFieldValue('items', existing);
    }, [formik]);

    const addItemHandler = useCallback((e) => {
        e.preventDefault();
        const itemId = Math.floor(Math.random() * Math.floor(1000));
        formik.setFieldValue('items', [...formik.values.items, {
            id: itemId,
            name: '',
            url: '',
            class: ''
        }]);
    }, [formik]);

    return {
        formik,
        isSubmitting,
        message,
        handleItemChange,
        addItemHandler,
        __
    }
}