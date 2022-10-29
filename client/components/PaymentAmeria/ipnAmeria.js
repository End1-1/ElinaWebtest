import React, { useCallback, useEffect } from 'react';
import Button from '../Button';
import { withRouter, Redirect } from 'react-router';
import queryString from 'query-string';
import { useLazyQuery } from '@apollo/react-hooks';
import AMERIA_IPN from '../../queries/ameriaIpn.graphql';
import defaultClasses from './ipnAmeria.css';
import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

const IpnAmeria = props => {
    const { history } = props;  
    const classes = mergeClasses(defaultClasses, props.classes);

    const [runQuery, { called, loading, data }] = useLazyQuery(AMERIA_IPN, {
        fetchPolicy: 'no-cache'
    });

    // fetch categories
    useEffect(() => {
        runQuery({ variables: {
            orderID: window.ameriaIpnOrderId,
            paymentid: window.ameriaPaymentid
        } });
    }, [runQuery]);

    console.log('data', data);
    let content = '';
    if (called && loading) content = <LoadingIndicator />;

    if (data) {
        console.log('redirect');
        return <Redirect
            to={{
                pathname: "/ameria/result",
                state: data
            }}
        />
    }
    
    return (
        <div className={classes.root}>
            {content}
        </div>
    );
}

export default withRouter(IpnAmeria);