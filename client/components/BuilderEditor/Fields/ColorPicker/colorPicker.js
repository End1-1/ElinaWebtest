import React, { useState } from 'react';
import classes from './colorPicker.module.css';
import ContentEditable from 'react-contenteditable'
import { SketchPicker } from 'react-color';

const ColorPicker  = props => {
    const { value, onChange } = props;
    const [isPickerShown, setIsPickerShown] = useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.colorThumb} 
                style={ { backgroundColor: value } }
                onClick={() => setIsPickerShown(!isPickerShown)}
            >
                <div className={classes.pickerWrapper}>
                    {isPickerShown && <SketchPicker
                        color={value}
                        onChange={ (color) => onChange(color.hex) }
                    />}
                </div>
            </div>
            <ContentEditable 
                onChange={(e) => onChange(e.target.value)}
                html={value}
            />
        </div>
    );
}

export default ColorPicker;