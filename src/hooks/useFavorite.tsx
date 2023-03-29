import { useState } from "react";
import { useMarkFavoriteMessageMutation, useUnmarkFavoriteMessageMutation } from "../services/ChatApiSlice";
import { useLikeTweetMutation, useUnlikeTweetMutation } from "../services/TweetActionsApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseFavoriteParams
{
    entity:any;
    unmarkFavoriteAction?:any;
}

export const useFavorite = ({entity,unmarkFavoriteAction}:UseFavoriteParams) =>
{
    const user:any = useAppSelector((state:any) => state.auth.user);
    const dispatch = useAppDispatch();

    const [markFavorite,markFavoriteResult] = useMarkFavoriteMessageMutation();
    const [unmarkFavorite,unmarkFavoriteResult] = useUnmarkFavoriteMessageMutation();
    const [isFavorite,setIsFavorite] = useState(entity.isFavorite && entity.isFavorite?.length !== 0);

    useNotify(markFavoriteResult,undefined,() => 
    {
        setIsFavorite(true); 
    },'Some error occured on server');

    useNotify(unmarkFavoriteResult,undefined,() => 
    {
        setIsFavorite(false); 
        if(unmarkFavoriteAction) dispatch(unmarkFavoriteAction);
    },'Some error occured on server');

    const onFavoriteClickHandler =() => isFavorite ? 
    unmarkFavorite({messageId:entity.id,userId:user?.id}):                                          
    markFavorite({messageId:entity.id,userId:user?.id});


    return {isFavorite,onFavoriteClickHandler};
}
