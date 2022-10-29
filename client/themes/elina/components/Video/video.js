import React from 'react';
import defaultClasses from "./video.module.css";
import { mergeClasses } from "Helper/classify";
import getImageUrl from "Helper/getImageUrl";

const Video = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { className, loop, controls, url, autoPlay, style } = props;

    return (
        <video style={style}
               className={`${classes.root} ${classes.className}`}
               {...props}
               controls={controls}
               autoPlay={autoPlay}
               loop={loop}
        >
            <source src={getImageUrl({ src: url })} type="video/mp4"/>
        </video>
    );
};

export default Video;