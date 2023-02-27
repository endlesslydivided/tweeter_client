import { BookFilled, BookOutlined, CommentOutlined, FileImageOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LikeFilled, LikeOutlined, PictureOutlined, RetweetOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Input, notification, Row, Space, theme, Tooltip, Typography } from "antd";
import { Image } from 'antd';
import { useState } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { useLikeTweetMutation, useSaveTweetMutation, useUnlikeTweetMutation, useUnsaveTweetMutation } from "../../../services/TweetActionsApiSlice";
import { useCreateTweetMutation, useDeleteTweetMutation } from "../../../services/TweetApiSlice";
import { fDateTime } from "../../../utils/formatTime";
import "./PostItem.scss"
const { useToken } = theme;


interface PostItemProps
{
    post: any;
    currentUser: any;
}

const initialPost = {
	text: '',
	isPublic: true,
	authorId: null,
	isComment: false
}

const PostItem:React.FC<PostItemProps> = ({post,currentUser}) =>
{

    const [like,likeResult] = useLikeTweetMutation();
    const [unlike,unlikeResult] = useUnlikeTweetMutation();
    const [save,saveResult] = useSaveTweetMutation();
    const [unsave,unsaveResult] = useUnsaveTweetMutation();
	const [retweet, retweetResult] = useCreateTweetMutation();
	const [unretweet, unretweetResult] = useDeleteTweetMutation();
 
    const [isLiked,setIsLiked] = useState(post.isLiked === undefined || post.isLiked?.length !== 0)
    const [isSaved,setIsSaved] = useState(post.isSaved === undefined || post.isSaved?.length !== 0)
    const [isRetweeted,setIsRetweeted] = useState(post.isRetweeted !== null)

    useNotify(likeResult,undefined,() => {setIsLiked(true)},'Some error occured on server');
    useNotify(unlikeResult,undefined,() => {setIsLiked(false)},'Some error occured on server');
    useNotify(saveResult,undefined,() => {setIsSaved(true)},'Some error occured on server');
    useNotify(unsaveResult,undefined,() => {setIsSaved(false)},'Some error occured on server');
    useNotify(retweetResult,undefined,() => {setIsRetweeted(true)},'Some error occured on server');
    useNotify(unretweetResult,undefined,() => {setIsRetweeted(false)},'Some error occured on server');

    const onLikeClickHandler =() => isLiked ? unlike({tweetId:post.id,userId:currentUser.user?.id}):
                                            like({tweetId:post.id,userId:currentUser.user?.id});
        
    const onSaveClickHandler =() => isSaved ? unsave({tweetId:post.id,userId:currentUser.user?.id}):
                                                save({tweetId:post.id,userId:currentUser.user?.id});

    const onRetweetClickHandler =() => isRetweeted ? unretweet({id:post.isRetweeted?.id}):
    retweet(
        {
            isComment:false,
            isPublic:true,
            parentRecordAuthorId: post?.author?.id,
            parentRecordId:  post.id,
            authorId:currentUser.user.id
        }
    );;



    return (
        <Card className="post-item-card">
            <Space direction="vertical" className="post-item-card-space" size='middle'>
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

                <Row gutter={[10,0]} justify='end'  className='post-item-stats'>
                    <Col><Typography.Text className='post-item-stats-comments' type="secondary" >499 comments</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-retweets' type="secondary">59k retweets</Typography.Text></Col>
                    <Col><Typography.Text className='post-item-stats-saved' type="secondary">234 saved</Typography.Text></Col>
                </Row> 

                <Divider type="horizontal"/>
                
                <Row>
                    <Col flex={1}>
                        <Button 
                        icon={<CommentOutlined/>} type="text" block>
                            Comment
                        </Button>
                    </Col>
                    <Col flex={1}>
                        <Button 
                        disabled={post.parentRecord}
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

                <Divider type="horizontal"/>

                <Row className={'reply-row'}>
                    <Avatar icon={<UserOutlined />} size={36} shape="square" />
                    <Input placeholder="Tweet your reply"
                    suffix={
                            <Tooltip title="Add photo">
                                <PictureOutlined />
                            </Tooltip>
                        }
                        />
                        
                    
                </Row>
            </Space>
        </Card>
    )
}

export default PostItem;


