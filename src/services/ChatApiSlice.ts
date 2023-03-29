import {logOut, setCredentials} from "../store/slices/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createDialog:builder.mutation({
            query: (body) => ({
                url: `/dialogs`,
                method: 'POST',
                body
            }),
        }),
        getDialog:builder.query({
            query: ({id}) => ({
                url: `/dialogs/${id}`,
                method: 'GET',
            }),
        }),

        markFavoriteMessage: builder.mutation({
            query: ({userId,messageId}) =>
                ({
                    url: `/users/${userId}/favorite-messages/${messageId}`,
                    method: 'POST',
                    credentials: 'include',
                })
        }),
        unmarkFavoriteMessage: builder.mutation({
            query: ({userId,messageId}) =>
                ({
                    url: `/users/${userId}/favorite-messages/${messageId}`,
                    method: 'DELETE',
                    credentials: 'include',
                })
        }),
        
               
    })
})


export const {
    useCreateDialogMutation,
    useLazyGetDialogQuery,
    useMarkFavoriteMessageMutation,
    useUnmarkFavoriteMessageMutation
} = chatApiSlice;