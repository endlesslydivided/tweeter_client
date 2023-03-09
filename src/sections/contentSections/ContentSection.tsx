import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PostListContext } from '../../components/AppRouter/AppRouter';
import PostList from '../../components/PostList';
import { useAppSelector } from '../../hooks/redux';
import { useCollection } from '../../hooks/useCollection';
import { useObserver } from '../../hooks/useObserver';
import { appendPostPage, resetPosts } from '../../store/slices/PostsSlice';



interface ContentSectionProps
{
	page: string;
    errorMessage:string;
    fetchCB:Function;
    params?: any;
}


const ContentSection:React.FC<ContentSectionProps> = ({page,params,errorMessage,fetchCB}) => {

    const posts:any = useAppSelector((state:any) => state.posts)
	const user:any = useAppSelector((state:any) => state.auth.user);
	const dispatch:any = useDispatch();
    const lastItemRef = useRef(null);

	const {getContentResult,isMore,loadMoreHandler} = useCollection({
		entities:posts,
		appendPage: appendPostPage,
		getContentCB: fetchCB,
		getContentParams:{id:user?.user?.id},
		parentEntity:null
	})
    useObserver({ref:lastItemRef,canLoad:isMore,isLoading:getContentResult.isFetching,callback:loadMoreHandler});

	useEffect(() =>
	{
		dispatch(resetPosts());
	},[])

	
    return (    
		<PostListContext.Provider value={{page}} >
        	<PostList isFetching={getContentResult.isFetching} lastItemRef={lastItemRef}/>
		</PostListContext.Provider>

    )
}

export default ContentSection
