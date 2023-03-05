import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import Fingerprint2 from "fingerprintjs2";
import {logOut} from "../store/reducers/AuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACK_SERVER_API,
    credentials: 'include'
});

const baseQueryWithReauth = async (args?: any, api?: any, extraOptions?: any) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(process.env.REACT_APP_BACK_SERVER_API);
    
    if (result?.error?.status === 403) {
        console.log('sending refresh token');

        Fingerprint2.getV18(async (fingerprint, components) => {
            const refreshResult: any = await baseQuery({
                url: '/auth/refreshTokens',
                method: 'POST',
                body:{fingerprint}
            }, api, extraOptions);
            console.log(refreshResult);
    
            if (refreshResult.meta.response.ok) 
            {
                result = await baseQuery(args, api, extraOptions);
            } 
            else 
            {
                await baseQuery({
                    url: '/auth/signOut',
                    method: 'POST'
                }, api, extraOptions);
                api.dispatch(logOut());
            }       
         })
        
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'UserTweet',
        'Feed',
        'Comment',
        'Media',
        'Reply',
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
