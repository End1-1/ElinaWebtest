import { useParams } from "react-router-dom"
import { gql } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import get from 'lodash/get'
import getApolloClient from 'Apollo/apolloClient';

export const usePost = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const apolloClient = getApolloClient();
    const postId = useMemo(() => {
        return params.id
    }, [])
    
    const fetchPost = useCallback(async () => {
        const GET_POST_BY_ID = gql`
            query getPost($postId: String!) {
                getPost(postId: $postId) {
                    title
                    content
                    image
                    createdAt
                    tags
                    author {
                        email
                        firstName
                        lastName
                    }
                }
            }
        `
        const { data } = await apolloClient.query(
            {
                query: GET_POST_BY_ID,
                variables: {
                    postId
                },
                fetchPolicy: "no-cache"
            })
        setPost(get(data, 'getPost', {}));
    }, [postId, apolloClient])
    useEffect(() => {
        fetchPost()
    }, [])

    return {
        post    
    }
}