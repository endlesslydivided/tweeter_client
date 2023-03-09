import { useState } from "react";
import { useGetCommentsQuery } from "../services/TweetApiSlice";
import { setComments } from "../store/slices/CommentsSlice";
import { setPosts } from "../store/slices/PostsSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

export const useCommentsList = ({post,filters,setFilters,}: 
{
	post: any;
	filters:any,
	setFilters:Function	
}) => 
{

	const comments = useAppSelector((state:any) => state.comments[post.id] || []);

	const dispatch = useAppDispatch();
	const [isMore,setIsMore] = useState(false);
	const getCommentsResult =  useGetCommentsQuery({id:post.id,filters});
	const loadMoreHandler = async () =>
	{
		if(comments.length === 0)
		{
			getCommentsResult.refetch();
		}
		else
			setFilters((p:any) => {return {...p,createdAt: comments[comments.length-1].createdAt }});
	}
	

	useNotify(getCommentsResult,undefined,() => 
	{
		const {rows,count} = getCommentsResult.data;
		setIsMore(count > filters.limit);

		const retrievedComments = rows.filter((c:any) => !comments.includes(c));

		const editedComments = retrievedComments.filter((r:any) => comments.some((c:any) => c.id === r.id));

		const newComments = retrievedComments.filter((c:any) => !comments.some((r:any) => c.id === r.id));

		const appliedComments = [...comments.map((c:any) => editedComments.map((e:any) => c.id === e.id ? e : c)[0] || c),...newComments];

		dispatch(setComments({id:post.id,comments:appliedComments}));

	},'Some error occured on server');


	return [isMore, loadMoreHandler,getCommentsResult];
};
