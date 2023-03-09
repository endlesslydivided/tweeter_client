

import { useState } from "react";
import { useLikeTweetMutation, useUnlikeTweetMutation } from "../services/TweetActionsApiSlice";
import { useDeleteTweetMutation, useRestoreTweetMutation } from "../services/TweetApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseDeletePostParams
{
    entity:any;
    decrementRetweets:any;
    incrementRetweets:any;
    decrementComments?:any;
    incrementComments?:any;

}

export const useDeletePost= ({entity,decrementRetweets,incrementRetweets,decrementComments,incrementComments}:UseDeletePostParams) =>
{
    const dispatch = useAppDispatch();

	const [deleteTweet, deleteTweetResult] = useDeleteTweetMutation();
    const [restoreTweet, restoreTweetResult] = useRestoreTweetMutation();

	const [isDeleted, setIsDeleted] = useState(false);

    useNotify(deleteTweetResult,undefined,()=>  
    {
        if(decrementComments)
        {
            dispatch(decrementComments);
        }
        dispatch(decrementRetweets);   
        setIsDeleted(true);
    },'Some error occured on server');

    useNotify(restoreTweetResult,undefined,()=>  
    {
        if(incrementComments)
        {
            dispatch(incrementComments);
        }
        dispatch(incrementRetweets);   
        setIsDeleted(false);
    },'Some error occured on server');

    const onDeleteClickHandler = () => deleteTweet({id:entity.id});
    const onRestoreClickHandler = () => restoreTweet({id:entity.id});


    return {onDeleteClickHandler,onRestoreClickHandler,isDeleted};
}


