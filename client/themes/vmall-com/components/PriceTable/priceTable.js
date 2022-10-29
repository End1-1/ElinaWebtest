import React from 'react';
import classes from './priceTable.css';
import Button from 'Components/Button';

const PriceTable  = props => {
    
    return (
        <div className={classes.root}>
            <h3 className={classes.heading}>Choose your plan and start today!</h3>
            <div className={classes.plans}>
                <div className={classes.plan}>
                    <div className={classes.top}>
                        Free
                    </div>
                    <div className={classes.main}>
                        <div className={classes.features}>
                            <ul>
                                <li>1 Shop</li>
                                <li>1 Warehouse</li>
                                <li>500 Tasks</li>
                            </ul>
                        </div>
                        <div className={classes.bottom}>
                            <div className={`${classes.price} ${classes.free}`}>Free</div>
                            <Button>Try for free</Button>
                        </div>
                    </div>
                    
                </div>
                <div className={classes.plan}>
                    <div className={classes.top}>
                        Starter
                    </div>
                    <div className={classes.main}>
                        <div className={classes.features}>
                            <ul>
                                <li>3 Shop</li>
                                <li>3 Warehouse</li>
                                <li>1500 Tasks</li>
                            </ul>
                        </div>
                        <div className={classes.bottom}>
                        <div className={classes.price}>100$/m</div>
                            <Button>Sign Up</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.plan}>
                    <div className={classes.top}>
                        Starter
                    </div>
                    <div className={classes.main}>
                        <div className={classes.features}>
                            <ul>
                                <li>3 Shop</li>
                                <li>3 Warehouse</li>
                                <li>1500 Tasks</li>
                            </ul>
                        </div>
                        <div className={classes.bottom}>
                        <div className={classes.price}>100$/m</div>
                            <Button>Sign Up</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.plan}>
                    <div className={classes.top}>
                        Interprise
                    </div>
                    <div className={classes.main}>
                        <div className={classes.features}>
                            Custom Offer
                        </div>
                        <div className={classes.bottom}>
                        <div className={classes.price}>100$/m</div>
                            <Button>Contact Us</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriceTable;