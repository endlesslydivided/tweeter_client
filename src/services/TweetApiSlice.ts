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
            invalidatesTags: (result, error, arg) => [{type: 'UserTweet'},{type: 'Reply'},{type:'Feed'}]
        }),

        deleteTweet: builder.mutation({
            query: ({id}) =>
                ({
                    url: `/tweets/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [{type: 'UserTweet'},{type: 'Reply'},{type:'Feed'},{type:'LikedTweet'},{type:'SavedTweet'}]

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

        getComments: builder.query({
            query: ({filters,id}) => ({
                url: `/tweets/${id}/comments`,
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
    useLazyGetOneTweetQuery,
    useGetAllTweetsQuery,
    useGetCommentsQuery
} = tweetsApiSlice;