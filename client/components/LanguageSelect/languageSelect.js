import React from 'react';
import defaultClasses from 'Components/LanguageSelect/languageSelect.module.css';
import { useLanguageSelect } from 'Talons/LanguageSelect/useLanguageSelect';
import { mergeClasses } from 'Helper/classify';

const LanguageSelect  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        currentLanguage,
        handleLanguageChange,
        availableLanguages
    } = useLanguageSelect();

    // Don't render anything if there is not choice
    if (!availableLanguages || !Array.isArray(availableLanguages) || availableLanguages.length >! 1) {
        return null;
    }

    return (
        <div className={classes.root}>
            {availableLanguages.filter(l => l != currentLanguage).map(locale =>
                <span onClick={() => handleLanguageChange(locale.code)} className={classes.flag} key={locale.code}>
                    <img src={`${IMAGE_BASE_URL}flag/${locale.code}.svg`} />
                </span>    
            )}
        </div>
    );
}

export default LanguageSelect;