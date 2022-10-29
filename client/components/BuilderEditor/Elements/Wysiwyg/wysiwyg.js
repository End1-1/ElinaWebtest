import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import JoditEditor from "jodit-react";
import { useSelector } from 'react-redux';
import classes from './wysiwyg.module.css';
import { useConfig } from 'Talons/App/useConfig';


const Wysiwyg  = props => {
    const { onChange, value, multiLanguage, onLanguageChange } = props;
    const editor = useRef(null);
    const { getConfigValue } = useConfig();
    const defaultLanguage = getConfigValue('defaultLanguage') || "en_US";
    const availableLanguages = getConfigValue("availableLanguages") || [];
    const [language, setLanguage] = useState(defaultLanguage);

    const handleChange = useCallback((value) => {
        if (multiLanguage) {
            onChange(language, value);
        } else {
            onChange(value);
        }
    }, [onChange, language]);

    useEffect(() => {
        if (onLanguageChange) {
            onLanguageChange(language);
        }
    }, [language]);

    // This is just to trigger rerender
	const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/,
            toolbarButtonSize: 'small'
        }
    });
	
    const editorComponent = useMemo( () => ( 
        <JoditEditor 
            ref={editor} 
            value={multiLanguage && value ? value[language] : value}
            config={config} 
            onChange={content => handleChange(content)} 
        /> 
      ), [language] );
    return (
        <div>
            {editorComponent}
            {multiLanguage && <div>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    {availableLanguages.map(lang => 
                        <option key={lang.code} value={lang.code}>{lang.code}</option>
                    )}
                </select>
            </div>}
        </div>
    );
}

export default Wysiwyg;