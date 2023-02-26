import { Skeleton } from 'antd';
import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetUserTweetsQuery } from '../../services/UserTweetsSlice';

interface UserTweetsProps
{
    userId:number | string;

}

const UserTweets:React.FC<UserTweetsProps> = ({userId}) => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetUserTweetsQuery,
        params:{id:userId},
        errorMessage:'Server error occured during getting user tweets'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default UserTweets