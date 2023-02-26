import React from 'react'
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetFeedQuery, useGetMediaQuery, useGetSavedTweetsQuery } from '../../services/UserTweetsSlice';

interface UserSavedTweetsProps
{
    userId:number | string;
}

const UserSavedTweets:React.FC<UserSavedTweetsProps> = ({userId}) => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetSavedTweetsQuery,
        params:{id:userId,filters:{orderBy: 'createdAt',orderDirection: 'asc'}},
        errorMessage:'Server error occured during getting user saved tweets'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default UserSavedTweets