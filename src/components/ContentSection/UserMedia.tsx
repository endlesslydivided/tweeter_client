import React from 'react';
import Loader from '../Loader';
import MediaGallery from '../MediaGallery';
import PostList from '../PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';
import { useGetMediaQuery } from '../../services/UserTweetsApiSlice';

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
        <MediaGallery result={result}/>
    )
}

export default UserMedia