import React from 'react';
import { usePostContent } from '../../talons/PostContent/usePostContent';
import defaultClasses from './postContent.module.css';
import { mergeClasses } from 'Helper/classify';

const Post = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { post } = props;
    
    const {
        __
    } = usePostContent();

    return (
        <div className={classes.root}>
            <div className={classes.titleField}>
                <h1 className={classes.title}>{post.title}</h1>
            </div>
            <div className={classes.content}>
                <div dangerouslySetInnerHTML={{__html: post.postContent}}></div>
            </div>
            {post.tags && !!post.tags.length && <div className={classes.tags}>
                {__('tags')} {post.tags.map(tag => <span>{tag}</span>)}
            </div>}
            <div className={classes.authorField}>
                {
                    post.author ?
                        <div>
                            <span>{__('author')}</span>
                            <span className={classes.author}>{`${post.author.firstName} ${post.author.lastName}`}</span> 
                        </div>
                    :   null
                }
            </div>
           
        </div>
    )
}

export default Post;