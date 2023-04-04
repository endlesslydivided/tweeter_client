import {apiSlice} from "./ApiSlice";


export const userTweetsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({      
        getUserTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/tweets`,
                method: `GET`,
                params: filters
            })
        }),
        
        
        getTweetsAndReplies: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/tweets-replies`,
                method: `GET`,
                params: filters
            })
        }),

        getLikedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/likedTweets`,
                method: `GET`,
                params: filters
            })
        }),
        getSavedTweets: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/savedTweets`,
                method: `GET`,
                params: filters
            })
        }),

        getFavoriteMessages: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/favorite-messages`,
                method: `GET`,
                params: filters
            })
        }),


        getMedia: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/media`,
                method: `GET`,
                params: filters
            })
        }),
        getDialogs:builder.query({
            query: ({id,filters}) => ({
                url: `/users/${id}/dialogs`,
                method: 'GET',
                params: filters
            })
        }),
        getFeed: builder.query({
            query: ({id, filters}) => ({
                url: `/users/${id}/feed`,
                method: `GET`,
                params: filters
            })
        })
    })
})


export const {
    useGetUserTweetsQuery,
    useGetTweetsAndRepliesQuery,
    useGetLikedTweetsQuery,
    useGetSavedTweetsQuery,
    useGetMediaQuery,
    useGetFeedQuery,
    useGetDialogsQuery,
    useGetFavoriteMessagesQuery
} = userTweetsSlice;