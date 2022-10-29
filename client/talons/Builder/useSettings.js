import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from '../../talons/App/useTranslations';
import * as Yup from 'yup';

export const useSettings = (props) => {
    const { item, index, details, handleUpdateItem } = props;
    const { settingFields, defaultSettings } = details;
    const initialSettings = useMemo(() => {
        return  item.settings;
    });
    const [message, setMessage] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeTabs, setActiveTabs] = useState(settingFields ? [Object.keys(settingFields)[0]] : null);
    
    const { __ } = useTranslations();

    const SettingsFormSchema = useMemo(() => {
        if (!settingFields) {
            return {};
        }
        const fieldSchemas = {};
        Object.values(settingFields).map(({ fields }) => {
            fields.map(field => {
                let fieldSchema = Yup.string();
                if (field.type == 'wysiwyg' && field.multilanguage) {
                    fieldSchema = Yup.object();
                }
                if (field.type == 'multifield') {
                    fieldSchema = Yup.array();
                }
                
                if (field.validation) {
                    if (field.validation.required) {
                        fieldSchema.required(__('form.field.required.error.message'));
                    }
                }
                fieldSchemas[field.id] = fieldSchema;
            })
        })
        return Yup.object().shape({
            ...fieldSchemas
        })
    }, [settingFields]);

    console.log('Initial', item, defaultSettings);
    const formik = useFormik({
        initialValues: item ? item.settings : defaultSettings,
        validationSchema: SettingsFormSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log('values', values);
            const updatedItem = {
                item: {
                    ...item,
                    settings: values
                },
                index
            }
            handleUpdateItem(updatedItem);
        },
    });

    console.log('formik', formik);

    useEffect(() => {
        if (!formik.errors.length) {
            const updatedItem = {
                item: {
                    ...item,
                    settings: formik.values
                },
                index
            }
            console.log('updatedItem Will be Sent');
            handleUpdateItem(updatedItem);
        }
    }, [formik.values]);

    return {
        formik,
        fields: settingFields || [],
        activeTabIndex, 
        setActiveTabIndex,
        activeTabs,
        setActiveTabs,
        isSubmitting,
        message,
        __
    }
}