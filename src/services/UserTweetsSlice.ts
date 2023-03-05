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
            result && [...result.rows.map(({ id }:any ) => ({ type: 'UserTweet', id })),'UserTweet']
        }),
        getReplies: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/tweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'Reply', id }))]
        }),

        getLikedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/likedTweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'LikedTweet', id }))]
        }),
        getSavedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/savedTweets`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'SavedTweet', id }))]
        }),

        getMedia: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/media`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'Media', id }))]
        }),
        getFeed: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/feed`,
                method: `GET`,
                params: filters
            }),
            providesTags: (result, error, arg) =>
                result &&[...result.rows.map(({id}: any) => ({type: 'Feed', id})), 'Feed']
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