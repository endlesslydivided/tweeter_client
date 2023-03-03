import React from 'react';
import PostList from '../../components/PostList';
import { useFilterFetch } from '../../hooks/useFilterFetch';

interface ContentSectionProps
{
    params?: any;
    errorMessage:string;
    fetchCB:Function;
}

const ContentSection:React.FC<ContentSectionProps> = ({params,errorMessage,fetchCB}) => {

    const [result,totalPages,setFilters] = useFilterFetch({
        params: {filters:{},...params},
        errorMessage,
        fetchCB
    });
    
    return (    
        <PostList result={result}/>
    )
}

export default ContentSection