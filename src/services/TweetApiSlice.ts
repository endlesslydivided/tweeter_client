import {apiSlice} from "./ApiSlice";


export const tweetsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTweet: builder.mutation({
            query: (post) => ({
                url: '/tweets',
                method: 'POST',
                body: post,
                credentials: 'include',
            })
        }),

        deleteTweet: builder.mutation({
            query: (id) =>
                ({
                    url: `/tweets/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }),
            invalidatesTags: (result, error, arg) => [{type: 'Tweet', id: arg.id}]

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
                url: `/posts`,
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
    useGetAllTweetsQuery
} = tweetsApiSlice;