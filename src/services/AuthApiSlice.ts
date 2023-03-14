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
    useLazyGetMeQuery
} = authApiSlice;