import React from 'react';
import loading from './loading.gif';

const Loading  = ({ width = 20 }) => {
    return (
        <img width={width} src={loading} />
    );
}

export default Loading;