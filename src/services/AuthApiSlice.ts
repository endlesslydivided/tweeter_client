import {logOut, setCredentials} from "../store/reducers/AuthSlice";
import {apiSlice} from "./ApiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: 'api//auth/signIn',
                method: 'POST',
                body: {...credentials}
            })
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
        verifyEmail: builder.mutation({
            query: ({verificationCode}) =>
                ({
                    url: `/auth/verifyemail/${verificationCode}`,
                    method: 'GET',
                }),
            invalidatesTags: ['CurrentUser']
        }),

        signOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/signOut',
                method: 'GET',
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
                    dispatch(setCredentials({...data}));
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
    useVerifyEmailMutation,
    useGetMeQuery
} = authApiSlice;