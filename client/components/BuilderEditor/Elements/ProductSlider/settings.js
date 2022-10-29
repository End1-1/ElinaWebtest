import React from 'react';
import { useSettings } from '../../../../talons/Builder/Elements/ProductSlider/useSettings';
import { useCategoryList } from '../../../../talons/Builder/Elements/CategoryList/useCategoryList';
import classes from './settings.css';
import TextInput from '../../../TextInput';
import Message from '../../../Message';
import Button from '../../../Button';
import Select from '../../../Select';

const Settings = (props) => {
    const { onDone, onClose, initialValues, handleSubmit, item } = props;
    const { 
        formik,
        isSubmitting,
        message,
        __
    } = useSettings({
        item,
        handleSubmit
    });

    const {
        isFetched: isFetchedCategories,
        categoryDropdownOptions
    } = useCategoryList();

    if (!isFetchedCategories) {
        return null;
    }

    return (
        <div>
            <div>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <div className={classes.field}>
                        <label htmlFor="count">{__('Count')}</label>
                        <TextInput type="number" 
                            name="count"
                            placeholder={__('Count')}
                            className={classes.input} 
                            value={formik.values.count}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.count && formik.touched.count ? (<div className={classes.validationError}>{formik.errors.count}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <label htmlFor="count">{__('Visible Items')}</label>
                        <TextInput type="number" 
                            name="visibleItems"
                            placeholder={__('Visible Items')}
                            className={classes.input} 
                            value={formik.values.visibleItems}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.visibleItems && formik.touched.visibleItems ? (<div className={classes.validationError}>{formik.errors.visibleItems}</div>) : null}
                    </div>
                    <div className={classes.field}>
                        <label htmlFor="type">{__('Type')}</label>
                        <Select
                            placeholder={__('Type')}
                            fluid
                            selection
                            name={'type'} 
                            defaultValue={formik.values.type}
                            options={[{ value: 'bestsellers', label: 'Bestsellers' }, { value: 'category', label: 'Category' }]}
                            onChange={(value) => formik.setFieldValue('type', value)} 
                        />
                        {formik.errors.rootCategoryId && formik.touched.rootCategoryId ? (<div className={classes.validationError}>{formik.errors.rootCategoryId}</div>) : null}
                    </div>
                    {formik.values.type == 'category' && <div className={classes.field}>
                        <label htmlFor="categoryId">{__('Type')}</label>
                        <Select
                            placeholder={__('Category')}
                            fluid
                            selection
                            name={'categoryId'} 
                            defaultValue={formik.values.categoryId}
                            options={categoryDropdownOptions}
                            onChange={(value) => formik.setFieldValue('categoryId', value)} 
                        />
                        {formik.errors.rootCategoryId && formik.touched.rootCategoryId ? (<div className={classes.validationError}>{formik.errors.rootCategoryId}</div>) : null}
                    </div>}
                </form>
                {message.type == 'error' &&
                    <Message negative>{message.text}</Message>
                }
                {message.type == 'success' &&
                    <Message color='green'>{message.text}</Message>
                }
            </div>
            <div>
                <Button color='black' onClick={onClose}>
                    {__('Cancel')}
                </Button>
                <Button
                    content={__('Submit')}
                    onClick={formik.handleSubmit}
                    loading={isSubmitting}
                    type={'submit'}
                >Save</Button>
            </div>
        </div>
    );
}

export default Settings;