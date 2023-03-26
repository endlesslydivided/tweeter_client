import {logOut, setCredentials} from "../store/slices/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const usersSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: ({filters}) => ({
                url: '/users',
                method: 'GET',
                params:filters
            }),
        }),
        getUser: builder.query({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: 'GET'
            }),
        }),
        
        updateUser: builder.mutation({
            query: ({id,body}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body
            }),
        }),

        updateMe: builder.mutation({
            query: ({body}) => ({
                url: `/users/me`,
                method: 'PUT',
                body
            }),
        }),

        updateMainPhoto: builder.mutation({
            query: ({id,body}) => ({
                url: `/users/me/main-photo`,
                method: 'PUT',
                body
            }),
        }),

        updateProfilePhoto: builder.mutation({
            query: ({id,body}) => ({
                url: `/users/me/profile-photo`,
                method: 'PUT',
                body
            }),
        }),
        
    })
})


export const {
    useGetUsersQuery,
    useLazyGetUserQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdateMeMutation,
    useUpdateMainPhotoMutation,
    useUpdateProfilePhotoMutation,
} = usersSlice;