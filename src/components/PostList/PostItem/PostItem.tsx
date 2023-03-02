import { BookFilled, BookOutlined, CommentOutlined, DeleteOutlined, EllipsisOutlined, FileImageOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Dropdown, Input, MenuProps, notification, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';
import { useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useLikeTweetMutation, useSaveTweetMutation, useUnlikeTweetMutation, useUnsaveTweetMutation } from "../../../services/TweetActionsApiSlice";
import { useCreateTweetMutation, useDeleteTweetMutation } from "../../../services/TweetApiSlice";
import { fDateTime } from "../../../utils/formatTime";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./PostItem.scss"
const { useToken } = theme;


interface PostItemProps
{
    post: any;
    currentUser: any;
}

const PostItem:React.FC<PostItemProps> = ({post,currentUser}) =>
{

    /*#region PostItem state control*/
    const [like,likeResult] = useLikeTweetMutation();
    const [unlike,unlikeResult] = useUnlikeTweetMutation();
    const [save,saveResult] = useSaveTweetMutation();
    const [unsave,unsaveResult] = useUnsaveTweetMutation();
	const [retweet, retweetResult] = useCreateTweetMutation();
	const [deleteTweet, deleteTweetResult] = useDeleteTweetMutation();
 
    const [isLiked,setIsLiked] = useState(post.isLiked === undefined || post.isLiked?.length !== 0)
    const [isSaved,setIsSaved] = useState(post.isSaved === undefined || post.isSaved?.length !== 0)
    const [isRetweeted,setIsRetweeted] = useState(post.isRetweeted !== null  || post.parentRecord !== null)
    const [isCommentOpened,setisCommentOpened] = useState(false);


    const hasMedia = post.parentRecord?.tweetMedia?.length !== 0  || post.tweetMedia?.length !== 0;

    useNotify(likeResult,undefined,() => {setIsLiked(true)},'Some error occured on server');
    useNotify(unlikeResult,undefined,() => {setIsLiked(false)},'Some error occured on server');
    useNotify(saveResult,undefined,() => {setIsSaved(true)},'Some error occured on server');
    useNotify(unsaveResult,undefined,() => {setIsSaved(false)},'Some error occured on server');
    useNotify(retweetResult,undefined,() => {setIsRetweeted(true)},'Some error occured on server');
    useNotify(deleteTweetResult,undefined,undefined,'Some error occured on server');

    const onLikeClickHandler =() => isLiked ? unlike({tweetId:post.id,userId:currentUser.user?.id}):
                                            like({tweetId:post.id,userId:currentUser.user?.id});
        
    const onSaveClickHandler =() => isSaved ? unsave({tweetId:post.id,userId:currentUser.user?.id}):
                                                save({tweetId:post.id,userId:currentUser.user?.id});

    const onDeleteClickHandler = () => deleteTweet({id:post.id});
    const onRetweetClickHandler =() => 
    retweet(
        {
            isComment:false,
            isPublic:true,
            parentRecordAuthorId: post.parentRecord ? post.parentRecord.author?.id : post.author?.id,
            parentRecordId: post.parentRecord ?  post.parentRecord.id : post.id,
            authorId:currentUser.user.id
        }
    );;
    /*#endregion*/
    
    const items: MenuProps['items'] = [
        {
          label: 'Delete tweet',
          onClick: onDeleteClickHandler,
          key: '0',
          icon: <DeleteOutlined />,
          danger: true
        }
    ];

    return (
        <Card className="post-item-card"
        extra={
            <Dropdown menu={{ items }} arrow={false} placement={'bottom'}>
                 <Button type="text" size="middle" shape="circle" >
                        <EllipsisOutlined/>
                </Button>
            </Dropdown>
        }>
            <Space direction="vertical" className={"post-item-card-space " + 
            (!hasMedia ? 'post-item-display-none' : '')} size='middle'>
                <Card.Meta className="post-item-card-meta"
                    avatar={<Avatar icon={<UserOutlined />} src={process.env.REACT_APP_BACK_SERVER + post?.author?.mainPhoto?.path} size={36} shape="square" />}
                    title={<Typography.Text className="post-item-card-title" strong>{post.author?.firstname + ' ' + post.author?.surname}</Typography.Text>}
                    description={<Typography.Text  className="post-item-card-description" type="secondary">{fDateTime(post.createdAt)}</Typography.Text>}
                />  

                
                    {
                        post.parentRecord?                     
                        post.parentRecord.text &&<Typography.Text>{post.parentRecord.text}</Typography.Text>
                        :
                        post.text &&<Typography.Text>{post.text}</Typography.Text>
                    }
                
                <div className='post-item-images-container'>
                    <Image.PreviewGroup >
                        {
                            post.parentRecord?  
                                post.parentRecord.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                            :
                                post.tweetMedia?.map((item:any) => <Image style={{padding:3}}
                                src={process.env.REACT_APP_BACK_SERVER + item?.path} alt={item.id}/>)
                        }         
                    </Image.PreviewGroup>
                </div>
                
                <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                    <Col><Typography.Text className='post-item-stats-comments' type="secondary" >499 comments</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-retweets' type="secondary">59k retweets</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-saved' type="secondary">234 saved</Typography.Text></Col>
                </Row> 

                <Divider type="horizontal"/>
                
                <Row className={'action-row'}>
                    <Col flex={1}>
                        <Button 
                        icon={<CommentOutlined/>} onClick={() => setisCommentOpened(!isCommentOpened)} type="text" block>
                            Comment
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
                            Like
                        </Button>
                    </Col>
                    <Col flex={1}>
                        <Button 
                        icon={isSaved ? <BookFilled/> :<BookOutlined/>} 
                        className={`save-button ${isSaved && 'active'}`} onClick={() => onSaveClickHandler()}  type="text"  block>
                            Save
                        </Button>
                    </Col>
                </Row>

                <Divider type="horizontal" style={{marginBottom:'0'}}/>

                <Row style={isCommentOpened ? {display: 'none'} : {}}>
                    <ReplyForm parentPost={post}/>        
                </Row>
            </Space>
        </Card>
    )
}

export default PostItem;


