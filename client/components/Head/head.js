import React from 'react';
import { Helmet } from 'react-helmet';
import { useConfig } from 'Talons/App/useConfig';
import getImageUrl from 'Helper/getImageUrl';
import { useSelector } from "react-redux";

const Head  = props => {
    const { getConfigValue } = useConfig();
    const { accountId } = useSelector(state => state.shop);
    
    return (
        <Helmet>
            {!!getConfigValue('favicon') && 
                <link rel="icon" type="image/png" href={`${getImageUrl({ src: getConfigValue('favicon'), accountId })}`} />
            }
            {props.children}
        </Helmet>
    );
}

export default Head;