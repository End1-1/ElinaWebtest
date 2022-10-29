import React, { useState } from 'react';
import classes from './languageSelect.module.css';
import { useLanguageSelect } from 'Talons/LanguageSelect/useLanguageSelect';


const LanguageSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        currentLanguage,
        handleLanguageChange,
        availableLanguages
    } = useLanguageSelect();
    const currentLan = availableLanguages && availableLanguages.find(language => language.code === currentLanguage);
 
    return (
        <div
            className={classes.root}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={classes.mainDiv}>
                <img src={`${IMAGE_BASE_URL}flag/${currentLan.code}.svg`} />
                <span>{currentLan && currentLan.nameInEnglish && currentLan.nameInEnglish.toUpperCase()}</span>
                <span className={classes.arrow}> </span>
            </div>
            <div 
                className={isOpen ? classes.customOptionsOpen : classes.customOptionsHidden}
            >
                {availableLanguages && availableLanguages.length > 1 && availableLanguages.map((language, index) => {
                    return (
                        <div className={language.code === currentLanguage ? classes.selectedOption : classes.option} key={index} onClick={() => handleLanguageChange(language.code)}>
                            <img src={`${IMAGE_BASE_URL}flag/${language.code}.svg`} />
                            <span>{language.nameInEnglish.toUpperCase()}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
    
}

export default LanguageSelect;