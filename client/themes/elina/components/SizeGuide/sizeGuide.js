import React, { useMemo } from 'react';
import classes from './sizeGuide.module.css';
import { useTranslations } from 'Talons/App/useTranslations';
import Link from 'Components/Link';
import Guide from './guide.jpg';
import orderBy from 'lodash/orderBy';

const SizeGuide = ({ data }) => {
    const { __ } = useTranslations();

    const filteredData = useMemo(() => {
        let obj;
        let arr = [];
        let values;
        data.attributes.map((attribute, index) => {
            if(index === 0) {
                return;
            }
            values = [];
            attribute.selectedOptions.map(option => {
                values = [];
                data.data.map(item => {
                    item.attributes.map(attribute => {
                        if(attribute.optionId === option.id) {
                            obj = {name: option.name}
                            values.push(item.value);
                        }
                    })
                })
                obj= {...obj, values}
                arr.push(obj);
            })
        });
        return arr;
    }, [data]);

    return (
        <div className={classes.root}>
            <p className={classes.caption}>{__("size.chart")}</p>
            <p className={classes.headerText}>Եթե Դուք երբևէ ձեռք եք բերել մեր ֆիրմային հագուստներից,խորհուրդ ենք տալիս չափսը որոշելու համար ուղղորդվել պիտակի վրայի նշված չափսով:</p>
            <table className={classes.table}>
                <tr>
                <th></th>
                {
                    data.attributes.length ?
                    data.attributes[0].selectedOptions.map((item, index) => {
                        return (
                        <th key={index}>{item.name}</th>
                        )
                    })
                    :
                    null
                }
                </tr>
                {orderBy(filteredData, "name", "asc").map((item, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{item.name}</th>
                            {item.values.map(value => <td>{value}</td>)}
                        </tr>
                    )
                })}
            </table>
            <p className={classes.message}>{__("size.chart.info")}</p>
            <div className={classes.footer}>
                <h3 className={classes.title}>ԳՏԵՔ ՁԵՐ ՉԱՓՍԸ</h3>
                <p>Չափսերը որոշելու համար պետք է օգտվել սանտիմետրային ժապավենից,իսկ անհրաժեշտության դեպքում կարելի է դիմել մեկ ուրիշի օգնությանը։</p>
                <img src={Guide}/>
                <h3 className={classes.title}>1. ԿՈՒՐԾՔ</h3>
                <p>Կրծքի շրջագիծը չափելու համար սանտիմետրաժապավենը անցկացնել թևատակերով,կրծքի բարձր կետերի ուղղությամբ։</p>
                <h3 className={classes.title}>2. ԳՈՏԿԱՏԵՂ</h3>
                <p>Գոտկատեղի շրջագիծը չափելու համար սանտիմետրաժապավենը անցկացնել գոտկատեղի շուրջ։</p>
                <h3 className={classes.title}>3. ԿՈՆՔ</h3>
                <p>Կոնքի շրջագիծը չափելու համար սանտիմետրաժապավենը անցկացնել կոնքի շուրջ։</p>
                <h3 className={classes.title}>ԱՌԱՔՈՒՄ և ՎԵՐԱԴԱՐՁ</h3>
                <p>Կայքի միջոցով գնված ցանկացած ապրանք ենթակա է վերադարձի՝ պատվերը ստանալուց 14 օրվա ընթացքում խանութ-սրահում: Լրացուցիչ տեղեկություններ կարող եք գտնել 
                    <Link to="/delivery" classes={{link: classes.delivery}}>ԱՌԱՔՈՒՄ և ՎԵՐԱԴԱՐՁ</Link>
                բաժնում:</p>
            </div>
        </div>
    );
};

export default SizeGuide;