import React  from 'react';
import classes from './item.module.css';
import Button from 'Components/Button';
import Icon from 'Components/Icon';
import Price from 'Components/Price';
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
                <div className={classes.removeIcon}>
                    <Button onClick={() => handleRemoveItem(item.id)} iconOnly={true}>
                        <Icon size={'7px'} name='close' />
                    </Button>
                </div>
                <span className={classes.name}>{item.name}</span>
                <div>
                    <span className={classes.price}><Price amount={item.price} /></span>
                    <span className={classes.quantity}>Qty: {item.quantity}</span>
                </div>
            </div>
        </div>
    );
}

export default Item;