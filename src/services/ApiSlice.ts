import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {logOut} from "../store/reducers/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_API,
    credentials: 'include'
});

const baseQueryWithReauth = async (args?: any, api?: any, extraOptions?: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log('sending refresh token');

        const refreshResult: any = await baseQuery({
            url: '/auth/refresh',
            method: 'GET'
        }, api, extraOptions);
        console.log(refreshResult);

        if (refreshResult.meta.response.status === 200) 
        {
            result = await baseQuery(args, api, extraOptions);
        } 
        else 
        {
            await baseQuery({
                url: '/auth/logout',
                method: 'GET'
            }, api, extraOptions);
            api.dispatch(logOut());
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Tweet',
        'Media',
        'Subscribtion',
        'Follower',
        'AvoidedRequest',
        'User',
        'Request',
        'LikedTweet',
        'SavedTweet',
        'CurrentUser'],
    endpoints: (builder) => ({})
}) 

