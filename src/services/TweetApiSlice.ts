import {apiSlice} from "./ApiSlice";


export const tweetsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTweet: builder.mutation({
            query: (post) => ({
                url: '/tweets',
                method: 'POST',
                body: post,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [
                'UserTweet',
                'Reply',
                'Feed',
                {type:'Comment', id: arg.parentRecordId }]
        }),

        deleteTweet: builder.mutation({
            query: ({id}) =>
                ({
                    url: `/tweets/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [
                {type:'UserTweet',id:arg.id},
                {type:'Reply',id:arg.id},
                {type:'Feed',id:arg.id},
                {type:'LikedTweet',id:arg.id},
                {type:'SavedTweet',id:arg.id},
                {type:'Comment', id: result.parentRecordId},
                'UserTweet',
                'Reply',
                'Feed',
                'LikedTweet',
                'SavedTweet']

        }),

        getOneTweet: builder.query({
            query: ({id}) => ({
                url: `/tweets/${id}`,
                method: 'GET',
                credentials: 'include',
            }),          
            providesTags: (result, error, arg) =>
            result && [{ type: 'Tweet', id:arg.id},{type:'Comment', id: arg.id}]
        }),
        getAllTweets: builder.query({
            query: ({filters}) => ({
                url: `/tweets`,
                method: 'GET',
                credentials: 'include',
                params: filters
            })
        }),

        getComments: builder.query({
            query: ({filters,id}) => ({
                url: `/tweets/${id}/comments`,
                method: 'GET',
                credentials: 'include',
                params: filters
            }),          
            providesTags: (result, error, arg) =>
            result && [...result.rows.map(({ id }:any ) => ({ type: 'Comment' , id: id })),'Comment']
        }),

    })
})


export const {
    useCreateTweetMutation,
    useDeleteTweetMutation,
    useLazyGetOneTweetQuery,
    useGetAllTweetsQuery,
    useGetCommentsQuery,
    useLazyGetCommentsQuery
} = tweetsApiSlice;