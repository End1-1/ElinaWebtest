import { gql } from "@apollo/client"
import { useCallback, useEffect, useState } from "react"
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from "react-redux";


export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const { enabledNativeApps } = useSelector(state => state.app);
    const state = useSelector(state => state);
    const isModuleEnabled = enabledNativeApps.includes('testimonial');
    const apolloClient = getApolloClient(state);

    const fetchTestimonials = useCallback(async () => {
        const GET_TESTIMONIALS = gql`
            query testimonials {
                testimonials {
                    items {
                        firstName
                        lastName
                        country
                        rating
                        role
                        id
                        shopIds
                        authorImage
                        review
                    }
                }
            }
        `
        const { data } = await apolloClient.query({
            query: GET_TESTIMONIALS
        })
        if(data && data.testimonials && data.testimonials.items) {
            setTestimonials(data.testimonials.items);
        }
    })

    useEffect(() => {
        if (isModuleEnabled) {
            fetchTestimonials()
        }
    }, [isModuleEnabled])

    return {
        testimonials,
        isModuleEnabled
    }
}