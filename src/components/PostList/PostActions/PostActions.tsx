import { BookFilled, BookOutlined, CommentOutlined, HeartFilled, HeartOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import { useEffect, useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useLikeTweetMutation, useSaveTweetMutation, useUnlikeTweetMutation, useUnsaveTweetMutation } from "../../../services/TweetActionsApiSlice";
import { useCreateTweetMutation } from "../../../services/TweetApiSlice";

interface PostActionsProps
{
    post: any;
    currentUser: any;
    setIsCommentsOpen: Function;
    isCommentOpen: boolean;
}

const PostActions:React.FC<PostActionsProps> = ({post,currentUser,setIsCommentsOpen,isCommentOpen}) =>
{

    const [like,likeResult] = useLikeTweetMutation();
    const [unlike,unlikeResult] = useUnlikeTweetMutation();
    const [save,saveResult] = useSaveTweetMutation();
    const [unsave,unsaveResult] = useUnsaveTweetMutation();
	const [retweet, retweetResult] = useCreateTweetMutation();
    

 
    const [isLiked,setIsLiked] = useState(post.isLiked && post.isLiked?.length !== 0)
    const [isSaved,setIsSaved] = useState(post.isSaved && post.isSaved?.length !== 0)
    const [isRetweeted,setIsRetweeted] = useState(post.isRetweeted !== null  || post.parentRecord !== null)

    useNotify(likeResult,undefined,() => {setIsLiked(true)},'Some error occured on server');
    useNotify(unlikeResult,undefined,() => {setIsLiked(false)},'Some error occured on server');
    useNotify(saveResult,undefined,() => {setIsSaved(true)},'Some error occured on server');
    useNotify(unsaveResult,undefined,() => {setIsSaved(false)},'Some error occured on server');
    useNotify(retweetResult,undefined,() => {setIsRetweeted(true)},'Some error occured on server');

    const onLikeClickHandler =() => isLiked ? unlike({tweetId:post.id,userId:currentUser.user?.id}):
                                            like({tweetId:post.id,userId:currentUser.user?.id});
        
    const onSaveClickHandler =() => isSaved ? unsave({tweetId:post.id,userId:currentUser.user?.id}):
                                                save({tweetId:post.id,userId:currentUser.user?.id});

    const onRetweetClickHandler =() => 
    retweet(
        {
            isComment:false,
            isPublic:true,
            parentRecordAuthorId: post.parentRecord ? post.parentRecord.author?.id : post.author?.id,
            parentRecordId: post.parentRecord ?  post.parentRecord.id : post.id,
            authorId:currentUser.user.id
        }
    );

    return (
        <>
            <Col flex={1}>
                <Button 
                icon={<CommentOutlined/>} onClick={() => setIsCommentsOpen(!isCommentOpen)} type="text" block>
                    Comments
                </Button>
            </Col>
            <Col flex={1}>
                <Button 
                icon={<RetweetOutlined/>}
                className={`retweet-button ${isRetweeted && 'active'}`} onClick={() => onRetweetClickHandler()}  type="text" block>
                    Retweet
                </Button>
            </Col>
            <Col flex={1}>
                <Button 
                icon={isLiked ? <HeartFilled/> : <HeartOutlined/>}
                className={`like-button ${isLiked && 'active'}`}  onClick={() => onLikeClickHandler()} type="text"  block>
                    Like ({post.counts.likesCount})
                </Button>
            </Col>
            <Col flex={1}>
                <Button 
                icon={isSaved ? <BookFilled/> :<BookOutlined/>} 
                className={`save-button ${isSaved && 'active'}`} onClick={() => onSaveClickHandler()}  type="text"  block>
                    Save
                </Button>
            </Col>
        </>
    )
}

export default PostActions;


