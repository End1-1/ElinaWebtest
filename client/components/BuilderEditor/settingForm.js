import React, { Fragment, useCallback, useMemo } from 'react';
import classes from './settingForm.module.css';
import { Element, useEditor } from "@craftjs/core";
import Icon from './icon';
import { useSettings } from 'Talons/Builder/useSettings';
import Select from './Fields/Select';
import TextInput from './Fields/TextInput';
import Button from 'Components/Button';
import Wysiwyg from 'Components/BuilderEditor/Elements/Wysiwyg';
import UploadZone from 'Components/BuilderEditor/Elements/UploadZone';
import ColorPicker from './Fields/ColorPicker';
import ContentEditable from 'react-contenteditable'

const SettingForm = (props) => {
    const { setProp } = props;

    const { selected, builderData } = useEditor((state) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name || state.nodes[currentNodeId].data.displayName,
                // For Containers
                type: state.nodes[currentNodeId].data.custom.elementType || state.nodes[currentNodeId].data.props.elementType || state.nodes[currentNodeId].data.name,
                settingValues: state.nodes[currentNodeId].data.props,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                setProp: state.handlers.store.actions.setProp
            };
        }

        return {
            selected,
            builderData: state.options.builderData
        }
    });

    console.log('selected', selected);


    const elementData = useMemo(() => {
        let data = null;
        builderData.elements.map(group => {
            group.items.map(element => {
                if (element.type == selected.type) {
                    data = element;
                }
            })
        })
        return data;
    }, [selected, builderData]);

    const { 
        formik,
        fields,
        activeTabIndex, 
        setActiveTabIndex,
        isSubmitting,
        activeTabs,
        setActiveTabs,
        message,
        __
    } = useSettings({
        item: selected ? { settings: selected.settingValues || {} } : {},
        index: 1,
        details: elementData,
        handleUpdateItem: (newData) => {
            if (!selected) return;
            const newSettings = newData.item.settings;

            setProp(props => {
                for (const key in newSettings) {
                    if (Object.hasOwnProperty.call(newSettings, key)) {
                        const value = newSettings[key];
                        props[key] = value;
                    }
                }
            })
        }
    });
    
    const getFieldComponent = useCallback((field) => {
        const { type, multilanguage } = field;
        if (type == 'text') {
            if (field.showAsEditableContent) {
                // @todo multilanguage should be implemented for editableContent
                return (
                    <ContentEditable 
                        onChange={(e) => formik.setFieldValue(`${field.id}`, e.target.value)}
                        html={`${formik.getFieldMeta(field.id).value}`}
                    />
                );
            } else {
                if (multilanguage) {
                    return (
                        <TextInput 
                            onChange={(language, value) => {
                                formik.setFieldValue(`${field.id}.${language}`, value, false);
                            }}
                            onLanguageChange={(language) => {
                                setProp(props => {
                                    props.editingLanguage = language;
                                })
                            }}
                            value={formik.getFieldMeta(field.id).value}  
                            multilanguage={multilanguage}
                        />
                    );
                } else {
                    return (
                        <TextInput 
                            onChange={(e) => formik.setFieldValue(`${field.id}`, e.target.value)}
                            value={formik.getFieldMeta(field.id).value}   
                        />
                    );
                }
            }
        } if (type == 'multifield') {
            return (
                <div className={classes.multifield}>
                    {field.fields.map((f, index) => 
                        <div key={f.id} className={f.sameLineWithLabel ? classes.sameLineWithLabel : ''}>
                            <label className={classes.label} htmlFor="type">{__(f.label)}</label>
                            {getFieldComponent({ ...f, id: `${field.id}[${index}]` })}
                        </div>
                    )}
                </div>
            );
        } if (type == 'number') {
            if (field.showAsEditableContent) {
                return (
                    <ContentEditable 
                        onChange={(e) => parseFloat(e.target.value) ? formik.setFieldValue(`${field.id}`, parseFloat(e.target.value) || 0) : null}
                        type={'number'}
                        html={`${formik.getFieldMeta(field.id).value}`}
                    />
                );
            } else {
                return (
                    <TextInput 
                        type={'number'}
                        onChange={(e) => formik.setFieldValue(`${field.id}`, parseFloat(e.target.value))}
                        value={formik.getFieldMeta(field.id).value}  
                    />
                );
            }
        } if (type == 'color') {
            return (
                <ColorPicker 
                    onChange={(value) => formik.setFieldValue(`${field.id}`, value)}
                    value={formik.values[field.id]}  
                />
            );
        } else if (type == 'textarea') {
            return (
                <textarea type="text" 
                    rows="14" cols="50"
                    name="translations"
                    placeholder={field.placeholder ? __(field.placeholder) : __(field.title)} 
                    className={classes.input} 
                    onChange={(value) => formik.setFieldValue(`${field.id}`, value)}
                    value={formik.values[field.id]}  
                />
            );
        } else if (type == 'wysiwyg') {
            const multilanguage = field.multilanguage || false;
            if (multilanguage) {
                return <Wysiwyg 
                    multiLanguage={true} 
                    onChange={(language, value) => formik.setFieldValue(`${field.id}.${language}`, value)} 
                    value={formik.values[field.id] || {}} 
                    onLanguageChange={(language) => {
                        setProp(props => {
                            props.editingLanguage = language;
                        })
                    }}
                />
            } else {
                return <Wysiwyg onChange={(value) => formik.setFieldValue(`${field.id}`, value)} value={formik.values[field.id]} />
            }
        } else if (type == 'select') {
            const { placeholder, translate } = field;
            // Translate if needed
            const options = field.options.map((option) => {
                if (Array.isArray(translate) && translate.includes('optionLabel')) {
                    option.label = __(option.label)
                }
                option.text = option.label;
                return option;
            });

            return (
                <Select options={options} 
                    onChange={(value) => formik.setFieldValue(`${field.id}`, value)}
                    defaultValue={formik.values[field.id] || false}
                    placeholder={placeholder}
                />
            );
        } else if (type == 'multiselect') {
            return (
                <select
                    name="availableLanguages"
                    placeholder="type" 
                    className={classes.input} 
                    onChange={(e) => formik.setFieldValue(`${field.id}`, [...e.target.selectedOptions].map(o => o.value))}
                    multiple
                    defaultValue={formik.values[field.id]}
                >
                    {field.options.map(option => 
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )}
                </select>
            );
        } else if (type == 'file') {
            return (
                <div>
                    <UploadZone 
                        formik={formik} 
                        path={`${field.id}`} 
                        initialFiles={formik.getFieldMeta(`${field.id}`).value ? [formik.getFieldMeta(`${field.id}`).value] : []}
                        multiple={false} 
                        type={'gallery'}
                        // Only path will be stored, not like product images (roles, pathname)
                        returnPathOnly={true}
                    />
                </div>
            );
        } else if (type == 'editableList') {
            return <EditableList formik={formik} {...field} />
        }
        
    });

    // If no item is selected or selected item doesn't have settings
    if (!selected || !fields || !Object.values(fields).length) return null;


    return (
        <form className={classes.root} onSubmit={formik.handleSubmit}>
            <div className={classes.groups}>
                {Object.keys(fields).map((groupId, index) => 
                    <div className={`${classes.group} ${activeTabs.includes(groupId) ? classes.active : ''}`}>
                        <p className={classes.groupHeading} onClick={() => activeTabs.includes(groupId) ? setActiveTabs(activeTabs.filter(tab => tab != groupId)) : setActiveTabs([...activeTabs, groupId])}>
                            {Array.isArray(fields[groupId].translate) && fields[groupId].translate.includes('label') ? __(fields[groupId].label) : fields[groupId].label}
                        </p>
                        <div className={classes.fields}>
                            {fields[groupId].fields.map(field => 
                                <div className={`${classes.field} ${field.sameLineWithLabel ? classes.sameLineWithLabel : ''}`}>
                                    <label className={classes.label} htmlFor="type">{__(field.label)}</label>
                                    {getFieldComponent(field)}
                                    {formik.errors.bannerId && formik.touched.bannerId ? (<div className={classes.validationError}>{formik.errors.bannerId}</div>) : null}  
                                </div>
                            )}
                        </div>
                    </div>  
                )}
            </div>
            <div className={classes.field}>
                
                
            </div>
        </form>
    );
}

export default SettingForm;