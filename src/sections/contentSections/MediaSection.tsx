import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetFeedQuery } from '../../services/UserTweetsSlice';

interface MediaSectionProps
{
}

const MediaSection:React.FC<MediaSectionProps> = () => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetFeedQuery,
        errorMessage:'Server error occured during getting media'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default MediaSection