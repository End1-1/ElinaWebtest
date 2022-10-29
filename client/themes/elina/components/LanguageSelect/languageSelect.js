import React, { useMemo, useState, useRef } from 'react';
import defaultClasses from './languageSelect.module.css';
import { useLanguageSelect } from 'Talons/LanguageSelect/useLanguageSelect';
import { mergeClasses } from 'Helper/classify';
import IconMoon from 'Components/IconMoon';
import useOnClickOutside from 'Hooks/useOnClickOutside';

const LanguageSelect  = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const [isOpen, setIsOpen] = useState(false);
    const languageDiv = useRef();
    useOnClickOutside(languageDiv, () => { if(isOpen) setIsOpen(!isOpen) });
    const {
        currentLanguage,
        handleLanguageChange,
        availableLanguages=[]
    } = useLanguageSelect();
    const currentNameInNative = useMemo(() => {
        const current = availableLanguages.find(e=> e.code == currentLanguage);
        return current && current.nameInNative ? current.nameInNative.substring(0, 3) : null
    }, [currentLanguage, availableLanguages])

    return (
        <div className={classes.root}>
            <div className={props.isMobile ? classes.mobileBody : classes.body}>
                <div className={props.isMobile ? classes.currentLanguageMobile : classes.currentLanguage} onClick={(e) => {e.stopPropagation(); setIsOpen(!isOpen)}} >
                    <span className={props.isMobile ? classes.mobileName : classes.nameInNative}>
                        {currentNameInNative}
                    </span>
                    <div className={`${props.isMobile ? classes.downArrowMobile : classes.downArrow} ${isOpen && classes.isOpenArrow}`}>
                        <IconMoon name="arrow"/>
                    </div>
                </div>
                {
                    isOpen 
                    ?   <div ref={languageDiv} className={props.isMobile ? classes.flagsMobile : classes.flags}>
                            {availableLanguages && availableLanguages.filter(l => l != currentLanguage).map(locale =>
                                <div 
                                    className={props.isMobile ? classes.langMobile : classes.lang} 
                                    key={locale.code}
                                    onClick={(e) => { e.stopPropagation(); handleLanguageChange(locale.code); setIsOpen(false)}}
                                >
                                    {locale.nameInNative}
                                </div>
                            )} 
                        </div> 
                    : null
                }
                {props.isMobile && <span className={`${classes.border} ${isOpen && classes.borderIsOpen}`}></span>}
            </div>
        </div>
    );
}

export default LanguageSelect;