import {apiSlice} from "./ApiSlice";


export const tweetActionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({      
        likeTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/likedTweets/${tweetId}`,
                    method: 'POST',
                    credentials: 'include',
                })
        }),
        saveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'POST',
                    credentials: 'include',
                })
        }),
        unlikeTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/likedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                })
        }),
        unsaveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                })
        })
    })
})


export const {
    useLikeTweetMutation,
    useSaveTweetMutation,
    useUnlikeTweetMutation,
    useUnsaveTweetMutation,

} = tweetActionsApiSlice;