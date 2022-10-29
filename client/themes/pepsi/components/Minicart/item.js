import React  from 'react';
import classes from './item.module.css';
import Icon from 'Components/Icon';
import Price from 'Components/Price';

const Item  = props => {
    const {
        item,
        handleRemoveItem
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.thumbnailWrapper}>
                {!!item.thumbnail && <img className={classes.thumbnail} src={`${IMAGE_BASE_URL}product/${item.thumbnail}`} />}
            </div>
            <div className={classes.details}>
                <span className={classes.name}>{item.name}</span>
                <span className={classes.quantity}>x{item.quantity}</span>
                <span className={classes.price}><Price amount={item.price} /></span>
                <span classname={classes.close} onClick={() => handleRemoveItem(item.id)} iconOnly={true}>
                    <Icon name='close' />
                </span>
            </div>
        </div>
    );
}

export default Item;