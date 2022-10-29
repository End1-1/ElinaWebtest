import { gql } from "@apollo/client";
import getApolloClient from 'Apollo/apolloClient';
import { useEffect, useState } from "react";
import get from 'lodash/get';
import { useSelector } from "react-redux";
import { useTranslations } from 'Talons/App/useTranslations';


export const useBlogPostsWidget = (props) => {
    const { count, createdAt, filterType } = props;
    const state = useSelector(state => state);
    const [posts, setPosts] = useState([]);
    const apolloClient = getApolloClient(state);
    const { __ } = useTranslations();

    useEffect(() => {
        async function fetchPosts() {
            const GET_POSTS = gql`
                query posts($count: Float, $filterType: String) {
                    posts(count: $count, filterType: $filterType) {
                        items {
                            id
                            shopIds
                            title
                            image
                            content
                            tags
                            urlKey
                            metaDescription
                            author {
                                email
                                firstName
                                lastName
                            }
                            createdAt
                        }
                    }
                }
            `;
            const { data } = await apolloClient.query({
                query: GET_POSTS,
                variables: {
                    count,
                    filterType
                },
                fetchPolicy: "no-cache"
            });
            const items = get(data, ['posts', 'items'], []);
            setPosts(items);
        };
        fetchPosts();
    }, [count, createdAt, filterType]);

    return {
        posts,
        __
    }
}