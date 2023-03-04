import React from 'react';
import Loader from '../../components/Loader';
import MediaGallery from '../../components/MediaGallery';
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
        <MediaGallery result={result}/>
    )
}

export default UserMedia