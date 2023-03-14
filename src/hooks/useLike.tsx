import { useState } from "react";
import { useLikeTweetMutation, useUnlikeTweetMutation } from "../services/TweetActionsApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseLikeParams
{
    entity:any;
    decrementLikes:any;
    incrementLikes:any;
    unlikeAction?:any;
}

export const useLike = ({entity,incrementLikes,decrementLikes,unlikeAction}:UseLikeParams) =>
{
    const user:any = useAppSelector((state:any) => state.auth.user);
    const dispatch = useAppDispatch();

    const [like,likeResult] = useLikeTweetMutation();
    const [unlike,unlikeResult] = useUnlikeTweetMutation();
    const [isLiked,setIsLiked] = useState(entity.isLiked && entity.isLiked?.length !== 0);

    useNotify(likeResult,undefined,() => 
    {
        setIsLiked(true); 
        dispatch(incrementLikes)    
    },'Some error occured on server');

    useNotify(unlikeResult,undefined,() => 
    {
        setIsLiked(false); 
        dispatch(decrementLikes);
        if(unlikeAction) dispatch(unlikeAction);
    },'Some error occured on server');

    const onLikeClickHandler =() => isLiked ? 
    unlike({tweetId:entity.id,userId:user?.id}):                                          
    like({tweetId:entity.id,userId:user?.id});


    return {isLiked,onLikeClickHandler};
}
