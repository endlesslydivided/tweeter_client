import { BookFilled, BookOutlined, CommentOutlined, HeartFilled, HeartOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import { useContext } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { useLike } from "../../../hooks/useLike";
import { useRetweet } from "../../../hooks/useRetweet";
import { useSave } from "../../../hooks/useSave";
import { decrementPostLikes, decrementPostSaves, deletePost, incrementPostLikes, incrementPostRetweets, incrementPostSaves } from "../../../store/slices/PostsSlice";
import { PAGES } from "../../../utils/consts";
import { PostListContext } from "../../AppRouter/AppRouter";

interface PostActionsProps
{
    post: any;
    setIsCommentsOpen: Function;
    isCommentOpen: boolean;
    isOriginalDeleted: boolean;
}

const PostActions:React.FC<PostActionsProps> = ({post,setIsCommentsOpen,isCommentOpen,isOriginalDeleted}) =>
{

    const {page}:any = useContext(PostListContext);

    const unlikeAction:any = page === PAGES.USER_LIKES && deletePost(post.id);
    const unsaveAction:any = page === PAGES.USER_SAVES && deletePost(post.id);


    const {isLiked,onLikeClickHandler} = useLike({
        entity:post,
        incrementLikes:incrementPostLikes(post.id),
        decrementLikes:decrementPostLikes(post.id),
        unlikeAction
    })

    const {isSaved,onSaveClickHandler} = useSave({
        entity:post,
        incrementSaves:incrementPostSaves(post.id),
        decrementSaves:decrementPostSaves(post.id),
        unsaveAction
    })

    const {isRetweeted,onRetweetClickHandler} = useRetweet({
        entity:post,
        incrementRetweets:incrementPostRetweets(post.parentRecord?.id || post.id),
        isCurrentUserPage: page === PAGES.USER_TWEETS
    })

   
    return (
        <>
            <Col flex={1}>
                <Button 
                icon={<CommentOutlined/>} onClick={() => setIsCommentsOpen(!isCommentOpen)} type="text" block>
                    Comments
                </Button>
            </Col>
            {!isOriginalDeleted &&
            <Col flex={1}>
                <Button 
                icon={<RetweetOutlined/>}
                className={`retweet-button ${isRetweeted && 'active'}`} onClick={() => onRetweetClickHandler()}  type="text" block>
                    Retweet
                </Button>
            </Col>}
            <Col flex={1}>
                <Button 
                icon={isLiked ? <HeartFilled/> : <HeartOutlined/>}
                className={`like-button ${isLiked && 'active'}`}  onClick={() => onLikeClickHandler()} type="text"  block>
                    Like ({post.counts.likesCount})
                </Button>
            </Col>
            {!isOriginalDeleted &&
            <Col flex={1}>
                <Button 
                icon={isSaved ? <BookFilled/> :<BookOutlined/>} 
                className={`save-button ${isSaved && 'active'}`} onClick={() => onSaveClickHandler()}  type="text"  block>
                    Save
                </Button>
            </Col>}
        </>
    )
}

export default PostActions;


