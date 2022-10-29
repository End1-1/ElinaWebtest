import React from 'react';
import PostContent from 'Components/PostContent';

const PostPage = (props) => {
    const { post } = props;
    
    return (
        <PostContent post={post}/>
    )
}

export default PostPage;