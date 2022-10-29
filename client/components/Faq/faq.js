import React from 'react';
import { useFaq } from 'Talons/Faq/useFaq';
import classes from 'Components/Faq/faq.module.css';

const Faq = (props) => {
    const { faqs, __ } = useFaq({
        ...props
    });

    return (
        <div className={classes.root}>
            <h3>{__('faq')}</h3>
            <div className={classes.faqs}>
                {faqs.map(({ id, question, answer }) => 
                    <div key={id}>
                        <p className={classes.question}>{question}</p>
                        <p className={classes.answer}>{answer}</p>
                    </div>    
                )}
            </div>
        </div>
    );
}

Faq.defaultProps = {
}

export default Faq;