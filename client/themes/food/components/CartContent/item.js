import React from 'react';
import defaultClasses from './item.module.css';
import {mergeClasses} from 'Helper/classify';
import Price from 'Components/Price';
import Button from 'Components/Button';
import ProductQuantity from 'Components/ProductQuantity';
import Image from 'Components/Image';
import useWindowSize from "../../../../hooks/useWindowSize";
import StarRatings from "react-star-ratings";

const Item = props => {
    const {item, handleRemoveItem, handleChangeItemQuantity, __} = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const {width} = useWindowSize()

    if(width<=768){
        return (
            <div key={item.id} className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.left}>
                        <div className={classes.leftContent}>
                            <div className={classes.top}>
                                {!!item.thumbnail && <Image className={classes.thumbnail} src={`${item.thumbnail}`} />}
                            </div>
                            <div className={classes.bottom}>
                                <div className={classes.price}>
                                    <Price amount={item.price}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightContent}>
                        <span className={classes.name}>{item.name}</span>
                        <div className={classes.starRatting}>
                            <StarRatings
                                rating={item.rating}
                                starRatedColor="#FFB800"
                                starDimension="16px"
                                starSpacing="3px"
                                numberOfStars={5}
                                name='rating'
                                isSelectable={false}
                            />
                        </div>
                        <div className={classes.sku}>
                            <span>SKU: {item.sku}</span>
                        </div>
                        <div className={classes.buttons}>
                            <div className={classes.quantity}>
                                <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} classes={{root:classes.quantityRoot}} />
                            </div>
                            <div>
                                <Button onClick={() => handleRemoveItem(item)} classes={{button:classes.button}}>
                                    {__('cart.remove.item.button.text')}
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div key={item.id} className={classes.root}>
            <div className={classes.content}>
                <div className={classes.left}>
                <div className={classes.leftContent}>
                    <div className={classes.top}>
                        {!!item.thumbnail && <Image className={classes.thumbnail} src={`${item.thumbnail}`} />}
                    </div>
                    <div className={classes.bottom}>
                        <div className={classes.quantity}>
                            <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} classes={{root:classes.quantityRoot}} />
                        </div>
                        <div>
                            <Button onClick={() => handleRemoveItem(item)} classes={{button:classes.button}}>
                                {__('cart.remove.item.button.text')}
                            </Button>
                        </div>
                    </div>
                </div>
                </div>
                <div className={classes.rightContent}>
                    <span className={classes.name}>{item.name}</span>
                    <div className={classes.starRatting}>
                        <StarRatings
                            rating={item.rating}
                            starRatedColor="#FFB800"
                            starDimension="16px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                            isSelectable={false}
                        />
                    </div>
                    <div className={classes.price}>
                        <Price amount={item.price}/>
                    </div>
                    {/*<div className={classes.description}>*/}
                    {/*        <span>Beef cutlet, tomato, cheddar cheese, Iceberg lettuce, caesar sauce</span>*/}
                    {/*</div>*/}
                    <div className={classes.sku}>
                        <span>SKU: {item.sku}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;


{/*<td>*/
}
{/*    {!!item.thumbnail && <Image className={classes.thumbnail} width={200} src={`${item.thumbnail}`} />}*/
}
{/*</td>*/
}
{/*<td>{item.name}</td>*/
}
{/*<td><Price amount={item.price} /></td>*/
}
{/*<td>*/
}
{/*    <ProductQuantity initialValue={item.quantity} maxQuantity={1000} onValueChange={(qty) => handleChangeItemQuantity(item, qty)} />*/
}
{/*</td>*/
}
{/*<td>*/
}
{/*    <Button onClick={() => handleRemoveItem(item)}>*/
}
{/*        {__('cart.remove.item.button.text')}*/
}
{/*    </Button>*/
}
{/*</td>*/
}