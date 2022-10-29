import React from 'react';
import Link from 'Components/Link';
import classes from './postItem.css';
import Button from 'Components/Button';
import Image from 'Components/Image';

const PostItem = (props) => {
    const { item, __ } = props;

    return (
        <div className={classes.root}>
            <div className={classes.createdAtField}>
                <span>{new Date(item.createdAt).toUTCString()}</span>
            </div>
            <div className={classes.imageField}>
                <Link className={classes.title} to={`/${item.urlKey}`}>
                    <Image src={item.image} className={classes.image} />
                </Link>
            </div>
            <div className={classes.titleFiled}>
                <Link className={classes.title} to={`/${item.urlKey}`}>
                    <h1>
                        {item.title}
                    </h1>
                </Link>
            </div>
            <div className={classes.content}>
                <div dangerouslySetInnerHTML={{__html: item.content}}></div>
            </div>
            <div className={classes.button}>
                <Link className={classes.title} to={`/${item.urlKey}`}>
                    <Button>{__('read.more')}</Button>
                </Link>
            </div>
        </div>
    )

}

export default PostItem;