import React from 'react';
import { usePostList } from '../../talons/PostList/usePostList';
import classes from './postList.css';
import PostItem from './postItem';

const PostList = (props) => {
    const { items } = props;

    const { __ } = usePostList();

    return (
        <div className={classes.root}>
            {
                items.map((post) => (
                    <PostItem  key={post.id} item={post} __={__} />
                ))
            }
        </div>
    )
}

export default PostList;