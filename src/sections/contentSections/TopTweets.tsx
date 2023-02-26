import React from 'react';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetFeedQuery } from '../../services/UserTweetsSlice';

interface TopTweetsProps
{
}

const TopTweets:React.FC<TopTweetsProps> = () => {

    const [result,totalPages,setFilters] = useFilterFetch
    ({
        fetchCB:useGetFeedQuery,
        errorMessage:'Server error occured during getting top tweets'
    });
    
    return (
        <PostList result={result}/>
    )
}

export default TopTweets