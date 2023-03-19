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
               
    })
})


export const {
    useCreateDialogMutation,
    useLazyGetDialogQuery
} = chatApiSlice;