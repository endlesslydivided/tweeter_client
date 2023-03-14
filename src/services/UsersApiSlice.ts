import {logOut, setCredentials} from "../store/slices/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const usersSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
        }),
        getUser: builder.query({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: 'GET'
            }),
        }),
        
    })
})


export const {
    useGetUsersQuery,
    useLazyGetUserQuery,
    useGetUserQuery
} = usersSlice;