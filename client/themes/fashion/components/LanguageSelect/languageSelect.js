import React from 'react';
import defaultClasses from './languageSelect.module.css';
import { useLanguageSelect } from 'Talons/LanguageSelect/useLanguageSelect';
import { mergeClasses } from 'Helper/classify';
import Select from 'Components/Select'

const LanguageSelect  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        currentLanguage,
        handleLanguageChange,
        availableLanguages
    } = useLanguageSelect();

    const languages = availableLanguages.map(langugage => {
        return {
            'value' : langugage ? langugage.code : "",
            'label' : langugage ? langugage.nameInEnglish : ""
        }
    });

    // Don't show the switch if there is only one option
    if (!languages || languages.length < 2) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Select
                options={languages}
                onChange={(languages) => handleLanguageChange(languages)}
                defaultValue={currentLanguage}
                classes={{root: classes.languageSelect, open: classes.open}}
            />
        </div>
    );
}

export default LanguageSelect;