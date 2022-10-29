import React, { Fragment, useMemo } from 'react';
import { useConfig } from 'Talons/App/useConfig';

const YandexMetrica = props => {
    const { getConfigValue } = useConfig();

    const tagId = useMemo(() => {
        return getConfigValue('yandexMetricaTagId');
    }, []);

    // Don't pring anything is google analytics is not enabled and configured
    if (getConfigValue('yandexMetricaEnabled') != 'yes' || !tagId) {
        return null;
    }

    const pixelCode = `
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
        ym(${tagId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
        });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/${tagId}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->
    `;

    return (
        <Fragment>
            <div dangerouslySetInnerHTML={{ __html: pixelCode }} />
        </Fragment>
    );
}

export default YandexMetrica;