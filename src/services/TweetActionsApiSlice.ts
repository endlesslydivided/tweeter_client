import {apiSlice} from "./ApiSlice";


export const tweetActionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({      
        likeTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/likedTweets/${tweetId}`,
                    method: 'POST',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'LikedTweet', id: arg.tweetId},
                {type: 'UserTweet', id: arg.tweetId},
                {type: 'Reply', id: arg.tweetId},
                {type: 'Comment', id: arg.tweetId},
                {type: 'SavedTweet', id: arg.tweetId},]
        }),
        saveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'POST',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'SavedTweet', id: arg.tweetId},
                {type: 'UserTweet', id: arg.tweetId},
                {type: 'Reply', id: arg.tweetId},
                {type: 'LikedTweet', id: arg.tweetId},]
        }),
        unlikeTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/likedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'LikedTweet', id: arg.id},
                {type: 'UserTweet', id: arg.id},
                {type: 'Reply', id: arg.id},
                {type: 'Comment', id: arg.id},
                {type: 'SavedTweet', id: arg.tweetId},]
        }),
        unsaveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'SavedTweet', id: arg.id},
                {type: 'UserTweet', id: arg.id},
                {type: 'LikedTweet', id: arg.id},
                {type: 'Reply', id: arg.id},]
        })
    })
})


export const {
    useLikeTweetMutation,
    useSaveTweetMutation,
    useUnlikeTweetMutation,
    useUnsaveTweetMutation,

} = tweetActionsApiSlice;