import React, { useState, useCallback, useEffect } from 'react';
import defaultClasses from './textInput.module.css';
import { mergeClasses } from 'Helper/classify';
import { string } from 'prop-types';
import Select from '../Select';
import { useLanguageSelect } from 'Talons/LanguageSelect/useLanguageSelect';

const TextInput  = props => {
    const { label, value, multilanguage, onChange, onLanguageChange } = props;
    const {
        currentLanguage,
        availableLanguagesForAccount
    } = useLanguageSelect();
    const [language, setLanguage] = useState(currentLanguage);

    const handleChange = useCallback((e) => {
        if (multilanguage) {
            onChange(language, e.target.value);
        } else {
            onChange(e);
        }
    }, [onChange, language]);

    useEffect(() => {
        if (onLanguageChange) {
            onLanguageChange(language);
        }
    }, [language]);

    const classes = mergeClasses(defaultClasses, props.classes);

    // If multilanguage, we will show the languages of the whole account, not just for this shop, so that we don't loose the others
    return (
        <div className={`${classes.root} ${label ? classes.inFloatLabel : ''}`}>
            <input {...props} value={multilanguage ? (value && value[language] ? value[language] : '') : (value || '')} onChange={handleChange} className={classes.input} />
            { label && <label className={classes.floatLabel}>{label}</label> }
            {multilanguage && <Select
                options={availableLanguagesForAccount.map(lang => ({ label: lang.code.split('_')[0], value: lang.code, value: lang.code }))}
                onChange={(value) => setLanguage(value)}
                defaultValue={language}
            />}
        </div>
    );
}

TextInput.propTypes = {
    label: string,
}

export default TextInput;