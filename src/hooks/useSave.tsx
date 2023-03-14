import { useState } from "react";
import { useSaveTweetMutation, useUnsaveTweetMutation } from "../services/TweetActionsApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseSaveParams
{
    entity:any;
    decrementSaves:any;
    incrementSaves:any;
    unsaveAction:any
}

export const useSave = ({entity,incrementSaves,decrementSaves,unsaveAction}:UseSaveParams) =>
{
    const user = useAppSelector((state:any) => state.auth.user);
    const dispatch = useAppDispatch();

    const [save,saveResult] = useSaveTweetMutation();
    const [unsave,unsaveResult] = useUnsaveTweetMutation();
    const [isSaved,setIsSaved] = useState(entity.isSaved && entity.isSaved?.length !== 0);

    useNotify(saveResult,undefined,() => 
    {
        setIsSaved(true); 
        dispatch(incrementSaves)    
    },'Some error occured on server');

    useNotify(unsaveResult,undefined,() => 
    {
        setIsSaved(false); 
        dispatch(decrementSaves)
        if(unsaveAction) dispatch(unsaveAction);
    },'Some error occured on server');

    const onSaveClickHandler =() => isSaved ? 
    unsave({tweetId:entity.id,userId:user?.id}):                                          
    save({tweetId:entity.id,userId:user?.id});


    return {isSaved,onSaveClickHandler};
}
