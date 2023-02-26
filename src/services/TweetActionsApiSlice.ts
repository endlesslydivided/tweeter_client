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
                {type: 'LikedTweet', id: arg.id},{type: 'UserTweet', id: arg.id},{type: 'Reply', id: arg.id}]
        }),
        saveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'POST',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'SavedTweet', id: arg.id},{type: 'UserTweet', id: arg.id},{type: 'Reply', id: arg.id}]
        }),
        unlikeTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/likedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type: 'LikedTweet', id: arg.id},{type: 'UserTweet', id: arg.id},{type: 'Reply', id: arg.id}]
        }),
        unsaveTweet: builder.mutation({
            query: ({userId,tweetId}) =>
                ({
                    url: `/users/${userId}/savedTweets/${tweetId}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [{type: 'SavedTweet', id: arg.id},{type: 'UserTweet', id: arg.id}]
        })
    })
})


export const {
    useLikeTweetMutation,
    useSaveTweetMutation,
    useUnlikeTweetMutation,
    useUnsaveTweetMutation,

} = tweetActionsApiSlice;