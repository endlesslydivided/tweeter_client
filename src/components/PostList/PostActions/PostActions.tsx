import { BookFilled, BookOutlined, CommentOutlined, HeartFilled, HeartOutlined, ProfileFilled, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Modal } from "antd";
import { useContext, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { useLike } from "../../../hooks/useLike";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useRetweet } from "../../../hooks/useRetweet";
import { useSave } from "../../../hooks/useSave";
import { decrementPostLikes, decrementPostSaves, deletePost, incrementPostLikes, incrementPostRetweets, incrementPostSaves } from "../../../store/slices/PostsSlice";
import { PAGES } from "../../../utils/consts";
import { PostListContext } from "../../AppRouter/AppRouter";
import RetweetDialogList from "./RetweetDialogList";

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
    const xs = useMediaQuery("(max-width:576px)");
    const [isDialogsOpen, setIsDialogsOpen] = useState(false);

    const unlikeAction:any = page === PAGES.USER_LIKES && deletePost(post.id);
    const unsaveAction:any = page === PAGES.USER_SAVES && deletePost(post.id);


    const [isRetweetOpened,setIsRetweetOpened] = useState(false);

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

    const retweetToDialogHandler = () =>
    {
        setIsRetweetOpened(false);
        setIsDialogsOpen(true);
    }

    const retweetOnYouPageHandler = () =>
    {
        onRetweetClickHandler();
        setIsRetweetOpened(false);
    }

   
    return (
        <>
        <Modal
            destroyOnClose={true}
            className="modal"
            title={`Choose a dialog`}
            centered
            onCancel={() => setIsDialogsOpen(false)}
            open={isDialogsOpen}
        >
            <RetweetDialogList post={post} setModalOpen={setIsDialogsOpen}/>
        </Modal>
         {!isOriginalDeleted &&
            <Col flex={1}>
                <Button 
                icon={<CommentOutlined/>} onClick={() => setIsCommentsOpen(!isCommentOpen)} type="text" block>
                     {!xs && 'Comments'}
                </Button>
            </Col>
        }
            {!isOriginalDeleted &&
            <Col flex={isRetweetOpened ? 0.5 : 1}>
                {
                    isRetweetOpened ?
                    <Button.Group>
                        <Button 
                        icon={<UserOutlined/>}
                        className={`retweet-button ${isRetweeted && 'active'}`} onClick={() => retweetToDialogHandler()}  type="text" >
                            {!xs && 'Dialog'}
                        </Button>
                        <Button 
                        icon={<ProfileFilled/>}
                        className={`retweet-button ${isRetweeted && 'active'}`} onClick={() => retweetOnYouPageHandler()}  type="text" >
                            {!xs && 'Your page'}
                        </Button>
                    </Button.Group>
                    :
                    <>
                     <Button 
                        icon={<RetweetOutlined/>}
                        className={`retweet-button ${isRetweeted && 'active'}`} onClick={() => setIsRetweetOpened(true)}  type="text" block>
                            {!xs && 'Retweet'}
                        </Button>
                    </>
                }
               
            </Col>}
            <Col flex={1}>
                <Button 
                icon={isLiked ? <HeartFilled/> : <HeartOutlined/>}
                className={`like-button ${isLiked && 'active'}`}  onClick={() => onLikeClickHandler()} type="text"  block>
                    {!xs && `Like ${post.counts.likesCount}`}
                </Button>
            </Col>
            {!isOriginalDeleted &&
            <Col flex={1}>
                <Button 
                icon={isSaved ? <BookFilled/> :<BookOutlined/>} 
                className={`save-button ${isSaved && 'active'}`} onClick={() => onSaveClickHandler()}  type="text"  block>
                     {!xs && 'Save'}
                </Button>
            </Col>}
        </>
    )
}

export default PostActions;


