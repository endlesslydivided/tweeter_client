import { notification } from "antd";
import { useState } from "react";
import { useSaveTweetMutation, useUnsaveTweetMutation } from "../services/TweetActionsApiSlice";
import { useCreateTweetMutation, useLazyGetOneTweetQuery } from "../services/TweetApiSlice";
import { appendPost } from "../store/slices/PostsSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";

interface UseRetweetParams
{
    entity:any;
    incrementRetweets:any;
    isCurrentUserPage: boolean;
}

export const useRetweet = ({entity,incrementRetweets,isCurrentUserPage}:UseRetweetParams) =>
{
    const user:any = useAppSelector((state:any) => state.auth.user);
    const dispatch = useAppDispatch();

    const [getPost] = useLazyGetOneTweetQuery();
    const [retweet,retweetResult] = useCreateTweetMutation();
    const [isRetweeted,setIsRetweeted] = useState(entity.isRetweeted !== null  || (entity.parentRecord !== null && !entity.isComment ))

    useNotify(retweetResult,undefined,async() => {
    
        setIsRetweeted(true);
        dispatch(incrementRetweets);
        if(isCurrentUserPage)
        {
            const {data:retweet} = retweetResult;
            const {data:newTweet,error}:any = await getPost({id:retweet?.id});
            if(newTweet)
            {
                dispatch(appendPost(newTweet));
            }
            else if(error)
            {
                notification.error({message:error.message,placement:'topRight',duration:2})
            }
        }
       
    },'Some error occured on server');
    
    const onRetweetClickHandler =() => 
    retweet(
        {
            isComment:false,
            isPublic:true,
            parentRecordAuthorId: entity.parentRecord  && !entity.isComment ? entity.parentRecord.author?.id : entity.author?.id,
            parentRecordId: entity.parentRecord  && !entity.isComment ?  entity.parentRecord.id : entity.id,
            authorId:user.user?.id
        }
    );

    return {isRetweeted,onRetweetClickHandler};
}











