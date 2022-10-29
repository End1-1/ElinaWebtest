import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../../../talons/App/useTranslations';
import * as Yup from 'yup';


export const useSettings = (props) => {
    const { attribute, handleSubmit, item } = props;
    const [banners, setBanners] = useState([]);
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { __ } = useTranslations();

    const ImageBannerFormSchema = useMemo(() => Yup.object().shape({
        columns: Yup.number().oneOf([1, 2, 3, 4])
          .required(__('form.field.required.error.message'))
    }), []);

    const formik = useFormik({
        initialValues: item && item.settings ? item.settings : {
            columns: ''
        },
        validationSchema: ImageBannerFormSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleSubmit(values);
        },
    });

    const columnsDropdownOptions = useMemo(() => {
        return [1, 2, 3, 4].map(num => {
            return {
                key: num,
                label: num,
                value: num
            }
        })
    }, [banners]);

    return {
        formik,
        columnsDropdownOptions,
        isSubmitting,
        message,
        __
    }
}