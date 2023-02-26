import {apiSlice} from "./ApiSlice";


export const userTweetsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({      
        getUserTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/tweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'UserTweet' as const, id }))]
        }),
        getReplies: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/tweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'Reply' as const, id }))]
        }),

        getLikedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/likedTweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'LikedTweet' as const, id }))]
        }),
        getSavedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/savedTweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'SavedTweet' as const, id }))]
        }),

        getMedia: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/media`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'Media' as const, id }))]
        }),
        getFeed: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/feed`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
                result &&[...result.rows.map(({id}: any) => ({type: 'Feed' as const, id})), 'Feed']
        }),
    })
})


export const {
    useGetUserTweetsQuery,
    useGetRepliesQuery,
    useGetLikedTweetsQuery,
    useGetSavedTweetsQuery,
    useGetMediaQuery,
    useGetFeedQuery

} = userTweetsSlice;