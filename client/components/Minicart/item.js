import React  from 'react';
import classes from './item.module.css';
import Button from '../Button';
import Icon from '../Icon';
import Price from '../Price';
import Image from 'Components/Image';

const Item  = props => {
    const {
        item,
        handleRemoveItem
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.thumbnailWrapper}>
                {!!item.thumbnail && <Image className={classes.thumbnail} height={80} src={`${item.thumbnail}`} />}
            </div>
            <div className={classes.details}>
                <span className={classes.name}>{item.name}</span>
                <span className={classes.sku}>{item.sku}</span>
                <span className={classes.price}><Price amount={item.price} /></span>
                <span className={classes.quantity}>Qty: {item.quantity}</span>
                <Button onClick={() => handleRemoveItem(item.id)} iconOnly={true}>
                    <Icon name='trash' />
                </Button>
            </div>
        </div>
    );
}

export default Item;