import React, { useEffect } from 'react';
import classes from './postListPage.module.css';
import Card from 'Components/Card';
import Head from '../Head';
import PostList from '../PostList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/actions/post';

const PostListPage = () => {
    const items = useSelector((state) => state.post.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
    }, [fetchPosts]);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>BLOG PAGE</h1>
            <Head>
                <title>{'Post'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.body}>
                <div>
                    <Card>
                        <PostList items={items}/>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default {
    component: PostListPage,
    loadData: (store, req) => {
        store.dispatch(fetchPosts())
    }
};