import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetMediaQuery } from '../../services/UserTweetsSlice';

interface UserMediaProps
{
    userId:number | string;
}

const UserMedia:React.FC<UserMediaProps> = ({userId}) => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetMediaQuery,
        params:{id:userId},
        errorMessage:'Server error occured during getting user media'
    });
    
    return (
        result.isLoading ?
        <Loader/>:
        <PostList result={result}/>
    )
}

export default UserMedia