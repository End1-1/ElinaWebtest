import React from 'react';
import classes from 'Components/ProductAttributes/productAttributes.module.css';

const ProductAttributes  = props => {
    const { product } = props;

    if (!product || !product.attributes) {
        return null;
    }

    return (
        <div className={classes.root}>
            <h3>Attributes</h3>
            <table>
                <tbody>
                    {product && product.attributes && product.attributes.map(({ attributeId, label, value }) =>
                        <tr className={classes.attribute} key={attributeId}>
                            <td>{label}</td>
                            <td>{value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductAttributes;