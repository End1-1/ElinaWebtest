import React from 'react';
import defaultClasses from './footerBlock.module.css';
import { mergeClasses } from 'Helper/classify';
import Link from "Components/Link";

const FooterBlock = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { title, items } = props;

    return (
        <div className={classes.root}>
            <div className={classes.titleField}>
                <h3 className={classes.title}>{title}</h3>
            </div>
            <div className={classes.items}>
                {
                    items.map((e,i)=> (
                        <div className={classes.item}>
                            <Link classes={{link: classes.link}} to={e.link}>
                                <span className={classes.itemName}>
                                    {e.name}
                                </span>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default FooterBlock;