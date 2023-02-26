import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetFeedQuery } from '../../services/UserTweetsSlice';

interface UserFeedProps
{
    userId:number | string;
}

const UserFeed:React.FC<UserFeedProps> = ({userId}) => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetFeedQuery,
        params:{id:userId},
        errorMessage:'Server error occured during getting user feed'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default UserFeed