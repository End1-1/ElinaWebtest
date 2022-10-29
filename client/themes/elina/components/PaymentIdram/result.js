import React from 'react';
import { withRouter } from 'react-router';
import defaultClasses from './result.css';
import { mergeClasses } from 'Helper/classify';

const Result = props => {
    const { result, message } = props.location.state.ameriaIpn;
    const classes = mergeClasses(defaultClasses, props.classes);

    let content = '';

    if (result == 'success') {
        content = <h2 className={classes.success}>Thanks for your order</h2>;
    } else {
        content = (
            <div>
                <p>There has been an error</p>
                <p>{message}</p>
            </div>
        );
    }
    
    return (
        <div className={classes.root}>
            {content}
        </div>
    );
}

export default withRouter(Result);