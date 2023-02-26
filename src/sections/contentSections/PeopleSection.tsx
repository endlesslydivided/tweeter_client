import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetFeedQuery } from '../../services/UserTweetsSlice';

interface PeopleSectionProps
{
}

const PeopleSection:React.FC<PeopleSectionProps> = () => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetFeedQuery,
        errorMessage:'Server error occured during getting users data'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default PeopleSection