import React, {Fragment, useState} from 'react';
import {useFaq} from 'Talons/Faq/useFaq';
import classes from './faq.module.css';
import Banner from 'Components/Banner';
import Breadcrumbs from 'Components/Breadcrumbs';
import useWindowSize from "../../../../hooks/useWindowSize";

const Faq = (props) => {
    const {faqs, __, breadcrumbs} = useFaq({
        ...props
    });
    const {width} = useWindowSize()
    const [activeTabs, setActiveTab] = useState([0])

    return (
        <div className={classes.root}>
            <div className={classes.bannerField}>
                <Banner id="60a25b1f8149a8c22d6cc7b3" classes={{root: classes.bannerRoot, content: classes.content}}/>
            </div>
            {width > 768 && <div className={classes.breadcrumbs}>
                <Breadcrumbs
                    crumbs={breadcrumbs}
                    classes={{
                        label: classes.breadcrumbsLabel,
                        root: classes.breadcrumbsRoot,
                        crumb: classes.crumb,
                        link: classes.crumbLink
                    }}
                />
            </div>}
            {width > 768 && <h3 className={classes.title}>{__('faq')}</h3>}
            <div className={classes.faqs}>
                {faqs.map(({id, question, answer}, index) =>
                    <div key={id} className={classes.accordion}>
                        <div className={classes.accordionLineTop}>
                        </div>
                        <div className={classes.accordionContent}>
                            <p className={classes.question}>{question}</p>
                            <div className={classes.iconField} onClick={!activeTabs.some(item => item === index)
                                ?
                                () => setActiveTab([...activeTabs, index])
                                :
                                () => setActiveTab(activeTabs.filter(item => item !==index))
                            }>
                                <span className={classes.closeIcon}>
                                </span>
                                {!activeTabs.some(item => item === index) && <span className={classes.openIcon}>
                                  </span>}
                            </div>
                        </div>
                        {activeTabs.some(item => item === index) ? <p className={classes.answer}>{answer}</p>:
                            <div className={classes.accordionLineBottom}>
                        </div>}
                    </div>
                )}
            </div>
        </div>
    );
}

Faq.defaultProps = {
}

export default Faq;