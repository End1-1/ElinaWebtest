import React, { Fragment } from 'react';
import { useConfig } from 'Talons/App/useConfig';

const GoogleAnalytics  = props => {
    const { getConfigValue } = useConfig();

    // Don't pring anything is google analytics is not enabled and configured
    if (!getConfigValue('gaEnabled') || !getConfigValue('gaMeasurementId')) {
        return null;
    }

    const injectGA = () => {
        if (typeof window == 'undefined') {
          return;
        }
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
      
        gtag('config', getConfigValue('gaMeasurementId'));
    };
    
    return (
        <Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${getConfigValue('gaMeasurementId')}`}></script>
            <script>{injectGA()}</script>
        </Fragment>
    );
}

export default GoogleAnalytics;