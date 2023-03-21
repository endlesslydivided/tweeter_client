import { notification } from "antd";
import {logOut, setCredentials} from "../store/slices/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signIn',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        signUp: builder.mutation({
            query: (data) => (
                {
                    url: '/auth/signUp',
                    method: 'POST',
                    body: data
                }
            )
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/signOut',
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['CurrentUser']
        }),
        updatePassword: builder.mutation<void, any>({
            query: ({body}) => ({
                url: '/auth/password',
                method: 'PUT',
                credentials: 'include',
                body
            })
        }),
        getSessions: builder.query<any, any>({
            query: () => ({
                url: '/auth/sessions',
                method: 'GET',
                credentials: 'include',
            })
        }),
        deleteSession: builder.mutation<void, any>({
            query: ({id}) => ({
                url: `/auth/sessions/${id}`,
                method: 'DELETE',
                credentials: 'include',
            })
        }),
        deleteAllSessions: builder.mutation<void, any>({
            query: () => ({
                url: '/auth/sessions',
                method: 'DELETE',
                credentials: 'include'
            }),
            onQueryStarted: async (id, {dispatch, queryFulfilled}) => {
                try {
                    const result:any = await queryFulfilled;
                    if(result.error)
                    {
                        notification.error({message:'Some error occured on server',placement:'topRight',duration:2});
                    }
                    else
                    {
                        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        dispatch(logOut());
                    }
                } catch (error) {
                    dispatch(logOut())
                }

            }
        }),
        getMe: builder.query<any, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['CurrentUser'],
            onQueryStarted: async (id, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    dispatch(logOut())
                }

            }
        }),
    })
})


export const {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
    useUpdatePasswordMutation,
    useGetSessionsQuery,
    useDeleteSessionMutation,
    useDeleteAllSessionsMutation,
} = authApiSlice;