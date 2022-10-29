import React, { useCallback, useEffect } from 'react';
import Button from '../Button';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { useLazyQuery } from '@apollo/react-hooks';
import AMERIA_IPN from '../../queries/ameriaIpn.graphql';
import defaultClasses from './result.css';
import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

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