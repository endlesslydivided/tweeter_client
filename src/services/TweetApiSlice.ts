import {apiSlice} from "./ApiSlice";


export const tweetsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTweet: builder.mutation({
            query: (post) => ({
                url: '/tweets',
                method: 'POST',
                body: post,
                credentials: 'include'
            })
        }),
        deleteTweet: builder.mutation({
            query: ({id}) =>
                ({
                    url: `/tweets/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                })
        }),

        restoreTweet: builder.mutation({
            query: ({id}) =>
                ({
                    url: `/tweets/${id}/restored`,
                    method: 'POST',
                    credentials: 'include',
                })

        }),

        getOneTweet: builder.query({
            query: ({id}) => ({
                url: `/tweets/${id}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        getAllTweets: builder.query({
            query: ({filters}) => ({
                url: `/tweets`,
                method: 'GET',
                credentials: 'include',
                params: filters
            })
        }),
        getTopTweets: builder.query({
            query: ({filters}) => ({
                url: `/tweets/top`,
                method: 'GET',
                credentials: 'include',
                params: filters
            })
        }),
        getMediaTweets: builder.query({
            query: ({filters}) => ({
                url: `/tweets/media-tweets`,
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
            })
        }),

        getReplies: builder.query({
            query: ({filters,id}) => ({
                url: `/tweets/${id}/replies`,
                method: 'GET',
                credentials: 'include',
                params: filters
            })
        }),

    })
})


export const {
    useCreateTweetMutation,
    useDeleteTweetMutation,
    useRestoreTweetMutation,
    useLazyGetOneTweetQuery,
    useGetAllTweetsQuery,
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useGetTopTweetsQuery,
    useGetRepliesQuery,
    useGetMediaTweetsQuery
} = tweetsApiSlice;