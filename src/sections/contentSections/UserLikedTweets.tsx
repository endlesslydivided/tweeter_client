import React from 'react'
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetLikedTweetsQuery } from '../../services/UserTweetsSlice';

interface UserLikedTweetsProps
{
    userId:number | string;
}
const UserLikedTweets:React.FC<UserLikedTweetsProps> = ({userId}) => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetLikedTweetsQuery,
        params:{id:userId},
        errorMessage:'Server error occured during getting user liked tweets'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default UserLikedTweets