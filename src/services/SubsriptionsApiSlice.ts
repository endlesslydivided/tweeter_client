import {logOut, setCredentials} from "../store/slices/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const subscriptionsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserSubscriptions:builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/subscriptions`,
                method: 'GET',
                params: filters
            }),
        }),
        getUserFollowers:builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/followers`,
                method: 'GET',
                params: filters
            }),
        }),
        createSubsription: builder.mutation({
            query: (subscription) => ({
                url: '/subscriptions',
                method: 'POST',
                body:subscription
            }),
        }),
        deleteSubsription: builder.mutation({
            query: (subscription) => ({
                url: `/subscriptions`,
                method: 'DELETE',
                body:subscription
            }),
        }),
        
    })
})


export const {
    useCreateSubsriptionMutation,
    useDeleteSubsriptionMutation,
    useGetUserSubscriptionsQuery,
    useGetUserFollowersQuery
} = subscriptionsSlice;