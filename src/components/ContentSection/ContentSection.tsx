import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PostListContext } from '../AppRouter/AppRouter';
import PostList from '../PostList';
import { useAppSelector } from '../../hooks/redux';
import { useCollection } from '../../hooks/useCollection';
import { useObserver } from '../../hooks/useObserver';
import { appendPostPage, resetPosts } from '../../store/slices/PostsSlice';



interface ContentSectionProps
{
	page: string;
    errorMessage:string;
    fetchCB:Function;
    filtersProps?: any;
	params?:any
}


const ContentSection:React.FC<ContentSectionProps> = ({page,filtersProps,params,errorMessage,fetchCB}) => {

    const posts:any = useAppSelector((state:any) => state.posts)
	const dispatch:any = useDispatch();
    const lastItemRef = useRef(null);


	const {getContentResult,isMore,loadMoreHandler,setIninitialFilters} = useCollection({
		entities:posts,
		appendPage: appendPostPage,
		getContentCB: fetchCB,
		getContentParams:params,
		parentEntity:null,
		filtersProps
	})
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:getContentResult.isFetching,callback:loadMoreHandler});

	
	useEffect(() =>
	{
		return(() =>
		{
			dispatch(resetPosts());
			setIninitialFilters();
		})
	},[page])

	
    return (    
		<PostListContext.Provider value={{page}} >
        	<PostList isFetching={getContentResult.isFetching} lastItemRef={lastItemRef}/>
		</PostListContext.Provider>

    )
}

export default ContentSection
