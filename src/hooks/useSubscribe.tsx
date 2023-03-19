

import { useState } from "react";
import { useCreateSubsriptionMutation, useDeleteSubsriptionMutation } from "../services/SubsriptionsApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseSubscribeParams
{
    entity:any;
    decrementFollowers?:any;
    incrementFollowers?:any;
}

export const useSubscribe= ({entity,decrementFollowers,incrementFollowers}:UseSubscribeParams) =>
{
    const dispatch = useAppDispatch();

    const userState:any = useAppSelector((state:any) => state.auth.user);

	const [deleteSubscription, deleteSubscriptionResult] = useDeleteSubsriptionMutation();
    const [createSubscription, createSubscriptionResult] = useCreateSubsriptionMutation();

	const [isSubscribed, setIsSubscribed] = useState(entity?.isSubscribed?.length !== 0);
	const [isFollower, setIsFollower] = useState(entity?.isFollower?.length !== 0);

    useNotify(deleteSubscriptionResult,undefined,()=>  
    {
        if(decrementFollowers)
        {
            dispatch(decrementFollowers);
        }
        setIsSubscribed(false);
    },'Some error occured on server');

    useNotify(createSubscriptionResult,undefined,()=>  
    {
        if(incrementFollowers)
        {
            dispatch(incrementFollowers);
        }
        setIsSubscribed(true);
    },'Some error occured on server');

    const onDeleteClickHandler = () => deleteSubscription(
    {
        subscriberId:userState.id,
        subscribedUserId: entity.subscribedUserId || entity.id,
    });

    const onCreateClickHandler = () => createSubscription(
    {
        subscriberId:userState.id,
        subscribedUserId: entity.subscribedUserId || entity.id,
        isRejected:null,
    });


    return {onCreateClickHandler,onDeleteClickHandler,isSubscribed,isFollower};
}


