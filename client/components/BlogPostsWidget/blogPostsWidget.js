import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import React from 'react';
import { useBlogPostsWidget } from '../../talons/BlogPostsWidget/useBlogPostsWidget';
import PostItem from '../PostList/postItem';
import defaultClasses from './blogPostsWidget.css';
import { mergeClasses } from 'Helper/classify';

const BlogPostsWidget = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { count, filterType, visibleItems, heading = "latest.posts" } = props;
    const { 
        posts = [],
        __
    } = useBlogPostsWidget({ count, filterType });

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <h2>{__(heading)}</h2>
            </div>
            <CarouselProvider 
                naturalSlideWidth={400} 
                naturalSlideHeight={250}
                totalSlides={posts.length} 
                visibleSlides={visibleItems}
                infinite={true}
            >
                <Slider >
                {posts.map((item, index) =>
                    <Slide index={index} key={item.id}>
                       <PostItem item={item} __={__} />
                    </Slide>
                )}
                </Slider>
            </CarouselProvider>
        </div>
    )
}

BlogPostsWidget.defaultProps = {
    visibleItems: 2
}

export default BlogPostsWidget;