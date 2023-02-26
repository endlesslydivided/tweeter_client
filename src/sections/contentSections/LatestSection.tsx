import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetUserTweetsQuery } from '../../services/UserTweetsSlice';

interface LatestSectionProps
{
}

const LatestSection:React.FC<LatestSectionProps> = () => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetUserTweetsQuery,
        errorMessage:'Server error occured during getting top tweets'
    });
    
    return (
        
        <PostList result={result}/>
    )
}

export default LatestSection